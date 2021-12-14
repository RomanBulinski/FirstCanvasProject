import {Utils} from "../Utils/utils";
import {Vector} from "./vector";

export class Circle {

  pos: Vector;
  vel: Vector;
  radius?: number;

  constructor(x: number, y: number) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.radius = Utils.randomRange(4, 12);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    ctx.fillStyle = "red";
    ctx.translate(this.pos.x, this.pos.y);
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius!, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  setDirectionDown(){
    this.vel = new Vector(0, Utils.randomRange(0.01, 1));
  }

  setDirectionUp(){
    this.vel = new Vector(0, Utils.randomRange(-0.5, -0.01));
  }

  update(): void {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.radius! += 0.01;
  }

  stop(height: number): void {
    if (this.pos.y >= height - 50) {
      this.vel.y = 0;
    }
  }
}
