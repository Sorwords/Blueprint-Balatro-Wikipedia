export type SynergyTag =
  | 'mult_add' | 'chip_add' | 'x_mult'
  | 'scaling_mult' | 'scaling_chip' | 'scaling_xmult'
  | 'economy'
  | 'face_synergy' | 'number_synergy' | 'ace_synergy'
  | 'suit_synergy' | 'flush_support' | 'straight_support' | 'full_house_support'
  | 'pair_support' | 'three_kind_support' | 'poker_support'
  | 'high_card_support'
  | 'retrigger' | 'held_in_hand'
  | 'deck_manip' | 'consumable_gen' | 'planet_gen'
  | 'discard_synergy' | 'hand_size'
  | 'joker_copy' | 'joker_gen'
  | 'boss_anti'
  | 'glass_synergy' | 'steel_synergy' | 'stone_synergy' | 'gold_synergy' | 'lucky_synergy'
  | 'tarot_synergy' | 'planet_synergy'
  | 'chip_per_card' | 'mult_per_card';

function classifyEffect(effect: string, _name: string): SynergyTag[] {
  const tags: SynergyTag[] = [];
  const e = effect.toLowerCase();

  const hasMult = (s: string) => /\bmult\b/i.test(s);
  const hasChips = (s: string) => /\bchips?\b/i.test(s) || /\bfichas?\b/i.test(s);

  if (/^\+\d+\s*mult/i.test(effect) && !/card|cartas? de|when scored|al puntuar|hand|mano/.test(e)) {
    tags.push('mult_add');
  }
  if (/^\+\d+\s*(chips|fichas)/i.test(effect) && !/card|cartas? de|when scored|al puntuar/.test(e)) {
    tags.push('chip_add');
  }
  if (/\+\d+[a-z\s]*(mult|chips|fichas)/i.test(effect) && (/\beach\b/.test(e) || /\bb?y\b/.test(e) || /gains?|gana/i.test(e) || /per\s*(hand|mano|round|ronda|discard|descarte|reroll|resurtido)/.test(e))) {
    if (hasMult(e)) tags.push('scaling_mult');
    if (hasChips(e)) tags.push('scaling_chip');
  }
  if ((/x[\d.]+/.test(effect) || /x\d/.test(e)) && !/upgrade|mejora/.test(e) && !/give.*to|da.*a/i.test(e)) {
    tags.push('x_mult');
  }
  if (/gains?\s*x|gana\s*x/i.test(e) || /gains?\s+x/i.test(e)) {
    tags.push('scaling_xmult');
  }
  if (/\$\d/.test(e) || /\$/.test(e) || /dinero|money|debt|deuda/.test(e)) {
    tags.push('economy');
  }
  if (/figura|face|rey|king|reina|queen|jota|jack/i.test(e)) {
    tags.push('face_synergy');
  }
  if (/rango par|even rank|rango impar|odd rank|(even|odd).*rank/i.test(e)) {
    tags.push('number_synergy');
  }
  if (/\b[as|aces|ase(s)?]\b/i.test(e)) {
    tags.push('ace_synergy');
  }
  if (/diamante|diamond|corazón|heart|pica|spade|trébol|club|palo|suit/i.test(e)) {
    tags.push('suit_synergy');
  }
  if (/(^|[^a-z])flush|color/.test(e) && !/straight.flush|escalera de color/.test(e)) {
    tags.push('flush_support');
  }
  if (/escalera|straight/.test(e)) {
    tags.push('straight_support');
  }
  if (/full house|full house/i.test(e)) {
    tags.push('full_house_support');
  }
  if (/(^|[^a-z])pair\b|(^|[^a-z])par\b/.test(e) && !/two pair|par doble/.test(e)) {
    tags.push('pair_support');
  }
  if (/two pair|par doble/.test(e)) {
    tags.push('pair_support');
  }
  if (/three of a kind|trío/.test(e)) {
    tags.push('three_kind_support');
  }
  if (/four of a kind|póker|quinteto|five of a kind/.test(e)) {
    tags.push('poker_support');
  }
  if (/high card|carta alta/.test(e)) {
    tags.push('high_card_support');
  }
  if (/reactivat?e?|reactivar|reactiva/i.test(e)) {
    tags.push('retrigger');
  }
  if (/in hand|held|en la mano|mano contiene|mano es|en tu mano/.test(e)) {
    tags.push('held_in_hand');
  }
  if (/(add|added|añade).*deck|mazo|converte?|transform|mejora|enhance|destroy|destruye/.test(e) && /card|carta/.test(e)) {
    tags.push('deck_manip');
  }
  if (/(create|crea).*(tarot|spectral|planet)/.test(e) || /(tarot|spectral|planet).*card|carta/.test(e)) {
    tags.push('consumable_gen');
  }
  if (/planet/.test(e) && /free|gratis|create|crea/.test(e)) {
    tags.push('planet_gen');
  }
  if (/descart|discard/.test(e)) {
    tags.push('discard_synergy');
  }
  if (/hand size|tamaño de mano|hand.*\+\d|mano.*\+|hand.*-\d|mano.*-\d/.test(e)) {
    tags.push('hand_size');
  }
  if (/(copy|copia|duplica)/i.test(e) && /joker/i.test(e)) {
    tags.push('joker_copy');
  }
  if (/boss.blind|jefe ciego|cega.*jefe|disables.*boss|evita la muerte|prevent.*death/i.test(e)) {
    tags.push('boss_anti');
  }
  if (/vidrio|glass|cristal/i.test(e)) {
    tags.push('glass_synergy');
  }
  if (/acero|steel/i.test(e)) {
    tags.push('steel_synergy');
  }
  if (/piedra|stone/i.test(e)) {
    tags.push('stone_synergy');
  }
  if (/oro/i.test(e) && /carta|card/i.test(e)) {
    tags.push('gold_synergy');
  }
  if (/suerte|lucky/i.test(e)) {
    tags.push('lucky_synergy');
  }
  if (/tarot/i.test(e) && /cada.*tarot|por.*tarot|each.*tarot|per.*tarot/i.test(e)) {
    tags.push('tarot_synergy');
  }
  if (/planet/i.test(e) && /cada.*planet|por.*planet|each.*planet|per.*planet/i.test(e)) {
    tags.push('planet_synergy');
  }
  if (/crea.*joker|create.*joker/i.test(e)) {
    tags.push('joker_gen');
  }

  if (tags.length === 0) {
    if (/mult/i.test(e) && !/x/i.test(e)) tags.push('mult_add');
    else if (hasChips(e)) tags.push('chip_add');
    else tags.push('economy');
  }

  return tags;
}

