import { useEffect, useState } from 'react';
import { Instagram, ArrowUp } from 'lucide-react';
import heroImage from './assets/images/hero/barbara-hero.webp';
import aboutImage from './assets/images/about/barbara-sobre.webp';

const ThreadsIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 192 192" fill="currentColor" className={className}>
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.838 116.888 137.71 103.36C145.474 106.985 151.782 115.753 151.782 127.319C151.782 146.035 137.95 160.039 120.73 162.246C112.569 163.292 104.793 163.782 97.2286 163.782C94.5262 163.782 91.8797 163.69 89.2891 163.498C76.2891 162.536 64.9126 158.455 57.0673 151.815C49.1925 145.148 44.8087 135.856 44.8087 124.965C44.8087 113.626 49.3394 104.28 57.5186 97.4339C65.5562 90.7067 76.9863 86.879 90.0094 86.4172C94.3986 86.2625 98.9248 86.2981 103.684 86.5363C104.382 86.5756 105.077 86.6206 105.772 86.671C105.792 86.3263 105.807 85.9818 105.819 85.6375C105.908 82.6851 105.518 79.9405 104.665 77.4727C101.996 69.7214 93.6335 68.648 89.2618 68.7408C86.7214 68.7946 84.4229 69.4316 82.3551 70.6698L75.3377 56.4019C80.8906 53.0768 87.5255 51.5204 94.6715 51.5204C106.942 51.5204 116.892 56.1265 122.95 64.4411C128.473 72.019 130.638 82.4631 129.576 95.3409C134.425 98.4411 138.384 102.502 141.537 107.568V88.9883ZM98.8143 133.056C105.564 132.669 110.631 129.626 113.439 124.084C115.548 119.92 116.516 114.73 116.422 108.625C114.187 106.916 111.411 105.474 108.156 104.39C104.811 103.275 101.401 102.683 98.0205 102.637C88.084 102.5 82.9022 105.932 82.4764 111.839C82.2612 114.812 83.6508 117.391 86.4257 119.294C89.5167 121.414 93.7431 122.428 98.8143 123.056V133.056Z"/>
  </svg>
);

