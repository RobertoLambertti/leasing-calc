export class Button {
  constructor(buttonElement) {
    this.element = buttonElement;
    this.textElement = buttonElement.querySelector('.button__text');
    this.text = buttonElement.textContent;
    this.width = buttonElement.offsetWidth;

    this.change = this.change;
  }

  change() {
    this.element.classList.toggle('is-loading');

    if (this.element.classList.contains('is-loading')) {
      this.element.disabled = true;
      this.textElement.textContent = 'Загрузка';

    } else {
      this.element.disabled = false;
      this.textElement.textContent = this.text;
    }

    this.element.style.width = `${this.width}px`;
  }
}
