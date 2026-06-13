export interface Achievement {
  name: string;
  description: string;
  unlock: string;
}

export const achievements: Achievement[] = [
  { name: 'Ante Up!', description: 'Llega al Ante 2', unlock: 'Juega hasta alcanzar el Ante 2 en cualquier run.' },
  { name: 'Heads Up!', description: 'Llega al Ante 4', unlock: 'Juega hasta alcanzar el Ante 4 en cualquier run.' },
  { name: 'Chips!', description: 'Gana 3,000 fichas en una sola mano', unlock: 'Acumula al menos 3,000 fichas en una mano.' },
  { name: 'Mult!', description: 'Consigue 500 de Mult total en una sola mano', unlock: 'Acumula al menos 500 de Mult (sin contar fichas).' },
  { name: 'XMult!', description: 'Consigue x5 de Mult o más en una sola mano', unlock: 'Multiplica tu Mult por al menos 5 en una mano.' },
  { name: 'Low Stakes!', description: 'Gana una run en la apuesta Blanca (White Stake)', unlock: 'Completa una run completa con White Stake.' },
  { name: 'Rising Stakes!', description: 'Gana una run en la apuesta Roja (Red Stake)', unlock: 'Completa una run completa con Red Stake.' },
  { name: 'Crimson Stakes!', description: 'Gana una run en la apuesta Verde (Green Stake)', unlock: 'Completa una run completa con Green Stake.' },
  { name: 'Black Stakes!', description: 'Gana una run en la apuesta Negra (Black Stake)', unlock: 'Completa una run completa con Black Stake.' },
  { name: 'Triple Threat!', description: 'Juega un Trío', unlock: 'Juega una mano de Trío en cualquier run.' },
  { name: 'Four of a Kind!', description: 'Juega un Póker', unlock: 'Juega una mano de Póker en cualquier run.' },
  { name: 'Full House!', description: 'Juega un Full House', unlock: 'Juega una mano de Full House en cualquier run.' },
  { name: 'Might as Well Cry!', description: 'Juega 10,000 de Tristeza (si, es broma, compra 10 cartas de Tarot)', unlock: 'Compra un total de 10 cartas de Tarot.' },
  { name: 'Frugal!', description: 'Gana una run sin gastar más de $50 en la tienda', unlock: 'Completa una run completa gastando $50 o menos en total.' },
  { name: 'Speedrunner!', description: 'Gana una run en 12 rondas o menos', unlock: 'Completa una run en 12 rondas o menos.' },
  { name: 'Completionist!', description: 'Descubre todas las cartas de Joker', unlock: 'Desbloquea y descubre todos los Jokers del juego.' },
  { name: 'Completionist+!', description: 'Descubre todas las cartas de Tarot, Planeta y Espectral', unlock: 'Desbloquea y descubre todas las cartas consumibles.' },
  { name: 'Completionist++!', description: 'Obtén la etiqueta dorada en todas las cartas (Golden Sticker)', unlock: 'Completa todas las cartas con Golden Sticker.' },
  { name: 'Sight Unseen!', description: 'Compra un Joker sin saber lo que hace', unlock: 'Compra un Joker que aún no has descubierto.' },
  { name: 'Shattered!', description: 'Ten 5 cartas de Vidrio destruidas en una sola ronda', unlock: 'Juega una ronda donde 5 o más cartas de Vidrio se rompan.' },
  { name: 'You Get What You Get!', description: 'Gana una run usando solo los Jokers que te dan sin recomprar', unlock: 'Completa una run sin recomprar ningún Joker en la tienda.' },
  { name: 'Investment Banker!', description: 'Ten al menos $100 al final de una ronda', unlock: 'Acumula $100 o más al final de cualquier ronda.' },
  { name: 'Roll Over!', description: 'Recombra la tienda 10 veces en una sola ronda', unlock: 'Usa la función de reroll 10 veces en una misma ronda.' },
  { name: 'Nope!', description: 'Consigue que la Rueda de la Fortuna falle 5 veces seguidas', unlock: 'Usa la carta Wheel of Fortune 5 veces sin que active su efecto.' },
  { name: 'Déjà Vu!', description: 'Juega la misma mano 3 veces seguidas', unlock: 'En una ronda, juega la misma mano (ej: Par) 3 rondas consecutivas.' },
  { name: 'Card Collector!', description: 'Añade 50 cartas a tu mazo en una sola run', unlock: 'En una run, aumenta el tamaño de tu mazo en 50 cartas.' },
  { name: 'A Couple Hobbyists!', description: 'Compra 5 Jokers en una sola run', unlock: 'Compra al menos 5 Jokers de la tienda en una run.' },
  { name: 'Big Hand!', description: 'Consigue un tamaño de mano de 10 o más', unlock: 'Usa Jokers o efectos que aumenten tu mano a 10 o más cartas.' },
  { name: '15 Minutes!', description: 'Juega por 15 minutos', unlock: 'Acumula 15 minutos de tiempo de juego total.' },
  { name: 'Retcon!', description: 'Llega al Ante 12', unlock: 'Juega hasta alcanzar el Ante 12 en cualquier run.' },
  { name: 'Rule Bender!', description: 'Gana una run usando el mazo Checkered (Rojo/Negro)', unlock: 'Completa una run usando el mazo Checkered.' },
  { name: 'Golden!', description: 'Obtén todos los logros', unlock: 'Desbloquea todos los demás logros del juego.' },
];
