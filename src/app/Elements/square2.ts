import {Utils} from "../Utils/utils";
import {Vector} from "./vector";

export class Square2 {

  posOne: Vector;
  posTwo: Vector;
  angle = 0;
  corector;
  squareWidth = 6
  squareHeight = 6


  constructor(x: number, y: number) {
    this.posOne = new Vector(x, y);
    this.posTwo = new Vector(Utils.randomRange(0.01, 0.05), Utils.randomRange(-1, 0));
    this.corector = Utils.randomRange(0.5, 1);
    this.angle = Utils.randomRange(-2, 3);
    if(this.angle < 0.01 && this.angle > -0.01){
      this.angle = 0.5
    }
  }

  draw(ctx: CanvasRenderingContext2D ): void {

    ctx.save();

    ctx.fillStyle = "white";
    ctx.translate(this.posOne.x, this.posOne.y);
    ctx.rotate(this.angle);
    ctx.lineWidth = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.squareWidth * this.corector, this.squareHeight * this.corector);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.squareWidth * this.corector, (this.squareHeight -1) * this.corector);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, (this.squareWidth-1)*this.corector, (this.squareHeight -1)*this.corector);

    ctx.restore();
  }

  move(){
    this.posOne.x += this.posTwo.x;
    this.posOne.y += this.posTwo.y;

    // if(this.corector <= 1 ){
    //   this.corector +=0.001;
    // }
    // if(this.corector > 1 ){
    //   this.corector = 0.1;
    // }
  }

  stop(){
    // if (this.posOne.y <= 80) {
    //   this.angle = 0;
    //   this.corector = 0;
    // }
    if (this.corector < 7) {
      this.corector +=0.01;
    }
    if (this.corector >= 7) {
      this.corector = 7
    }
  }

  rotateAction(){
    this.angle += 0.01;
  }

  bounce(width: number){
    if (this.posOne.y <= 80) {
      this.squareWidth = 6
      this.squareHeight = 6
      this.posOne.y = 600;
      this.posOne.x = this.posOne.x -10;
      this.corector = 0;
    }
    if (this.posOne.x >= width -80) {
      this.posTwo.x *= -1;
    }
    if (this.posOne.x <= 80) {
      this.posTwo.x *= -1;
    }
  }

}
