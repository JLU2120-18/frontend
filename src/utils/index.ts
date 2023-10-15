export const sleep = async (ms:number) => {
  return new Promise<void>((sol) => {
    setTimeout(() => sol(), ms);
  });
};

export * from './form-rules.ts';