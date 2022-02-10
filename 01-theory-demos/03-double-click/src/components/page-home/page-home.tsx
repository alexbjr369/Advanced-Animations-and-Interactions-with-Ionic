import { Component, h, Element } from '@stencil/core';
import { createGesture, Gesture } from "@ionic/core";

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @Element() hostElement: HTMLElement;

  componentDidLoad(){
    const DOUBLE_CLICK_THRESHOLD = 500;
    const element = this.hostElement.querySelector('.element');

    let lastOnStart = 0;

    const gesture: Gesture = createGesture({
      el: element,
      gestureName: 'gesture',
      threshold: 0,
      onStart: () => {
        const now = Date.now();
        if (Math.abs(now - lastOnStart) <= DOUBLE_CLICK_THRESHOLD) {
          console.log('double click has occurred');
          lastOnStart = 0;
        } else {
          console.log('no double click has occurred');
          lastOnStart = now;
        }
      }
    });

    gesture.enable();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <div class="element"></div>
      </ion-content>,
    ];
  }
}
