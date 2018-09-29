const noop = () => null;

function ajax({
  callback = noop,
  method = 'GET',
  path = '/',
  body,
} = {}) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, path, true);
  xhr.withCredentials = true;

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    callback(xhr);
  };

  if (body instanceof FormData) {
    // FormData sets RequestHeader automatically!
    xhr.send(body);
  } else if (body) {
    xhr.setRequestHeader(
      'Content-Type', 'application/json; charset=utf-8',
    );
    xhr.send(JSON.stringify(body));
  }
}

function doGet(params = {}) {
  ajax({ ...params, method: 'GET' });
}

function doPost(params = {}) {
  ajax({ ...params, method: 'POST' });
}


const AjaxModule = {
  doGet,
  doPost,
};

export default AjaxModule;
