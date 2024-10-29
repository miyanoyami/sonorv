declare module '~/data/vts.json' {
    interface Liver {
      name: string;
      iconFile: string;
      yt: string;
      attrsSet: number[][];
      score: number;
    }

    const data: Liver[];
    export default data;
}
