import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d');
    this.canvas!.nativeElement.width = this.WIDTH;
    this.canvas!.nativeElement.height = this.HEIGHT;

    this.ctx!.fillStyle = 'white';
    this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH);
      const y = Utils.randomRange(0, this.HEIGHT);
      this.circles.push(new Circle(x, y));

      this.ctx!.fillStyle = 'white';
      this.ctx!.fillRect(0, 0, this.WIDTH, this.HEIGHT);

      this.circles.forEach(c => c.draw(this.ctx!))

    }
  }

  drawPoints() {
    this.ctx?.save();
    this.ctx?.translate(50, 50);

    this.ctx!.lineWidth = 4;

    this.ctx?.beginPath();
    this.ctx?.arc(0, 0, 10, 0, Math.PI * 2);
    this.ctx?.fill();
    this.ctx?.stroke();

    this.ctx?.restore()
  }


}
