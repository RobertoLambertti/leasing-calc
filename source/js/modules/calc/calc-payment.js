import {convertToCurrent} from '../../utils/convert-to-current';

export class CalcPayment {
  constructor(paymentElement) {
    this.element = paymentElement;
    this.value = 0;

    this.update = this.update;
  }

  update(newSum, newPercent, newTerm) {
    const PERCENT = 0.035;
    this.value = Math.round((newSum - newPercent) * ((PERCENT * Math.pow((1 + PERCENT), newTerm)) / (Math.pow((1 + PERCENT), newTerm) - 1)));
    this.element.value = convertToCurrent(this.value);
  }
}
