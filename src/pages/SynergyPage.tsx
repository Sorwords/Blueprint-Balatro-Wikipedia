import { useState, useMemo } from 'react';
import { useData } from '../data/useData';
import { analyzeSynergy } from '../data/synergy';
import { useI18n } from '../i18n/I18nContext';

const MAX_SELECTED = 5;

function jokerImageUrl(name: string, image?: string): string {
  if (image) return `/images/${image}`;
  const filename = name.replace(/\s+/g, '_').replace(/['']/g, '');
  return `/images/${filename}.png`;
}

export default function SynergyPage() {
  const { t } = useI18n();
  const { jokers } = useData();
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const result = useMemo(() => analyzeSynergy(selected, jokers), [selected]);

  const toggleJoker = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) :
      prev.length >= MAX_SELECTED ? prev : [...prev, name]
    );
  };

  const selectable = jokers.filter(j => !selected.includes(j.name) && (search === '' || j.name.toLowerCase().includes(search.toLowerCase()) || j.effect.toLowerCase().includes(search.toLowerCase())));

  const archetypeLabel = (tag: string): string => {
    const map: Record<string, string> = {
      economy: 'synergy.economy',
      mult_add: 'synergy.mult_add',
      chip_add: 'synergy.chip_add',
      x_mult: 'synergy.x_mult',
      scaling_mult: 'synergy.scaling_mult',
      scaling_chip: 'synergy.scaling_chip',
      scaling_xmult: 'synergy.scaling_xmult',
      face_synergy: 'synergy.face',
      number_synergy: 'synergy.number',
      ace_synergy: 'synergy.ace',
      suit_synergy: 'synergy.suit',
      retrigger: 'synergy.retrigger',
      held_in_hand: 'synergy.held',
      deck_manip: 'synergy.deck',
      discard_synergy: 'synergy.discard',
      hand_size: 'synergy.hand_size',
      boss_anti: 'synergy.boss',
      glass_synergy: 'synergy.glass',
      steel_synergy: 'synergy.steel',
      stone_synergy: 'synergy.stone',
      gold_synergy: 'synergy.gold',
      lucky_synergy: 'synergy.lucky',
    };
    return t(map[tag] || tag);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.sinergy.title')}</div>
        <div className="page-subtitle">
          {t('page.sinergy.subtitle', { max: MAX_SELECTED })}
        </div>
      </div>

      <div className="synergy-layout">
        <div className="synergy-selector">
          <h3>{t('page.sinergy.select')}</h3>
          <div className="synergy-selected">
            {Array.from({ length: MAX_SELECTED }).map((_, i) => {
              const jokerName = selected[i];
              const joker = jokerName ? jokers.find(j => j.name === jokerName) : null;
              return (
                <div
                  key={i}
                  className={`synergy-slot ${joker ? 'filled' : ''}`}
                  onClick={() => jokerName && toggleJoker(jokerName)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && jokerName && toggleJoker(jokerName)}
                >
                  {joker ? (
                    <>
                      <img src={jokerImageUrl(joker.name, joker.image)} alt={joker.name} className="synergy-slot-img" />
                      <span className="synergy-slot-name">{joker.name}</span>
                    </>
                  ) : (
                    <span className="synergy-slot-empty">+</span>
                  )}
                </div>
              );
            })}
          </div>

          <input
            className="search-bar"
            placeholder={t('page.sinergy.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="synergy-list">
            {selectable.map(j => (
              <div key={j.name} className="synergy-item" onClick={() => toggleJoker(j.name)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleJoker(j.name)}>
                <img src={jokerImageUrl(j.name, j.image)} alt={j.name} className="synergy-item-img" />
                <div className="synergy-item-info">
                  <div className="synergy-item-name">{j.name}</div>
                  <div className="synergy-item-effect">{j.effect}</div>
                </div>
              </div>
            ))}
            {selectable.length === 0 && search && (
              <div style={{ color: 'var(--text-dim)', fontSize: '0.65rem', padding: '20px', textAlign: 'center' }}>
                {t('page.jokers.noresults')}
              </div>
            )}
          </div>
        </div>

        <div className="synergy-results">
          {selected.length === 0 ? (
            <div className="synergy-empty">
              <div className="synergy-empty-icon">◈</div>
              <div className="synergy-empty-text">{t('page.sinergy.empty')}</div>
              <div className="synergy-empty-sub">{t('page.sinergy.emptysub', { max: MAX_SELECTED })}</div>
            </div>
          ) : (
            <>
              <div className="synergy-coverage">
                <h3>{t('page.sinergy.coverage')}</h3>
                <div className="synergy-tags">
                  {result.coverage.map(tag => (
                    <span key={tag} className="synergy-tag">{archetypeLabel(tag.replace(/ /g, '_'))}</span>
                  ))}
                </div>
                {!result.coverage.some(c => c.includes('mult')) && (
                  <div className="synergy-warning">{t('page.sinergy.nomult')}</div>
                )}
                {!result.coverage.some(c => c.includes('chip')) && (
                  <div className="synergy-warning">{t('page.sinergy.nochip')}</div>
                )}
                {!result.coverage.some(c => c.includes('x_mult') || c.includes('xmult')) && (
                  <div className="synergy-warning">{t('page.sinergy.noxmult')}</div>
                )}
              </div>

              <div className="synergy-recommended">
                <h3>{t('page.sinergy.recommended')} ({result.recommended.length})</h3>
                <div className="synergy-rec-list">
                  {result.recommended.map(j => (
                    <div key={j.name} className="synergy-rec-item" onClick={() => toggleJoker(j.name)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && toggleJoker(j.name)}>
                      <img src={jokerImageUrl(j.name)} alt={j.name} className="synergy-rec-img" />
                      <div className="synergy-rec-info">
                        <div className="synergy-rec-name">{j.name}</div>
                        <div className="synergy-rec-reason">{t(j.reason)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {result.avoid.length > 0 && (
                <div className="synergy-avoid">
                  <h3>{t('page.sinergy.avoid')} ({result.avoid.length})</h3>
                  <div className="synergy-avoid-list">
                    {result.avoid.map(j => (
                      <div key={j.name} className="synergy-avoid-item">
                        <img src={jokerImageUrl(j.name)} alt={j.name} className="synergy-rec-img" />
                        <div className="synergy-rec-info">
                          <div className="synergy-rec-name">{j.name}</div>
                          <div className="synergy-rec-reason">{t(j.reason)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
