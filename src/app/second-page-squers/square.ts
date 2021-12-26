import {Vector} from "../Elements/vector";
import {Utils} from "../Utils/utils";

export class Square {

  posOne: Vector;
  posTwo!: Vector;
  angle = 0;
  corector;
  squareWidth = 30
  squareHeight =30


  constructor(x: number, y: number) {
    this.posOne = new Vector(x, y);
    this.posTwo = new Vector(Utils.randomRange(0.01, 0.05), Utils.randomRange(0, 1));
    this.corector = Utils.randomRange(0.5, 1);
    this.angle = Utils.randomRange(0, 3);
  }

  draw(ctx: CanvasRenderingContext2D): void {

    ctx.save();

    ctx.fillStyle = "red";
    ctx.translate(this.posOne.x, this.posOne.y);
    ctx.rotate(this.angle +  this.corector);
    ctx.lineWidth = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.squareWidth * this.corector, this.squareHeight * this.corector);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.squareWidth * this.corector, (this.squareHeight -4) * this.corector);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, (this.squareWidth-4)*this.corector, (this.squareHeight -4)*this.corector);

    ctx.restore();
  }

  moveUp(){
    this.posOne.x += this.posTwo.x;
    this.posOne.y += this.posTwo.y;
  }

  changeCorrector(){
    this.corector +=0.001;
    if(this.corector <= 1 ){
      this.corector +=0.001;
    }
    if(this.corector > 1 ){
      this.corector = 0.1;
    }
    if(this.corector >= 1 ){
      this.corector -= 0.1;
    }
  }

  rotateAction(){
    this.angle += 0.01;
  }

  bounce(width: number,height: number){
    if (this.posOne.y >= height -80) {
      this.posTwo.y *= -1;
    }
    if (this.posOne.y <= 80) {
      this.posTwo.y *= -1;
    }
    if (this.posOne.x >= width -80) {
      this.posTwo.x *= -1;
    }
    if (this.posOne.x <= 80) {
      this.posTwo.x *= -1;
    }
  }

}
