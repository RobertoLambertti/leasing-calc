export const askResponse = (typeRequest, url, onSuccess, onError, data) => {
  const TIMEOUT = 2000;
  const STATUS_CODE_OK = 200;
  const RESPONSE_TYPE_JSON = 'json';

  const xhr = new XMLHttpRequest();
  xhr.responseType = RESPONSE_TYPE_JSON;

  xhr.addEventListener('load', function () {
    if (xhr.status === STATUS_CODE_OK) {
      // console.log(xhr.response);
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener('error', function () {
    if (typeRequest === 'POST') {
      onError('Произошла ошибка соединения');
    } else {
      onError('Произошла ошибка соединения. Попробуйте перезагрузить страницу');
    }
  });

  xhr.addEventListener('timeout', function () {
    onError(`Не удалось получить ответ от сервера за ${xhr.timeout}мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(typeRequest, url);

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};
