import { camelCase, snakeCase } from 'lodash-es';
import html2canvas from 'html2canvas';

export const sleep = async (ms:number) => {
  return new Promise<void>((sol) => {
    setTimeout(() => sol(), ms);
  });
};

type ToCamel<T> = T extends `${infer L}_${infer R}`
  ? `${L}${Capitalize<ToCamel<R>>}`
  : T;

type ToCamelKeysObject<T extends object> = {
  [K in keyof T as ToCamel<K>]: T[K]
}

export const toCamel = <T extends object>(obj: T): ToCamelKeysObject<T> => {
  const newObj: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj as any)) {
    newObj[camelCase(k)] = v;
  }
  return newObj as ToCamelKeysObject<T>;
};

type ToSnake<T> = T extends `${infer L}${infer R}`
  ? `${L}${R extends Capitalize<R> ? `_${Lowercase<ToSnake<R>>}` : R}`
  : T;

type ToSnakeKeysObject<T extends object> = {
  [K in keyof T as ToSnake<K>]: T[K]
}

export const toSnake = <T extends object>(obj: T): ToSnakeKeysObject<T> => {
  const newObj: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj as any)) {
    newObj[snakeCase(k)] = v;
  }
  return newObj as ToSnakeKeysObject<T>;
};

export const downloadHtml2Canvas = async (el: HTMLDivElement, filename: string) => {
  const canvas = await html2canvas(el);

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = filename;

  link.click();
};


export * from './form-rules.ts';

