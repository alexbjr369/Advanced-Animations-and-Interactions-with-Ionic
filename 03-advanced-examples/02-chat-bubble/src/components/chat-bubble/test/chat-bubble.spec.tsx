import { newSpecPage } from '@stencil/core/testing';
import { ChatBubble } from '../chat-bubble';

describe('chat-bubble', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChatBubble],
      html: `<chat-bubble></chat-bubble>`,
    });
    expect(page.root).toEqualHtml(`
      <chat-bubble>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chat-bubble>
    `);
  });
});
