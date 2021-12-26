import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../Utils/utils";
import {Square} from "./square";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {

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
    this.creatSquares();
  }

  start(): void {
    this.moving = true;
    this.ctx!.fillStyle = "black";

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {

        // this.drawWhitStripe();

        if (this.moving) {
          this.squares.forEach(square => square.moveUp())
          this.squares.forEach(square => square.changeCorrector())
          this.squares.forEach(square => square.rotateAction())
          this.squares.forEach(square => square.draw(this.ctx!))
          this.squares.forEach(square => square.bounce(this.WIDTH, this.HEIGHT))
        }

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });

  }

  private initCanvas() {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
  }

  private creatSquares() {
    for (let i = 0; i < 10; i++) {
      const x = Utils.randomRange(81, this.WIDTH! - 81);
      const y = Utils.randomRange(81, this.HEIGHT! - 81);
      this.squares.push(new Square(x, y));
    }
  }

  // private drawWhitStripe(): void {
  //   this.ctx!.globalAlpha = 0.01;
  //   this.ctx!.fillStyle = 'white';
  //   this.ctx!.fillRect(0, 0 + this.HEIGHT * 0.45, this.WIDTH, this.HEIGHT * 0.1);
  //   this.ctx!.globalAlpha = 1;
  // }

  stop(): void {
    this.moving = false;
  }
}
