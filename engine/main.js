import { World } from "./world.js";

// Configure canvas
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 5;
ctx.globalAlpha = 0.01;
ctx.lineCap = "round";
ctx.lineJoin = "round";

ctx.arc(100, 100, 50, 0, Math.PI * 2)
ctx.fill()

let world = new World(canvas);
