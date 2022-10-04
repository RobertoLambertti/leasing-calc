import {askResponse} from './../../utils/ask-response';
import {digitizeValue} from '../../utils/digitaze-value';
import {Button} from '../button';

export class Form {
  constructor(formElement) {
    this.element = formElement;
    this.sumElement = formElement.querySelector('[data-form-sum]');
    this.initialElement = formElement.querySelector('[data-form-initial]');
    this.termElement = formElement.querySelector('[data-form-term]');
    this.submit = new Button(formElement.querySelector('[data-form-submit]'));
    this.url = formElement.action;
    this.isValid = true;

    this.init = this.init;
  }

  validateField(field, min, max, minMessage, maxMessage) {
    const value = digitizeValue(field.value);

    if (value < min) {
      field.valid = false;
      field.setCustomValidity(minMessage);
    } else if (value > max) {
      field.valid = false;
      field.setCustomValidity(maxMessage);
    } else {
      field.valid = true;
      field.setCustomValidity('');
    }

    return field.valid;
  }


  validateSum() {
    const minMessage = 'Сейчас машины стоят от 2 000 000 ₽';
    const maxMessage = 'Не наглей, мы тебе столько не дадим... Введи число до 6 000 000 ₽';

    return this.validateField(this.sumElement, this.sumElement.dataset.min, this.sumElement.dataset.max, minMessage, maxMessage);
  }

  validateInitial() {
    const minMessage = 'Чтобы мы дали тебе денег, у тебя должны быть деньги. Минимальная взнос 10%';
    const maxMessage = 'Мы слишком мало заработаем если твой взнос будет больше 60%';

    return this.validateField(this.initialElement, this.initialElement.min, this.initialElement.max, minMessage, maxMessage);
  }

  validateTerm() {
    const minMessage = 'Если ты возьмешь на такой срок, мы не заработаем. Минимальный срок 1 месяц';
    const maxMessage = 'Слишком долго ждать от тебя денег. Максимальный срок 60 месяцев';

    return this.validateField(this.termElement, this.termElement.dataset.min, this.termElement.dataset.max, minMessage, maxMessage);
  }

  validate() {
    this.isValid = (this.validateSum() && this.validateInitial() && this.validateTerm()) ? true : false;
  }

  fieldsChangeHandler() {
    this.validate();
  }

  resultSubmitHandler() {
    this.submit.change();
    this.changeInputsDisabled(false);
  }

  changeInputsDisabled(disabled) {
    const inputs = this.element.querySelectorAll('input');
    for (let input of inputs) {
      input.disabled = disabled;
    }
  }

  convertDataToJson(data) {
    const formDataObj = {};

    for (let key of data.keys()) {
      formDataObj[key] = digitizeValue(data.get(key));
    }

    return JSON.stringify(formDataObj);
  }

  submitHundler(evt) {
    evt.preventDefault();

    this.validate();

    if (this.isValid) {
      this.submit.change();
      this.changeInputsDisabled(true);

      const data = this.convertDataToJson(new FormData(this.element));
      askResponse('POST', this.url, this.resultSubmitHandler.bind(this), this.resultSubmitHandler.bind(this), data);
    }
  }

  addListeners() {
    this.element.addEventListener('submit', this.submitHundler.bind(this));
    this.sumElement.addEventListener('input', this.fieldsChangeHandler.bind(this));
    this.initialElement.addEventListener('input', this.fieldsChangeHandler.bind(this));
    this.termElement.addEventListener('input', this.fieldsChangeHandler.bind(this));
  }

  init() {
    this.validate();
    this.addListeners();
  }
}
