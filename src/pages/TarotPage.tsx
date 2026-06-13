import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

function tarotImage(name: string): string {
  return `/images/tarot/${name.replace(/\s+/g, '_')}.png`;
}

export default function TarotPage() {
  const { t } = useI18n();
  const { tarotCards } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.tarot.title')}</div>
        <div className="page-subtitle">{t('page.tarot.subtitle', { count: tarotCards.length })}</div>
      </div>

      <div className="home-section">
        <p>{t('page.tarot.desc')}</p>
      </div>

      <div className="card-grid">
        {tarotCards.map((card) => (
          <div key={card.name} className="wiki-card">
            <div className="wiki-card-header">
              <img
                src={tarotImage(card.name)}
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
