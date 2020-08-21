import { ProxyPurchase } from './ProxyPurchase.js';
import { AuthView } from './component/login/auth-view.js';
import { OrderItem } from './component/order-item.js';
import { OrderCreateView } from './component/order-create-view.js';
import { OrderListView } from './component/order-list-view.js';

customElements.define('proxy-purchase', ProxyPurchase);
customElements.define('auth-view', AuthView);
customElements.define('order-item', OrderItem);
customElements.define('order-create-view', OrderCreateView);
customElements.define('order-list-view', OrderListView);
