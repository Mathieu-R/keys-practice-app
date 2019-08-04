class App {
  constructor () {
    this.installServiceWorker();
  }

  installServiceWorker () {
    if (!process.env.PRODUCTION) {
      return;
    }

    if ('ServiceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
    }
  }
}

window.addEventListener('load', _ => new App());
