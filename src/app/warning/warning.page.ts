import { Component, ElementRef, ViewChild } from "@angular/core";
import { PositionService } from "../services/position.service";
import { WarningService } from "../services/warning.service";
import { first } from "rxjs/operators";
import { Subscription, timer } from "rxjs";
import { switchMap } from "rxjs/operators";

const ROOM_WIDTH = 380;
const ROOM_HEIGHT = 325;
// const ROOM_WIDTH = 3800;
// const ROOM_HEIGHT = 3250;
const CIRCLE_RADIUS = 25;
const TRUMP_SIZE = 120;
const CAMERA_X = 10;
const CAMERA_Y = 10;
const CAMERA_SIZE = 80;

@Component({
  selector: "app-warning",
  templateUrl: "warning.page.html",
  styleUrls: ["warning.page.scss"],
})
export class WarningPage {
  @ViewChild("canvas", { static: false }) canvas: ElementRef;
  canvasWidth: number;
  canvasHeight: number;
  ctx: any;
  warnings;
  positions;
  trumpImage;
  subscription: Subscription;

  constructor(
    private positionService: PositionService,
    private warningService: WarningService
  ) {}

  ngAfterViewInit() {
    this.canvasWidth = this.canvas.nativeElement.width;
    this.canvasHeight = this.canvas.nativeElement.height;
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.getWarnings();

    // while(true){
    //   await this.getPositions();
    // }
    this.subscription = timer(0, 500)
      .pipe(switchMap(() => this.getPositions()))
      .subscribe((result) => console.log(result));
  }

  initCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawRectangle();
    this.drawCamera();
  }

  async getPositions() {
    this.getWarnings();
    this.positionService
      .getPositions("9E9C13B6-3FC6-4875-BD37-B9511DE0B082")
      .pipe(first())
      .subscribe(
        (data) => {
          this.positions = data;
          this.initCanvas();
          this.drawObjects();
        },
        (error) => {}
      );
  }

  getWarnings(): void {
    this.warningService
      .getActiveWarnings("9E9C13B6-3FC6-4875-BD37-B9511DE0B082")
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.warnings = data;
        },
        (error) => {}
      );
  }

  drawRectangle() {
    this.ctx.fillStyle = "#000000";
    this.ctx.strokeStyle = "#000000";
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.stroke();
  }

  drawCamera() {
    let image = new Image();
    image.onload = () => {
      this.ctx.save();
      this.ctx.translate(
        CAMERA_X + CAMERA_SIZE / 2,
        CAMERA_Y + CAMERA_SIZE / 2
      );
      this.ctx.rotate(Math.PI / 4);
      this.ctx.translate(
        -CAMERA_X - CAMERA_SIZE / 2,
        -CAMERA_Y - CAMERA_SIZE / 2
      );
      this.ctx.drawImage(image, CAMERA_X, CAMERA_Y, CAMERA_SIZE, CAMERA_SIZE);
      this.ctx.restore();
    };
    image.src = "assets/videocam-outline.svg";
  }

  drawObjects() {
    this.positions.forEach((person) => {
      if (person.faceMask) {
        if (person.nearestDistance < 200) {
          var color1 = "FF0000";
          var color2 = "FFA500";
          var ratio = person.nearestDistance / 200;
          var hex = function (x) {
            x = x.toString(16);
            return x.length == 1 ? "0" + x : x;
          };

          var r = Math.ceil(
            parseInt(color1.substring(0, 2), 16) * ratio +
              parseInt(color2.substring(0, 2), 16) * (1 - ratio)
          );
          var g = Math.ceil(
            parseInt(color1.substring(2, 4), 16) * ratio +
              parseInt(color2.substring(2, 4), 16) * (1 - ratio)
          );
          var b = Math.ceil(
            parseInt(color1.substring(4, 6), 16) * ratio +
              parseInt(color2.substring(4, 6), 16) * (1 - ratio)
          );

          var middle = hex(r) + hex(g) + hex(b);
          middle = "#" + middle;
          this.ctx.fillStyle = middle;
          this.ctx.strokeStyle = middle;
        } else if (
          person.nearestDistance >= 200 &&
          person.nearestDistance < 250
        ) {
          var color1 = "FFA500";
          var color2 = "00FF00";
          var ratio = (person.nearestDistance - 200) / 50;
          var hex = function (x) {
            x = x.toString(16);
            return x.length == 1 ? "0" + x : x;
          };

          var r = Math.ceil(
            parseInt(color1.substring(0, 2), 16) * ratio +
              parseInt(color2.substring(0, 2), 16) * (1 - ratio)
          );
          var g = Math.ceil(
            parseInt(color1.substring(2, 4), 16) * ratio +
              parseInt(color2.substring(2, 4), 16) * (1 - ratio)
          );
          var b = Math.ceil(
            parseInt(color1.substring(4, 6), 16) * ratio +
              parseInt(color2.substring(4, 6), 16) * (1 - ratio)
          );
          var middle = hex(r) + hex(g) + hex(b);
          middle = "#" + middle;
          this.ctx.fillStyle = middle;
          this.ctx.strokeStyle = middle;
        } else {
          this.ctx.fillStyle = "#00FF00";
          this.ctx.strokeStyle = "#00FF00";
        }
        this.ctx.beginPath();
        this.ctx.arc(
          (person.positionX / ROOM_WIDTH) * this.canvasWidth,
          (person.positionY / ROOM_HEIGHT) * this.canvasHeight,
          CIRCLE_RADIUS,
          0,
          2 * Math.PI
        );
        this.ctx.fill();
        // this.ctx.font= '25px FontAwesome';
        // this.ctx.fillText(
        //   "\uF200",
        //   (person.positionX / ROOM_WIDTH) * this.canvasWidth,
        //   (person.positionY / ROOM_HEIGHT) * this.canvasHeight
        // );
        this.ctx.stroke();
      } else {
        let image = new Image();
        image.onload = () => {
          this.ctx.drawImage(
            image,
            (person.positionX / ROOM_WIDTH) * this.canvasWidth - TRUMP_SIZE / 2,
            (person.positionY / ROOM_HEIGHT) * this.canvasHeight -
              TRUMP_SIZE / 2,
            TRUMP_SIZE,
            TRUMP_SIZE
          );
        };
        image.src = "assets/trump.png";
      }
    });
  }
}
