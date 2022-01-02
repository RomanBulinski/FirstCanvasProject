import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../Utils/utils";
import {Square} from "./square";


@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css']
})
export class FlowerComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 700;
  private ctx!: CanvasRenderingContext2D | null;

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  squares: Square[] = [];

  moving = true;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.initCanvas();
    this.creatSquares(40);
  }

  private initCanvas(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
  }

  private creatSquares(squaresNumber: number): void {
    for (let i = 0; i < squaresNumber; i++) {
      const x = Utils.randomRange((this.HEIGHT!) *0.5 + 20, (this.WIDTH!*0.5) - 20);
      const y = Utils.randomRange((this.HEIGHT!) *0.5 + 20, (this.WIDTH!*0.5) - 20);
      this.squares.push(new Square(x, y));
    }
  }

  stop(): void {
    this.moving = false;
  }

  start(): void {
    this.moving = true;
    this.ctx!.fillStyle = "black";

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {

        this.fillCanvas();

        if (this.moving) {
          this.squares.forEach(square => square.move360())
          this.squares.forEach(square => square.rotateAction())
          this.squares.forEach(square => square.resize())
          this.squares.forEach(square => square.draw(this.ctx!))
          this.squares.forEach(square => square.bounce(this.WIDTH, this.HEIGHT))
          this.squares.forEach(square => square.eraseSquare())
        }

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });

  }

  private fillCanvas(): void {
    this.ctx!.globalAlpha = 0.01;
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx!.globalAlpha = 1;
  }

}
