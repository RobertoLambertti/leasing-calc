import {convertToCurrent} from '../../utils/convert-to-current';

export class CalcContract {
  constructor(contractElement) {
    this.element = contractElement;
    this.value = 0;

    this.update = this.update;
  }

  update(newInitial, newTerm, newPayment) {
    this.value = newInitial + newTerm * newPayment;
    this.element.value = convertToCurrent(this.value);
  }
}
