import type { AppProps } from 'next/app';
import World from "../app/World/World";
import { useRef, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const canvas: any = useRef();

  useEffect(() => {
    const world = new World(canvas.current);
  }, []);

  return (
    <div id="app">
      <canvas style={{ height: '100vh', width: '100vw' }} ref={canvas} id="canvas"></canvas>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
