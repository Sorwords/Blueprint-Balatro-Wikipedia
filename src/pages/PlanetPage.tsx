import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

const handKeys: Record<string, string> = {
  Mercury: 'pair',
  Venus: 'two_pair',
  Earth: 'three',
  Mars: 'straight',
  Jupiter: 'flush',
  Saturn: 'full',
  Uranus: 'poker',
  Neptune: 'straight_flush',
  Pluto: 'royal',
  Ceres: 'five',
  Eris: 'flush_five',
  Xolotl: 'flush_house',
};

const baseChips: Record<string, number> = {
  Mercury: 60,
  Venus: 100,
  Earth: 140,
  Mars: 160,
  Jupiter: 180,
  Saturn: 200,
  Uranus: 240,
  Neptune: 260,
  Pluto: 280,
  Ceres: 320,
  Eris: 360,
  Xolotl: 400,
};

const baseMult: Record<string, number> = {
  Mercury: 6,
  Venus: 8,
  Earth: 10,
  Mars: 12,
  Jupiter: 14,
  Saturn: 16,
  Uranus: 18,
  Neptune: 20,
  Pluto: 22,
  Ceres: 24,
  Eris: 26,
  Xolotl: 28,
};

const planetImageOverrides: Record<string, string> = {
  Xolotl: 'Planet_X',
};

function planetImage(name: string): string {
  const override = planetImageOverrides[name];
  return `/images/planets/${override || name}.png`;
}

export default function PlanetPage() {
  const { t } = useI18n();
  const { planetCards } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.planets.title')}</div>
        <div className="page-subtitle">{t('page.planets.subtitle', { count: planetCards.length })}</div>
      </div>

      <div className="home-section">
        <p>{t('page.planets.desc')}</p>
      </div>

      <div className="card-grid">
        {planetCards.map((card) => {
          const handKey = handKeys[card.name];
          const hand = handKey ? t('calc.hands.' + handKey) : card.name;
          return (
            <div key={card.name} className="wiki-card">
              <div className="wiki-card-header">
                <img
                  src={planetImage(card.name)}
                  alt={card.name}
                  className="wiki-card-img"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="wiki-card-info">
                  <div className="card-name">{card.name}</div>
                  <div className="card-effect">
                    <strong>{t('page.planets.level_up')}</strong>: {hand}<br />
                    <strong>{t('page.planets.base_chips')}</strong>: {baseChips[card.name]} · <strong>{t('page.planets.base_mult')}</strong>: {baseMult[card.name]}
                  </div>
                </div>
              </div>
              <div className="card-effect">{card.effect}</div>
              {card.flavor && <div className="card-flavor">{card.flavor}</div>}
              <div className="card-meta">
                {card.cost && <span><span className="meta-label">{t('common.coste')}:</span> <span className="meta-value">${card.cost}</span></span>}
                {card.appearance && <span><span className="meta-label">{t('common.apariencia')}:</span> <span className="meta-value">{card.appearance}</span></span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
