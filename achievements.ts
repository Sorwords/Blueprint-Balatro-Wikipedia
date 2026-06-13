export interface Achievement {
  name: string;
  description: string;
  unlock: string;
}

export const achievements: Achievement[] = [
  {
    name: 'Ante Up!',
    description: 'Reach Ante 4',
    unlock: 'Progress through blinds until you reach Ante level 4 in any run.',
  },
  {
    name: 'Ante Upper!',
    description: 'Reach Ante 8',
    unlock: 'Progress through blinds until you reach Ante level 8 in any run.',
  },
  {
    name: 'Heads Up',
    description: 'Win a Run',
    unlock: 'Defeat the Ante 8 Boss Blind to win a complete run.',
  },
  {
    name: 'Low Stakes',
    description: 'Win a run on at least Red Stake difficulty',
    unlock: 'Win a run with any deck on Red Stake difficulty or higher.',
  },
  {
    name: 'Mid Stakes',
    description: 'Win a run on at least Black Stake difficulty',
    unlock: 'Win a run with any deck on Black Stake difficulty or higher.',
  },
  {
    name: 'High Stakes',
    description: 'Win a run on at least Gold Stake difficulty',
    unlock: 'Win a run with any deck on Gold Stake difficulty or higher.',
  },
  {
    name: 'Card Player',
    description: 'Play at least 2500 Cards',
    unlock: 'Play a cumulative total of 2,500 cards across all runs.',
  },
  {
    name: 'Card Discarder',
    description: 'Discard at least 2500 Cards',
    unlock: 'Discard a cumulative total of 2,500 cards across all runs.',
  },
  {
    name: 'Nest Egg',
    description: 'Have $400 or more during a single run',
    unlock: 'Accumulate $400 or more in a single run (interest and economy jokers help).',
  },
  {
    name: 'Flushed',
    description: 'Play a Flush with 5 Wild Cards',
    unlock: 'Play a five-card Flush hand where all five cards are Wild Cards.',
  },
  {
    name: 'Speedrunner',
    description: 'Win a run in 12 or fewer rounds',
    unlock: 'Win a complete run in 12 rounds or fewer by skipping blinds strategically.',
  },
  {
    name: 'ROI',
    description: 'Buy 5 vouchers by Ante 4',
    unlock: 'Purchase 5 total vouchers before reaching Ante level 4.',
  },
  {
    name: 'Shattered',
    description: 'Break 2 Glass Cards in a single hand',
    unlock: 'Play a hand containing at least 2 Glass Cards that both break (1 in 4 chance per card).',
  },
  {
    name: 'Royale',
    description: 'Play a Royal Flush',
    unlock: 'Play a 10, Jack, Queen, King, Ace all of the same suit.',
  },
  {
    name: 'Retrograde',
    description: 'Get any poker hand to level 10',
    unlock: 'Use Planet cards to level up any single poker hand to level 10.',
  },
  {
    name: '10K',
    description: 'Score 10,000 Chips in a single hand',
    unlock: 'Score at least 10,000 chips in a single hand play.',
  },
  {
    name: '1,000K',
    description: 'Score 1,000,000 Chips in a single hand',
    unlock: 'Score at least 1,000,000 chips in a single hand play.',
  },
  {
    name: '100,000K',
    description: 'Score 100,000,000 Chips in a single hand',
    unlock: 'Score at least 100,000,000 chips in a single hand play.',
  },
  {
    name: 'Tiny Hands',
    description: 'Thin your deck down to 20 or fewer cards',
    unlock: 'Reduce your deck size to 20 or fewer cards through tarot cards, spectral cards, or other removal effects.',
  },
  {
    name: 'Big Hands',
    description: 'Have 80 or more cards in your deck',
    unlock: 'Increase your deck size to 80 or more cards through tarot cards, spectral cards, or other addition effects.',
  },
  {
    name: 'You Get What You Get',
    description: 'Win a run without rerolling the shop',
    unlock: 'Win a complete run without ever using the Reroll button in the shop.',
  },
  {
    name: 'Rule Bender',
    description: 'Complete any challenge run',
    unlock: 'Successfully complete any single Challenge Deck run.',
  },
  {
    name: 'Rule Breaker',
    description: 'Complete every challenge run',
    unlock: 'Successfully complete all Challenge Deck runs.',
  },
  {
    name: 'Legendary',
    description: 'Discover a Legendary Joker',
    unlock: 'Find and unlock any Legendary Joker (obtained from the Soul Spectral card or Arcana packs).',
  },
  {
    name: 'Astronomy',
    description: 'Discover every Planet card',
    unlock: 'Unlock and view every Planet card in your collection (all 12 Planet cards for each poker hand).',
  },
  {
    name: 'Cartomancy',
    description: 'Discover every Tarot card',
    unlock: 'Unlock and view every Tarot card in your collection.',
  },
  {
    name: 'Clairvoyance',
    description: 'Discover every Spectral card',
    unlock: 'Unlock and view every Spectral card in your collection.',
  },
  {
    name: 'Extreme Couponer',
    description: 'Discover every Voucher',
    unlock: 'Unlock and view every Voucher in your collection (base and upgraded versions).',
  },
  {
    name: 'Completionist',
    description: 'Discover 100% of your collection',
    unlock: 'Unlock every Joker, Tarot card, Planet card, Spectral card, Voucher, Deck, and other collectible in the game.',
  },
  {
    name: 'Completionist+',
    description: 'Win with every deck at Gold Stake difficulty',
    unlock: 'Win a run with every single deck (including解锁able ones) on Gold Stake difficulty.',
  },
  {
    name: 'Completionist++',
    description: 'Earn a Gold Sticker on every Joker',
    unlock: 'Win a Gold Stake run with every Joker in the game to earn a Gold Sticker on each one.',
  },
  {
    name: 'Platinum',
    description: 'Obtain all other trophies (PlayStation only)',
    unlock: 'Earn every other trophy in the PlayStation version of Balatro.',
  },
];
