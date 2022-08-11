export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_URL: number;
      REACT_APP_ENV: 'test' | 'dev' | 'prod';
    }
  }
}