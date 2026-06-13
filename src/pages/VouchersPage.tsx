import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useData } from '../data/useData';
import { asset } from '../assets';

const voucherBaseNames: Record<string, string> = {
  'Liquidation Plus': 'Liquidation',
  'Glow Up Plus': 'Glow_Up',
  'Reroll Surplus Plus': 'Reroll_Surplus',
  'Crystal Ball Plus': 'Crystal_Ball',
  'Telescope Plus': 'Telescope',
  'Grabber Plus': 'Grabber',
  'Hone Plus': 'Hone',
  'Antimatter Plus': 'Antimatter',
};

function voucherImage(name: string): string {
  const filename = name.replace(/\s+/g, '_');
  return asset(`/images/vouchers/${filename}.png`);
}

function voucherImageFallback(name: string): string {
  const base = voucherBaseNames[name];
  if (base) return asset(`/images/vouchers/${base}.png`);
  return '';
}

function VoucherImg({ name }: { name: string }) {
  const [src, setSrc] = useState(voucherImage(name));
  return (
    <img
      src={src}
      alt={name}
      className="wiki-card-img"
      onError={(e) => {
        const fallback = voucherImageFallback(name);
        if (src !== fallback && fallback) {
          setSrc(fallback);
        } else {
          (e.target as HTMLImageElement).style.display = 'none';
        }
      }}
    />
  );
}

export default function VouchersPage() {
  const { t } = useI18n();
  const { vouchers } = useData();
  const baseVouchers = vouchers.filter((v) => v.pool === 'Vale');
  const plusVouchers = vouchers.filter((v) => v.pool === 'Vale+');

  return (
    <div>
      <div className="page-header">
        <div className="page-title">{t('page.vouchers.title')}</div>
        <div className="page-subtitle">{t('page.vouchers.subtitle')}</div>
      </div>

      <div className="home-section">
        <p>{t('vouchers.desc')}</p>
      </div>

      <div className="page-section" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '1px' }}>{t('vouchers.base')}</h3>
        <div className="card-grid">
          {baseVouchers.map((v) => (
            <div key={v.name} className="wiki-card">
              <div className="wiki-card-header">
                <VoucherImg name={v.name} />
                <div className="wiki-card-info">
                  <div className="card-name">{v.name}</div>
                  <div className="card-effect">{v.effect}</div>
                </div>
              </div>
              {v.flavor && <div className="card-flavor">{v.flavor}</div>}
              <div className="card-meta">
                {v.cost && <span><span className="meta-label">{t('common.coste')}:</span> <span className="meta-value">${v.cost}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h3 style={{ fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '12px', letterSpacing: '1px' }}>{t('vouchers.plus')}</h3>
        <div className="card-grid">
          {plusVouchers.map((v) => (
            <div key={v.name} className="wiki-card">
              <div className="wiki-card-header">
                <VoucherImg name={v.name} />
                <div className="wiki-card-info">
                  <div className="card-name">{v.name}</div>
                  <div className="card-effect">{v.effect}</div>
                </div>
              </div>
              {v.flavor && <div className="card-flavor">{v.flavor}</div>}
              <div className="card-meta">
                {v.cost && <span><span className="meta-label">{t('common.coste')}:</span> <span className="meta-value">${v.cost}</span></span>}
                {v.unlock && <span><span className="meta-label">{t('common.unlock')}:</span> <span className="meta-value">{v.unlock}</span></span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
