function getSearchParams() {
    var params = {};

    if (location.search) {
        var parts = location.search.substring(1).split('&');

        for (var i = 0; i < parts.length; i++) {
            var nv = parts[i].split('=');
            if (!nv[0]) continue;
            params[nv[0]] = nv[1] || true;
        }
    }

    return params;
}

function checkRedirectParam() {
    var params = getSearchParams();

    return (params.redirect !== 'false');
}

function checkReferrer() {
    var r = document.referrer,
        y = document.location.href.split('/'),
        x = new RegExp('^((http)s?:\/\/([a-z]+\.)*(' + y[2].replace('.','\.') + ')\/?)', 'i');

    return !(('referrer' in document) && r.match(x));
}

if (checkReferrer() && checkRedirectParam()) {
    document.getElementsByTagName('html')[0].className += ' show-home-splash';
}
