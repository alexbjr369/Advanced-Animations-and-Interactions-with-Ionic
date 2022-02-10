import { newSpecPage } from '@stencil/core/testing';
import { ModalCart } from '../modal-cart';

describe('app-cart', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModalCart],
      html: `<modal-cart></modal-cart>`,
    });
    expect(page.root).toEqualHtml(`
      <modal-cart>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modal-cart>
    `);
  });
});
