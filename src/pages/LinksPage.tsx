import { Brain, Globe, Instagram, MapPin, MessageCircle } from 'lucide-react';

/**
 * Configurações rápidas de edição — altere aqui sem precisar tocar no JSX abaixo.
 */
const LINKS_CONFIG = {
  whatsappNumber: '557382061011', // apenas dígitos, com DDI + DDD
  whatsappMessage: 'Olá! Gostaria de saber mais informações sobre o agendamento de sessões.',
  siteUrl: '/',
  addressLabel: 'Edifício Módulo Center · 7º andar, sala 702',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Edif%C3%ADcio+M%C3%B3dulo+Center+sala+702',
  avaliacaoUrl: '/#avaliacao-neuropsicologica',
  instagramUrl: 'https://instagram.com/barbarabadarom',
  instagramHandle: '@barbarabadarom',
};

const whatsappUrl = `https://wa.me/${LINKS_CONFIG.whatsappNumber}?text=${encodeURIComponent(LINKS_CONFIG.whatsappMessage)}`;

const LINK_ITEMS = [
  {
    id: 'whatsapp',
    label: 'Falar pelo WhatsApp',
    description: 'Atendimento rápido e direto',
    href: whatsappUrl,
    icon: MessageCircle,
    external: true,
    primary: true,
  },
  {
    id: 'site',
    label: 'Conheça meu site',
    description: 'Abordagem, processo e depoimentos',
    href: LINKS_CONFIG.siteUrl,
    icon: Globe,
    external: false,
    primary: false,
  },
  {
    id: 'endereco',
    label: 'Endereço da clínica',
    description: LINKS_CONFIG.addressLabel,
    href: LINKS_CONFIG.mapsUrl,
    icon: MapPin,
    external: true,
    primary: false,
  },
  {
    id: 'avaliacao',
    label: 'Avaliação neuropsicológica',
    description: 'Entenda como funciona o processo',
    href: LINKS_CONFIG.avaliacaoUrl,
    icon: Brain,
    external: false,
    primary: false,
  },
] as const;

export default function LinksPage() {
  return (
    <div className="links-page">
      <div
        className="mesh-orb mesh-orb-tl"
        style={{
          top: '-15%',
          left: '-20%',
          width: '420px',
          height: '420px',
          backgroundColor: '#B7C0C7',
          ['--mesh-opacity' as string]: '0.5',
          ['--mesh-blur' as string]: '120px',
        }}
      />
      <div
        className="mesh-orb mesh-orb-br"
        style={{
          bottom: '-15%',
          right: '-20%',
          width: '380px',
          height: '380px',
          backgroundColor: '#8C9381',
          ['--mesh-opacity' as string]: '0.4',
          ['--mesh-blur' as string]: '120px',
        }}
      />

      <main className="links-shell animate-fade-in-up">
        <div className="links-header">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Psicóloga</span>
          <h1 className="links-name">Bárbara Badaró</h1>
        </div>

        <p className="links-intro">
          Escolha uma das opções abaixo para falar comigo ou conhecer melhor meu trabalho.
        </p>

        <nav className="links-list" aria-label="Links rápidos">
          {LINK_ITEMS.map(({ id, label, description, href, icon: Icon, external, primary }) => (
            <a
              key={id}
              href={href}
              className={`link-card${primary ? ' link-card-primary' : ''}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="link-card-icon">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span className="link-card-text">
                <span className="link-card-label">{label}</span>
                <span className="link-card-desc">{description}</span>
              </span>
            </a>
          ))}
        </nav>

        <a
          href={LINKS_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="links-instagram"
        >
          <Instagram size={16} strokeWidth={1.8} />
          {LINKS_CONFIG.instagramHandle}
        </a>

        <div className="links-footer">
          <p>Atendimento psicológico com ética, acolhimento e responsabilidade.</p>
          <span className="links-crp">CRP 03/6014</span>
        </div>
      </main>
    </div>
  );
}
