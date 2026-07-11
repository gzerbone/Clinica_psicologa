import { useEffect, useState } from 'react';
import { Instagram, ArrowUp, Menu, X } from 'lucide-react';
import heroImage from './assets/images/hero/barbara-hero.webp';
import aboutImage from './assets/images/about/barbara-sobre.webp';

const SectionDivider = () => (
  <svg className="divider" viewBox="0 0 220 40">
    <path d="M0 20 C 25 20, 32 5, 55 5 C 78 5, 84 35, 107 35 C 130 35, 136 5, 159 5 C 182 5, 188 20, 220 20"/>
  </svg>
);

const NAV_LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#abordagem', label: 'Abordagem' },
  { href: '#processo', label: 'Como funciona' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'Dúvidas' },
] as const;

// Objeto de configuração — edite aqui para ajustar os blurs dos cantos e elementos decorativos
const MESH_CONFIG = {
  topLeft: {
    size: '700px',       // tamanho do círculo
    opacity: '0.55',     // opacidade (0 a 1)
    blur: '140px',       // intensidade do blur
    color: '#B7C0C7',    // cor (azul-acinzentado)
    top: '-10%',
    left: '-10%',
  },
  bottomRight: {
    size: '600px',
    opacity: '0.45',
    blur: '140px',
    color: '#8C9381',    // cor (sálvia)
    bottom: '-10%',
    right: '-10%',
  },
  midRight: {
    size: '380px',
    opacity: '0.30',
    blur: '110px',
    color: '#85866A',    // cor (oliva)
    top: '20%',
    right: '10%',
  },
  blobGlow: {
    opacity: '0.40',
    blur: '48px',   // blur-2xl = 40px, aumentado para 48px
  },
};

