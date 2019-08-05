export default class AppKey extends HTMLElement {
  constructor () {
    super();
  }

  get key () {
    return this.getAttribute('key');
  }
}

customElements.define('app-key', AppKey);
