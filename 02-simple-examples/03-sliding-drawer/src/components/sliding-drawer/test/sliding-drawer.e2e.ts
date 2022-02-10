import { newE2EPage } from '@stencil/core/testing';

describe('sliding-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<sliding-drawer></sliding-drawer>');

    const element = await page.find('sliding-drawer');
    expect(element).toHaveClass('hydrated');
  });
});
