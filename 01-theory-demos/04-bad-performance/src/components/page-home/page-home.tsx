import { Component, h, Element } from '@stencil/core';
import { createGesture, Gesture } from "@ionic/core";

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @Element() hostElement: HTMLElement;

  componentDidLoad() {
    const item: HTMLElement = this.hostElement.querySelector('ion-item');

    const swipeGesture: Gesture = createGesture({
      el: item,
      gestureName: 'swipe',
      onStart: () => {
        item.style.transition = '';
      },
      onMove: (event) => {
        if (event.deltaX > 0) {
          item.style.marginLeft = `${event.deltaX}px`;
        }
      },
      onEnd: () => {
        item.style.transition = '0.2s ease-out';
        item.style.marginLeft = '';
      }
    });

    swipeGesture.enable();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-item>swipe</ion-item>
      </ion-content>,
    ];
  }
}
