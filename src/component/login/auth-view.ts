import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import { TextField } from '@material/mwc-textfield';

import { logIn } from '../../firebase/login-repository.js';

export class AuthView extends LitElement {
  inputId: string | null = '';
  inputPw: string | null = '';

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
          <mwc-textfield
            id="tf-email"
            type="email"
            label="이메일"
          ></mwc-textfield>
        </div>
        <div>
          <mwc-textfield
            id="tf-pw"
            type="password"
            label="비밀번호"
          ></mwc-textfield>
        </div>
        <div>
          <mwc-button
            id="btn-login"
            label="로그인"
            @click="${this.onLoginButtonClicked}"
          ></mwc-button>
        </div>
      </div>
    `;
  }

  onLoginButtonClicked() {
    const tfEmail: TextField = this.shadowRoot?.getElementById(
      'tf-email'
    ) as TextField;
    const tfPw: TextField = this.shadowRoot?.getElementById(
      'tf-pw'
    ) as TextField;
    this.tryLogin(tfEmail?.value, tfPw?.value);
  }

  tryLogin(email: string, pw: string) {
    logIn(
      email,
      pw,
      user => {
        const event: CustomEvent = new CustomEvent('loginSucceed', {
          detail: {
            id: user.id,
          },
        });

        this.dispatchEvent(event);
        return;
      },
      () => {
        const event: CustomEvent = new CustomEvent('loginFailed', {
          detail: {},
        });

        this.dispatchEvent(event);
      }
    );
  }
}
