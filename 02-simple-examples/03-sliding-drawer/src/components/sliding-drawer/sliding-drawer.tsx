import { Animation, createAnimation, createGesture, Gesture, GestureConfig, GestureDetail } from '@ionic/core';
import { Component, Element, h, Host } from '@stencil/core';

declare var ResizeObserver;

@Component({
  tag: 'sliding-drawer',
  styleUrl: 'sliding-drawer.css',
  shadow: true,
})
export class SlidingDrawer {
  @Element() hostElement: HTMLElement;

  open = false;
  drawerAnimation: Animation = null;
  gesture: Gesture = null;
  started = false; // keep track of whether progressStart has been called on the animation, which will allow to control its playback.
  finished = true; // keep track of whether the open/close animation is currently playing or not as we don't want to interrupt that with gesture interactions whilst it is in progress.

  connectedCallback() {
    const resizeObserver = new ResizeObserver(() => {
      this.init();
    });

    resizeObserver.observe(this.hostElement);
  }

  disconnectedCallback() {
    this.drawerAnimation.destroy();
    this.gesture.destroy();
    this.drawerAnimation = null;
    this.gesture = null;
  }

  init() {
    if (this.drawerAnimation !== null) {
      this.drawerAnimation.destroy();
      this.open = false;
    }

    // in case where another init is triggered on resize.
    if (this.gesture !== null) {
      this.gesture.destroy();
    }

    const windowHeight = window.innerHeight;
    const offset = windowHeight - 200;

    this.hostElement.style.transform = `translateY(${offset}px)`;

    this.drawerAnimation = createAnimation()
      .addElement(this.hostElement)
      .duration(300)
      .easing('cubic-bezier(0.32,0.72,0,1)')
      .fromTo('transform', `translateY(${offset}px)`, `translateY(0)`)
      .onFinish(() => {
        // set this.finished flag to true every time the animation finishes.
        this.finished = true;
      });

    const options: GestureConfig = {
      el: this.hostElement,
      gestureName: 'slide-drawer',
      direction: 'y',
      threshold: 10,
      canStart: () => {
        // the gesture will only be allowed to start if this.finished is true.
        return this.finished;
      },
      onMove: event => {
        const step = this.getStep(event, offset);

        if (this.open) {
          // handle downwards gesture
          // plays the animation in reverse with the appropriate step value for where the gesture is currently on the screen.
          if (event.deltaY > 0) {
            this.stepDrawer('reverse', step);
          }
        } else {
          // handle upwards gesture
          // plays the animation with the appropriate step value for where the gesture is currently on the screen.
          if (event.deltaY < 0) {
            this.stepDrawer('normal', step);
          }
        }
      },
      onEnd: event => {
        this.finished = false;
        const step = this.getStep(event, offset);
        const finishDuration = 200;

        if (this.open) {
          // true if the velocityY of the gesture is above 0.2 which would indicate the user did a quick swipe.
          // true if the step is above 0.5 meaning that the user has dragged the drawer past the halfway point.
          const shouldComplete = event.velocityY > 0.2 || step > 0.5;

          // if the progressEnd is called with 1 it will play through to the end of the animation, if its called it with 0 it will play the animation back through to the beginning of the animation.
          // the step indicates at what point in the animation it should start playing from.
          // the duration as the final parameter to indicate how long we want this "end" animation to take.
          this.drawerAnimation.progressEnd(shouldComplete ? 1 : 0, step, finishDuration);
          this.open = shouldComplete ? false : true;
        } else {
          const shouldComplete = event.velocityY < -0.2 || step > 0.5;

          this.drawerAnimation.progressEnd(shouldComplete ? 1 : 0, step, finishDuration);
          this.open = shouldComplete ? true : false;
        }

        this.started = false;
      },
    };

    this.gesture = createGesture(options);
    this.gesture.enable();
  }

  // returns a step value based on the gestures deltaY value and the offset (which indicates how many pixels the drawer has been pushed down the screen).
  // if the offset were 500 and the deltaY was 250 then we would expect a step of 0.5 to indicate that the gesture has travelled 50% of the distance of the offset
  // e.g. the animation should be at the halfway point through playing if it is tracking the gesture.
  getStep(event: GestureDetail, offset: number) {
    return this.clamp(0, Math.abs(event.deltaY) / offset, 1);
  }

  // utility method that will "clamp" whatever value we get between 0 and 1.
  // A step of 0 would mean the beginning of the animation, a step of 1 would mean the end of the animation, so we don't want any values below 0 or above 1.
  clamp(min: number, value: number, max: number) {
    return Math.max(min, Math.min(value, max));
  }

  stepDrawer(direction: 'normal' | 'reverse', step: number) {
    if (!this.started) {
      this.started = true;
      this.drawerAnimation.direction(direction);
      this.drawerAnimation.progressStart(true, 0);
    }

    this.drawerAnimation.progressStep(step);
  }

  async toggleDrawer() {
    if (!this.finished) {
      return;
    }

    this.finished = false;

    this.drawerAnimation.easing('cubic-bezier(0.32,0.72,0,1)');

    if (this.open) {
      this.open = false;
      this.drawerAnimation.direction('reverse');
    } else {
      this.open = true;
      this.drawerAnimation.direction('normal');
    }

    await this.drawerAnimation.play();
    this.drawerAnimation.easing('linear');
  }

  render() {
    return (
      <Host>
        <ion-card onClick={() => this.toggleDrawer()}>
          <ion-card-header>
            <ion-card-title>
              <slot name="title"></slot>
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <slot name="content"></slot>
          </ion-card-content>
        </ion-card>
      </Host>
    );
  }
}
