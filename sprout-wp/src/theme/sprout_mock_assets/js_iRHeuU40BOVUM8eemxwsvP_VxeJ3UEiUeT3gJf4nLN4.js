/**
 * @file
 * Javascript behaviors and helpers for modules/fb.
 */

FB_JS = function(){};
FB_JS.fbu = null; // Detect session changes
FB_JS.ignoreEvents = false; // Hack makes login status test possible
FB_JS.reloadParams = {}; // Pass data to drupal when reloading

FB_JS.fbu = null;

if (!window.Node) { // IE
  FB_JS.DOCUMENT_NODE = 9;
}
else {
  FB_JS.DOCUMENT_NODE = window.Node.DOCUMENT_NODE;
}

/**
 * Drupal behaviors hook.
 * Called when page is loaded, or content added via javascript.
 */
(function ($) {
  Drupal.behaviors.fb = {
    attach : function(context) {
      FB_JS.drupalBehaviors(context);
    }
  };
})(jQuery);

/**
 * Called when page is loaded, or content added via javascript.
 */
FB_JS.drupalBehaviors = function(context) {

  // Sanity check.
  if (!Drupal.settings.fb) {
    // Reach here when Drupal footer is not rendered in page template.
    Drupal.settings.fb = {};
  }

  // Respond to our jquery pseudo-events
  var events = jQuery(document).data('events');
  if (!events || !events.fb_session_change) {
    jQuery(document).bind('fb_session_change', FB_JS.sessionChangeHandler);
  }

  // If FB is not yet initialized, fbAsyncInit() will be called when it is.
  if (typeof(FB) != 'undefined') {
    // Render any XFBML markup that may have been added by AJAX.
    jQuery(context).each(function() {
      var elem = jQuery(this).get(0);
      if (elem.nodeType == FB_JS.DOCUMENT_NODE) { // Popups are entire document.
        // FB.XFBML.parse() fails if passed document.  Pass body element instead.
        elem = jQuery(context).find('body').get(0);
      }

      try {
        FB.XFBML.parse(elem);
      }
      catch(error) {
        jQuery.event.trigger('fb_devel', error);
      }
    });

    FB_JS.showConnectedMarkup(Drupal.settings.fb.fbu, context);
  }

  // Markup with class .fb_show should be visible if javascript is enabled.  .fb_hide should be hidden.
  jQuery('.fb_hide', context).hide();
  jQuery('.fb_show', context).show();

  if (Drupal.settings.fb.fb_reloading) {
    // The reloading flag helps us avoid infinite loops.  But will accidentally prevent a reload in some cases. We really want to prevent a reload for a few seconds.
    setTimeout(function() {
      Drupal.settings.fb.fb_reloading = false;
    }, 5000);
  }
};

if (typeof(window.fbAsyncInit) != 'undefined') {
  // There should be only one definition of fbAsyncInit!
  jQuery.event.trigger('fb_devel', {});
};

window.fbAsyncInit = function() {

  if (Drupal.settings.fb) {
    FB.init(Drupal.settings.fb.fb_init_settings);
  }

  if (Drupal.settings.fb.fb_init_settings.authResponse) {
    // Trust login status passed into us.  No getLoginStatus
    FB_JS.fbAsyncInitFinal();

  }
  else if (!Drupal.settings.fb.fb_init_settings ||
           !Drupal.settings.fb.fb_init_settings.appId) {
    // Once upon a time, we could test FB._apikey to learn whether FB was initialize with an appId.  Now, there is no way to do that.  So the test above uses the data we pass in.  Unfortunately if FB is not initialized by our code things may not work properly here.

    // Cannot call getLoginStatus when not hosting an app.
    FB_JS.fbAsyncInitFinal();
  }
  else {
    FB_JS.getLoginStatus(function(response) {
      if (Drupal.settings.fb.fbu && !response.authResponse) {
        if (Drupal.settings.fb.page_type) {
          // On canvas and tabs(?), this probably means third-party cookies not accepted.
          jQuery.event.trigger('fb_devel', {}); // debug
          FB_JS.reloadParams.fb_login_status = false;
        }
      }
      FB_JS.fbAsyncInitFinal(response);
    });
  }
}

