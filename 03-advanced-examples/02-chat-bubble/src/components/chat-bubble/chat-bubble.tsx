import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'chat-bubble',
  styleUrl: 'chat-bubble.css',
  shadow: true,
})
export class ChatBubble {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
