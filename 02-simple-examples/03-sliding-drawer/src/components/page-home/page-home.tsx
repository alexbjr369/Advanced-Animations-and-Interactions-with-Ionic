import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding"></ion-content>,

      <sliding-drawer>
        <span slot="title">Sliding Drawer</span>
        <div slot="content">
          <p>This component uses the Ionic Animations API to hide and show a sliding drawer.</p>
          <p>This component can sit over the top of an existing page to reveal more information when clicked.</p>
        </div>
      </sliding-drawer>,
    ];
  }
}
