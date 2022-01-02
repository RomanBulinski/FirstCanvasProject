import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../Utils/utils";

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 700;
  private ctx!: CanvasRenderingContext2D | null;
  moving = true;

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.initCanvas();
  }

  private initCanvas(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
  }

  start(): void {

    this.moving = true;

    this.ctx!.fillStyle = 'blue';
    // this.ctx!.fillStyle = 'black';
    const cxStart = this.WIDTH * 0.5;
    const cyStart = this.HEIGHT * 0.5;
    const w = this.WIDTH * 0.2;
    const h = this.HEIGHT * 0.02;
    let x;
    let y;

    const num = 4;
    const radius = this.WIDTH * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = Utils.degToRad(360 / num);
      const angle = slice * i;

      x = cxStart + radius * Math.sin(angle);
      y = cyStart + radius * Math.cos(angle);

      const radius2 = radius * Utils.randomRange(0.7, 1.3);

      const startAngel2 = slice;
      const endAngel2 = slice + 1;

      const lineWidth2 = Utils.randomRange(5, 20);
      let corrector = Utils.randomRange(0.5, 1);
      let accelerant = Utils.randomRange(0.001, 0.05)
      let color = 'rgb(' + Utils.randomRange(0, 255) + ',' + Utils.randomRange(0, 255) + ',' + Utils.randomRange(0, 255) + ')';

      this.ngZone.runOutsideAngular(() => {
        const loop = () => {
          if (this.moving) {
            corrector = corrector + 0.0005 + accelerant;
            this.drawArcs(cxStart, cyStart, angle, radius2, startAngel2, endAngel2, lineWidth2, corrector, accelerant, color);
            this.fillCanvas();
          }
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      });

      this.drawClockHands(x, y, angle, w, h);
    }
  }

  private drawArcs(cxStart: number, cyStart:
                     number, angle: number, radius2:
                     number, startAngel2: number, endAngel2: number,
                   lineWidth2: number, corector: number, accelerant: number, color: any) {

    this.ctx!.save();

    this.ctx!.translate(cxStart, cyStart);
    this.ctx!.rotate(-angle + Utils.degToRad(90));

    this.ctx!.lineWidth = lineWidth2 + accelerant;
    this.ctx!.strokeStyle = color;
    this.ctx!.beginPath();
    // this.ctx!.shadowBlur = 5;
    // this.ctx!.shadowColor = "blue";
    this.ctx!.arc(0, 0, radius2, startAngel2 + corector, endAngel2 + corector)
    this.ctx!.stroke();

    this.ctx!.restore();
  }

  stop(): void {
    this.moving = false;
  }

  private drawClockHands(x: number, y: number, angle: number, w: number, h: number) {
    // save canvas context
    this.ctx!.save();
    // prepere canvas
    this.ctx!.translate(x, y);
    this.ctx!.rotate(-angle + Utils.degToRad(90));
    this.ctx!.scale(Utils.randomRange(0.2, 0.5), Utils.randomRange(0.1, 2));
    // draw element
    this.ctx!.beginPath();
    this.ctx!.rect(-w * 0.5, Utils.randomRange(0, -h * 0.5), w, h);
    this.ctx!.fill();
    // reset canvas context
    this.ctx!.restore();
  }

  private fillCanvas(): void {
    this.ctx!.globalAlpha = 0.01;
    this.ctx!.fillStyle = 'white';
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx!.globalAlpha = 1;
  }
}
