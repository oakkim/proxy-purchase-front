import { LitElement, css, property, html } from 'lit-element';
import { Goods } from '../model/goods.js';

export class GoodsEditDialog extends LitElement {
  @property({ type: Object })
  goods!: Goods;

  static styles = css``;

  render() {
    return html``;
  }
}
