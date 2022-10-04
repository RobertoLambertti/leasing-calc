import {digitizeValue} from '../../utils/digitaze-value';
import {CalcInitial} from './calc-initial';
import {CalcPayment} from './calc-payment';
import {CalcContract} from './calc-contract';

export class Calc {
  constructor(calcElement) {
    this.element = calcElement;
    this.sum = {
      fieldElement: calcElement.querySelector('[type=text][data-calc-sum]'),
      sliderElement: calcElement.querySelector('[type=range][data-calc-sum]'),
      value: 0,
      min: 0,
      max: 0,
    };
    this.initialPercent = {
      fieldElement: calcElement.querySelector('[type=number][data-calc-initial-percent]'),
      sliderElement: calcElement.querySelector('[type=range][data-calc-initial-percent]'),
      value: 0,
      min: 0,
      max: 0,
    };
    this.term = {
      fieldElement: calcElement.querySelector('[type=text][data-calc-term]'),
      sliderElement: calcElement.querySelector('[type=range][data-calc-term]'),
      value: 0,
      min: 0,
      max: 0,
    };
    this.initial = new CalcInitial(this.element.querySelector('[data-calc-initial]'));
    this.payment = new CalcPayment(this.element.querySelector('[data-calc-payment]'));
    this.contract = new CalcContract(this.element.querySelector('[data-calc-contract]'));

    this.sum.value = digitizeValue(this.sum.fieldElement.value);
    this.sum.min = +this.sum.fieldElement.dataset.min;
    this.sum.max = +this.sum.fieldElement.dataset.max;

    this.initialPercent.value = digitizeValue(this.initialPercent.fieldElement.value);
    this.initialPercent.min = +this.initialPercent.fieldElement.min;
    this.initialPercent.max = +this.initialPercent.fieldElement.max;

    this.term.value = digitizeValue(this.term.fieldElement.value);
    this.term.min = +this.term.fieldElement.dataset.min;
    this.term.max = +this.term.fieldElement.dataset.max;
  }

  preventAbroad(obj) {
    if (obj.value > obj.max) {
      obj.value = obj.max;
    } else if (obj.value < obj.min) {
      obj.value = obj.min;
    } else {
      obj.value = obj.value;
    }
  }

  update() {
    this.sum.value = digitizeValue(this.sum.fieldElement.value);
    this.initialPercent.value = +this.initialPercent.fieldElement.value;
    this.term.value = digitizeValue(this.term.fieldElement.value);

    this.preventAbroad(this.sum);
    this.preventAbroad(this.initialPercent);
    this.preventAbroad(this.term);

    this.initial.update(this.sum.value, this.initialPercent.value);
    this.payment.update(this.sum.value, this.initial.value, this.term.value);
    this.contract.update(this.initial.value, this.term.value, this.payment.value);
  }

  addListeners() {
    this.sum.fieldElement.addEventListener('input', this.update.bind(this));
    this.sum.sliderElement.addEventListener('input', this.update.bind(this));
    this.initialPercent.fieldElement.addEventListener('input', this.update.bind(this));
    this.initialPercent.sliderElement.addEventListener('input', this.update.bind(this));
    this.term.fieldElement.addEventListener('input', this.update.bind(this));
    this.term.sliderElement.addEventListener('input', this.update.bind(this));
  }

  init() {
    this.update();
    this.addListeners();
  }
}
