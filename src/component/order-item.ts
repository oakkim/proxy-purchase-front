import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import { Order } from '../model/order.js';

export class OrderItem extends LitElement {
    inputId: string | null = "";
    inputPw: string | null = "";

    @property({ type: Object })
    order!: Order;

    static styles = css`
        #main {
            width: 500px;
            height: 300px;
            background: white;
            border: 1px solid lightgray;
            border-radius: 5px;
            padding-bottom: 35px;
            margin-bottom: 20px;
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
            margin: 0px 15px 15px 15px;
        }
    `;

    render() {
        return html`
            <div id="main">
                <div id="title">${this.order?.requestee?.name}님의 주문요청</div>
                <mwc-list>
                    ${this.order?.goods?.map(g => html`
                        <mwc-list-item twoline>
                            <span>${g.name}</span>
                            <span slot="secondary">${g.price}원, ${g.ea}개</span>
                        </mwc-list-item>
                    `)}
                </mwc-list>
                <div id="total-price">총 주문 금액 : ${this.order?.goods?.reduce((acc, cur) => acc += cur.price * cur.ea, 0)}원</div>
                <mwc-button raised label="수락" style="margin-left: 15px;"></mwc-button>
            </div>
        `;
    }
}
