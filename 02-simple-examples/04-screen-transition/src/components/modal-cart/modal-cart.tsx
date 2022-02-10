import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'modal-cart',
  styleUrl: 'modal-cart.css',
  shadow: true,
})
export class ModalCart {
  @Element() hostElement: HTMLElement;

  closeModal() {
    this.hostElement.closest('ion-modal').dismiss();
  }

  render() {
    return (
      <Host>
        <ion-header>
          <ion-toolbar color="danger">
            <ion-title>Home</ion-title>
            <ion-buttons slot="end">
              <ion-button onClick={() => this.closeModal()}>
                <ion-icon color="light" slot="icon-only" name="close" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding"></ion-content>,
      </Host>
    );
  }
}
