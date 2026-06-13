import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

const rarities = ['all', 'common', 'uncommon', 'rare', 'legendary'] as const;

function jokerImageUrl(joker: { image?: string; name: string }): string {
  if (joker.image) return `/images/${joker.image}`;
  const filename = joker.name.replace(/\s+/g, '_').replace(/['']/g, '');
  return `/images/${filename}.png`;
}

export default function JokersPage() {
  const { t } = useI18n();
  const { jokers } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'common' | 'uncommon' | 'rare' | 'legendary'>('all');

  const filtered = jokers.filter((j) => {
    if (filter !== 'all' && j.rarity !== filter) return false;
    if (search && !j.name.toLowerCase().includes(search.toLowerCase()) && !j.effect.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    common: jokers.filter((j) => j.rarity === 'common').length,
    uncommon: jokers.filter((j) => j.rarity === 'uncommon').length,
    rare: jokers.filter((j) => j.rarity === 'rare').length,
    legendary: jokers.filter((j) => j.rarity === 'legendary').length,
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.jokers.title')}</div>
        <div className="page-subtitle">{t('page.jokers.subtitle') + ' — ' + jokers.length + ' ' + t('page.jokers.total')}</div>
      </div>

      <div className="rarity-bar">
        <span>{t('jokers.rarity')}</span>
        <div className="bar">
          <div className="bar-fill common" style={{ width: `${(counts.common / jokers.length) * 100}%` }} />
          <div className="bar-fill uncommon" style={{ width: `${(counts.uncommon / jokers.length) * 100}%` }} />
          <div className="bar-fill rare" style={{ width: `${(counts.rare / jokers.length) * 100}%` }} />
          <div className="bar-fill legendary" style={{ width: `${(counts.legendary / jokers.length) * 100}%` }} />
        </div>
        <span>{t('common.comun')} {counts.common} · {t('common.poco_comun')} {counts.uncommon} · {t('common.raro')} {counts.rare} · {t('common.legendario')} {counts.legendary}</span>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom: '24px', alignItems: 'center' }}>
        <input
          className="search-bar"
          style={{ margin: 0, flex: 1 }}
          placeholder={t('page.jokers.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            padding: '12px 14px',
            fontFamily: 'var(--font-main)',
            fontSize: '0.7rem',
          }}
        >
          {rarities.map((r) => {
            const rarityKey = r === 'common' ? 'comun' : r === 'uncommon' ? 'poco_comun' : r === 'rare' ? 'raro' : 'legendario';
            return (
              <option key={r} value={r}>
                {r === 'all' ? t('page.jokers.todos') : t('common.' + rarityKey)}
              </option>
            );
          })}
        </select>
      </div>

      <div className="card-grid">
        {filtered.map((joker) => (
          <div key={joker.name} className={`wiki-card rarity-${joker.rarity}`}>
            <div className="wiki-card-header">
              <img
                src={jokerImageUrl(joker)}
                alt={joker.name}
                className="wiki-card-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="wiki-card-info">
                <div className="card-name">
                  {joker.name}
                  <span className={`rarity-tag ${joker.rarity}`}>{t('common.' + (joker.rarity === 'common' ? 'comun' : joker.rarity === 'uncommon' ? 'poco_comun' : joker.rarity === 'rare' ? 'raro' : 'legendario'))}</span>
                </div>
                <div className="card-effect">{joker.effect}</div>
              </div>
            </div>
            {joker.flavor && <div className="card-flavor">{joker.flavor}</div>}
            <div className="card-meta">
              {joker.cost && <span><span className="meta-label">{t('common.coste')}:</span> <span className="meta-value">${joker.cost}</span></span>}
              {joker.pool && <span><span className="meta-label">{t('common.pool')}:</span> <span className="meta-value">{joker.pool}</span></span>}
              {joker.unlock && <span><span className="meta-label">{t('common.unlock')}:</span> <span className="meta-value">{joker.unlock}</span></span>}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.7rem', padding: '60px' }}>
          {t('page.jokers.noresults')}
        </div>
      )}
    </div>
  );
}
