import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';

export default function AchievementsPage() {
  const { t } = useI18n();
  const { achievements } = useData();
  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.achievements.title')}</div>
        <div className="page-subtitle">{achievements.length} {t('page.achievements.subtitle')}</div>
      </div>

      <div className="home-section">
        <p>{t('page.achievements.desc')}</p>
      </div>

      <div className="card-grid">
        {achievements.map((a) => (
          <div key={a.name} className="wiki-card">
            <div className="wiki-card-header">
              <div style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                flexShrink: 0,
                background: 'linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 100%)',
                color: '#000',
                fontSize: '1.4rem',
              }}>
                ★
              </div>
              <div className="wiki-card-info">
                <div className="card-name">{a.name}</div>
                <div className="card-effect">{a.description}</div>
              </div>
            </div>
            <div className="card-meta" style={{ paddingLeft: '76px' }}>
              <span><span className="meta-label">{t('common.unlock')}:</span> <span className="meta-value">{a.unlock}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
