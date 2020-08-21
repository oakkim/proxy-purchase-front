import { LitElement, html, css, property } from 'lit-element';
import '@material/mwc-button';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-dialog';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-fab';
import { Tab } from '@material/mwc-tab';
import { TabBar } from '@material/mwc-tab-bar';

export class ProxyPurchase extends LitElement {
  @property({ type: String }) page = 'main';

  @property({ type: String }) title = '';

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .hide {
      display: none;
      visibility: hidden;
    }

    #auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    #order-list {
      width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    #tab-bar {
      box-shadow: 0px -5px -5px rgba(0, 0, 0, 0.034);
      background-color: white;
      width: 100%;
      position: fixed;
      bottom: 0px;
      z-index: 999;
    }
  `;

  render() {
    const id: string | null = window.localStorage.getItem('user-id');
    return html`
      <div style="height: 100%;">
        <mwc-top-app-bar-fixed id="bar" class="${id ? '' : 'hide'}">
          <div slot="title" id="title">대리구매</div>

          <div id="main">
            <mwc-tab-bar id="tab-bar">
              <mwc-tab
                id="tab-list-order"
                label="주문 리스트"
                icon="list"
                stacked
                isMinWidthIndicator
                @click=${this.showListView}
              ></mwc-tab>
              <mwc-tab
                id="tab-create-order"
                label="주문 만들기"
                icon="add_circle"
                stacked
                isMinWidthIndicator
                @click=${this.showCreateView}
              ></mwc-tab>
              <mwc-tab
                id="tab-show-my-order"
                label="내 주문 보기"
                icon="account_circle"
                stacked
                isMinWidthIndicator
                @click=${this.showMyOrderView}
              ></mwc-tab>
            </mwc-tab-bar>

            <order-list-view
              id="order-list-view"
              @floatingButtonClick=${this.showCreateView}
            ></order-list-view>
            <order-create-view
              id="order-create-view"
              class="hide"
            ></order-create-view>
          </div>
        </mwc-top-app-bar-fixed>

        <div id="auth-container" class="${id ? 'hide' : ''}">
          <auth-view
            @loginSucceed="${this.onLoginSucceed}"
            @loginFailed="${this.onLoginFailed}"
          />
        </div>

        <mwc-dialog id="dialog-login-failed">
          <div>
            로그인에 실패하였습니다.<br />
            아이디와 비밀번호를 다시 한번 확인해주세요.
          </div>
          <mwc-button slot="primaryAction" dialogAction="discard">
            확인
          </mwc-button>
        </mwc-dialog>
      </div>
    `;
  }

  onLoginSucceed(e: CustomEvent) {
    const bar = this.shadowRoot?.getElementById('bar');
    const authContainer = this.shadowRoot?.getElementById('auth-container');
    if (bar) bar.className = '';
    if (authContainer) authContainer.className = 'hide';
    // Cookies.set('logined', e.detail.id);
    window.localStorage.setItem('user-id', e.detail.id);
  }

  onLoginFailed() {
    const dialog = this.shadowRoot?.getElementById('dialog-login-failed');
    dialog?.setAttribute('open', '');
  }

  hideAllMenu() {
    const listView = this.shadowRoot?.getElementById('order-list-view');
    const createView = this.shadowRoot?.getElementById('order-create-view');

    if (listView) listView.className = 'hide';
    if (createView) createView.className = 'hide';
  }

  showListView() {
    this.hideAllMenu();
    const listView = this.shadowRoot?.getElementById('order-list-view');
    if (listView) listView.className = '';

    const tabBar = this.getTabBar();
    if (tabBar) tabBar.activeIndex = 0;
  }

  showCreateView() {
    this.hideAllMenu();
    const createView = this.shadowRoot?.getElementById('order-create-view');
    if (createView) createView.className = '';

    const tabBar = this.getTabBar();
    if (tabBar) tabBar.activeIndex = 1;
  }

  showMyOrderView() {
    this.hideAllMenu();
    const tabBar = this.getTabBar();
    if (tabBar) tabBar.activeIndex = 2;
  }

  getTabBar(): TabBar {
    return this.shadowRoot?.getElementById('tab-bar') as TabBar;
  }
}

/*
<mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
          <div slot="title" id="title">Title</div>
          <mwc-icon-button icon="file_download" slot="actionItems" class="notCenter"></mwc-icon-button>
          <mwc-icon-button icon="print" slot="actionItems" class="notCenter"></mwc-icon-button>
          <mwc-icon-button icon="favorite" slot="actionItems"></mwc-icon-button>
          <div id="content">
            <div>
              <mwc-button
                  id="prominentButton"
                  outlined
                  label="toggle prominent">
              </mwc-button>
              <mwc-button
                  id="centerButton"
                  outlined
                  label="toggle centerTitle">
              </mwc-button>
              <mwc-button
                  id="denseButton"
                  outlined
                  label="toggle dense">
              </mwc-button>
              <mwc-button
                  id="customButton"
                  outlined
                  label="toggle custom styles">
              </mwc-button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
*/
