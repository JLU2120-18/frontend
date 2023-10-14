import { defineConfig, presetUno } from 'unocss';
import attributive from '@unocss/preset-attributify';

export default defineConfig({
  presets: [
    attributive(),
    presetUno(),
  ],
  rules: [
    [/^mp-(\d+)$/, ([, n]) => ({ margin: `${n}px` })],
    [/^pp-(\d+)$/, ([,n]) => ({ padding: `${n}px` })],
  ],
});