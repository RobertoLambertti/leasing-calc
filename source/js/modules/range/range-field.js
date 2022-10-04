import {digitizeValue} from './../../utils/digitaze-value';

export class RangeField {
  constructor(rangeFieldElement) {
    this.element = rangeFieldElement;
    this.value = rangeFieldElement.value;
    this.update = this.update;
    this.init = this.init;
  }

  update() {
    this.value = digitizeValue(this.element.value);
    this.element.value = this.value.toLocaleString();
  }

  init() {
    this.update();
  }
}
