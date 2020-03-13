/*eslint @typescript-eslint/no-explicit-any:off */
export type Locale = 'en_US' | 'de_DE';

export type AppState = Readonly<{
  locale: Locale;
  loginUser?: { id: number };
}>;

export type Action = {
  type: string;
  [key: string]: any;
};
