import {Calc} from './calc';

const initCalc = () => {
  const elements = document.querySelectorAll('[data-calc]');

  for (let i = 0; i < elements.length; i++) {
    const culc = new Calc(elements[i]);

    culc.init();
  }
};

export {initCalc};
