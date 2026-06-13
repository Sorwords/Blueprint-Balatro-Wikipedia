import { useI18n } from '../i18n/I18nContext';
import * as es from './wikidata';
import * as en from './wikidata_en';
import { achievements as esAchievements } from './achievements';
import { achievements as enAchievements } from './achievements_en';

export function useData() {
  const { lang } = useI18n();
  return {
    ...(lang === 'en' ? en : es),
    achievements: lang === 'en' ? enAchievements : esAchievements,
  };
}
