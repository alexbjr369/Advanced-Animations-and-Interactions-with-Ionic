import { newE2EPage } from '@stencil/core/testing';

describe('swipe-delete', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<swipe-delete></swipe-delete>');

    const element = await page.find('swipe-delete');
    expect(element).toHaveClass('hydrated');
  });
});