export default function App() {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.getElementById('siteHeader');
    const handleScroll = () => {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }
      setShowWhatsapp(window.scrollY > 500);
      
      const sobreSection = document.getElementById('sobre');
      if (sobreSection) {
        const sobreBottom = sobreSection.offsetTop + sobreSection.offsetHeight;
        setShowScrollTop(window.scrollY > sobreBottom);
      } else {
        setShowScrollTop(window.scrollY > 800);
      }
      
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    const handleFaqClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const item = btn.closest('.faq-item');
      if (!item) return;
      
      const a = item.querySelector('.faq-a') as HTMLElement;
      const isOpen = item.classList.contains('open');
      
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherA = other.querySelector('.faq-a') as HTMLElement;
          if (otherA) otherA.style.maxHeight = '0px';
        }
      });
      
      item.classList.toggle('open');
      if (a) {
        a.style.maxHeight = isOpen ? '0px' : a.scrollHeight + 'px';
      }
    };
    
    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', handleFaqClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('.faq-q').forEach(q => {
        q.removeEventListener('click', handleFaqClick);
      });
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 960) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`app-container${menuOpen ? ' menu-open' : ''}`}>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <header id="siteHeader">
        <div className="wrap nav">
          <a href="#top" className="logo" onClick={closeMenu}>Bárbara <span>Badaró</span></a>
          <div className="nav-links nav-links-pill">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="nav-actions">
            <a href="#contato" className="nav-cta" onClick={closeMenu}>Agendar</a>
            <button
              type="button"
              className="nav-toggle"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobileNav"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-backdrop${menuOpen ? ' open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
      <nav id="mobileNav" className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
        </div>
        <a href="#contato" className="btn btn-primary mobile-nav-cta" onClick={closeMenu}>
          Agendar primeira sessão
        </a>
      </nav>

      <main id="top" className="relative">
        {/* Animated Mesh Background Effects */}
        <div 
          className="fixed rounded-full pointer-events-none z-[0]"
          style={{ 
            top: MESH_CONFIG.topLeft.top, 
            left: MESH_CONFIG.topLeft.left, 
            width: MESH_CONFIG.topLeft.size, 
            height: MESH_CONFIG.topLeft.size, 
            backgroundColor: MESH_CONFIG.topLeft.color, 
            opacity: MESH_CONFIG.topLeft.opacity, 
            filter: `blur(${MESH_CONFIG.topLeft.blur})` 
          }}
        ></div>
        <div 
          className="fixed rounded-full pointer-events-none z-[0]"
          style={{ 
            bottom: MESH_CONFIG.bottomRight.bottom, 
            right: MESH_CONFIG.bottomRight.right, 
            width: MESH_CONFIG.bottomRight.size, 
            height: MESH_CONFIG.bottomRight.size, 
            backgroundColor: MESH_CONFIG.bottomRight.color, 
            opacity: MESH_CONFIG.bottomRight.opacity, 
            filter: `blur(${MESH_CONFIG.bottomRight.blur})` 
          }}
        ></div>
        <div 
          className="fixed rounded-full pointer-events-none z-[0]"
          style={{ 
            top: MESH_CONFIG.midRight.top, 
            right: MESH_CONFIG.midRight.right, 
            width: MESH_CONFIG.midRight.size, 
            height: MESH_CONFIG.midRight.size, 
            backgroundColor: MESH_CONFIG.midRight.color, 
            opacity: MESH_CONFIG.midRight.opacity, 
            filter: `blur(${MESH_CONFIG.midRight.blur})` 
          }}
        ></div>

        <section className="hero">
          <div className="wrap hero-grid">
            <div className="animate-fade-in-up">
              <span className="eyebrow">Neuropsicologia <span className="eyebrow-sep">·</span> <span className="eyebrow-full">Terapia Cognitivo-Comportamental</span><span className="eyebrow-short">TCC</span></span>
              <h1>Um espaço para <em>organizar</em> o que pesa e seguir com mais clareza.</h1>
              <p className="lead">Atendimento individual para adultos, online e presencial, com foco em ansiedade, transições de vida e relacionamentos.</p>
              <div className="hero-actions">
                <a href="#contato" className="btn btn-primary">Agendar primeira sessão</a>
                <a href="#sobre" className="btn btn-ghost">Conhecer a abordagem</a>
              </div>
              <div className="hero-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C9381" strokeWidth="2">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Sessões de 30 à 45 min · CRP 06/000000
              </div>
            </div>
            <div className="hero-visual">
              {/* Decorative Glass Glow Behind Blob */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#8C9381] to-[#B7C0C7] transform scale-110 rounded-full pointer-events-none"
                style={{ 
                  opacity: MESH_CONFIG.blobGlow.opacity, 
                  filter: `blur(${MESH_CONFIG.blobGlow.blur})` 
                }}
              ></div>
              
              <div className="blob">
                <img 
                  src={heroImage}
                  alt="Retrato profissional da neuropsicóloga Bárbara Badaró" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="sobre" id="sobre">
          <div className="wrap sobre-grid">
            <div className="reveal-left">
              <div className="sobre-portrait">
                <img src={aboutImage} alt="Bárbara Badaró em atendimento" />
              </div>
            </div>
            <div className="reveal-right">
              <span className="eyebrow">Sobre mim</span>
              <h2 style={{ marginTop: '16px', fontSize: 'clamp(26px,3vw,36px)' }}>Terapia como prática, não só conversa.</h2>
              <p className="quote">"Acredito que mudança real acontece quando entendemos os padrões por trás do que sentimos — e praticamos, sessão após sessão, novas formas de responder à vida."</p>
              <p style={{ color: 'var(--ink-soft)', maxWidth: '520px' }}>Sou neuropsicóloga e psicóloga clínica, especialista em Terapia Cognitivo-Comportamental (TCC). Atendo adultos há mais de 18 anos, sempre com base em evidências científicas e respeito ao tempo de cada processo.</p>
              <div className="credentials">
                <div className="credential-item"><span className="num">+18</span><span className="label">anos de prática clínica</span></div>
                <div className="credential-item"><span className="num">CRP</span><span className="label">06/000000 — regularizada</span></div>
                <div className="credential-item"><span className="num">TCC</span><span className="label">especialização em terapia baseada em evidências</span></div>
                <div className="credential-item"><span className="num">100%</span><span className="label">online ou presencial, à sua escolha</span></div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="abordagem">
          <div className="wrap">
            <div className="section-head center reveal-scale">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Áreas de atuação</span>
              <h2>Onde posso ajudar</h2>
              <p>Cada processo é único, mas alguns temas aparecem com frequência no consultório.</p>
            </div>
            <div className="cards">
              <div className="card reveal delay-1">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E6F58" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="9"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 3v2M12 19v2M3 12h2M19 12h2"/>
                  </svg>
                </div>
                <h3>Autoconhecimento e Terapia</h3>
                <p>Reflexões sobre emoções, comportamentos e crescimento pessoal — para se entender com mais clareza.</p>
              </div>
              <div className="card reveal delay-2">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E6F58" strokeWidth="1.8">
                    <path d="M12 21c-4-3-8-6-8-11a5 5 0 019-3 5 5 0 019 3c0 5-4 8-8 11z"/>
                  </svg>
                </div>
                <h3>Ansiedade, depressão e TDAH</h3>
                <p>Conteúdos e ferramentas para entender, acolher e lidar melhor com seus desafios do dia a dia.</p>
              </div>
              <div className="card reveal delay-3">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E6F58" strokeWidth="1.8">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
                    <path d="M8 7h8M8 11h6"/>
                  </svg>
                </div>
                <h3>Transtornos psicológicos</h3>
                <p>Psicoeducação acessível, sem rótulos e com mais consciência sobre o que você vive.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="processo" id="processo">
          <div className="wrap">
            <div className="section-head reveal-scale">
              <span className="eyebrow">Como funciona</span>
              <h2>Do primeiro contato à primeira sessão</h2>
            </div>
            <div className="steps">
              <div className="step reveal delay-1">
                <span className="step-num">01</span>
                <h3>Contato inicial</h3>
                <p>Você me chama por WhatsApp e contamos, em poucas palavras, o que te trouxe até aqui.</p>
              </div>
              <div className="step reveal delay-2">
                <span className="step-num">02</span>
                <h3>Sessão de avaliação</h3>
                <p>Uma conversa inicial mais longa, para entender sua história e definir se seguimos juntas.</p>
              </div>
              <div className="step reveal delay-3">
                <span className="step-num">03</span>
                <h3>Plano terapêutico</h3>
                <p>Definimos objetivos claros e a frequência das sessões — geralmente semanal, no início.</p>
              </div>
              <div className="step reveal delay-4">
                <span className="step-num">04</span>
                <h3>Acompanhamento</h3>
                <p>Sessões regulares, com revisão periódica do progresso e ajustes sempre que necessário.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="depoimentos">
          <div className="wrap">
            <div className="section-head center reveal-scale">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Depoimentos</span>
              <h2>O que dizem sobre o processo</h2>
            </div>
            <div className="testimonials">
              <div className="t-card reveal delay-1">
                <p>"Cheguei sem saber nomear o que sentia. Hoje entendo meus padrões de ansiedade e sei o que fazer quando eles aparecem."</p>
                <div className="t-name">Paciente, 34 anos</div>
                <div className="t-role">Em acompanhamento há 1 ano</div>
              </div>
              <div className="t-card reveal delay-2">
                <p>"A abordagem é prática, sem perder a escuta. Saio de cada sessão com algo concreto para aplicar na semana."</p>
                <div className="t-name">Paciente, 29 anos</div>
                <div className="t-role">Em acompanhamento há 8 meses</div>
              </div>
              <div className="t-card reveal delay-3">
                <p>"Foi na terapia que consegui atravessar uma transição de carreira difícil com mais leveza."</p>
                <div className="t-name">Paciente, 41 anos</div>
                <div className="t-role">Processo concluído</div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="faq">
          <div className="wrap">
            <div className="section-head center reveal-scale">
              <span className="eyebrow" style={{ justifyContent: 'center' }}>Dúvidas frequentes</span>
              <h2>Perguntas antes de começar</h2>
            </div>
            <div className="faq-list">
              <div className="faq-item">
                <button className="faq-q"><span>Como funciona o atendimento online?</span><span className="plus"></span></button>
                <div className="faq-a"><p>As sessões acontecem por videochamada, com a mesma duração e sigilo do atendimento presencial. Você só precisa de um local privado e uma conexão estável.</p></div>
              </div>
              <div className="faq-item">
                <button className="faq-q"><span>Qual a frequência recomendada das sessões?</span><span className="plus"></span></button>
                <div className="faq-a"><p>No início do processo, o ideal é frequência semanal — isso favorece a construção do vínculo terapêutico e o avanço das demandas trazidas.</p></div>
              </div>
              <div className="faq-item">
                <button className="faq-q"><span>Você emite recibo para reembolso do plano de saúde?</span><span className="plus"></span></button>
                <div className="faq-a"><p>Sim, emito recibo para que você solicite reembolso ao seu convênio. O processo de aprovação, no entanto, depende exclusivamente do seu plano.</p></div>
              </div>
              <div className="faq-item">
                <button className="faq-q"><span>Como sei se a TCC é indicada para o meu caso?</span><span className="plus"></span></button>
                <div className="faq-a"><p>Na sessão de avaliação, conversamos sobre sua história e demandas para verificar se essa abordagem é a mais indicada — e, se não for, te oriento sobre outros caminhos possíveis.</p></div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="contato">
          <div className="cta-final reveal">
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.75)', justifyContent: 'center' }}>Vamos conversar?</span>
            <h2 style={{ marginTop: '16px' }}>Dê o primeiro passo hoje.</h2>
            <p>Escreva contando um pouco do que te trouxe até aqui — eu respondo pessoalmente para combinarmos os próximos passos.</p>
            <a href="https://wa.me/557382061011?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20agendamento%20de%20sess%C3%B5es." className="btn btn-primary" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
          </div>
        </section>

      </main>

      <footer>
        {/* Onda animada no topo */}
        <div className="footer-wave-wrap" aria-hidden="true">
          <svg className="footer-wave-svg" viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,100 L2880,100 L2880,50 C2520,50 2520,90 2160,90 C1800,90 1800,50 1440,50 C1080,50 1080,90 720,90 C360,90 360,50 0,50 Z"
              fill="var(--footer-bg)"
            />
          </svg>
        </div>

        {/* Faixa marquee — conteúdo se move horizontalmente */}
        <div className="footer-marquee-strip" aria-hidden="true">
          {[0, 1].map(i => (
            <div key={i} className="footer-marquee-content">
              <span className="fmq-item">Bárbara Badaró</span>
              <span className="fmq-sep" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-8"/><path d="M4 20h16"/>
                  <path d="M12 4C7.5 4 4 7.5 4 12c0 2.5 1.1 4.8 2.9 6.3"/>
                  <path d="M12 4c4.5 0 8 3.5 8 8 0 2.5-1.1 4.8-2.9 6.3"/>
                </svg>
              </span>
              <span className="fmq-item">Neuropsicóloga</span>
              <span className="fmq-sep" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5C4 9 4.5 10.4 5.5 11.5c-1 .6-1.5 1.7-1.5 2.8A3.2 3.2 0 0 0 7 17.5v.5A3 3 0 0 0 10 21h4a3 3 0 0 0 3-3v-.5a3.2 3.2 0 0 0 3-3.2c0-1.1-.5-2.2-1.5-2.8 1-1.1 1.5-2.5 1.5-4A5.5 5.5 0 0 0 14.5 2"/>
                  <path d="M12 2v19"/><path d="M9 7c-1.5 1-2 2.5-2 4"/><path d="M15 7c1.5 1 2 2.5 2 4"/>
                </svg>
              </span>
              <span className="fmq-item">TCC</span>
              <span className="fmq-sep" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M3.22 12H9.5l1.5-3 2 5 1.5-3h3.78"/>
                </svg>
              </span>
              <a href="https://instagram.com/barbarabadarom" target="_blank" rel="noopener noreferrer" className="fmq-item fmq-social">
                <Instagram size={24} /> barbarabadarom
              </a>
              <span className="fmq-sep" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </span>
              <span className="fmq-item ghost">Bárbara Badaró</span>
              <span className="fmq-sep ghost" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
                </svg>
              </span>
              <span className="fmq-item ghost">Neuropsicóloga</span>
              <span className="fmq-sep ghost" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-8"/><path d="M4 20h16"/>
                  <path d="M12 4C7.5 4 4 7.5 4 12c0 2.5 1.1 4.8 2.9 6.3"/>
                  <path d="M12 4c4.5 0 8 3.5 8 8 0 2.5-1.1 4.8-2.9 6.3"/>
                </svg>
              </span>
              <span className="fmq-item ghost">TCC</span>
              <span className="fmq-sep ghost" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.5 2A5.5 5.5 0 0 0 4 7.5C4 9 4.5 10.4 5.5 11.5c-1 .6-1.5 1.7-1.5 2.8A3.2 3.2 0 0 0 7 17.5v.5A3 3 0 0 0 10 21h4a3 3 0 0 0 3-3v-.5a3.2 3.2 0 0 0 3-3.2c0-1.1-.5-2.2-1.5-2.8 1-1.1 1.5-2.5 1.5-4A5.5 5.5 0 0 0 14.5 2"/>
                  <path d="M12 2v19"/><path d="M9 7c-1.5 1-2 2.5-2 4"/><path d="M15 7c1.5 1 2 2.5 2 4"/>
                </svg>
              </span>
              <a href="https://instagram.com/barbarabadarom" target="_blank" rel="noopener noreferrer" className="fmq-item fmq-social ghost">
                <Instagram size={24} /> barbarabadarom
              </a>
              <span className="fmq-sep ghost" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M3.22 12H9.5l1.5-3 2 5 1.5-3h3.78"/>
                </svg>
              </span>
            </div>
          ))}
        </div>

        <div className="wrap">
          <div className="footer-bottom">
            <span>© 2026 Bárbara Badaró Neuropsicologia · CRP 06/000000</span>
            <span>Em caso de urgência, ligue para o CVV: 188</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/557382061011?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20agendamento%20de%20sess%C3%B5es." 
        className={`floating-whatsapp ${showWhatsapp ? 'visible' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
