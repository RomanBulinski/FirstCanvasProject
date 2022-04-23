import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Circle} from "../Elements/circle";
import {Utils} from "../Utils/utils";
import {ThemePalette} from "@angular/material/core";

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

  circlesGoingUp: Circle[] = [];
  circlesGoingDown: Circle[] = [];

  moving = true;
  buttonColor: ThemePalette = 'primary';

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;
    this.createCircles();
    this.circlesGoingUp.forEach(circle => circle.setDirectionUp())
    this.createCircles2();
    this.circlesGoingDown.forEach(circle => circle.setDirectionDown())
  }

  start(): void {
    this.moving = true;

    this.ctx!.fillStyle = "red";
    this.ngZone.runOutsideAngular(() => {
      const loop = () => {

        if (this.moving) {
          this.circlesGoingUp.forEach(circle => circle.update())
          this.circlesGoingUp.forEach(circle => circle.draw(this.ctx!))
          // this.circles.forEach(circle => circle.returnUp(this.HEIGHT))

          this.circlesGoingDown.forEach(circle => circle.update())
          this.circlesGoingDown.forEach(circle => circle.draw(this.ctx!))
          this.circlesGoingDown.forEach(circle => circle.stopDown(this.HEIGHT))

          // this.setFontParamiter();
          // this.ctx!.fillStyle = "white";
          // this.ctx!.fillText("GRANICA", this.WIDTH * 0.5, this.HEIGHT * 0.5);

          this.setFontParamiter();
          this.ctx!.fillStyle = "white";
          this.ctx!.fillText("GRANICA", this.WIDTH * 0.4, this.HEIGHT * 0.6);
        }

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
    this.circlesGoingUp.forEach(circle => circle.draw(this.ctx!))
  }

  private createCircles(): void {
    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH!);
      const y = Utils.randomRange(0, this.HEIGHT!);
      this.circlesGoingUp.push(new Circle(x, y));
    }
  }

  private createCircles2(): void {
    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH!);
      const y = Utils.randomRange(0, this.HEIGHT!);
      this.circlesGoingDown.push(new Circle(x, y));
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

  stop(): void {
    this.moving = false;
  }
}
