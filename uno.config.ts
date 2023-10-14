import { defineConfig, presetUno, presetIcons } from 'unocss';
import attributive from '@unocss/preset-attributify';

export default defineConfig({
  presets: [
    attributive(),
    presetUno(),
    presetIcons(),
  ],
  rules: [
    [/^mp-(\d+)$/, ([, n]) => ({ margin: `${n}px` })],
    [/^pp-(\d+)$/, ([,n]) => ({ padding: `${n}px` })],
  ],
  shortcuts: {
    'center': 'flex justify-center items-center',
  },
});