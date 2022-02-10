import { newE2EPage } from '@stencil/core/testing';

describe('app-form-submit', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-form-submit></app-form-submit>');

    const element = await page.find('app-form-submit');
    expect(element).toHaveClass('hydrated');
  });
});