export default function App() {
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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

  return (
    <div className="app-container">
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <header id="siteHeader">
        <div className="wrap nav">
          <a href="#top" className="logo">Bárbara <span>Badaró</span></a>
          <div className="nav-links nav-links-pill">
            <a href="#sobre">Sobre</a>
            <a href="#abordagem">Abordagem</a>
            <a href="#processo">Como funciona</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#faq">Dúvidas</a>
          </div>
          <div className="nav-actions">
            <a href="#contato" className="nav-cta">Agendar</a>
            {/* Hamburger substitui o "Agendar" no mobile */}
            <button
              className="menu-trigger"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <span className="menu-trigger__bar"></span>
              <span className="menu-trigger__bar"></span>
              <span className="menu-trigger__bar menu-trigger__bar--short"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav modal */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'mobile-menu-overlay--open' : ''}`} onClick={closeMenu}>
        <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <span className="mobile-menu-logo">Bárbara <span>Badaró</span></span>
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Fechar menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <nav className="mobile-menu-nav">
            <a href="#sobre" onClick={closeMenu}>
              <span className="mobile-menu-nav__num">01</span>Sobre
            </a>
            <a href="#abordagem" onClick={closeMenu}>
              <span className="mobile-menu-nav__num">02</span>Abordagem
            </a>
            <a href="#processo" onClick={closeMenu}>
              <span className="mobile-menu-nav__num">03</span>Como funciona
            </a>
            <a href="#depoimentos" onClick={closeMenu}>
              <span className="mobile-menu-nav__num">04</span>Depoimentos
            </a>
            <a href="#faq" onClick={closeMenu}>
              <span className="mobile-menu-nav__num">05</span>Dúvidas
            </a>
          </nav>
          <a href="#contato" className="mobile-menu-cta" onClick={closeMenu}>
            Agendar primeira sessão
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <main id="top" className="relative">
        {/* Animated Mesh Background Effects */}
        <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#B7C0C7]/40 rounded-full blur-[120px] pointer-events-none z-[0]"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#8C9381]/30 rounded-full blur-[120px] pointer-events-none z-[0]"></div>
        <div className="fixed top-[20%] right-[10%] w-[300px] h-[300px] bg-[#85866A]/20 rounded-full blur-[100px] pointer-events-none z-[0]"></div>

        <section className="hero">
          <div className="wrap hero-grid">
            <div className="animate-fade-in-up hero-eyebrow-row">
              <span className="eyebrow">Neuropsicologia · Terapia Cognitivo-Comportamental</span>
            </div>
            <div className="animate-fade-in-up hero-body-row">
              <h1>Um espaço para <em>organizar</em> o que pesa e seguir com mais clareza.</h1>
              <p className="lead">Atendimento individual para adultos, online e presencial, com foco em ansiedade, transições de vida e relacionamentos.</p>
              <div className="hero-actions">
                <a href="#contato" className="btn btn-primary">Agendar primeira sessão</a>
                <a href="#sobre" className="btn btn-ghost">Conhecer a abordagem</a>
              </div>
            </div>
            <div className="hero-visual">
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8C9381] to-[#B7C0C7] opacity-20 blur-3xl transform scale-110 rounded-full pointer-events-none"></div>

              <div className="hero-card-wrap">
                {/* Arched image card */}
                <div className="blob">
                  <img
                    src={heroImage}
                    alt="Retrato profissional da neuropsicóloga Bárbara Badaró"
                    className="blob-img"
                  />
                  <div className="blob-overlay"></div>
                </div>

                {/* Floating bottom-left info card */}
                <div className="hero-float-left">
                  <div className="hero-float-left__header">
                    <div>
                      <p className="hero-float-left__label">Modalidade</p>
                      <p className="hero-float-left__title">Online & Presencial</p>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(46,47,40,0.5)' }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="hero-float-left__body">
                    <div>
                      <p className="hero-float-left__info-label">CRP</p>
                      <p className="hero-float-left__info-val">06/000000</p>
                    </div>
                    <div>
                      <p className="hero-float-left__info-label">Sessão</p>
                      <p className="hero-float-left__info-val">30–45 min</p>
                    </div>
                  </div>
                  <div className="hero-float-left__bar"></div>
                </div>

                {/* Floating top-right status card */}
                <div className="hero-float-right">
                  <div className="hero-float-right__status">
                    <span className="hero-float-right__dot"></span>
                    <span>Agenda Aberta</span>
                  </div>
                  <p className="hero-float-right__label">Disponibilidade</p>
                  <p className="hero-float-right__val">Consulte horários</p>
                  <a href="https://wa.me/557382061011?text=Olá,%20Bárbara!%20Gostaria%20de%20verificar%20a%20disponibilidade%20de%20horários%20para%20uma%20consulta." className="hero-float-right__cta" target="_blank" rel="noopener noreferrer">Verificar</a>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <svg className="divider" viewBox="0 0 220 40">
          <path d="M0 20 C 25 20, 32 5, 55 5 C 78 5, 84 35, 107 35 C 130 35, 136 5, 159 5 C 182 5, 188 20, 220 20"/>
        </svg>

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
                    <path d="M12 21c-4-3-8-6-8-11a5 5 0 019-3 5 5 0 019 3c0 5-4 8-8 11z"/>
                  </svg>
                </div>
                <h3>Ansiedade</h3>
                <p>Ferramentas práticas para lidar com pensamentos acelerados, preocupação excessiva e crises de ansiedade.</p>
              </div>
              <div className="card reveal delay-2">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E6F58" strokeWidth="1.8">
                    <path d="M3 12h4l3 8 4-16 3 8h4"/>
                  </svg>
                </div>
                <h3>Transições de vida</h3>
                <p>Mudanças de carreira, luto, maternidade/paternidade e outros momentos que pedem reorganização.</p>
              </div>
              <div className="card reveal delay-3">
                <div className="icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6E6F58" strokeWidth="1.8">
                    <circle cx="9" cy="9" r="3"/>
                    <circle cx="17" cy="14" r="3"/>
                    <path d="M6 21c0-3 2-5 3-5M20 21c0-3-2-5-3-5"/>
                  </svg>
                </div>
                <h3>Relacionamentos</h3>
                <p>Padrões de vínculo, comunicação e limites — em relações familiares, afetivas e de trabalho.</p>
              </div>
            </div>
          </div>
        </section>

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
                <p>Você me chama por WhatsApp ou pelo formulário e contamos, em poucas palavras, o que te trouxe até aqui.</p>
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

        <svg className="divider" viewBox="0 0 220 40">
          <path d="M0 20 C 25 20, 32 5, 55 5 C 78 5, 84 35, 107 35 C 130 35, 136 5, 159 5 C 182 5, 188 20, 220 20"/>
        </svg>

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
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a href="#top" className="logo">Bárbara <span>Badaró</span></a>
              <p style={{ marginTop: '14px', color: 'var(--ink-soft)', fontSize: '14.5px', maxWidth: '280px' }}>Neuropsicóloga · Terapia Cognitivo-Comportamental para adultos.</p>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h4>Navegação</h4>
                <a href="#sobre">Sobre</a>
                <a href="#abordagem">Abordagem</a>
                <a href="#faq">Dúvidas</a>
              </div>
              <div className="footer-col">
                <h4>Contato</h4>
                <a href="https://wa.me/557382061011?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20agendamento%20de%20sess%C3%B5es." target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href="mailto:contato@barbarabadaro.com.br">contato@barbarabadaro.com.br</a>
              </div>
              <div className="footer-col">
                <h4>Redes Sociais</h4>
                <a href="https://instagram.com/barbarabadaro" target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} />
                  Instagram
                </a>
                <a href="https://threads.net/@barbarabadaro" target="_blank" rel="noopener noreferrer">
                  <ThreadsIcon size={18} />
                  Threads
                </a>
              </div>
            </div>
          </div>
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
