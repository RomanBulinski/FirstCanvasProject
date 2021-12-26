import {Utils} from "../Utils/utils";
import {Vector} from "../Elements/vector";


export class Square {

  posOne: Vector;
  posTwo!: Vector;
  angle = 0;
  sizeCorector;
  moveCorector;
  angleCorector;
  squareWidth = 5
  squareHeight = 5
  counter = 0
  bounced = false;


  constructor(x: number, y: number) {
    this.posOne = new Vector(x, y);
    this.posTwo = new Vector(Utils.randomRange(-1, 1), Utils.randomRange(-1, 1));
    this.sizeCorector = Utils.randomRange(0.5, 1);
    this.moveCorector = Utils.randomRange(0.5, 1);
    this.angleCorector = Utils.randomRange(0.5, 2);
    this.angle = Utils.randomRange(0.2, 1);
  }

  draw(ctx: CanvasRenderingContext2D): void {

    ctx.save();

    ctx.fillStyle = "red";
    ctx.translate(this.posOne.x, this.posOne.y);
    ctx.rotate(this.angle + this.angleCorector);
    ctx.lineWidth = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.squareWidth * this.sizeCorector, this.squareHeight * this.sizeCorector);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.squareWidth * this.sizeCorector, (this.squareHeight - 4) * this.sizeCorector);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, (this.squareWidth - 4) * this.sizeCorector, (this.squareHeight - 4) * this.sizeCorector);

    ctx.restore();
  }

  move360() {
    this.moveCorector += 0.02;
    this.posOne.x += this.posTwo.x;
    this.posOne.y += this.posTwo.y;
    if(this.bounced === true){
      this.counter += 0.02
    }
  }

  rotateAction() {
    this.angle += 0.02;
  }

  resize(){
    this.squareWidth += 0.1
    this.squareHeight += 0.1
  }

  bounce(width: number, height: number) {


      if (this.posOne.y >= height - 80) {
        this.posTwo.y *= -1;
        this.bounced = true;
      }
      if (this.posOne.y <= 80) {
        this.posTwo.y *= -1;
        this.bounced = true;
      }
      if (this.posOne.x >= width - 80) {
        this.posTwo.x *= -1;
        this.bounced = true;
      }
      if (this.posOne.x <= 80) {
        this.posTwo.x *= -1;
        this.bounced = true;
      }

  }

  eraseSquare() {
    if (this.counter >= 1) {
      this.setMiddle();
      this.bounced = false
      this.counter = 0;
    }
  }

  private setMiddle(): void {
    this.posOne.y = 350 + Utils.randomRange(1, 10);
    this.posOne.x = 350 + Utils.randomRange(1, 10);
    this.sizeCorector = Utils.randomRange(0.5, 1);
    this.squareWidth = 5
    this.squareHeight = 5
  }
}
