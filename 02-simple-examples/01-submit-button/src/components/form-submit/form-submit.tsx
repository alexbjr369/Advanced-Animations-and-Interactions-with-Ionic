import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'form-submit',
  styleUrl: 'form-submit.css',
  shadow: true,
})
export class FormSubmit {
  @Element() hostElement: HTMLElement;

  @Prop() formState: 'initial' | 'submitting' | 'error' | 'complete' = 'initial';

  componentDidLoad() {
    this.setState(this.formState);
  }

  @Watch('formState')
  setState(newState) {
    this.hostElement.dataset.state = newState;

    this.hostElement.shadowRoot.querySelectorAll('[data-active]').forEach(element => {
      element.removeAttribute('data-active');
    });

    this.hostElement.shadowRoot.querySelectorAll(`[data-show~='${newState}']`).forEach(element => {
      element.setAttribute('data-active', 'true');
    });
  }

  render() {
    return (
      <Host>
        <ion-button class="button" expand="full" fill="outline" shape="round">
          <span class="button__text" data-show="initial">
            Submit
          </span>
          <span class="button__text" data-show="submitting">
            Submitting
          </span>
          <span class="button__text" data-show="error">
            Re-Submit
          </span>
          <span class="button__text" data-show="complete">
            Thanks!
          </span>
          <ion-spinner class="button__spinner" name="crescent" data-show="submitting" paused={this.formState !== 'submitting'}></ion-spinner>
          <ion-icon class="button__icon" name="checkmark-outline" data-show="complete"></ion-icon>
          <ion-icon class="button__icon" name="arrow-up-outline" data-show="initial"></ion-icon>
          <ion-icon class="button__icon" name="alert-outline" data-show="error"></ion-icon>
        </ion-button>

        <div class="message-container">
          <p class="message-container__text" data-show="error">
            Looks like there were some errors
          </p>
          <p class="message-container__text" data-show="complete">
            Thanks! We'll be in touch.
          </p>
        </div>
      </Host>
    );
  }
}
