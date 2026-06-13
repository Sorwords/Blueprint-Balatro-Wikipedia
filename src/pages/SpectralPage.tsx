import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';
import { asset } from '../assets';

const spectralImageOverrides: Record<string, string> = {
  Soul: 'The_Soul',
  'The Black Soul': 'The_Soul',
};

function spectralImage(name: string): string {
  const override = spectralImageOverrides[name];
  return asset(`/images/spectral/${override || name.replace(/\s+/g, '_')}.png`);
}

export default function SpectralPage() {
  const { t } = useI18n();
  const { spectralCards } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.spectral.title')}</div>
        <div className="page-subtitle">{t('page.spectral.subtitle', { count: spectralCards.length })}</div>
      </div>

      <div className="home-section">
        <p>{t('page.spectral.desc')}</p>
      </div>

      <div className="card-grid">
        {spectralCards.map((card) => (
          <div key={card.name} className={`wiki-card rarity-${card.rarity}`}>
            <div className="wiki-card-header">
              <img
                src={spectralImage(card.name)}
                alt={card.name}
                className="wiki-card-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="wiki-card-info">
                <div className="card-name">
                  {card.name}
                  <span className={`rarity-tag ${card.rarity}`}>{t('common.' + (card.rarity === 'common' ? 'comun' : card.rarity === 'uncommon' ? 'poco_comun' : card.rarity === 'rare' ? 'raro' : 'legendario'))}</span>
                </div>
                <div className="card-effect">{card.effect}</div>
              </div>
            </div>
            {card.flavor && <div className="card-flavor">{card.flavor}</div>}
            <div className="card-meta">
              {card.cost && <span><span className="meta-label">{t('common.coste')}:</span> <span className="meta-value">${card.cost}</span></span>}
              {card.type && <span><span className="meta-label">{t('common.tipo')}:</span> <span className="meta-value">{card.type}</span></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
