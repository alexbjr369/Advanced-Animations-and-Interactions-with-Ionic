import { Component, h, Element } from '@stencil/core';
import { modalController, createAnimation, Animation } from '@ionic/core';
import { enterAnimation } from '../../animations/enter';
import { leaveAnimation } from '../../animations/leave';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.css',
})
export class PageHome {
  @Element() hostElement: HTMLElement;

  private fabAnimation: Animation;
  private modalOpen: boolean = false;

  componentDidLoad() {
    const fab = this.hostElement.querySelector('ion-fab');
    const fabIcon = fab.querySelector('ion-icon');

    this.fabAnimation = createAnimation().addElement(fab).duration(300).easing('ease-in').fromTo('transform', 'scale(1, 1)', 'scale(35,35)');

    const iconAnimation = createAnimation().addElement(fabIcon).duration(100).fromTo('opacity', '1', '0');

    this.fabAnimation.addAnimation(iconAnimation);
  }

  async launchModal() {
    // modal is not launched if it is already open
    if (this.modalOpen) {
      return;
    }

    this.modalOpen = true;

    const modal = await modalController.create({
      component: 'modal-cart',
      enterAnimation: enterAnimation,
      leaveAnimation: leaveAnimation,
    });

    this.fabAnimation.direction('normal');
    await this.fabAnimation.play();

    modal.present();
    await modal.onDidDismiss();

    this.fabAnimation.direction('reverse');
    await this.fabAnimation.play();

    this.modalOpen = false;
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
          <ion-fab-button
            color="danger"
            onClick={() => {
              this.launchModal();
            }}
          >
            <ion-icon name="cart" />
          </ion-fab-button>
        </ion-fab>
      </ion-content>,
    ];
  }
}
