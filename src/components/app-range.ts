import idbKeyVal from 'idb-keyval';

interface RangeOptions {
  min: number;
  max: number;
  bpm: number;
}

export default class AppRange extends HTMLElement {
  private rangeInput: HTMLInputElement;
  private innerRound: HTMLElement;
  private round: HTMLElement;
  private track: HTMLElement;
  private tooltip: HTMLElement;
  private rangeOptions: RangeOptions;

  constructor () {
    super();

    this.highlight = this.highlight.bind(this);
    this.unhighlight = this.unhighlight.bind(this);
    this.onChange = this.onChange.bind(this);

    this.rangeInput = this.querySelector('.range__input')! as HTMLInputElement;
    this.innerRound = this.querySelector('.range_round')! as HTMLElement;
    this.round = this.querySelector('.range__round-container')! as HTMLElement;
    this.track = this.querySelector('range__track')! as HTMLElement;
    this.tooltip = this.querySelector('range__tooltip')! as HTMLElement;

    // for now we will be using seconds (e.g. each 5 sec, one chord is shown)
    // better would be BPM
    this.rangeOptions = {
      min: 0,
      max: 30,
      bpm: 5 // useful to keep in there ?
    };
  }

  get isShowTooltip (): string | null {
    return this.getAttribute('show-tooltip');
  }

  connectedCallback () {
    if (this.isShowTooltip) {
      this.tooltip.classList.add('range__tooltip--visible');
    }

    this.addEventListeners();
  }

  addEventListeners() {
    this.rangeInput.addEventListener('input', this.onChange);
    this.rangeInput.addEventListener('mousedown', this.highlight);
    this.rangeInput.addEventListener('mouseup', this.unhighlight);
    this.rangeInput.addEventListener('touchstart', this.showBigRound);
    this.rangeInput.addEventListener('touchend', this.removeBigRound);
  }

  getLastUsedBPM () {
    // get last used values from idb
    idbKeyVal.get('bpm').then(bpm => {
      this.rangeOptions.bpm = bpm;
      // update ui
      this.update(bpm);
    });
  }

  saveLastUsedBPM (BPM: number) {
    // save into idb
    idbKeyVal.set('bpm', BPM);
  }

  highlight (evt: Event) {
    evt.target.focus();
    this.tooltip.classList.add('range__tooltip--active');
    this.innerRound.classList.add('highlight-round');
  }

  unhighlight (evt: Event) {
    evt.target.blur();
    this.tooltip.classList.remove('range__tooltip--active');
    this.innerRound.classList.remove('highlight-round');
  }

  onChange (evt: Event) {
    const { value } = this.rangeInput;
    this.saveLastUsedBPM(value);
    // this.props.onChange(parseInt(value, 10));
    requestAnimationFrame(() => this.update(value));
  }

  update (value: string) {
    const { min, max } = this.rangeInput;
    const position = (parseInt(value, 10) - parseInt(min, 10)) / (parseInt(max, 10) - parseInt(min, 10)); // [0, 1]
    this.track.style.transform = `translate(-50%, -50%) scaleX(${position})`;
    this.round.style.transform = `translateX(${position * 100}%)`;
  }

  // tslint:disable-next-line: no-empty
  attributeChangedCallback(name: string, oldVal: string, newVal: string): void {

  }

  disconnectedCallback () {
    this.rangeInput.removeEventListener('input', this.onChange);
    this.rangeInput.removeEventListener('mousedown', this.highlight);
    this.rangeInput.removeEventListener('mouseup', this.unhighlight);
    this.rangeInput.removeEventListener('touchstart', this.showBigRound);
    this.rangeInput.removeEventListener('touchend', this.removeBigRound);
  }
}

customElements.define('app-range', AppRange);
