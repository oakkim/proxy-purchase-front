import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import { TextField } from '@material/mwc-textfield';
import { Order } from '../model/order.js';
import { User } from '../model/user.js';
import { Goods } from '../model/goods.js';

import { Dialog } from '@material/mwc-dialog';

import { createOrder } from '../firebase/order-repository.js';
import { createGoods } from '../firebase/goods-repository.js';

import { numberWithCommas } from '../utils/number-formatter.js';

export class OrderCreateView extends LitElement {
  @property({ type: Object })
  order!: Order;

  @property({ type: Boolean })
  open = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }

    #main {
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;

      background: white;
      border: 1px solid lightgray;
      border-radius: 5px;
      padding-bottom: 15px;
      margin-top: 20px;
      margin-bottom: 15px;
    }

    #btn-login {
      margin-top: 10px;
    }

    #title {
      font-size: 25px;
      font-weight: bold;
      padding: 25px 15px 15px 15px;
    }

    #total-price {
      border-top: 1px solid lightgray;
      font-size: 15px;
      padding-top: 15px;
      margin: 10px 15px 5px 15px;
    }

    #total-fee {
      font-size: 15px;
      margin: 0px 15px 15px 15px;
    }

    mwc-textfield {
      margin-bottom: 5px;
    }
  `;

  constructor() {
    super();
    if (!this.order) {
      this.order = new Order();
      this.order.goods = [];
    }
  }

  render() {
    return html`
      <div id="main">
        <div id="title">주문요청 만들기</div>
        <mwc-list>
          ${this.order?.goods?.map(
            g => html`
              <mwc-list-item twoline hasMeta>
                <span>${g.name}</span>
                <span slot="secondary">${g.price}원, ${g.ea}개</span>
                <mwc-icon slot="meta" @click=${() => console.log('clicked')}
                  >clear</mwc-icon
                >
              </mwc-list-item>
            `
          )}
        </mwc-list>

        <div style="text-align: center;">
          <mwc-icon-button
            icon="add"
            @click=${this.onPlusButtonClicked}
          ></mwc-icon-button>
        </div>

        <div id="total-price">
          <span>총 주문 금액 : </span>
          <span style="float: right;"
            >${numberWithCommas(
              this.order?.goods?.reduce(
                (acc, cur) => (acc += cur.price * cur.ea),
                0
              )
            )}원</span
          >
        </div>
        <div id="total-fee">
          <span>수수료 금액 : </span>
          <span style="float: right;"
            ><mwc-textfield label=""></mwc-textfield>원</span
          >
        </div>
        <div style="clear:both;">
          <mwc-button
            raised
            label="생성"
            style="margin-left: 15px; clear: both;"
          ></mwc-button>
        </div>
      </div>
      <mwc-dialog id="dialog" heading="상품 추가하기">
        <p>구매대행하려는 상품의 정보를 입력해주세요.</p>
        <mwc-textfield
          id="tf-name"
          maxlength="64"
          placeholder="상품명"
          required
        >
        </mwc-textfield
        ><br />
        <mwc-textfield
          id="tf-price"
          type="number"
          placeholder="가격"
          min="1"
          required
        >
        </mwc-textfield
        ><br />
        <mwc-textfield
          id="tf-ea"
          type="number"
          placeholder="개수"
          min="1"
          required
        >
        </mwc-textfield>

        <mwc-button
          id="primary-action-button"
          slot="primaryAction"
          @click=${this.onActionButtonClicked}
        >
          추가
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="close">
          취소
        </mwc-button>
      </mwc-dialog>

      <mwc-dialog id="dialog-goods-error" heading="오류!">
        <p>상품을 추가하던 도중에 오류가 발생하였습니다.</p>
        <mwc-button slot="primaryAction" dialogAction="discard">
          확인
        </mwc-button>
      </mwc-dialog>
    `;
  }

  onPlusButtonClicked() {
    const dialog = this.shadowRoot?.getElementById('dialog');
    dialog?.setAttribute('open', '');
  }

  onActionButtonClicked() {
    const tfName = this.shadowRoot?.getElementById('tf-name') as TextField;
    const tfPrice = this.shadowRoot?.getElementById('tf-price') as TextField;
    const tfEa = this.shadowRoot?.getElementById('tf-ea') as TextField;

    if (tfName && !tfName.checkValidity()) {
      tfName.reportValidity();
      return;
    }

    if (tfPrice && !tfPrice.checkValidity()) {
      tfPrice.reportValidity();
      return;
    }

    if (tfEa && !tfEa.checkValidity()) {
      tfEa.reportValidity();
      return;
    }

    const goods: Goods = new Goods();
    goods.name = tfName.value;
    goods.price = Number.parseInt(tfPrice.value);
    goods.ea = Number.parseInt(tfEa.value);

    createGoods(goods, g => {
      tfName.value = '';
      tfPrice.value = '';
      tfEa.value = '';

      const dialog = this.shadowRoot?.getElementById('dialog') as Dialog;
      if (dialog) dialog.close();

      if (!g || g.id == '') {
        const dialogGoodsError = this.shadowRoot?.getElementById(
          'dialog-goods-error'
        ) as Dialog;
        if (dialogGoodsError) dialogGoodsError.setAttribute('open', '');
        return;
      }
      this.order.goods.push(g);
      this.requestUpdate();
    });
  }
}
