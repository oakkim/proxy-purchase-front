import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-textfield';
import { Order } from '../model/order.js';
import { User } from '../model/user.js';
import { Goods } from '../model/goods.js';

import '@material/mwc-dialog';

export class OrderCreateView extends LitElement {
  @property({ type: Object })
  order!: Order;

  @property({ type: Boolean })
  open = false;

  static styles = css`
    :host {
      height: 100%;
    }

    #main {
      width: 500px;
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

  render() {
    const user = new User();
    user.name = '김대용';

    const goods1 = new Goods();
    goods1.id = 'goods-1';
    goods1.ea = 4;
    goods1.name = '초코파이';
    goods1.price = 5000;

    const goods2 = new Goods();
    goods2.id = 'goods-2';
    goods2.ea = 2;
    goods2.name = '포카칩';
    goods2.price = 1500;

    this.order = new Order();
    this.order.id = 'a1-2-21-2-32';
    this.order.goods = [goods1, goods2];
    this.order.requester = user;
    this.order.commission = 1000;
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
            >${this.order?.goods?.reduce(
              (acc, cur) => (acc += cur.price * cur.ea),
              0
            )}원</span
          >
        </div>
        <div id="total-fee">
          <span>수수료 금액 : </span>
          <span style="float: right;"
            ><mwc-textfield label="수수료"></mwc-textfield>원</span
          >
        </div>
        <mwc-button raised label="생성" style="margin-left: 15px;"></mwc-button>
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
        <mwc-textfield id="tf-price" type="number" placeholder="가격" required>
        </mwc-textfield
        ><br />
        <mwc-textfield id="tf-ea" type="number" placeholder="개수" required>
        </mwc-textfield>

        <mwc-button id="primary-action-button" slot="primaryAction">
          추가
        </mwc-button>
        <mwc-button slot="secondaryAction" dialogAction="close">
          취소
        </mwc-button>
      </mwc-dialog>
    `;
  }

  onPlusButtonClicked() {
    const dialog = this.shadowRoot?.getElementById('dialog');
    dialog?.setAttribute('open', '');
  }
}
