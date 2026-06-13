import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';
import { asset } from '../assets';

function editionImage(name: string): string {
  return asset(`/images/editions/${name}.png`);
}

export default function EditionsPage() {
  const { t } = useI18n();
  const { editions } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.editions.title')}</div>
        <div className="page-subtitle">{t('page.editions.subtitle')}</div>
      </div>

      <div className="home-section">
        <p>{t('page.editions.desc')}</p>
      </div>

      <div className="card-grid">
        {editions.map((e) => (
          <div key={e.name} className={`wiki-card rarity-${e.rarity}`}>
            <div className="wiki-card-header">
              <img
                src={editionImage(e.name)}
                alt={e.name}
                className="wiki-card-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="wiki-card-info">
                <div className="card-name">
                  {e.name}
                  <span className={`rarity-tag ${e.rarity}`}>{t('common.' + (e.rarity === 'common' ? 'comun' : e.rarity === 'uncommon' ? 'poco_comun' : e.rarity === 'rare' ? 'raro' : 'legendario'))}</span>
                </div>
                <div className="card-effect">{e.effect}</div>
              </div>
            </div>
            {e.flavor && <div className="card-flavor">{e.flavor}</div>}
            <div className="card-meta">
              {e.type && <span><span className="meta-label">{t('common.tipo')}:</span> <span className="meta-value">{e.type}</span></span>}
              {e.appearance && <span><span className="meta-label">{t('common.apariencia')}:</span> <span className="meta-value">{e.appearance}</span></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
