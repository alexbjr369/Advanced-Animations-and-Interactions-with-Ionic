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
      onWillStart: async () => {
        item.style.willChange = 'transform';
      },
      onStart: () => {
        item.style.transition = '';
      },
      onMove: (event) => {
        item.style.transform = `translateX(${event.deltaX}px)`;
      },
      onEnd: () => {
        item.style.transition = '0.2s ease-out';
        item.style.transform = '';
        item.style.willChange = '';
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
