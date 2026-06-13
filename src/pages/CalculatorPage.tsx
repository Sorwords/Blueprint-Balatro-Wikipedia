import { useI18n } from '../i18n/I18nContext';
import Calculator from '../components/Calculator';

export default function CalculatorPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.calculator.title')}</div>
        <div className="page-subtitle">{t('page.calculator.subtitle')}</div>
      </div>

      <Calculator />

      <div className="home-section">
        <h2>{t('calc.howto.title')}</h2>
        <p>
          <strong>{t('calc.howto.chips')}:</strong> {t('calc.howto.chips.desc')}
        </p>
        <p>
          <strong>{t('calc.howto.card_chips')}:</strong> {t('calc.howto.card_chips.desc')}
        </p>
        <p>
          <strong>{t('calc.howto.mult_base')}:</strong> {t('calc.howto.mult_base.desc')}
        </p>
        <p>
          <strong>{t('calc.howto.mult_add')}:</strong> {t('calc.howto.mult_add.desc')}
        </p>
        <p>
          <strong>{t('calc.howto.xmult')}:</strong> {t('calc.howto.xmult.desc')}
        </p>
      </div>

      <div className="home-section">
        <h2>{t('calc.hands')}</h2>
        <div className="stat-block">
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.pair')}</div>
            <div className="stat-value">10 {t('calc.fichas')} × 2 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.two_pair')}</div>
            <div className="stat-value">20 {t('calc.fichas')} × 2 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.three')}</div>
            <div className="stat-value">30 {t('calc.fichas')} × 3 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.straight')}</div>
            <div className="stat-value">30 {t('calc.fichas')} × 4 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.flush')}</div>
            <div className="stat-value">35 {t('calc.fichas')} × 4 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.full')}</div>
            <div className="stat-value">40 {t('calc.fichas')} × 4 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.poker')}</div>
            <div className="stat-value">60 {t('calc.fichas')} × 7 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.straight_flush')}</div>
            <div className="stat-value">100 {t('calc.fichas')} × 8 {t('calc.mult_corto')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">{t('calc.hands.five')}</div>
            <div className="stat-value">120 {t('calc.fichas')} × 12 {t('calc.mult_corto')}</div>
          </div>
        </div>
      </div>

      <div className="home-section">
        <h2>{t('calc.card_info')}</h2>
        <p>{t('calc.card_info.desc')}</p>
      </div>
    </div>
  );
}
