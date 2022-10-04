import {convertToCurrent} from '../../utils/convert-to-current';

export class CalcInitial {
  constructor(initialElement) {
    this.element = initialElement;
    this.value = 0;

    this.update = this.update;
  }

  update(newSum, newPercent) {
    this.value = newSum / 100 * newPercent;
    this.element.textContent = convertToCurrent(this.value);
  }
}
