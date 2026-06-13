import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

type Page = 'home' | 'jokers' | 'tarot' | 'planets' | 'spectral' | 'vouchers' | 'blinds' | 'enhancements' | 'editions' | 'calculator';

interface HomePageProps {
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

const featured = [
  { name: 'Triboulet', img: '/images/Triboulet.png' },
  { name: 'Perkeo', img: '/images/Perkeo.png' },
  { name: 'Canio', img: '/images/Canio.png' },
  { name: 'Yorick', img: '/images/Yorick.png' },
  { name: 'Chicot', img: '/images/Chicot.png' },
  { name: 'Joker', img: '/images/Joker.png' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useI18n();
  const { categories } = useData();
  return (
    <div>
      <div style={{
        background: 'linear-gradient(180deg, rgba(249,209,102,0.08) 0%, transparent 100%)',
        borderRadius: '4px',
        border: '1px solid var(--border-gold)',
        padding: '32px',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        <img src="/images/logo.png" alt="Balatro" style={{ maxWidth: '320px', height: 'auto', marginBottom: '12px', imageRendering: 'auto' }} />
        <div className="page-subtitle" style={{ fontSize: '0.7rem' }}>
          {t('home.subtitle')}
        </div>
      </div>

      <div className="home-section">
        <h2>{t('home.featured')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginBottom: '8px' }}>
          {featured.map((j) => (
            <div key={j.name} style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '12px',
              textAlign: 'center',
            }}>
              <img src={j.img} alt={j.name} style={{ width: '60px', height: '80px', objectFit: 'contain', marginBottom: '6px', background: '#0a0a0a', borderRadius: '2px' }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>{j.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h2>{t('home.whatis')}</h2>
        <p>{t('home.modes.balatro.desc')}</p>
        <p>{t('home.modes.balatro.desc2')}</p>
      </div>

      <div className="home-section">
        <h2>{t('home.categories')}</h2>
        <div className="home-categories">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => onNavigate(pageMap[cat.id])}
            >
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="category-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <div className="category-icon">◈</div>
              )}
              <div className="category-name">{cat.name}</div>
              <div className="category-count">{cat.count} {t('home.cards')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-section">
        <h2>{t('home.tips')}</h2>
        <div className="stat-block">
          <div className="stat-item">
            <div className="stat-label">{t('home.tips.jokers')}</div>
            <div className="stat-value">{t('home.tips.jokers.desc')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('home.tips.economy')}</div>
            <div className="stat-value">{t('home.tips.economy.desc')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('home.tips.tarot')}</div>
            <div className="stat-value">{t('home.tips.tarot.desc')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('home.tips.planets')}</div>
            <div className="stat-value">{t('home.tips.planets.desc')}</div>
          </div>
        </div>
      </div>

      <div className="home-section">
        <h2>{t('home.modes')}</h2>
        <div className="card-grid">
          <div className="wiki-card">
            <div className="card-name">{t('home.modes.white')} <span className="rarity-tag common">{t('home.modes.normal')}</span></div>
            <div className="card-effect">{t('home.modes.white.desc')}</div>
          </div>
          <div className="wiki-card">
            <div className="card-name">{t('home.modes.red')} <span className="rarity-tag uncommon">{t('home.modes.dificil')}</span></div>
            <div className="card-effect">{t('home.modes.red.desc')}</div>
          </div>
          <div className="wiki-card">
            <div className="card-name">{t('home.modes.green')} <span className="rarity-tag rare">{t('home.modes.dificilplus')}</span></div>
            <div className="card-effect">{t('home.modes.green.desc')}</div>
          </div>
          <div className="wiki-card">
            <div className="card-name">{t('home.modes.black')} <span className="rarity-tag legendary">{t('home.modes.experto')}</span></div>
            <div className="card-effect">{t('home.modes.black.desc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
