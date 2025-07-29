// react-sparklines.d.ts
declare module "react-sparklines" {
  import * as React from "react";

  export interface SparklinesProps {
    data: number[];
    width?: number;
    height?: number;
    margin?: number;
    min?: number;
    max?: number;
    limit?: number;
    style?: React.CSSProperties;
    children?: React.ReactNode; // ✅ Add this line
  }

  export interface SparklinesLineProps {
    color?: string;
    style?: React.CSSProperties;
  }

  export const Sparklines: React.FC<SparklinesProps>;
  export const SparklinesLine: React.FC<SparklinesLineProps>;
}
