/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

class Particle {
  x = 0;
  y = 0;
  xToMove = 0;
  yToMove = 0;
  radius = 0;

  constructor(
    private _height: number,
    private _width: number,
  ) {
    this.reset();
  }

  reset(): void {
    this.y = Math.random() * this._height;
    this.x = Math.random() * this._width;
    this.xToMove = Math.random() * 1 - 0.5;
    this.yToMove = Math.random() * 0.5 + 0.4; // speed of snow landing
    this.radius = Math.random() * 5 + 2;
  }

  update(): void {
    this.y += this.yToMove;
    this.x += this.xToMove;
    if (this.y >= this._height) {
      this.y = 0;
    }
    if (this.x >= this._width || this.x <= 0) {
      this.reset();
      this.y = 0;
    }
  }
}

class Particles {
  private _height: number;
  private _width: number;
  private _particles: Particle[] = [];

  constructor(private _canvas: HTMLCanvasElement) {
    this._height = this._canvas.height;
    this._width = this._canvas.width;
    const quantity = (this._height * this._width) / 12000;
    for (let i = 0; i < quantity; i++) {
      this._particles.push(new Particle(this._height, this._width));
    }
  }

  updateParticles() {
    const context = this._canvas.getContext('2d');
    context!.clearRect(0, 0, this._width, this._height);
    context!.fillStyle = 'white'; // set color of snow
    this._particles.forEach((particle) => {
      particle.update();
      context!.beginPath();
      context!.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2,
        false,
      );
      context!.fill();
    });
    window.requestAnimationFrame(this.updateParticles.bind(this));
  }
}

@Component({
  selector: 'app-snow-bg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snow-bg.component.html',
  styleUrls: ['./snow-bg.component.css'],
})
export class SnowBgComponent implements AfterViewInit {
  private _particles!: Particles;
  @Input() height = '90vh';
  @ViewChild('snow')
  snow!: ElementRef<HTMLCanvasElement>;

  @HostBinding('style.--canvasHeight') get canvasHeight() {
    return `${this.height}`;
  }

  ngAfterViewInit(): void {
    this._makeSnow();
  }

  @HostListener('window:resize')
  private _makeSnow(): void {
    this.snow.nativeElement.height =
      (window.innerHeight * parseInt(this.height, 10)) / 100;
    this.snow.nativeElement.width = window.innerWidth;
    this._particles = new Particles(this.snow.nativeElement);
    this._particles.updateParticles();
  }
}
