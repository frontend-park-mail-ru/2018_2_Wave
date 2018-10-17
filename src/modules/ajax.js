import bus from './bus';


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
} = {}) {
  const URI = URL + path;
  const params = {
    method,
    body: (body instanceof FormData) ? body : JSON.stringify(body),
    mode: 'cors',
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
        const error = {
          status,
          type: codeType,
          message: response.statusText,
          event: errorEvent,
          body: response.text() ? response.json() : {},
        };
        // if (errorEvent && !error.body) bus.emit(errorEvent);
        throw error;
      } else return response.text();
    })
    .then(text => (text ? JSON.parse(text) : {}));
}


function GET(params = {}) {
  return ajax({ ...params, method: 'GET' });
}

function POST(params = {}) {
  return ajax({ ...params, method: 'POST' });
}


const AjaxModule = { GET, POST };
export { AjaxModule as default };
