(() => {
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

    if (body) {
      xhr.setRequestHeader(
        'Content-Type', 'application/json; charset=utf-8',
      );
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      callback(xhr);
    };

    if (body) {
      xhr.send(JSON.stringify(body));
    } else {
      xhr.send();
    }
  }

  function doGet(params = {}) {
    ajax({ ...params, method: 'GET' });
  }

  function doPost(params = {}) {
    ajax({ ...params, method: 'POST' });
  }


  window.AjaxModule = {
    doGet,
    doPost,
  };
})();
