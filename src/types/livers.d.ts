declare module '*/vts.json' {
  interface Liver {
    name: string;
    iconFile: string;
    yt: string;
    attrsSet: number[][];
    score: number;
  }

  const value: Liver[];
  export = value;
}

