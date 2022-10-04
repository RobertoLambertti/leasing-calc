import {RangeField} from './range-field';
import {RangeSlider} from './range-slider';


export class Range {
  constructor(rangeElement) {
    this.element = rangeElement;
    this.field = new RangeField(this.element.querySelector('[data-range-field]'));
    this.slider = new RangeSlider(this.element.querySelector('[data-range-slider]'), this.field.value);
  }

  sliderChangeHandler() {
    this.slider.update();
    this.field.value = this.slider.value;
    this.field.element.value = this.field.value;
    this.field.update();
  }

  fieldChangeHandler() {
    this.field.update();
    this.slider.value = this.field.value;
    this.slider.element.value = this.slider.value;
    this.slider.update();
  }

  addListeners() {
    this.slider.element.addEventListener('input', this.sliderChangeHandler.bind(this));
    this.field.element.addEventListener('input', this.fieldChangeHandler.bind(this));
  }

  init() {
    this.slider.init();
    this.field.init();

    this.addListeners();
  }
}
