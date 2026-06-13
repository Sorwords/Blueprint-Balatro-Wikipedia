import { useData } from '../data/useData';
import { useI18n } from '../i18n/I18nContext';

type Page = 'home' | 'jokers' | 'tarot' | 'planets' | 'spectral' | 'vouchers' | 'blinds' | 'enhancements' | 'editions' | 'calculator' | 'achievements' | 'synergy' | 'blindcalc';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const pageMap: Record<string, Page> = {
  jokers: 'jokers',
  tarot: 'tarot',
  planets: 'planets',
  spectral: 'spectral',
  vouchers: 'vouchers',
  blinds: 'blinds',
  enhancements: 'enhancements',
  editions: 'editions',
};

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { t, lang, setLang } = useI18n();
  const { categories } = useData();
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src="/images/logo.png" alt="Balatro" className="sidebar-logo-img" />
        <div className="sidebar-subtitle">Wiki &mdash; {t('nav.enciclopedia')}</div>
      </div>

      <div className="sidebar-section-title">{t('nav.categorias')}</div>

      <div
        className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('home')}
      >
        <span className="nav-icon" style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>⌂</span>
        {t('nav.inicio')}
      </div>

      {categories.map((cat) => {
        const page = pageMap[cat.id];
        return (
          <div
            key={cat.id}
            className={`nav-link ${currentPage === page ? 'active' : ''}`}
            onClick={() => onNavigate(page)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate(page)}
          >
            {cat.image ? (
              <img src={cat.image} alt="" className="nav-img" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            ) : (
              <span className="nav-icon" style={{ fontSize: '0.8rem', color: 'var(--gold-dim)' }}>◈</span>
            )}
            {t(`nav.${cat.id}` as any)}
          </div>
        );
      })}

      <div
        className={`nav-link ${currentPage === 'achievements' ? 'active' : ''}`}
        onClick={() => onNavigate('achievements')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('achievements')}
      >
        <span className="nav-icon" style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>★</span>
        {t('nav.logros')}
      </div>

      <div className="sidebar-section-title">{t('nav.herramientas')}</div>
      <div
        className={`nav-link ${currentPage === 'calculator' ? 'active' : ''}`}
        onClick={() => onNavigate('calculator')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('calculator')}
      >
        <span className="nav-icon" style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>∑</span>
        {t('nav.calculadora')}
      </div>
      <div
        className={`nav-link ${currentPage === 'synergy' ? 'active' : ''}`}
        onClick={() => onNavigate('synergy')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('synergy')}
      >
        <span className="nav-icon" style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>⊕</span>
        {t('nav.sinergy')}
      </div>
      <div
        className={`nav-link ${currentPage === 'blindcalc' ? 'active' : ''}`}
        onClick={() => onNavigate('blindcalc')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onNavigate('blindcalc')}
      >
        <span className="nav-icon" style={{ fontSize: '0.9rem', color: 'var(--gold-dim)' }}>⚑</span>
        {t('nav.blindcalc')}
      </div>

      <div className="sidebar-lang-toggle">
        <button
          className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
          onClick={() => setLang('es')}
        >
          ES
        </button>
        <button
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>
    </nav>
  );
}
