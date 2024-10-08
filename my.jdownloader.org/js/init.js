NProgress.configure({parent: '#gwtContent', showSpinner: false});
var Modernizr = {
    touch: ('ontouchstart' in window || 'onmsgesturechange' in window)
};

if (!Modernizr.touch) {
    $('html').addClass('no-touch');
}

require(["jdapi"], function (API) {
    window.jd = window.jd || {};
    // hardcoded device id
    // usually the device id is a 32 char base16 string
    window.jd._deviceId = "0";
    // dynamic device name
    window.jd._deviceName = window.location.host;
    window._gaq = [];
    var connect = $.Deferred();
    var api = new API({}, connect, "myjd_js_web_interface");
    window.api = api;
    api.addAPIStateChangeListener(function (STATE) {
        console.log("STATE CHANGED " + STATE);
        if (STATE == 3) {
            console.log("Disconnect state change");
            window.location = "login.html#logout";
        }
    });
    connect.fail(function () {
        console.log("Connect failed callback");
        window.location = "login.html#logout";
    });
    connect.done(function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "myjdownloader/myjdownloader.nocache.js";
        $("head").append(s);
    });

    $("#gwtCaptchasWaitingContainer").headroom({
        classes: {
            initial: "statsContainer",
            pinned: "statsContainer--pinned",
            unpinned: "statsContainer--unpinned",
            top: "statsContainer--top",
            notTop: "statsContainer--not-top",
            bottom: "statsContainer--bottom",
            notBottom: "statsContainer--not-bottom"
        }
    });
    $("#mainnav").headroom({
        classes: {
            initial: "mainnav",
            pinned: "mainnav--pinned",
            unpinned: "mainnav--unpinned",
            top: "mainnav--top",
            notTop: "mainnav--not-top",
            bottom: "mainnav--bottom",
            notBottom: "mainnav--not-bottom"
        }
    });
});