import { useState, useEffect } from 'react';
import { useI18n } from '../i18n/I18nContext';

interface Score {
  chips: number;
  mult: number;
  xMult: number;
  total: number;
}

const STORAGE_KEY = 'balatro-calc-history';

export default function Calculator() {
  const { t } = useI18n();
  const [handChips, setHandChips] = useState(60);
  const [handMult, setHandMult] = useState(6);
  const [cardChips, setCardChips] = useState(0);
  const [addMult, setAddMult] = useState(0);
  const [xMult, setXMult] = useState(1);
  const [planetLevel, setPlanetLevel] = useState(1);
  const [score, setScore] = useState<Score>({ chips: 0, mult: 0, xMult: 0, total: 0 });
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const calculate = () => {
    const levelBonusChips = (planetLevel - 1) * 15;
    const levelBonusMult = (planetLevel - 1) * 1;
    const totalChips = handChips + levelBonusChips + cardChips;
    const totalAddMult = handMult + levelBonusMult + addMult;
    const result = totalChips * totalAddMult * xMult;
    const newScore = { chips: totalChips, mult: totalAddMult, xMult, total: result };
    setScore(newScore);

    const entry = `${totalChips}c × ${totalAddMult}m × ${xMult}x = ${result.toLocaleString()}`;
    const newHistory = [entry, ...history].slice(0, 10);
    setHistory(newHistory);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory)); } catch {}
  };

  const loadHistory = (entry: string) => {
    const match = entry.match(/(\d+)c.*?(\d+)m.*?([\d.]+)x/);
    if (match) {
      setHandChips(parseInt(match[1]));
      setAddMult(parseInt(match[2]) - handMult);
      setXMult(parseFloat(match[3]));
    }
  };

  const reset = () => {
    setHandChips(60);
    setHandMult(6);
    setCardChips(0);
    setAddMult(0);
    setXMult(1);
    setPlanetLevel(1);
    setScore({ chips: 0, mult: 0, xMult: 0, total: 0 });
  };

  return (
    <div className="calculator-section">
      <div className="calculator-header">
        <h2>{t('page.calculator.title')}</h2>
        <p>{t('calc.formula')}</p>
      </div>

      <div className="calculator-grid">
        <div className="calc-column">
          <h3>{t('calc.chips')}</h3>
          <div className="calc-row">
            <label>{t('calc.hand_base')}</label>
            <input type="number" value={handChips} onChange={(e) => setHandChips(Math.max(0, +e.target.value))} />
          </div>
          <div className="calc-row">
            <label>{t('calc.card_chips')}</label>
            <input type="number" value={cardChips} onChange={(e) => setCardChips(Math.max(0, +e.target.value))} />
          </div>
          <div className="calc-row">
            <label>{t('calc.planet_level')}</label>
            <input type="number" min="1" value={planetLevel} onChange={(e) => setPlanetLevel(Math.max(1, +e.target.value))} />
          </div>
        </div>

        <div className="calc-column">
          <h3>{t('calc.mult')}</h3>
          <div className="calc-row">
            <label>{t('calc.mult_base')}</label>
            <input type="number" value={handMult} onChange={(e) => setHandMult(Math.max(0, +e.target.value))} />
          </div>
          <div className="calc-row">
            <label>{t('calc.mult_add')}</label>
            <input type="number" value={addMult} onChange={(e) => setAddMult(Math.max(0, +e.target.value))} />
          </div>
          <div className="calc-row">
            <label>{t('calc.xmult')}</label>
            <input type="number" step="0.1" value={xMult} onChange={(e) => setXMult(Math.max(0, +e.target.value))} />
          </div>
        </div>
      </div>

      <div className="calc-buttons">
        <button className="calc-btn-primary" onClick={calculate}>
          {t('calc.calculate')}
        </button>
        <button className="calc-btn-reset" onClick={reset}>
          {t('calc.reset')}
        </button>
      </div>

      <div className="calc-result">
        <div className="result-line">{t('calc.result_chips')}: {score.chips} × {t('calc.result_mult')}: {score.mult} × {score.xMult}x</div>
        <div className="result-score">
          {score.total > 0 ? `${score.total.toLocaleString()}` : '—'}
        </div>
      </div>

      {history.length > 0 && (
        <div className="calc-recent">
          {history.map((entry, i) => (
            <button key={i} className="calc-recent-btn" onClick={() => loadHistory(entry)} title={t('calc.load')}>
              {entry}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
