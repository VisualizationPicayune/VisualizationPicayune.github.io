
// -------------------------------------------------------
// Dropbox authentication and saving
// -------------------------------------------------------

var dropbox_client = new Dropbox.Client({ key: "cy7jq9ml5ykcy6v" })

var showError = function(error) {
  console.log(error)
  switch (error.status) {
  case Dropbox.ApiError.INVALID_TOKEN:
    // If you're using dropbox.js, the only cause behind this error is that
    // the user token expired.
    // Get the user through the authentication flow again.
    break;

  case Dropbox.ApiError.NOT_FOUND:
    // The file or folder you tried to access is not in the user's Dropbox.
    // Handling this error is specific to your application.
    break;

  case Dropbox.ApiError.OVER_QUOTA:
    // The user is over their Dropbox quota.
    // Tell them their Dropbox is full. Refreshing the page won't help.
    break;

  case Dropbox.ApiError.RATE_LIMITED:
    // Too many API requests. Tell the user to try again later.
    // Long-term, optimize your code to use fewer API calls.
    break;

  case Dropbox.ApiError.NETWORK_ERROR:
    // An error occurred at the XMLHttpRequest layer.
    // Most likely, the user's network connection is down.
    // API calls will not succeed until the user gets back online.
    break;

  case Dropbox.ApiError.INVALID_PARAM:
  case Dropbox.ApiError.OAUTH_ERROR:
  case Dropbox.ApiError.INVALID_METHOD:
  default:
    // Caused by a bug in dropbox.js, in your application, or in Dropbox.
    // Tell the user an error occurred, ask them to refresh the page.
  }
}

function dropbox_authenticate(client) {
  client.authenticate(function(error, client) {
    if (error) {
    // Replace with a call to your own error-handling code.
    //
    // Don't forget to return from the callback, so you don't execute the code
    // that assumes everything went well.
        console.log("auth")
        return showError(error);
    }
  client.readFile("axe.txt", function(error, data) {
    console.log("read")
    if (error) {
      return showError(error);  // Something went wrong.
    } else {
        console.log(data)
    }
  })
 })
}


function update_dropbox(text,client) {
  client.writeFile("testing.txt", "1 2 3", function(error) {
    if (error) {
      return showError(error);  // Something went wrong.
    }
  })
}

dropbox_authenticate(dropbox_client)