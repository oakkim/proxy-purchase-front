import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-textfield';
import { TextField } from '@material/mwc-textfield';

export class AuthView extends LitElement {

    inputId: string | null = "";
    inputPw: string | null = "";

    static styles = css`
        #main {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 500px;
            height: 300px;
            background: white;
            border: 1px solid lightgray;
        }

        #btn-login {
            margin-top: 10px;
        }
    `;

    render() {
        return html`
            <div id="main">
                <div style="margin-bottom: 10px;">
                    <mwc-textfield id="tf-id" label="아이디"></mwc-textfield>
                </div>
                <div>
                    <mwc-textfield id="tf-pw" type="password" label="비밀번호"></mwc-textfield>
                </div>
                <div>
                    <mwc-button id="btn-login" label="로그인" @click="${this.onLoginButtonClicked}"></mwc-button>
                </div>
            </div>
        `;
    }



    onLoginButtonClicked() {
        const tfId: TextField = this.shadowRoot?.getElementById("tf-id") as TextField;
        const tfPw: TextField = this.shadowRoot?.getElementById("tf-pw") as TextField;
        if (this.tryLogin(tfId?.value, tfPw?.value)) {
            const event: CustomEvent = new CustomEvent('loginSucceed', {
                detail: {
                    id: tfId?.value
                }
            });

            this.dispatchEvent(event);
            return;
        }
        const event: CustomEvent = new CustomEvent('loginFailed', {
            detail: {
                
            }
        });

        this.dispatchEvent(event);
    }

    tryLogin(id: string, pw: string): boolean {
        return id == "01rlaeodyd" && pw == "1234";
    }
}

