export type DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number) => void;

export type PreDrawFunction = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

export type PostDrawFunction = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
