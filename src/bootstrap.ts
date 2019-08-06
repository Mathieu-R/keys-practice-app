declare module '@webcomponents/custom-elements';

import AppKey from './components/app-key';
import AppToast from './components/app-toast';

navigator.serviceWorker.register('/service-worker.js');

class App {
  constructor () {
    this.installServiceWorker();
    this.checkWebComponentsAreSupported();
  }

  private installServiceWorker () {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      return;
    }

    navigator.serviceWorker.register('/service-worker.js');
  }

  private checkWebComponentsAreSupported () {
    if (!('customElements' in self)) {
      import('@webcomponents/custom-elements');
    }
  }

}

window.addEventListener('load', _ => new App());
