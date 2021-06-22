import Canvas from './components/canvas';
import { DrawFunction } from './hooks/draw-function.intf';
import { MouseEventHandler } from 'react';

// FIXME add auto resize using resize observer: https://codesandbox.io/embed/resizing-canvas-with-react-hooks-gizc5 or https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver

const handleCanvasClick: MouseEventHandler<HTMLCanvasElement>=(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>)=>{
  // on each click get current mouse location
  const currentCoord = { x: event.clientX, y: event.clientY };
  console.log("Mouse coordinates of Canvas click: ", currentCoord);
};

export function App() {
  const draw: DrawFunction = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    ctx.fill();
  };

  return (
    <div>
      <Canvas id="canvas" draw={draw} width={1024} height={768} tabIndex={0} aria-label="Second Brain" onClick={handleCanvasClick}>Alternative content describing what the canvas displays.</Canvas>
    </div>
  );
}

export default App;
