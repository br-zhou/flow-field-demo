import { Vector2 } from "./vector2.js";

const MAX_SPEED = 5;
export class Particle {
    constructor(effect) {
        this.effect = effect;
        this.position = new Vector2(
            Math.floor(Math.random() * this.effect.width),
            Math.floor(Math.random() * this.effect.height)
        )
        this.velocity = new Vector2();
        this.speed = MAX_SPEED - Math.random() * MAX_SPEED / 2;
        // stores history of position
        this.history = [Vector2.copy(this.position)];
        this.maxHistory = 200 + Math.random() * 100 - 50
    }

    render(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.stroke();
    }

    update(dtSec, elapsedTimeSec) {
        const gridIndex = this.effect.positionToGridIndex(this.position);
        const flowValue = this.effect.getFlowValue(gridIndex);

        this.velocity.set(
            new Vector2(
                this.speed * Math.cos(flowValue),
                this.speed * Math.sin(flowValue)
            )
        )
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.history.push(Vector2.copy(this.position));
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
    }
}

