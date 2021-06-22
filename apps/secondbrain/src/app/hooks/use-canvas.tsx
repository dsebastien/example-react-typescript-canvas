import { useRef, useEffect } from 'react'
import { DrawFunction, PostDrawFunction, PreDrawFunction } from './draw-function.intf';

/**
 * References:
 * https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
 * @param preDraw
 * @param draw
 * @param postDraw
 */
const useCanvas = (preDraw: PreDrawFunction, draw: DrawFunction, postDraw: PostDrawFunction) => {
  // Use a ref to access the Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Use a ref to keep access to the Canvas Context
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Only try to initialize the context once the Canvas DOM is ready
  // hence the useEffect hook
  useEffect(() => {
    // At this point the canvas should be accessible through the ref
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvasCtxRef.current = canvas.getContext('2d');
    const ctx = canvasCtxRef.current;

    if (!ctx) {
      return;
    }

    let frameCount = 0;
    let animationFrameId = 0;

    // Where the magic happens
    const render = () => {
      frameCount++;
      preDraw(ctx, canvas);
      draw(ctx, frameCount);
      postDraw(ctx, canvas);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    /**
     * useEffect cleanup function
     */
    return () => {
      // Cancel the last frame after the component unmounts
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  // Return the reference to the canvas
  return canvasRef;
}
export default useCanvas
