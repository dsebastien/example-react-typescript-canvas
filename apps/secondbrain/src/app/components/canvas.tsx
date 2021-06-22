import React, { CanvasHTMLAttributes } from 'react';
import { DrawFunction, PostDrawFunction, PreDrawFunction } from '../hooks/draw-function.intf';
import useCanvas from '../hooks/use-canvas';

const _preDraw: PreDrawFunction = (ctx, canvas) => {
  ctx.save();
  resizeCanvasToDisplaySize(canvas, ctx);
  const { width, height } = canvas;
  ctx.clearRect(0, 0, width, height);
};

const _postDraw: PostDrawFunction = (ctx, canvas) => {
  ctx.restore();
};

/**
 * Resize the given canvas
 * References:
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 *
 * @param canvas the canvas to resize
 * @param context the context
 */
function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const { width, height } = canvas.getBoundingClientRect();

  if (canvas.width === width && canvas.height === height) {
    return false;
  }

  // TODO take pixel density ratio into account: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio#correcting_resolution_in_a_%3Ccanvas%3E
  const { devicePixelRatio: ratio = 1 } = window;
  //const widthToUse = width * ratio;
  //const heightToUse = height * ratio;

  const widthToUse = width;
  const heightToUse = height;

  // Adapt the CSS sizes
  //canvas.style.width = widthToUse + "px";
  //canvas.style.height = heightToUse + "px";

  // Adapt the canvas size
  canvas.width = widthToUse;
  canvas.height = heightToUse;

  // Scale
  context.scale(ratio, ratio);

  return true;
}

interface DrawFunctions {
  preDraw?: PreDrawFunction;
  draw: DrawFunction;
  postDraw?: PostDrawFunction;
}

type CanvasProps = CanvasHTMLAttributes<HTMLCanvasElement> & DrawFunctions;

const Canvas = (props: CanvasProps) => {
  const {
    preDraw = _preDraw,
    draw,
    postDraw = _postDraw, ...rest
  } = props;

  const canvasRef = useCanvas(preDraw, draw, postDraw);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
