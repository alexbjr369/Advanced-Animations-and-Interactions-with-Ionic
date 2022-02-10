import { newE2EPage } from '@stencil/core/testing';

describe('modal-cart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modal-cart></modal-cart>');

    const element = await page.find('modal-cart');
    expect(element).toHaveClass('hydrated');
  });
});
