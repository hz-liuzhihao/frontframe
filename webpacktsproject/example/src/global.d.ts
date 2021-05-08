declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.less' {
  const content: string;
  export default content;
}

interface JSONObject {
  [key: string]: any;
}

declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};