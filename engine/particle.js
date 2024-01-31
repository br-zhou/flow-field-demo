import { Vector2 } from "./vector2.js";

const MIN_SPEED = 5
const MAX_SPEED = 7;
const MIN_HISTORY = 10;
const MAX_HISTORY = 40;

export class Particle {
    constructor(effect) {
        this.effect = effect;
        this.reset();
    }

    render(context) {
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.strokeStyle = this.color;
        context.stroke();
    }

    update(dtSec, elapsedTimeSec) {
        this.timer--;

        const gridIndex = this.effect.positionToGridIndex(this.position);

        if (this.timer > 0 && !this.effect.outOfBounds(gridIndex)) {
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
        } else if (this.history.length > 1) {
            this.history.shift();
        } else {
            this.reset();
        }
    }

    reset() {
        this.position = new Vector2(
            Math.floor(Math.random() * this.effect.width),
            Math.floor(Math.random() * this.effect.height)
        )
        this.velocity = new Vector2();
        this.speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
        // stores history of position
        this.history = [Vector2.copy(this.position)];
        this.maxHistory = Math.floor(MIN_HISTORY + Math.random() * (MAX_HISTORY - MIN_HISTORY));
        this.timer = Math.floor(this.maxHistory + Math.random() * this.maxHistory);

        const choices = ["#4287f5", "#1d60cc", "#0062ff", "#002aff", "#002aff"]
        const random_index = Math.floor(Math.random() * choices.length)
        this.color = choices[random_index];
    }
}

