import path from 'node:path';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import sharp from 'sharp';

const RAW_ROOT = path.resolve('assets/raw/images');
const SRC_OUT_ROOT = path.resolve('src/assets/images');
const PUBLIC_OUT_ROOT = path.resolve('public/images');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG', '.webp', '.WEBP']);

/** Defaults por pasta (largura máxima + qualidade WebP). */
const FOLDER_DEFAULTS = {
  hero: { width: 1100, quality: 92 },
  about: { width: 900, quality: 84 },
  og: { width: 1200, quality: 86 },
};

const FALLBACK_DEFAULTS = { width: 1920, quality: 80 };

/**
 * Jobs com saída renomeada ou destino especial.
 * Sobrescrevem a descoberta automática quando o input bate.
 */
const MANUAL_JOBS = [
  {
    input: path.resolve('assets/raw/images/hero/hero.JPG'),
    output: path.resolve('src/assets/images/hero/barbara-hero.webp'),
    width: 1100,
    quality: 92,
  },
  {
    input: path.resolve('assets/raw/images/about/barbara-sobre.jpeg'),
    output: path.resolve('src/assets/images/about/barbara-sobre.webp'),
    width: 900,
    quality: 84,
  },
  {
    input: path.resolve('assets/raw/images/og/og-image.jpeg'),
    output: path.resolve('public/images/og/og-image.webp'),
    width: 1200,
    quality: 86,
  },
];

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getMtime(filePath) {
  try {
    const info = await stat(filePath);
    return info.mtimeMs;
  } catch {
    return null;
  }
}

async function collectRawImages(dir) {
  const results = [];

  if (!(await fileExists(dir))) return results;

  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...(await collectRawImages(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name);
    if (IMAGE_EXTENSIONS.has(ext)) {
      results.push(fullPath);
    }
  }

  return results;
}

function defaultsForFolder(folderName) {
  return FOLDER_DEFAULTS[folderName] ?? FALLBACK_DEFAULTS;
}

function outputPathForRaw(rawPath) {
  const relative = path.relative(RAW_ROOT, rawPath);
  const folderName = relative.split(path.sep)[0];
  const parsed = path.parse(relative);
  const webpRelative = path.join(parsed.dir, `${parsed.name}.webp`);

  if (folderName === 'og') {
    return path.join(PUBLIC_OUT_ROOT, webpRelative);
  }

  return path.join(SRC_OUT_ROOT, webpRelative);
}

function normalizePath(filePath) {
  return path.resolve(filePath).toLowerCase();
}

async function buildJobList() {
  const jobsByInput = new Map();

  for (const job of MANUAL_JOBS) {
    jobsByInput.set(normalizePath(job.input), job);
  }

  const rawFiles = await collectRawImages(RAW_ROOT);

  for (const rawPath of rawFiles) {
    const key = normalizePath(rawPath);
    if (jobsByInput.has(key)) continue;

    const relative = path.relative(RAW_ROOT, rawPath);
    const folderName = relative.split(path.sep)[0];
    const { width, quality } = defaultsForFolder(folderName);

    jobsByInput.set(key, {
      input: rawPath,
      output: outputPathForRaw(rawPath),
      width,
      quality,
    });
  }

  return [...jobsByInput.values()];
}

async function shouldOptimize(input, output) {
  const inputMtime = await getMtime(input);
  const outputMtime = await getMtime(output);

  if (inputMtime == null) {
    if (outputMtime != null) {
      return { run: false, reason: 'skip-missing-raw' };
    }
    return { run: false, reason: 'missing-both' };
  }

  if (outputMtime == null) {
    return { run: true, reason: 'new' };
  }

  if (inputMtime > outputMtime) {
    return { run: true, reason: 'updated' };
  }

  return { run: false, reason: 'up-to-date' };
}

async function optimizeToWebp({ input, output, width, quality }) {
  await mkdir(path.dirname(output), { recursive: true });

  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
}

async function run() {
  const jobs = await buildJobList();
  let optimized = 0;
  let skipped = 0;

  for (const job of jobs) {
    const relativeOutput = path.relative(process.cwd(), job.output);
    const decision = await shouldOptimize(job.input, job.output);

    if (decision.reason === 'missing-both') {
      throw new Error(
        `Falta o original e o WebP de: ${path.relative(process.cwd(), job.input)}`,
      );
    }

    if (!decision.run) {
      skipped += 1;
      if (decision.reason === 'skip-missing-raw') {
        console.log(`Mantido (sem raw no CI): ${relativeOutput}`);
      } else {
        console.log(`Já otimizada: ${relativeOutput}`);
      }
      continue;
    }

    await optimizeToWebp(job);
    optimized += 1;
    const label = decision.reason === 'new' ? 'Nova imagem' : 'Imagem atualizada';
    console.log(`${label} otimizada: ${relativeOutput}`);
  }

  console.log(`Otimização concluída: ${optimized} gerada(s), ${skipped} ignorada(s).`);
}

run().catch((error) => {
  console.error('Erro ao otimizar imagens:', error);
  process.exitCode = 1;
});
