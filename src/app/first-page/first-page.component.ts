import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Circle} from "../Elements/circle";
import {Utils} from "../Utils/utils";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 700;
  private ctx!: CanvasRenderingContext2D | null;

  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;

  circles: Circle[] = [];
  circles2: Circle[] = [];

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
    this.createCircles();
    this.circles.forEach(circle => circle.setDirectionUp())
    this.createCircles2();
    this.circles2.forEach(circle => circle.setDirectionDown())

    this.setFontParamiter();
    this.ctx!.fillStyle = "red";
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        // this.paintCanvas('white');
        this.circles.forEach(circle => circle.update())
        this.circles.forEach(circle => circle.draw(this.ctx!))

        this.circles2.forEach(circle => circle.update())
        this.circles2.forEach(circle => circle.draw(this.ctx!))
        this.circles2.forEach(circle => circle.stop(this.HEIGHT))

        this.ctx!.fillStyle = "white";
        this.ctx!.fillText("GRANICA", this.WIDTH * 0.5,this.HEIGHT * 0.5);

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  private setFontParamiter() {
    this.ctx!.font = '50px arial';
  }

  private startDeploy(): void {
    this.paintCanvas('white');
    this.circles.forEach(circle => circle.draw(this.ctx!))
  }

  private createCircles(): void {
    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH!);
      const y = Utils.randomRange(0, this.HEIGHT!);
      this.circles.push(new Circle(x, y));
    }
  }

  private createCircles2(): void {
    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH!);
      const y = Utils.randomRange(0, this.HEIGHT!);
      this.circles2.push(new Circle(x, y));
    }
  }

  private paintCanvas(color: string) {
    this.ctx!.fillStyle = color;
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  private paintStripeCanvas(color: string) {
    this.ctx!.fillStyle = color;
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT * 0.1);
  }
}