FB_JS._fbAsyncInitFinalComplete = false; // semaphore
FB_JS.fbAsyncInitFinal = function(response) {

  if (FB_JS._fbAsyncInitFinalComplete && !response) {
    return; // execute this function only once.
  }
  FB_JS._fbAsyncInitFinalComplete = true;

  if (!response) {
    response = FB.getAuthResponse();
  }

  jQuery.event.trigger('fb_init');  // Trigger event for third-party modules.

  if (response) {
    FB_JS.authResponseChange(response); // This will act only if fbu changed.
  }

  FB_JS.eventSubscribe();  // Get notified when session changes

  FB_JS.showConnectedMarkup(FB.getUserID()); // Show/hide markup based on connect status

  if (typeof(FB.XFBML) != 'undefined') { // Soon to be deprecated?
    try {
      FB.XFBML.parse();
    }
    catch (error) {
      jQuery.event.trigger('fb_devel', error);
    }
  }
};

/**
 * Wrapper for FB.getLoginStatus().
 * Unlike the FB version, this function always calls its callback.
 */
FB_JS.getLoginStatus = function(callback, force) {
  var semaphore; // Avoid multiple calls to callback.
  semaphore = false;

  FB.getLoginStatus(function(response) {
    semaphore = true;
    callback(response);
  }, force);

  // Fallback for when getLoginStatus never calls us back.
  setTimeout(function() {
    if (!semaphore) {
      callback({'authResponse' : null});
    }
  }, 3000); // 3000 = 3 seconds
};

/**
 * Tell facebook to notify us of events we may need to act on.
 */
FB_JS.eventSubscribe = function() {
  // Use FB.Event to detect Connect login/logout.
  FB.Event.subscribe('auth.authResponseChange', FB_JS.authResponseChange);

  // Q: what the heck is "edge.create"? A: the like button was clicked.
  FB.Event.subscribe('edge.create', FB_JS.edgeCreate);
}

/**
 * Helper parses URL params.
 *
 * http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
 */
FB_JS.getUrlVars = function(href) {
  var vars = [], hash;
  var hashes = href.slice(href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
    if (hash[0] != 'fbu')
      vars.push(hashes[i]); // i.e. "foo=bar"
  }
  return vars;
}

/**
 * Reload the current page, whether on canvas page or facebook connect.
 *
 */
