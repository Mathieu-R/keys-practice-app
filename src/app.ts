import AppKey from './components/app-key';
import AppToast from './components/app-toast';

class App {
  constructor () {
    this.installServiceWorker();
  }

  private installServiceWorker () {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      return;
    }

    navigator.serviceWorker.register('/service-worker.js');
  }
}

export default App;