type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type JSXify<T extends HTMLElement> = Partial<
  Omit<T, 'children'> & { children?: any[] }
>;
