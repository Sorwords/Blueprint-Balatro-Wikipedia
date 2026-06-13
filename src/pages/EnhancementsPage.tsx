import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

function enhancementImage(name: string): string {
  return `/images/enhancements/${name}.png`;
}

export default function EnhancementsPage() {
  const { t } = useI18n();
  const { enhancements } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.enhancements.title')}</div>
        <div className="page-subtitle">{t('page.enhancements.subtitle')}</div>
      </div>

      <div className="home-section">
        <p>{t('page.enhancements.desc')}</p>
      </div>

      <div className="card-grid">
        {enhancements.map((e) => (
          <div key={e.name} className="wiki-card">
            <div className="wiki-card-header">
              <img
                src={enhancementImage(e.name)}
                alt={e.name}
                className="wiki-card-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="wiki-card-info">
                <div className="card-name">{e.name}</div>
                <div className="card-effect">{e.effect}</div>
              </div>
            </div>
            {e.flavor && <div className="card-flavor">{e.flavor}</div>}
            <div className="card-meta">
              {e.type && <span><span className="meta-label">{t('common.tipo')}:</span> <span className="meta-value">{e.type}</span></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
