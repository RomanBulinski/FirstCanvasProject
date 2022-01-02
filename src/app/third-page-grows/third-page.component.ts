import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Square2} from "../Elements/square2";
import {Utils} from "../Utils/utils";

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css']
})
export class ThirdPageComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 700;
  private ctx!: CanvasRenderingContext2D | null;

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  squares: Square2[] = [];
  moving = true;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.initCanvas();
    this.creatSquares(30);
  }

  start() {
    this.moving = true;
    this.ctx!.fillStyle = "black";

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {

        if (this.moving === true) {
          this.squares.forEach(square => square.move());
          this.squares.forEach(square => square.rotateAction())
          this.squares.forEach(square => square.stop())
          this.squares.forEach(square => square.bounce(this.WIDTH))
          this.squares.forEach(square => square.draw(this.ctx!));
          this.fillCanvas();
        }

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });

  }

  stop(): void {
    this.moving = false;
  }

  private initCanvas(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
  }

  private creatSquares(squaresNumber: number): void {
    for (let i = 0; i < squaresNumber; i++) {
      const x = Utils.randomRange(81, this.WIDTH! - 81);
      const y = Utils.randomRange(this.HEIGHT! - 180, this.HEIGHT! - 81);
      this.squares.push(new Square2(x, y));
    }
  }

  private fillCanvas(): void {
    this.ctx!.globalAlpha = 0.01;
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx!.globalAlpha = 1;
  }

}
