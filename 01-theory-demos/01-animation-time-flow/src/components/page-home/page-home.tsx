import { Component, h, Element } from '@stencil/core';
import { createAnimation, Animation } from "@ionic/core";

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @Element() hostElement: HTMLElement;

  private animation: Animation;

  private started = false;
  private step = 0;

  componentDidLoad() {
    const element = this.hostElement.querySelector(".element");

    this.animation = createAnimation()
      .addElement(element)
      .duration(2000)
      .easing("ease-in")
      .fromTo("opacity", "1", "0")
      .fromTo("transform", "scale(1)", "scale(0)");

    this.animation.progressStart(false);

    this.started = true;
  }

  playAnimation() {
    this.animation.play();
  }

  stepAnimation() {
    if (!this.started) {
      this.animation.progressStart(false);
      this.started = true;
    }

    this.step += 0.1;
    this.animation.progressStep(this.step);
  }

  endAnimation(playTo) {
    this.animation.progressEnd(playTo, this.step, 2000);
    this.started = false;
    this.step = 0;
  }

  setStep(step) {
    if (!this.started) {
      this.animation.progressStart(false);
      this.started = true;
    }

    this.step = step;
    this.animation.progressStep(step);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-button onClick={() => this.playAnimation()}>Play</ion-button>
        <ion-button onClick={() => this.stepAnimation()}>Step</ion-button>
        <ion-button onClick={() => this.endAnimation(1)}>Finish (play to end)</ion-button>
        <ion-button onClick={() => this.endAnimation(0)}>Finish (play to beginning)</ion-button>
        <div class="element"></div>
        <ion-range onIonChange={(ev) => this.setStep(ev.detail.value)} min={0} max={1} step={0.01}></ion-range>
      </ion-content>,
    ];
  }
}
