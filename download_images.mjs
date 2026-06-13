import { readdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const TARGET_DIR = '/Users/Juanpi/Desktop/Clase/Project-Blueprint/public/images';
const WIKI_URL = 'https://balatromods.miraheze.org/wiki/Category:Vanilla/Joker_Images';

const existing = new Set(
  readdirSync(TARGET_DIR).filter(f => f.endsWith('.png')).map(f => f.replace(/\.png$/, ''))
);

const targetNames = new Set([
  'Four_Fingers', 'Mime', 'Credit_Card', 'Ceremonial_Dagger', 'Loyalty_Card',
  'Misprint', 'Dusk', 'Raised_Fist', 'Chaos_the_Clown', 'Fibonacci',
  'Scary_Face', 'Delayed_Gratification', 'Pareidolia', 'Even_Steven', 'Odd_Todd',
  'Scholar', 'Supernova', 'Ride_the_Bus', 'Space_Joker', 'Egg', 'Runner',
  'Ice_Cream', 'DNA', 'Splash', 'Sixth_Sense', 'Hiker', 'Superposition',
  'To_Do_List', 'Red_Card', 'Madness', 'Séance', 'Riff-Raff', 'Vampire',
  'Shortcut', 'Vagabond', 'Rocket', 'Obelisk', 'Midas_Mask', 'Luchador',
  'Photograph', 'Turtle_Bean', 'Erosion', 'Reserved_Parking', 'Mail-In_Rebate',
  'To_the_Moon', 'Hallucination', 'Drunkard', 'Lucky_Cat', 'Trading_Card',
  'Popcorn', 'Spare_Trousers', 'Ramen', 'Walkie_Talkie', 'Seltzer', 'Castle',
  'Smiley_Face', 'Campfire', 'Mr._Bones', 'Sock_and_Buskin', 'Swashbuckler',
  'Troubadour', 'Certificate', 'Throwback', 'Hanging_Chad', 'Rough_Gem',
  'Bloodstone', 'Arrowhead', 'Onyx_Agate', 'Showman', 'Flower_Pot', 'Merry_Andy',
  'Oops!_All_6s', 'The_Idol', 'Seeing_Double', 'Matador', 'Hit_the_Road',
  'The_Duo', 'The_Trio', 'The_Family', 'The_Order', 'The_Tribe', 'Stuntman',
  'Satellite', 'Shoot_the_Moon', 'Cartomancer', 'Astronomer', 'Bootstraps',
  'Drivers_License'
]);

const nameFix = {
  "Driver's_License": "Drivers_License",
};

async function main() {
  const needToDownload = [...targetNames].filter(n => !existing.has(n));
  console.log(`Need to download: ${needToDownload.length} / ${targetNames.size}`);

  const resp = await fetch(WIKI_URL);
  const html = await resp.text();

  // Extract ALL image src attributes
  const regex = /src="(?:https:)?\/\/static\.wikitide\.net\/balatromodswiki\/([^"]+?\.png)"/g;
  const urlMap = new Map();

  const allMatches = [...html.matchAll(regex)];
  console.log(`Raw regex matches: ${allMatches.length}`);
  if (allMatches.length > 0) {
    console.log(`First match: ${allMatches[0][0].substring(0, 100)}`);
  }

  for (const [, path] of allMatches) {
    const decodedFilename = decodeURIComponent(path).split('/').pop();
    if (!decodedFilename.endsWith('_(Vanilla).png')) continue;

    // Filename in URL uses underscores in place of spaces: "Four_Fingers_(Vanilla).png"
    let wikiName = decodedFilename.replace(/_{0,1}\(Vanilla\)\.png$/, '');
    // Apply special name fixes
    if (nameFix[wikiName]) wikiName = nameFix[wikiName];

    const fullUrl = `https://static.wikitide.net/balatromodswiki/${path}`;
    urlMap.set(wikiName, fullUrl);
  }

  console.log(`Found ${urlMap.size} images on wiki`);
  // Debug: show first 10 keys
  const keys = [...urlMap.keys()];
  console.log(`Sample keys: ${keys.slice(0, 10).join(', ')}`);

  let success = 0, failed = 0;

  for (const name of needToDownload) {
    const url = urlMap.get(name);
    if (!url) {
      console.log(`  MISSING URL: ${name}`);
      failed++;
      continue;
    }

    try {
      const imgResp = await fetch(url);
      if (!imgResp.ok) { console.log(`  FAIL HTTP ${imgResp.status}: ${name}`); failed++; continue; }
      const buf = Buffer.from(await imgResp.arrayBuffer());
      writeFileSync(join(TARGET_DIR, `${name}.png`), buf);
      console.log(`  OK: ${name} (${buf.length} B)`);
      success++;
    } catch (err) {
      console.log(`  FAIL: ${name} - ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDownloaded: ${success}, Failed: ${failed}`);
}

main().catch(console.error);
