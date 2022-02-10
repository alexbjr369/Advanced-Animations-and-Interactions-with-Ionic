import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @State() formState: 'initial' | 'submitting' | 'error' | 'complete' = 'initial';

  handleSubmit() {
    this.formState = 'submitting';

    setTimeout(() => {
      if (Math.random() < 0.5) {
        this.formState = 'complete';
      } else {
        this.formState = 'error';
      }
    }, 2000);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="page-home ion-padding">
        <ion-item>
          <ion-input placeholder="Your name..."></ion-input>
        </ion-item>

        <ion-item>
          <ion-textarea placeholder="How can we help..."></ion-textarea>
        </ion-item>

        <form-submit class="page-home__form-submit" onClick={() => this.handleSubmit()} formState={this.formState}></form-submit>
      </ion-content>,
    ];
  }
}
