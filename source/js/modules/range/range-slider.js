export class RangeSlider {
  constructor(rangeSliderElement, value) {
    this.element = rangeSliderElement;
    this.percent = 1;
    this.value = value;
    this.min = rangeSliderElement.min;
    this.max = rangeSliderElement.max;
    this.update = this.update;
    this.init = this.init;
  }

  updateGradient() {
    let percent = Math.trunc((this.value - this.min) / (this.max - this.min) * 100);

    if (this.percent === 0) {
      percent = 1;
    }

    if (this.value !== this.min || this.value !== this.max) {
      this.element.style.background = `linear-gradient(to right, #ff9514 ${percent}%, #e1e1e1 ${percent}%)`;
    }
  }

  update() {
    this.value = +this.element.value;

    this.updateGradient();
  }

  init() {
    this.element.min = this.min;
    this.element.max = this.max;
    this.element.value = this.value;

    this.update();
  }
}
