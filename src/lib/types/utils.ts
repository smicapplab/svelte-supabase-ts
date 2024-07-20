// src/lib/types/utils.ts

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
type CamelCaseKeys<T> = T extends Array<any>
  ? Array<CamelCaseKeys<T[number]>>
  : T extends object
  ? {
      [K in keyof T as CamelCase<string & K>]: CamelCaseKeys<T[K]>;
    }
  : T;