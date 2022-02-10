import { newSpecPage } from '@stencil/core/testing';
import { SlidingDrawer } from '../sliding-drawer';

describe('sliding-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SlidingDrawer],
      html: `<sliding-drawer></sliding-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <sliding-drawer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </sliding-drawer>
    `);
  });
});
