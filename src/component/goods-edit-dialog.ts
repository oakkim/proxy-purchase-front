import { LitElement, css, property, html } from 'lit-element';
import { Goods } from '../model/goods.js';

import '@material/mwc-textfield';
import '@material/mwc-dialog';
import '@material/mwc-button';

export class GoodsEditDialog extends LitElement {
  @property({ type: Object })
  goods!: Goods;

  @property({ type: Boolean })
  open!: boolean;

  static styles = css``;

  render() {
    return html`
      <mwc-dialog
        id="dialog"
        heading="Form Validation"
        ${this.open ? 'open' : ''}
      >
        <p>This dialog can validate user input before closing.</p>
        <mwc-textfield
          id="text-field"
          minlength="3"
          maxlength="64"
          placeholder="First name"
          required
        >
        </mwc-textfield>
        <mwc-button id="primary-action-button" slot="primaryAction">
          Confirm
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="close">
          Cancel
        </mwc-button>
      </mwc-dialog>
    `;
  }
}
