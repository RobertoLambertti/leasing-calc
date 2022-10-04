import {Range} from './range';

const initRange = () => {
  const elements = document.querySelectorAll('[data-range]');

  for (let i = 0; i < elements.length; i++) {
    const range = new Range(elements[i]);

    range.init();
  }
};

export {initRange};