FB_JS.reloading = false // semaphore prevents concurrent reloads.
FB_JS.reload = function(destination) {
  if (FB_JS.reloading) {
    // We are attempting to reload two times at once.
    return;
  }
  else {
    FB_JS.reloading = true;
  }
  // Avoid repeated reloads.  Esp on canvas pages when third-party cookies disabled.
  if (Drupal.settings.fb.fb_reloading) {
    // We are attempting a reload one after another.
    jQuery.event.trigger('fb_devel', destination); // Debug. JS and PHP SDKs are not in sync.
    return;
  }

  // Determine where to send user.
  if (typeof(destination) != 'undefined' && destination) {
    // Use destination passed in.
  }
  else if (typeof(Drupal.settings.fb.reload_url) != 'undefined') {
    destination = Drupal.settings.fb.reload_url;
  }
  else {
    destination = window.location.href;
  }

  // Split and parse destination
  var path;
  if (destination.indexOf('?') == -1) {
    vars = [];
    path = destination;
  }
  else {
    vars = FB_JS.getUrlVars(destination);
    path = destination.substr(0, destination.indexOf('?'));
  }

  // Passing this helps us avoid infinite loop.
  FB_JS.reloadParams.fb_reload = true;

  // Canvas pages will not get POST vars, so include them in the URL.
  if (Drupal.settings.fb.page_type == 'canvas') {
    for (var key in FB_JS.reloadParams) {
      vars.push(key + '=' + FB_JS.reloadParams[key]);
    }
  }

  destination = vars.length ? (path + '?' + vars.join('&')) : path;

  if (Drupal.settings.fb.reload_url_fragment) {
    destination = destination + "#" + Drupal.settings.fb.reload_url_fragment;
  }

  // Feedback that entire page may be reloading.
  if (typeof(Drupal.settings.fb.reload_progress) == 'undefined' || Drupal.settings.fb.reload_progress) {
    // This unweildy set of tags should turn facebook-specific markup into a progress indicator.
    var fbMarkup = jQuery('.fb_connected,.fb_not_connected').wrap('<div class="progress" />').wrap('<div class="bar" />').wrap('<div class="filled" />');
    if (fbMarkup.length) {
      fbMarkup.hide(); // Hides FBML, leaves progress bar.
    }


    // Spinning progress indicator
    jQuery('body').prepend('<div id="fb_reload"><div class="fb_spinner"></div></div>');
  }

  // Use POST to get past any caching on the server.
  // reloadParams includes signed_request.
  if (Drupal.settings.fb.fbu && Drupal.settings.fb.test_login_status) {
    // The login status test might break all future calls to FB.  So we do it only immediately before reload.
    FB_JS.testGetLoginStatus(function() {
      FB_JS.postToURL(destination, FB_JS.reloadParams);
    });
  }
  else if (!FB_JS.isEmpty(FB_JS.reloadParams)) {
    FB_JS.postToURL(destination, FB_JS.reloadParams);
  }
  else {
    window.top.location = destination; // Uses GET, returns cached pages.
  }

};

/**
 * Send the browser to a URL.
 * Similar to setting window.top.location, but via POST instead of GET.
 * POST will get through Drupal cache or external cache (i.e. Varnish)
 */
FB_JS.postToURL = function(path, params, method) {
  method = method || "post"; // Set method to post by default, if not specified.

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  form.setAttribute("target", '_top'); // important for canvas pages

  for(var key in params) {
    if(params.hasOwnProperty(key)) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);

      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}


// Facebook pseudo-event handlers.
FB_JS.authResponseChange = function(response) {
  if (FB_JS.ignoreEvents) {
    return;
  }

  if (response.authResponse && response.authResponse.signedRequest) {
    // If we end up reloading page, pass signed request.
    FB_JS.reloadParams.signed_request = response.authResponse.signedRequest;
  }
  else {
    delete FB_JS.reloadParams.signed_request;
  }

  var status = {
    'changed': false,
    'fbu': FB.getUserID(),
    'response' : response
  };

  if ((Drupal.settings.fb.fbu || status.fbu) &&
      Drupal.settings.fb.fbu != status.fbu) {
    // Drupal.settings.fb.fbu (from server) not the same as status.fbu (from javascript).
    status.changed = true;
  }
  else if (status.fbu && !response.authResponse) {
    // A bug in facebook's all.js, user has logged out yet FB.getUserID() still returns their id!
    // This is our workaround.
    status.changed = true;
    status.fbu = null;
  }


  if (status.changed) {
    // Remember the fbu.
    Drupal.settings.fb.fbu = status.fbu;

    // fbu has changed since server built the page.
    jQuery.event.trigger('fb_session_change', status);

    FB_JS.showConnectedMarkup(status.fbu);
  }
};

// edgeCreate is handler for Like button.
FB_JS.edgeCreate = function(href, widget) {
  var data = {'href': href};
  FB_JS.ajaxEvent('edge.create', data);
};

// JQuery pseudo-event handler.
FB_JS.sessionChangeHandler = function(context, status) {
  // Pass data to ajax event.
  var data = {
    'event_type': 'session_change',
    'is_anonymous': Drupal.settings.fb.is_anonymous
  };

  data.fbu = status.fbu;

  FB_JS.ajaxEvent(data.event_type, data);

  // Note that ajaxEvent might reload the page.
};


