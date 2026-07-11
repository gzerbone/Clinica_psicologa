import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { access } from 'node:fs/promises';
import sharp from 'sharp';

const imageJobs = [
  {
    inputCandidates: [path.resolve('assets/raw/images/hero/hero.JPG')],
    output: path.resolve('src/assets/images/hero/barbara-hero.webp'),
    width: 1100,
    quality: 92,
  },
  {
    inputCandidates: [path.resolve('assets/raw/images/about/barbara-sobre.jpeg')],
    output: path.resolve('src/assets/images/about/barbara-sobre.webp'),
    width: 900,
    quality: 84,
  },
  {
    inputCandidates: [path.resolve('assets/raw/images/og/og-image.jpeg')],
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

async function resolveInput(inputCandidates) {
  for (const candidate of inputCandidates) {
    if (await fileExists(candidate)) return candidate;
  }

  throw new Error(`Nenhum arquivo encontrado para: ${inputCandidates.join(', ')}`);
}

async function optimizeToWebp({ inputCandidates, output, width, quality }) {
  const input = await resolveInput(inputCandidates);
  await mkdir(path.dirname(output), { recursive: true });

  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output);
}

async function run() {
  for (const job of imageJobs) {
    await optimizeToWebp(job);
    const relativeOutput = path.relative(process.cwd(), job.output);
    console.log(`Imagem otimizada: ${relativeOutput}`);
  }
}

run().catch((error) => {
  console.error('Erro ao otimizar imagens:', error);
  process.exitCode = 1;
});
