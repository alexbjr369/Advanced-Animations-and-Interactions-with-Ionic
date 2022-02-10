import { Component, h, Listen, State } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @State() items: string[] = [];

  componentWillLoad() {
    this.items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  }

  @Listen('ionInfinite')
  loadData(event) {
    setTimeout(() => {
      this.items.push('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten');

      this.items = [...this.items];

      event.target.complete();

      if (this.items.length > 100) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-list lines="none">
          {this.items.map((item, index) => (
            <ion-item style={{ '--animation-order': index % 10 }}>
              <ion-label>
                <h1>{item}</h1>
              </ion-label>
            </ion-item>
          ))}
        </ion-list>

        <ion-infinite-scroll threshold="100px">
          <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data..."></ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </ion-content>,
    ];
  }
}
