import BackendURI from './backend';

const noop = () => null;

function ajax({
  callback = noop,
  method = 'GET',
  path = '/',
  body,
} = {}) {
  // когда у нас появятся данные не в формах
  if (!(body instanceof FormData)) {
    body = JSON.stringify(body);
  }

  fetch(BackendURI(path), {
    method,
    body,
    mode: 'cors',
    credentials: 'include',
  }).then(callback);
}

function Get(params = {}) {
  ajax({ ...params, method: 'GET' });
}

function Post(params = {}) {
  ajax({ ...params, method: 'POST' });
}

function Put(params = {}) {
  ajax({ ...params, method: 'PUT' });
}

function Head(params = {}) {
  ajax({ ...params, method: 'HEAD' });
}

const AjaxModule = {
  Get,
  Post,
  Put,
  Head,
};

export default AjaxModule;
