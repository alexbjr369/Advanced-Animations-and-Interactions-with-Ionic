import { newSpecPage } from '@stencil/core/testing';
import { FormSubmit } from '../form-submit';

describe('app-form-submit', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FormSubmit],
      html: `<app-form-submit></app-form-submit>`,
    });
    expect(page.root).toEqualHtml(`
      <app-form-submit>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-form-submit>
    `);
  });
});
