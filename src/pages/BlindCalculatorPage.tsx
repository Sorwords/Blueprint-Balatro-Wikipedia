import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

interface Stake {
  name: string;
  label: string;
  mult: number;
  hands: number;
  discards: number;
  handSize: number;
}

const stakes: Stake[] = [
  { name: 'white', label: 'White Stake', mult: 1.0, hands: 4, discards: 3, handSize: 8 },
  { name: 'red', label: 'Red Stake', mult: 1.1, hands: 3, discards: 3, handSize: 8 },
  { name: 'green', label: 'Green Stake', mult: 1.2, hands: 3, discards: 2, handSize: 8 },
  { name: 'black', label: 'Black Stake', mult: 1.3, hands: 3, discards: 2, handSize: 7 },
  { name: 'blue', label: 'Blue Stake', mult: 1.4, hands: 2, discards: 2, handSize: 7 },
  { name: 'purple', label: 'Purple Stake', mult: 1.5, hands: 2, discards: 1, handSize: 7 },
  { name: 'orange', label: 'Orange Stake', mult: 1.6, hands: 2, discards: 1, handSize: 6 },
  { name: 'gold', label: 'Gold Stake', mult: 1.7, hands: 2, discards: 1, handSize: 6 },
];

const blindScores: { ante: number; small: number; big: number; boss: number }[] = [
  { ante: 1, small: 100, big: 200, boss: 300 },
  { ante: 2, small: 300, big: 450, boss: 600 },
  { ante: 3, small: 800, big: 1200, boss: 1600 },
  { ante: 4, small: 2000, big: 3000, boss: 4000 },
  { ante: 5, small: 5000, big: 7500, boss: 10000 },
  { ante: 6, small: 11000, big: 16500, boss: 22000 },
  { ante: 7, small: 20000, big: 30000, boss: 40000 },
  { ante: 8, small: 35000, big: 52500, boss: 70000 },
  { ante: 9, small: 50000, big: 75000, boss: 100000 },
  { ante: 10, small: 110000, big: 165000, boss: 220000 },
  { ante: 11, small: 210000, big: 315000, boss: 420000 },
  { ante: 12, small: 360000, big: 540000, boss: 720000 },
];

function formatScore(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return n.toLocaleString();
  return n.toString();
}

function estimateHandsNeeded(score: number, avgPerHand: number): number {
  if (avgPerHand <= 0) return 99;
  return Math.ceil(score / avgPerHand);
}

export default function BlindCalculatorPage() {
  const [currentAnte, setCurrentAnte] = useState(1);
  const [stakeIdx, setStakeIdx] = useState(0);
  const [avgScore, setAvgScore] = useState('');
  const [showAll, setShowAll] = useState(false);

  const { t } = useI18n();
  const stake = stakes[stakeIdx];
  const avg = parseFloat(avgScore) || 0;

  const visibleBlinds = showAll ? blindScores : blindScores.filter(b => b.ante >= currentAnte && b.ante <= currentAnte + 2);

  const currentBlind = blindScores.find(b => b.ante === currentAnte);

  const handsNeededForBoss = currentBlind ? estimateHandsNeeded(Math.ceil(currentBlind.boss * stake.mult), avg) : 0;
  const canReach = handsNeededForBoss <= stake.hands;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.blindcalc.title')}</div>
        <div className="page-subtitle">{t('page.blindcalc.subtitle')}</div>
      </div>

      <div className="blind-calc-section">
        <div className="blind-calc-controls">
          <div className="blind-control-group">
            <label>{t('page.blindcalc.ante')}</label>
            <div className="blind-ante-selector">
              <button className="blind-ante-btn" onClick={() => setCurrentAnte(Math.max(1, currentAnte - 1))}>-</button>
              <span className="blind-ante-value">{currentAnte}</span>
              <button className="blind-ante-btn" onClick={() => setCurrentAnte(Math.min(12, currentAnte + 1))}>+</button>
            </div>
          </div>

          <div className="blind-control-group">
            <label>{t('page.blindcalc.difficulty')}</label>
            <select
              value={stakeIdx}
              onChange={(e) => setStakeIdx(Number(e.target.value))}
              className="blind-select"
            >
              {stakes.map((s, i) => (
                <option key={s.name} value={i}>{s.label}</option>
              ))}
            </select>
          </div>

          <div className="blind-control-group">
            <label>{t('page.blindcalc.avg')}</label>
            <input
              type="text"
              inputMode="numeric"
              value={avgScore}
              onChange={(e) => setAvgScore(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="Ej: 5000"
              className="blind-input"
            />
          </div>
        </div>

        <div className="blind-stake-info">
          <span>{t('page.blindcalc.hands')}: <strong>{stake.hands}</strong></span>
          <span>{t('page.blindcalc.discards')}: <strong>{stake.discards}</strong></span>
          <span>{t('page.blindcalc.handsize')}: <strong>{stake.handSize}</strong></span>
          <span>{t('page.blindcalc.multiplier')}: <strong>x{stake.mult}</strong></span>
        </div>

        <div className="blind-table-wrapper">
          <table className="blind-table">
            <thead>
              <tr>
                <th>Ante</th>
                <th>{t('page.blindcalc.small')}</th>
                <th>{t('page.blindcalc.big')}</th>
                <th>{t('page.blindcalc.boss')}</th>
                {avg > 0 && <th>{t('page.blindcalc.handsneeded')}</th>}
              </tr>
            </thead>
            <tbody>
              {visibleBlinds.map(b => {
                const sb = Math.ceil(b.small * stake.mult);
                const bb = Math.ceil(b.big * stake.mult);
                const boss = Math.ceil(b.boss * stake.mult);
                const hands = estimateHandsNeeded(boss, avg);
                const isCurrent = b.ante === currentAnte;
                return (
                  <tr key={b.ante} className={isCurrent ? 'blind-row-current' : ''}>
                    <td className="blind-ante-cell">{b.ante}</td>
                    <td className="blind-score-cell">{formatScore(sb)}</td>
                    <td className="blind-score-cell">{formatScore(bb)}</td>
                    <td className="blind-score-cell blind-boss-cell">{formatScore(boss)}</td>
                    {avg > 0 && (
                      <td className={`blind-hands-cell ${hands <= stake.hands ? 'blind-reachable' : 'blind-unreachable'}`}>
                        {hands} {hands <= stake.hands ? '✓' : '✗'}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="blind-toggle-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? t('page.blindcalc.shownear') : t('page.blindcalc.showall')}
          </button>
        </div>

        {avg > 0 && currentBlind && (
          <div className={`blind-estimate ${canReach ? 'reachable' : 'unreachable'}`}>
            <div className="blind-estimate-icon">{canReach ? '✓' : '✗'}</div>
            <div className="blind-estimate-text">
              {canReach ? t('page.blindcalc.canreach', { ante: currentAnte, needed: handsNeededForBoss, available: stake.hands }) : t('page.blindcalc.cantreach', { ante: currentAnte, needed: handsNeededForBoss, available: stake.hands })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
