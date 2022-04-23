import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

import {Utils} from "../Utils/utils";
import {Square} from "./square";

@Component({
  selector: 'app-franz',
  templateUrl: './franz.component.html',
  styleUrls: ['./franz.component.css']
})
export class FranzComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 700;
  private ctx!: CanvasRenderingContext2D | null;
  moving = true;
  @ViewChild('canvas1', {static: true})
  canvas1!: ElementRef<HTMLCanvasElement>;

  private ctxSource!: CanvasRenderingContext2D | null;
  @ViewChild('canvasSource', {static: true})
  canvasSource!: ElementRef<HTMLCanvasElement>;

  image: any;
  squares: Square[] = [];

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.image = document.getElementById('image-source') as HTMLCanvasElement;
    this.initCanvas();
  }

  private initCanvas(): void {
    this.canvas1!.nativeElement.width = this.WIDTH;
    this.canvas1!.nativeElement.height = this.HEIGHT;
    this.ctx = this.canvas1!.nativeElement.getContext('2d');
    this.ctx!.fillStyle = 'black';
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.canvasSource!.nativeElement.width = 100;
    this.canvasSource!.nativeElement.height = 100;
    this.ctxSource = this.canvasSource.nativeElement.getContext('2d');
  }

  stop(): void {
    this.moving = false;
  }

  start(): void {
    this.moving = true;
    // this.initDrawing();
    this.initDrawingWithSquer()
  }

  private initDrawing() {

    this.ctxSource!.drawImage(this.image, 0, 0, 100, 100);
    const typeData = this.ctxSource!.getImageData(0, 0, 100, 100).data

    const cell = 7;
    for (let i = 0; i < 10000; i++) {
      const col = i % 100;
      const row = Math.floor(i / 100);
      const x = col * cell;
      const y = row * cell;

      const r = typeData[(i * 4) + 1];
      const g = typeData[(i * 4) + 2];
      const b = typeData[(i * 4) + 3];
      const a = typeData[(i * 4) + 4];

      this.ctx!.fillStyle = this.getColore(r);

      this.ctx!.save();
      this.ctx!.translate(x, y);
      this.ctx!.translate(cell * 0.5, cell * 0.5);
      this.ctx!.fillRect(0, 0, 5, 5);
      this.ctx!.restore();
    }

  }

  private getColore(r: number): string {
    if(r<220 && r > 100){
      return "grey"
    }
    if(r<100){
      return "black"
    }
    return "white"
  }

  private initDrawingWithSquer() {

    this.ctxSource!.drawImage(this.image, 0, 0, 100, 100);
    const typeData = this.ctxSource!.getImageData(0, 0, 100, 100).data

    const cell = 7;
    for (let i = 0; i < 10000; i++) {
      const col = i % 100;
      const row = Math.floor(i / 100);
      const x = col * cell;
      const y = row * cell;

      const r = typeData[(i * 4) + 1];
      const g = typeData[(i * 4) + 2];
      const b = typeData[(i * 4) + 3];
      const a = typeData[(i * 4) + 4];

      const color = this.getColore(r);
      this.squares.push(new Square(x, y, color ));
    }
  }

  getPicture(): void {
    this.squares.forEach(square => square.draw(this.ctx!))
  }

 move(): void {
   this.ngZone.runOutsideAngular(() => {
     const loop = () => {
       // this.fillCanvas();
       if (this.moving) {
         this.squares.forEach(square => square.move())
         this.squares.forEach(square => square.rotateAction())
         this.squares.forEach(square => square.draw(this.ctx!))
         // this.squares.forEach(square => square.bounce(this.WIDTH, this.HEIGHT))
         this.squares.forEach(square => square.eraseSquare())
       }
       requestAnimationFrame(loop);
     };
     requestAnimationFrame(loop);
   });
  }

  raise(): void {
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        // this.fillCanvas();
        if (this.moving) {
          this.squares.forEach(square => square.up())
          this.squares.forEach(square => square.draw(this.ctx!))
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
