import {Form} from './form';

const initForm = () => {
  const elements = document.querySelectorAll('[data-form]');

  for (let i = 0; i < elements.length; i++) {
    const form = new Form(elements[i]);
    form.init();
  }
};

export {initForm};
