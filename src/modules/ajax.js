import bus from './bus';


const URL = 'http://api.localhost:3000';

// errors which are handled by another modules
const errorEvents = {
  401: 'unauthorized',
  500: 'serverError',
  502: 'badGateway',
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
} = {}) {
  const URI = URL + path;
  const params = {
    method,
    body: (body instanceof FormData) ? body : JSON.stringify(body),
    credentials: 'include',
  };

  return fetch(URI, params)
    .then((response) => {
      const { status } = response;
      const codeType = getCodeType(status);

      if (codeType === 'Server Error'
      ||  codeType === 'Client Error'
      ||  codeType === 'Unknown') {
        const errorEvent = errorEvents[status];
        const responseBody = response.text();
        const error = {
          status,
          type: codeType,
          message: response.statusText,
          event: errorEvent,
          body: responseBody ? JSON.stringify(responseBody) : {},
        };
        if (errorEvent && !error.body) bus.emit(errorEvent);
        return Promise.reject(error);
      }
      return response.text();
    })
    .then(text => (text ? JSON.parse(text) : {}));
}


const AjaxModule = {
  GET:    (params = {}) => ajax({ ...params, method: 'GET'    }),
  POST:   (params = {}) => ajax({ ...params, method: 'POST'   }),
  PUT:    (params = {}) => ajax({ ...params, method: 'PUT'    }),
  DELETE: (params = {}) => ajax({ ...params, method: 'DELETE' }),
};


export { AjaxModule as default };
