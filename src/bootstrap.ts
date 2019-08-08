import App from './app';

function init () {
  return new App();
}

window.addEventListener('load', _ => {
  if (!('customElements' in self)) {
    return import('@webcomponents/custom-elements').then(init);
  }

  init();
});
