import type { PixelIconName } from './pixelIcons';

export type Link = {
  title: string;
  url: string;
  icon: PixelIconName;
  blurb?: string;
  cover?: string;
  badge?: string;
};

export const ITCH_PROFILE = 'https://sanisoclem.itch.io/';

export const sites: Link[] = [
  {
    title: 'Jerahmeel Cosinas',
    url: 'https://jerahmeelcosinas.net',
    icon: 'person',
    blurb: 'Uhh'
  },
  {
    title: 'busstop.dev',
    url: 'https://busstop.dev',
    icon: 'bus',
    blurb: 'A dev blog.'
  },
  {
    title: 'Idea Foundry',
    url: 'https://ideas.busstop.dev',
    icon: 'bulb',
    blurb: 'game ideas'
  },
  {
    title: 'Prototype Archive',
    url: 'https://proto.busstop.dev',
    icon: 'flask',
    blurb: 'axed prototypes'
  }
];

export const games: Link[] = [
  {
    title: 'Sweet Escape',
    url: 'https://sanisoclem.itch.io/sweet-escape',
    icon: 'gamepad',
    blurb: 'choose spells, gain lucidity, kill bosses.',
    cover: 'https://img.itch.zone/aW1nLzI1NjE0NzY2LnBuZw==/315x250%23c/Bm7h7%2F.png',
    badge: 'Bevy Jam 7'
  },
  {
    title: 'Triangle Apocalypse',
    url: 'https://sanisoclem.itch.io/triangle-apocalypse',
    icon: 'gamepad',
    blurb: 'Fly a triangle, slow time, rescue other triangles.',
    cover: 'https://img.itch.zone/aW1nLzE0MzA0MjAzLnBuZw==/315x250%23c/CTRWhB.png',
    badge: 'Bevy Jam 4'
  },
  {
    title: 'Slime Horde',
    url: 'https://sanisoclem.itch.io/slime-horde',
    icon: 'gamepad',
    blurb: 'Kill slimes with your mouse and space bar.',
    cover: 'https://img.itch.zone/aW1nLzgzMjM3NzQucG5n/315x250%23c/%2FQCF72.png',
    badge: 'Bevy Jam 1'
  }
];

export const tools: Link[] = [
  {
    title: 'Base58 Checker',
    url: '/tools/base58',
    icon: 'hash',
    blurb: 'what it says^'
  },
  {
    title: 'Base58check Generator',
    url: '/tools/base58gen',
    icon: 'dice',
  },
  {
    title: 'SFX Generator',
    url: 'https://sfxr.pages.dev',
    icon: 'speaker',
    blurb: 'Make retro sound effects.'
  },
  {
    title: 'VMCD',
    url: 'https://vmcd.pages.dev',
    icon: 'window',
    blurb: 'An experiment'
  }
];

export function isExternal(link: Link): boolean {
  return link.url.startsWith('http');
}
