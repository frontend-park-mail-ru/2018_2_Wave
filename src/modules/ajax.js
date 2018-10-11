const { bus } = window;


const URL = 'https://rasseki.com';

// errors which are handled by another modules
const errorEvents = {
  401: 'unauthorized',
  500: 'serverError',
};

function getCodeType(statusCode) {
  let codeType;
  switch (parseInt(statusCode / 100, 10)) {
    case 1:  codeType = 'Informational'; break;
    case 2:  codeType = 'Success';       break;
    case 3:  codeType = 'Redirection';   break;
    case 4:  codeType = 'Client Error';  break;
    case 5:  codeType = 'Server Error';  break;
    default: codeType = 'Unknown';       break;
  }
  return codeType;
}


function ajax({
  method = 'GET',
  path = '/',
  body,
  callback = {
    success: () => null,
    failure: () => null,
  },
} = {}) {
  const URI = URL + path;
  const params = {
    method,
    body: (body instanceof FormData) ? body : JSON.stringify(body),
    mode: 'cors',
    credentials: 'include',
  };

  fetch(URI, params)
    .then((response) => {
      const { status } = response;
      const codeType = getCodeType(status);

      if (codeType === 'Server Error'
      ||  codeType === 'Client Error'
      ||  codeType === 'Unknown') {
        const errorEvent = errorEvents[status];
        const error = { status, codeType, errorEvent };
        if (errorEvent) bus.emit(errorEvent);
        throw error;
      } else {
        return response.text();
      }
    })
    .then(text => (text ? JSON.parse(text) : {}))
    .then(data => callback.success(data))
    .catch(error => callback.failure(error));
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
