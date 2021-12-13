import {Utils} from "../Utils/utils";

export class Circle {

  posX: number;
  posY: number;
  radius?: number;

  constructor(x: number, y: number) {
    this.posX = x;
    this.posY = y;
    this.radius = Utils.randomRange(4, 12);
  }

  draw(ctx: CanvasRenderingContext2D): void {

    ctx.save();
    ctx.translate(this.posX, this.posY);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius!, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}
