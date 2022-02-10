import { newE2EPage } from '@stencil/core/testing';

describe('chat-bubble', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chat-bubble></chat-bubble>');

    const element = await page.find('chat-bubble');
    expect(element).toHaveClass('hydrated');
  });
});
