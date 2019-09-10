function getURLParam(url, key) {
    var results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURIComponent(results[1]) || 0;
    }
}

var isMobile = /Android(.)+mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test (navigator.userAgent);
var isTablet = /android|ipad|playbook|silk/i.test (navigator.userAgent);
var useAds = true;

var cardDescription = getURLParam(window.location.href, 'description');
var cardTitle = getURLParam(window.location.href, 'title');
var autoPlay = getURLParam(window.location.href, 'autoplay');
var adParams = getURLParam(window.location.href, 'adParams');
var oaoVars = {
    s1: getURLParam(window.location.href, 'oao_s1'),
    s2: getURLParam(window.location.href, 'oao_s2'),
    show: getURLParam(window.location.href, 'oao_show'),
    url: getURLParam(window.location.href, 'oao_url')
};

var preRollPlayed = !useAds; //false
var messagesTargetWindow = window.parent;

autoPlay = autoPlay === 'true' || (!isMobile && !isTablet && autoPlay === 'not-mobile');

// Create a variable to contain the card HTML.
var sproutCardDIV = "";
sproutCardDIV += "<div id=\"sproutCustomCard\" class=\"tpPlayerCard video-wrapper\" onclick=\"onVideoPlay()\">";
sproutCardDIV += "    <div class=\"video-info-overlay\">";
sproutCardDIV += "        <div id=\"custom-play-button\" class=\"custom-play-button\">";
sproutCardDIV += "            <img src=\"http:\/\/www.sproutonline.com\/sites\/sprout\/themes\/sprout_twig\/images\/common\/video-player\/overlay-play-icon.png\" \/>";
sproutCardDIV += "            <p class=\"ie-fallback\">Please update your browser to view this video<\/p>";
sproutCardDIV += "        <\/div>";
sproutCardDIV += "        <div class=\"custom-video-info-text\">";
sproutCardDIV += "            <h4 class=\"cardTitle\"><\/h4>";
sproutCardDIV += "            <h3 class=\"cardDescription\"><\/h3>";
sproutCardDIV += "        <\/div>";
sproutCardDIV += "    <\/div>";
sproutCardDIV += "<\/div>";


// Use the global controller to add the custom card element, contained within the variable customCardDIV
//    and identified by its id, to the default card deck "forms".
$pdk.controller.addPlayerCard("forms", "sproutCustomCard", sproutCardDIV);

// Display the card
function showControlsCard() {
    console.log('showing controls card');
    if($('.closedCaptionsCard').length == 0){
        $pdk.controller.showPlayerCard("forms", "sproutCustomCard");
    }
}

$pdk.controller.addEventListener("OnShowCard", function(e) {
    switch (e.data.card) {
    case 'sproutCustomCard':
        $(".cardDescription").text(cardDescription);
        $(".cardTitle").text(cardTitle);
        break;
    }
});


// Hide the card
function hideControlsCard() {
    $pdk.controller.hidePlayerCard("forms", "sproutCustomCard");
}
if (isMobile) {
    $pdk.controller.addEventListener('OnPlayButtonClicked', function (e) {
        $pdk.controller.showFullScreen(true);
    });
}
$pdk.controller.addEventListener("OnMediaStart", function() {
    // Get rid of the ugly play overlay
    var playerId = $("#player > .player").attr("id");
    $("#" + playerId + "\\.standby\\.playButtonHolder > canvas").remove();

    $('.tpPlayer').addClass('started');
});
$pdk.controller.addEventListener("OnMediaLoadStart", function(event) {
    if (!cardTitle) {
        cardTitle = event.data.title;
    }
    if (!cardDescription) {
        cardDescription = event.data.baseClip.description;
    }
});
$pdk.controller.addEventListener("OnMediaPause", function(e) {
    showControlsCard();
});

// $('.tpRegion').find('canvas.IconPause').click(function(e){
//     showControlsCard();
// });

$pdk.controller.addEventListener("OnMediaEnd", function(e) {
    $('.tpPlayer').removeClass('started');
    showControlsCard();
    sendMessageToAdsComponent('videoCompleted');
});
$pdk.controller.addEventListener("OnMediaComplete", function(e) {
    $('.tpPlayer').removeClass('started');
    showControlsCard();
    sendMessageToAdsComponent('videoCompleted');
});
// Listen for OnPlayerLoaded to hear when the embedded player is up and running.
$pdk.controller.addEventListener("OnPlayerLoaded", function(e) {
    if (autoPlay) {
        setTimeout(function(){
            onVideoPlay();
        }, 100);
    } else {
        showControlsCard();
    }
});

function onVideoPlay() {
    if (!preRollPlayed) {
        preRollPlayed = true;
        $pdk.controller.pause();
        setMessagesListener();
        sendMessageToAdsComponent('initializeVideoAds');
    } else {
        if ($( '.tpPlayer').hasClass('started')) {
            $pdk.controller.pause();
        } else {
            $pdk.controller.clickPlayButton();
        }
    }
}

var messagesTargetHost = oaoVars.url;
if (messagesTargetHost.indexOf('sproutstg.apps.nbcuni.com') > 0) {
    messagesTargetHost = 'http://stage.sproutonline.com';
} else if (messagesTargetHost.indexOf('sprout.apps.nbcuni.com') > 0) {
    messagesTargetHost = 'http://www.sproutonline.com';
}

function sendMessageToAdsComponent(msg) {
    try {
        window.parent.postMessage(msg, messagesTargetHost);
    } catch (ev) {
    }
}

function setMessagesListener() {
    window.addEventListener("message", function(e){
        // Do we trust the sender of this message?
        if (messagesTargetHost.indexOf(e.origin) !== 0) {
            return;
        }

        switch (e.data) {
        case 'adPauseRequested':
            $pdk.controller.pause();
            break;
        case 'adResumeRequested':
            $pdk.controller.clickPlayButton();
            break;
        }
    }, false);
}