import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';
import { asset } from '../assets';

function blindImage(name: string): string {
  return asset(`/images/blinds/${name.replace(/\s+/g, '_')}.gif`);
}

export default function BlindsPage() {
  const { t } = useI18n();
  const { blinds } = useData();
  const normals = blinds.filter((b) => b.type === 'Ciega Normal');
  const bosses = blinds.filter((b) => b.type === 'Jefe Ciego');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.blinds.title')}</div>
        <div className="page-subtitle">{t('page.blinds.subtitle')}</div>
      </div>

      <div className="home-section">
        <p>{t('page.blinds.desc')}</p>
      </div>

      <div className="page-section" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '1px' }}>{t('blinds.normal')}</h3>
        <div className="card-grid">
          {normals.map((b) => (
            <div key={b.name} className="wiki-card">
              <div className="wiki-card-header">
                <img
                  src={blindImage(b.name)}
                  alt={b.name}
                  className="wiki-card-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="wiki-card-info">
                  <div className="card-name">{b.name}</div>
                  <div className="card-effect">{b.effect}</div>
                </div>
              </div>
              {b.flavor && <div className="card-flavor">{b.flavor}</div>}
              <div className="card-meta">
                {b.pool && <span><span className="meta-label">{t('common.disponible')}:</span> <span className="meta-value">{b.pool}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h3 style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '1px' }}>{t('blinds.boss')}</h3>
        <div className="card-grid">
          {bosses.map((b) => (
            <div key={b.name} className="wiki-card">
              <div className="wiki-card-header">
                <img
                  src={blindImage(b.name)}
                  alt={b.name}
                  className="wiki-card-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="wiki-card-info">
                  <div className="card-name">{b.name}</div>
                  <div className="card-effect">{b.effect}</div>
                </div>
              </div>
              {b.flavor && <div className="card-flavor">{b.flavor}</div>}
              <div className="card-meta">
                {b.pool && <span><span className="meta-label">{t('common.aparece')}:</span> <span className="meta-value">{b.pool}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
