import { newSpecPage } from '@stencil/core/testing';
import { SwipeDelete } from '../swipe-delete';

describe('swipe-delete', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SwipeDelete],
      html: `<swipe-delete></swipe-delete>`,
    });
    expect(page.root).toEqualHtml(`
      <swipe-delete>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </swipe-delete>
    `);
  });
});