// Helper to pass events via AJAX.
// A list of javascript functions to be evaluated is returned.
FB_JS.ajaxEvent = function(event_type, request_data) {
  if (Drupal.settings.fb.ajax_event_url) {

    if (typeof(Drupal.settings.fb_page_type) != 'undefined') {
      request_data.fb_js_page_type = Drupal.settings.fb_page_type;
    }

    // Historically, we pass appId to ajax events.
    // This data no longer present in JS API, so may be removed soon.
    // In other words, deprecated!
    request_data.appId = Drupal.settings.fb.fb_init_settings.appId;

    // Other values to pass to ajax handler.
    if (Drupal.settings.fb.controls) {
      request_data.fb_controls = Drupal.settings.fb.controls;
    }

    // In case cookies are not accurate, always pass in signed request.
    if (typeof(FB.getAuthResponse) != 'undefined') {
      response = FB.getAuthResponse();
      if (response && response.signedRequest) {
        request_data.signed_request = response.signedRequest;
      }
    }
    else {
      session = FB.getSession();
      if (session) {
        //request_data.session = session;
        request_data.access_token = session.access_token;
      }
    }


    jQuery.ajax({
      url: Drupal.settings.fb.ajax_event_url + '/' + event_type,
      data : request_data,
      type: 'POST',
      dataType: 'json',
      success: function(js_array, textStatus, XMLHttpRequest) {
        if (js_array.length > 0) {
          for (var i = 0; i < js_array.length; i++) {
            // alert(js_array[i]);// debug
            eval(js_array[i]);
          }
        }
        else {
          if (event_type == 'session_change') {
            // No instructions from ajax.  Notify interested parties
            jQuery.event.trigger('fb_session_change_done');
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        // Unexpected error (i.e. ajax did not return json-encoded data).
        var headers = jqXHR.getAllResponseHeaders(); // debug info.
        var responseText = jqXHR.responseText; // debug info.
        // @TODO: handle error, but how?
        jQuery.event.trigger('fb_devel', jqXHR);
      }
    });
  }
};


/**
 * Called when we first learn the currently logged in user's Facebook ID.
 *
 * Responsible for showing/hiding markup not intended for the current
 * user.  Some sites will choose to render pages with fb_connected and
 * fb_not_connected classes, rather than reload pages when user's
 * connect/disconnect.
 */
FB_JS.showConnectedMarkup = function(fbu, context) {
  if (context || fbu != FB_JS.fbu) {
    if (fbu) {
      FB_JS.fbu = fbu;
      // Show markup intended only for connected users.
      jQuery('.fb_not_connected', context).hide();
      jQuery('.fb_connected', context).show();
    }
    else {
      FB_JS.fbu = null;
      // Show markup intended only for not connected users.
      jQuery('.fb_connected', context).hide();
      jQuery('.fb_not_connected', context).show();
    }
  }
};

/**
 * Tests whether FB.getLoginStatus() will work.
 * It tends to fail when user disables third-party cookies, and when apps are in sandbox mode, and probably more cases.
 * The danger of running this test is that if it fails, future calls to FB will break, because FB will forget the current user's credentials.
 */
FB_JS.testGetLoginStatus = function(callback) {
  // Attempt to learn whether third party cookies are enabled.
  FB_JS.ignoreEvents = true; // disregard events triggered by getLoginStatus.
  FB_JS.getLoginStatus(function(response) {
    FB_JS.ignoreEvents = false; // we can pay attention again
    if (!response.authResponse) {
      // Let fb.module know that test failed.
      FB_JS.reloadParams.fb_login_status = false;
    }
    callback(response.authResponse);
  }, true);
};


// Quick test whether object contains anything.
FB_JS.isEmpty = function(ob) {
  for (var i in ob) {
    return false;
  }
  return true;
}
;
/*!
  Tinycon - A small library for manipulating the Favicon
  Tom Moor, http://tommoor.com
  Copyright (c) 2012 Tom Moor
  MIT Licensed
  @version 0.5
*/
(function(){var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true,abbreviate:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={ie:ua('msie'),chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){var exists=(typeof(links[i])!=='undefined');if(exists&&(links[i].getAttribute('rel')||'').match(/\bicon\b/)){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(label,colour){if(!getCanvas().getContext||browser.ie||browser.safari||options.fallback==='force'){return updateTitle(label)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var src=getCurrentFavicon();faviconImage=new Image();faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if((label+'').length>0)drawBubble(context,label,colour);refreshFavicon()};if(!src.match(/^data/)){faviconImage.crossOrigin='anonymous'}faviconImage.src=src};var updateTitle=function(label){if(options.fallback){if((label+'').length>0){document.title='('+label+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,label,colour){if(typeof label=='number'&&label>99&&options.abbreviate){label=abbreviateNumber(label)}var len=(label+'').length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(label,15,browser.mozilla?7:6)};var refreshFavicon=function(){if(!getCanvas().getContext)return;setFaviconTag(getCanvas().toDataURL())};var abbreviateNumber=function(label){var metricPrefixes=[['G',1000000000],['M',1000000],['k',1000]];for(var i=0;i<metricPrefixes.length;++i){if(label>=metricPrefixes[i][1]){label=round(label/metricPrefixes[i][1])+metricPrefixes[i][0];break}}return label};var round=function(value,precision){var number=new Number(value);return number.toFixed(precision)};Tinycon.setOptions=function(custom){options={};for(var key in defaults){options[key]=custom.hasOwnProperty(key)?custom[key]:defaults[key]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(label,colour){label=label||'';drawFavicon(label,colour);return this};Tinycon.reset=function(){setFaviconTag(originalFavicon)};Tinycon.setOptions(defaults);window.Tinycon=Tinycon})();
;
(function ($) {

  Drupal.behaviors.environment_indicatorToolbar = {
    attach: function (context, settings) {
      if (typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        var environment_name = settings.environment_indicator['environment-indicator-name'],
          environment_color = settings.environment_indicator['toolbar-color'],
          environment_text_color = settings.environment_indicator['toolbar-text-color'],
          $name = $('<div>').addClass('environment-indicator-name-wrapper').html(environment_name),
          $toolbar = $('#toolbar, #navbar-bar', context);
        $('div.toolbar-menu', $toolbar).once('environment_indicator').prepend($name);
        $('div.toolbar-menu', $toolbar).css('background-color', environment_color);
        $('div.toolbar-menu .item-list', $toolbar).css('background-color', changeColor(environment_color, 0.15, true));
        $('div.toolbar-menu ul li:not(.environment-switcher) a', $toolbar).css('background-color', environment_color).css('color', environment_text_color);
        $('div.toolbar-drawer', $toolbar).css('background-color', changeColor(environment_color, 0.25)).find('ul li a').css('color', changeColor(environment_text_color, 0.25));
        $('div.toolbar-menu ul li a', $toolbar).hover(function () {
          $(this).css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        }, function () {
          $(this).css('background-color', environment_color).css('color', environment_text_color);
          $('div.toolbar-menu ul li.active-trail a', $toolbar).css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        });
        $('div.toolbar-menu ul li.active-trail a', $toolbar).css('background-image', 'none').css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        $('div.toolbar-drawer ul li a', $toolbar).hover(function () {
          $(this).css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        }, function () {
          $(this).css('background-color', changeColor(environment_color, 0.25)).css('color', changeColor(environment_text_color, 0.25));
          $('div.toolbar-drawer ul li.active-trail a', $toolbar).css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        });
        $('div.toolbar-drawer ul li.active-trail a', $toolbar).css('background-image', 'none').css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        // Move switcher bar to the top
        var $switcher_container = $('.environment-switcher-container', $toolbar);
        var $switcher = $switcher_container.parent().clone();
        $switcher_container.parent().remove();
        $toolbar.prepend($switcher);
        // Add a margin if the Shortcut module toggle button is present.
        if ($('div.toolbar-menu a.toggle', $toolbar).length > 0) {
          $('div.toolbar-menu', $toolbar).css('padding-right', 40);
        }
      };
    }
  };

  Drupal.behaviors.environment_indicatorTinycon = {
    attach: function (context, settings) {
      if (typeof(settings.environment_indicator) != 'undefined' &&
          typeof(settings.environment_indicator.addFavicon) != 'undefined' &&
          settings.environment_indicator.addFavicon) {
        //Draw favicon label
        Tinycon.setBubble(settings.environment_indicator.faviconLabel);
        Tinycon.setOptions({
          background: settings.environment_indicator.faviconColor,
          colour: settings.environment_indicator.faviconTextColor
        });
      }
    }
  }

  Drupal.behaviors.environment_indicatorAdminMenu = {
    attach: function (context, settings) {
      if (typeof(Drupal.admin) != 'undefined' && typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        // Add the restyling behavior to the admin menu behaviors.
        Drupal.admin.behaviors['environment_indicator'] = function (context, settings) {
          $('#admin-menu, #admin-menu-wrapper', context).css('background-color', settings.environment_indicator['toolbar-color']);
          $('#admin-menu, #admin-menu-wrapper > ul > li:not(.admin-menu-account) > a', context).css('color', settings.environment_indicator['toolbar-text-color']);
          $('#admin-menu .item-list', context).css('background-color', changeColor(settings.environment_indicator['toolbar-color'], 0.15, true));
          $('#admin-menu .item-list ul li:not(.environment-switcher) a', context).css('background-color', settings.environment_indicator['toolbar-color']).css('color', settings.environment_indicator['toolbar-text-color']);
        };
      };
    }
  };

  Drupal.behaviors.environment_indicatorNavbar = {
    attach: function (context, settings) {
      if (typeof(settings.navbar) != 'undefined' && typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        $('#navbar-administration .navbar-bar', context).css('background-color', settings.environment_indicator['toolbar-color']);
      }
    }
  };

  Drupal.behaviors.environment_indicatorSwitcher = {
    attach: function (context, settings) {
      // Check that the links actually point to the current path, if not, fix them
      $('.environment-switcher a', context).click(function (e) {
        e.preventDefault();
        var current_location = window.location;
        window.location.href = current_location.protocol + '//' + e.currentTarget.hostname + current_location.pathname + current_location.search + current_location.hash;
      });
      $('#environment-indicator .environment-indicator-name, #toolbar .environment-indicator-name-wrapper, #navbar-bar .environment-indicator-name-wrapper', context).click(function () {
        $('#environment-indicator .item-list, #toolbar .item-list, #navbar-bar .item-list', context).slideToggle('fast');
      });
      $('#environment-indicator.position-top.fixed-yes').once(function () {
        $('body').css('margin-top', $('#environment-indicator.position-top.fixed-yes').height() + 'px');
      });
      $('#environment-indicator.position-bottom.fixed-yes').once(function () {
        $('body').css('margin-bottom', $('#environment-indicator.position-bottom.fixed-yes').height() + 'px');
      });
    }
  }

  Drupal.behaviors.environment_indicator_admin = {
    attach: function(context, settings) {
      var $picker = $('#environment-indicator-color-picker');
      // Add the farbtastic tie-in
      if ($.isFunction($.farbtastic) && $picker.length > 0) {
        settings.environment_indicator_color_picker = $picker.farbtastic('#ctools-export-ui-edit-item-form #edit-color');
        settings.environment_indicator_text_color_picker = $('#environment-indicator-text-color-picker').farbtastic('#ctools-export-ui-edit-item-form #edit-text-color');
      }
    }
  }

})(jQuery);
;
var pad = function(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
var changeColor = function(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
var lighterColor = function(color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function(color, ratio) {
    return changeColor(color, ratio, true);
};
;
