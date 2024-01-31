import { startLoop } from "./animationLoop.js";
import { ParticleEffect } from "./ParticleEffect.js";

/**
 * Contains main animation logic
 * Singleton Instance
 */
export class World {
  constructor(canvas) {
    if (World.instance instanceof World) return World.instance;
    else World.instance = this;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d")

    this.effect = new ParticleEffect(this.canvas);

    this.effect.init();

    startLoop(this.loop);
  }

  clearCanvas = () => {
    // this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
  }

  setup = () => {

  }

  loop = (dtSec, elapsedTimeSec) => {
    this.clearCanvas()
    this.effect.render();
    this.effect.update(dtSec, elapsedTimeSec);
  };
}
