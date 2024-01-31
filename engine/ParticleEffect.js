import { Particle } from "./particle.js";
import { Vector2 } from "./vector2.js";

const CELL_SIZE = 25;
const NUM_OF_PARTICLES = 300;

export class ParticleEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.paricles = [];
        this.curve = 1;
        this.zoom = 0.1;
    }

    init() {
        // Create flow field 
        this.rows = Math.ceil(this.height / CELL_SIZE);
        this.columns = Math.ceil(this.width / CELL_SIZE);
        this.flowField = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle);
            }
        }

        this.paricles = [];
        for (let i = 0; i < NUM_OF_PARTICLES; i++) {
            this.paricles.push(new Particle(this));
        }
    }

    // Returns flow field value for a given index
    getFlowValue({ x, y }) {
        const fieldIndex = y * this.columns + x;
        return this.flowField[fieldIndex];
    }

    positionToGridIndex({ x, y }) {

        return new Vector2(
            Math.floor(x / CELL_SIZE),
            Math.floor(y / CELL_SIZE)
        )
    }

    render() {
        this.paricles.forEach(particle => {
            particle.render(this.ctx);
        })
    }

    update(dtSec, elapsedTimeSec) {
        this.paricles.forEach(particle => {
            particle.update(dtSec, elapsedTimeSec);
        })
    }
}
