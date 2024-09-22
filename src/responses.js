const respond = (request, response, status, content, type) => {
  // Set headers including type and length
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  // Write content and send back to client
  response.write(content);
  response.end();
};

const success = (request, response) => {
  const text = {
    header: 'Success',
    message: 'Message: This is a successful response',
  };
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} </response>'`;
  // check select menu
  if (request.acceptedTypes[0] === 'application/json') {
    return respond(request, response, 200, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 200, responseXML, 'text/xml');
  } // default (also accounts for URL)
  return respond(request, response, 200, JSON.stringify(text), 'application/json');
};

const badRequest = (request, response) => {
  const text = {
    header: 'Success',
    message: 'Message: This is a successful response',
  };
  if (!request.query.valid || request.query.valid !== 'true') {
    text.header = 'Bad Request';
    text.message = 'Missing valid query parameter set to true';
    text.id = 'badRequest';
  }
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    if (!request.query.valid || request.query.valid !== 'true') {
      return respond(request, response, 400, JSON.stringify(text), 'application/json');
    }
    return respond(request, response, 200, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    if (!request.query.valid || request.query.valid !== 'true') {
      return respond(request, response, 400, responseXML, 'text/xml');
    }
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  text.header = 'Bad Request';
  text.message = 'Missing valid query parameter set to true';
  text.id = 'badRequest';
  return respond(request, response, 400, JSON.stringify(text), 'application/json');
};

const unauthorized = (request, response) => {
  const text = {
    header: 'Success',
    message: 'Message: This is a successful response',
  };
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    text.header = 'Unauthorized';
    text.message = 'Missing loggedIn query parameter set to yes';
    text.id = 'unauthorized';
  }
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      return respond(request, response, 401, JSON.stringify(text), 'application/json');
    }
    return respond(request, response, 200, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      return respond(request, response, 401, responseXML, 'text/xml');
    }
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  text.header = 'Unauthorized';
  text.message = 'Missing loggedIn query parameter set to yes';
  text.id = 'unauthorized';
  return respond(request, response, 401, JSON.stringify(text), 'application/json');
};

const forbidden = (request, response) => {
  const text = {
    header: 'Forbidden',
    message: 'Message: You do not have access to this content.',
    id: 'forbidden',
  };
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} <id>${text.id}</id>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    return respond(request, response, 403, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 403, responseXML, 'text/xml');
  }
  return respond(request, response, 403, JSON.stringify(text), 'application/json');
};

const internal = (request, response) => {
  const text = {
    header: 'Internal Server Error',
    message: 'Message: Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} <id>${text.id}</id>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    return respond(request, response, 500, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 500, responseXML, 'text/xml');
  }
  return respond(request, response, 500, JSON.stringify(text), 'application/json');
};

const notImplemented = (request, response) => {
  const text = {
    header: 'Not Implemented',
    message: 'Message: A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} <id>${text.id}</id>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    return respond(request, response, 501, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 501, responseXML, 'text/xml');
  }
  return respond(request, response, 501, JSON.stringify(text), 'application/json');
};

const notFound = (request, response) => {
  const text = {
    header: 'Resource Not Found',
    message: 'Message: The page you are looking for was not found.',
    id: 'notFound',
  };
  let responseXML = '<response>';
  responseXML = `${responseXML} <header>${text.header}</header>`;
  responseXML = `${responseXML} <message>${text.message}</message>`;
  responseXML = `${responseXML} <id>${text.id}</id>`;
  responseXML = `${responseXML} </response>'`;
  if (request.acceptedTypes[0] === 'application/json') {
    return respond(request, response, 404, JSON.stringify(text), 'application/json');
  } if (request.acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 404, responseXML, 'text/xml');
  }
  return respond(request, response, 404, JSON.stringify(text), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
