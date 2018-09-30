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

  fetch(path, {
    method,
    body,
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


const AjaxModule = {
  Get,
  Post,
  Put,
};

export default AjaxModule;