export interface JokerSynergy {
  name: string;
  tags: SynergyTag[];
  effect: string;
}

const synergyCache = new Map<string, JokerSynergy>();

export function getJokerSynergy(name: string, effect: string): JokerSynergy {
  const key = name;
  if (synergyCache.has(key)) return synergyCache.get(key)!;
  const tags = classifyEffect(effect, name);
  const result: JokerSynergy = { name, tags, effect };
  synergyCache.set(key, result);
  return result;
}

const synergyGroupKeys: Record<string, SynergyTag[]> = {
  'economy': ['economy'],
  'mult_add': ['mult_add'],
  'chip_add': ['chip_add'],
  'x_mult': ['x_mult'],
  'scaling': ['scaling_mult', 'scaling_chip', 'scaling_xmult'],
  'face': ['face_synergy'],
  'number': ['number_synergy'],
  'ace': ['ace_synergy'],
  'suit': ['suit_synergy'],
  'retrigger': ['retrigger'],
  'held': ['held_in_hand'],
  'deck': ['deck_manip'],
  'discard': ['discard_synergy'],
  'hand_size': ['hand_size'],
  'boss_anti': ['boss_anti'],
  'card_enhance': ['glass_synergy', 'steel_synergy', 'stone_synergy', 'gold_synergy', 'lucky_synergy'],
};

export interface SynergyResult {
  recommended: { name: string; reason: string; tags: SynergyTag[] }[];
  avoid: { name: string; reason: string; tags: SynergyTag[] }[];
  coverage: string[];
}

export function analyzeSynergy(selectedNames: string[], allJokers: { name: string; effect: string }[]): SynergyResult {
  const selected = selectedNames.map(n => {
    const j = allJokers.find(j => j.name === n);
    return j ? getJokerSynergy(j.name, j.effect) : null;
  }).filter((j): j is JokerSynergy => j !== null);

  const allTags = new Set(selected.flatMap(j => j.tags));
  const hasMult = allTags.has('mult_add') || allTags.has('scaling_mult') || allTags.has('x_mult') || allTags.has('scaling_xmult');
  const hasChips = allTags.has('chip_add') || allTags.has('scaling_chip');

  const selectedSet = new Set(selectedNames);
  const recommended: SynergyResult['recommended'] = [];
  const avoid: SynergyResult['avoid'] = [];

  for (const joker of allJokers) {
    if (selectedSet.has(joker.name)) continue;
    const js = getJokerSynergy(joker.name, joker.effect);
    const jTags = new Set(js.tags);
    const overlap = [...jTags].filter(t => allTags.has(t));

    if (overlap.length > 0) {
      const cat = overlap[0];
      const group = Object.entries(synergyGroupKeys).find(([, tags]) => tags.includes(cat));
      const reason = group ? `synergy_reason.${group[0]}` : `synergy_reason.${cat}`;
      recommended.push({ name: joker.name, reason, tags: js.tags });
    }

    const missingChips = hasChips && !jTags.has('chip_add') && !jTags.has('scaling_chip') && !jTags.has('x_mult');
    const missingMult = hasMult && !jTags.has('mult_add') && !jTags.has('scaling_mult') && !jTags.has('x_mult') && !jTags.has('scaling_xmult');
    if (missingChips || missingMult) {
      if (!recommended.some(r => r.name === joker.name) && !avoid.some(a => a.name === joker.name)) {
        const reason = missingChips ? 'synergy_need.chips' : 'synergy_need.mult';
        avoid.push({ name: joker.name, reason, tags: js.tags });
      }
    }
  }

  const coverage = [...allTags].map(t => t.replace(/_/g, ' '));

  return { recommended: recommended.slice(0, 50), avoid: avoid.slice(0, 30), coverage };
}
