import AppKey from './components/app-key';
import AppToast from './components/app-toast';

navigator.serviceWorker.register('/service-worker.js');

class App {
  constructor () {
    this.installServiceWorker();
  }

  installServiceWorker () {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      return;
    }

    navigator.serviceWorker.register('/service-worker.js');
  }
}

window.addEventListener('load', _ => new App());
