// An function to 301 redirect webfinger to mastodon server
function handler(event) {
  var request = event.request
  var uri = request.uri;

  var hasQueryString = Object.keys(request.querystring).length > 0;

  // Check whether the URI is webfinger
  if (uri.endsWith('/.well-known/webfinger')) {
    return {
      statusCode: 302,
      statusDescription: 'Moved Permanently',
      headers:
        { "location": { "value": "https://pub.compti.me" + "/" + uri + (hasQueryString ? '?' + getURLSearchParamsString(request.querystring) : '') } }
    }
  }

  return request;
}

// Helper function to format query string parameters
function getURLSearchParamsString(querystring) {
  var str = [];

  for (var param in querystring) {
    var query = querystring[param];
    var multiValue = query.multiValue;

    if (multiValue) {
      str.push(multiValue.map((item) => param + '=' + item.value).join('&'));
    } else if (query.value === '') {
      str.push(param);
    } else {
      str.push(param + '=' + query.value);
    }
  }

  return str.join('&');
}
