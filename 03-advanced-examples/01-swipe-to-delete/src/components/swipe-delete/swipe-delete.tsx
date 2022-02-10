import { Component, Host, Element, Event, EventEmitter, h } from '@stencil/core';
import { Gesture, GestureConfig, createGesture, createAnimation } from '@ionic/core';

@Component({
  tag: 'swipe-delete',
  styleUrl: 'swipe-delete.css',
  shadow: true,
})
export class SwipeDelete {
  @Element() hostElement: HTMLElement;

  @Event() deleted: EventEmitter;

  private item: HTMLElement;
  private gesture: Gesture;

  componentDidLoad() {
    const windowWidth = window.innerWidth;

    const deleteAnimation = createAnimation().addElement(this.hostElement).duration(200).easing('ease-out').fromTo('height', '50px', '0');

    const options: GestureConfig = {
      el: this.hostElement,
      gestureName: 'swipe-delete',
      onStart: () => {
        // remove any transition and apply it only in the onEnd handler so the transition is not applied whilst the transform is being performed in the onMove handler.
        this.item.style.transition = '';
      },
      onMove: ev => {
        if (ev.deltaX > 0) {
          this.item.style.transform = `translateX(${ev.deltaX}px)`;
        }
      },
      onEnd: ev => {
        // apply the transition only in the end handler.
        this.item.style.transition = '0.2s ease-out';

        if (ev.deltaX > 150) {
          this.item.style.transform = `translateX(${windowWidth}px)`;

          deleteAnimation.onFinish(() => {
            this.deleted.emit(true);
          });

          deleteAnimation.play();
        } else {
          this.item.style.transform = '';
        }
      },
    };

    this.gesture = createGesture(options);
    this.gesture.enable();
  }

  disconnectedCallback() {
    if (this.gesture) {
      this.gesture.destroy();
      this.gesture = undefined;
    }
  }

  render() {
    return (
      <Host>
        <div>
          <ion-icon name="archive"></ion-icon>
        </div>
        <ion-item ref={el => (this.item = el)}>
          <slot></slot>
        </ion-item>
      </Host>
    );
  }
}
