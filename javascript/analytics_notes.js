// Load analytics.js
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-XXXX-Y', 'auto');

ga('set', 'expId', experiment_id')     // The id of the experiment the user has been exposed to.


function on_pick(picked) {
  ga('set', 'expVar', picked) // The index of the chosen entry

  ga('send', 'pageview') // Send the data to Google Analytics
  
  
  
  
To send an event, you pass the ga function the send command with the event hit type

ga('send', 'event', 'button', 'click', 'nav buttons', 4);
Where:

button is the category
click is the action
nav buttons is the label
4 is the value
You can also send events using the following convenience commands. In each command, the optional parameters have been removed.

ga('send', 'event', 'category', 'action');
ga('send', 'event', 'category', 'action', 'label');
ga('send', 'event', 'category', 'action', 'label', value);  // value is a number.


For example, you might want to set the page field for a particular event. You do this using:

ga('send', 'event', 'category', 'action', {'page': '/my-new-page'});
Similarly, you might want to send an event, but not impact your bounce rate. This is easily solved by configuring the event to be a non-interaction event using the following code:

ga('send', 'event', 'category', 'action', {'nonInteraction': 1});
Finally, all the parameters of the send command have their own field names. So you can send an event by only passing a field object to the send command:

ga('send', {
  'hitType': 'event',          // Required.
  'eventCategory': 'button',   // Required.
  'eventAction': 'click',      // Required.
  'eventLabel': 'nav buttons',
  'eventValue': 4
});

var downloadLink = document.getElementById('button');
addListener(downloadLink, 'click', function() {
  ga('send', 'event', 'button', 'click', 'nav-buttons');
});


/**
 * Utility to wrap the different behaviors between W3C-compliant browsers
 * and IE when adding event handlers.
 *
 * @param {Object} element Object on which to attach the event listener.
 * @param {string} type A string representing the event type to listen for
 *     (e.g. load, click, etc.).
 * @param {function()} callback The function that receives the notification.
 */
function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}

<button id="button">Please click</button>

ga('send', 'event', 'category', 'action', {
  'dimension3': "yo, team"
});

ga('send', 'event', 'category', 'action', {
  'metric18': 8000
});
If the custom metric is configured to have a currency type, you can send decimal values:

ga('send', 'event', 'category', 'action', {
  'metric19': 24.99
});

var dimensionValue = 'SOME_DIMENSION_VALUE';
ga('set', 'dimension1', dimensionValue);


ga('create', 'UA-XXXX-Y', 'none');
