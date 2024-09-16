function myjdownloader() {
  var gb = "";
  var db = " top: -1000px;";
  var Db = "\" for \"gwt:onLoadErrorFn\"";
  var Bb = "\" for \"gwt:onPropertyErrorFn\"";
  var mb = "\");";
  var Eb = "#";
  var Qb = "&";
  var wc = ".cache.js";
  var Gb = "/";
  var Mb = "//";
  var fc = "00A266A30C07964133E184F334EB9319";
  var gc = "03C7784751705025CE36734D3ED3154C";
  var hc = "0B05EFD96A8B56AAAAE8813B3A1B8ECA";
  var ic = "0E9339EC84902B9A7D13DB1FC2115DEE";
  var kc = "1528997EB67ACD7FB817F56514B7B6BC";
  var lc = "1C17B8338F048531EC9A350CE91434BB";
  var mc = "2B8F233CBA1B7F4859D9F13752473F05";
  var nc = "403B547D858C94933D6F960EBB284CD6";
  var oc = "58E989B2E9D8F3732B306104123E692F";
  var pc = "7105CF48B3CF57467A3E11E2D01BBBC7";
  var qc = "900C389400BA265F856B78556F6E0216";
  var vc = ":";
  var vb = "::";
  var Fc = ":moduleBase";
  var fb = "<!doctype html>";
  var hb = "<html><head></head><body></body></html>";
  var yb = "=";
  var Fb = "?";
  var Ab = "Bad handler \"";
  var rc = "C65212BAC83B163F7F821B42F5BF7BE8";
  var eb = "CSS1Compat";
  var kb = "Chrome";
  var sc = "D59F527F83A50DE2A6A9EA8E78A6E356";
  var jb = "DOMContentLoaded";
  var $ = "DUMMY";
  var tc = "EEE9343D49BB206A61C5FEB572BAA4E6";
  var uc = "F70E2160EFD4D78E0C369E508EA2EA89";
  var Ec = "Ignoring non-whitelisted Dev Mode URL: ";
  var Tb = "Unexpected exception in locale detection, using default: ";
  var Rb = "_";
  var Dc = "__gwtDevModeHook:myjdownloader";
  var Sb = "__gwt_Locale";
  var Cc = "_gwt_dummy_";
  var Lb = "base";
  var Jb = "baseUrl";
  var V = "begin";
  var _ = "body";
  var U = "bootstrap";
  var Ib = "clear.cache.gif";
  var xb = "content";
  var ec = "de";
  var jc = "default";
  var Ob = "en";
  var yc = "end";
  var lb = "eval(\"";
  var Ac = "file:";
  var _b = "gecko";
  var ac = "gecko1_8";
  var W = "gwt.codesvr.myjdownloader=";
  var X = "gwt.codesvr=";
  var Cb = "gwt:onLoadErrorFn";
  var zb = "gwt:onPropertyErrorFn";
  var wb = "gwt:property";
  var rb = "head";
  var zc = "http:";
  var Bc = "https:";
  var Yb = "ie10";
  var $b = "ie8";
  var Zb = "ie9";
  var ab = "iframe";
  var Hb = "img";
  var ob = "javascript";
  var bb = "javascript:\"\"";
  var xc = "loadExternalRefs";
  var Nb = "locale";
  var Pb = "locale=";
  var sb = "meta";
  var qb = "moduleRequested";
  var pb = "moduleStartup";
  var Xb = "msie";
  var Y = "myjdownloader";
  var dc = "myjdownloader.devmode.js";
  var Kb = "myjdownloader.nocache.js";
  var ub = "myjdownloader::";
  var tb = "name";
  var cb = "position:absolute; width:0; height:0; border:none; left: -1000px;";
  var Wb = "safari";
  var nb = "script";
  var cc = "selectingPermutation";
  var Z = "startup";
  var ib = "undefined";
  var bc = "unknown";
  var Ub = "user.agent";
  var Vb = "webkit";
  var s = window;
  var t = document;
  v(U, V);
  function u() {
    var a = s.location.search;
    return a.indexOf(W) != -1 || a.indexOf(X) != -1;
  }
  function v(a, b) {
    if (s.__gwtStatsEvent) {
      s.__gwtStatsEvent({
        moduleName: Y,
        sessionId: s.__gwtStatsSessionId,
        subSystem: Z,
        evtGroup: a,
        millis: new Date().getTime(),
        type: b
      });
    }
  }
  myjdownloader.__sendStats = v;
  myjdownloader.__moduleName = Y;
  myjdownloader.__errFn = null;
  myjdownloader.__moduleBase = $;
  myjdownloader.__softPermutationId = 0;
  myjdownloader.__computePropValue = null;
  myjdownloader.__getPropMap = null;
  myjdownloader.__gwtInstallCode = function () {};
  myjdownloader.__gwtStartLoadingFragment = function () {
    return null;
  };
  function w() {
    return false;
  }
  function A() {
    return null;
  }
  __propertyErrorFunction = null;
  var B = s.__gwt_activeModules = s.__gwt_activeModules || {};
  B[Y] = {
    moduleName: Y
  };
  var C;
  function D() {
    G();
    return C;
  }
  function F() {
    G();
    return C.getElementsByTagName(_)[0];
  }
  function G() {
    if (C) {
      return;
    }
    var a = t.createElement(ab);
    a.src = bb;
    a.id = Y;
    a.style.cssText = cb + db;
    a.tabIndex = -1;
    t.body.appendChild(a);
    C = a.contentDocument;
    if (!C) {
      C = a.contentWindow.document;
    }
    C.open();
    var b = document.compatMode == eb ? fb : gb;
    C.write(b + hb);
    C.close();
  }
  function H(k) {
    function l(a) {
      function b() {
        if (typeof t.readyState == ib) {
          return typeof t.body != ib && t.body != null;
        }
        return /loaded|complete/.test(t.readyState);
      }
      var c = b();
      if (c) {
        a();
        return;
      }
      function d() {
        if (!c) {
          c = true;
          a();
          if (t.removeEventListener) {
            t.removeEventListener(jb, d, false);
          }
          if (e) {
            clearInterval(e);
          }
        }
      }
      if (t.addEventListener) {
        t.addEventListener(jb, d, false);
      }
      var e = setInterval(function () {
        if (b()) {
          d();
        }
      }, 50);
    }
    function m(c) {
      // myjdownloader.onScriptDownloaded
      // eval javascript code c.join("")
      // by adding it to the html document in a temporary <script> element
      function d(a, b) {
        a.removeChild(b);
      }
      var e = F();
      var f = D();
      var g;
      if (navigator.userAgent.indexOf(kb) > -1 && window.JSON) {
        var h = f.createDocumentFragment();
        h.appendChild(f.createTextNode(lb));
        for (var i = 0; i < c.length; i++) {
          var j = window.JSON.stringify(c[i]);
          h.appendChild(f.createTextNode(j.substring(1, j.length - 1)));
        }
        h.appendChild(f.createTextNode(mb));
        g = f.createElement(nb);
        g.language = ob;
        g.appendChild(h);
        e.appendChild(g);
        d(e, g);
      } else {
        for (var i = 0; i < c.length; i++) {
          g = f.createElement(nb);
          g.language = ob;
          g.text = c[i];
          e.appendChild(g);
          d(e, g);
        }
      }
    }
    myjdownloader.onScriptDownloaded = function (a) {
      l(function () {
        m(a);
      });
    };
    v(pb, qb);
    // load the xxx.cache.js file with <script src="xxx.cache.js"></script>
    console.log("myjdownloader.nocache.js loading", k); // debug
    var n = t.createElement(nb);
    n.src = k;
    if (0) {
      // this only works with packed xxx.cache.js files
      // "packed" = eval via myjdownloader.onScriptDownloaded(["CODE"])
      // unpacked xxx.cache.js files give error:
      // TypeError: (Idi[b] , a).getCurrentUser is not a function
      t.getElementsByTagName(rb)[0].appendChild(n);
    } else {
      // e.appendChild(g);
      // e.removeChild(g);
      var e = F();
      e.appendChild(n);
      e.removeChild(n);
    }
  }
  myjdownloader.__startLoadingFragment = function (a) {
    return K(a);
  };
  myjdownloader.__installRunAsyncCode = function (a) {
    var b = F();
    var c = D().createElement(nb);
    c.language = ob;
    c.text = a;
    b.appendChild(c);
    b.removeChild(c);
  };
  function I() {
    var c = {};
    var d;
    var e;
    var f = t.getElementsByTagName(sb);
    for (var g = 0, h = f.length; g < h; ++g) {
      var i = f[g];
      var j = i.getAttribute(tb);
      var k;
      if (j) {
        j = j.replace(ub, gb);
        if (j.indexOf(vb) >= 0) {
          continue;
        }
        if (j == wb) {
          k = i.getAttribute(xb);
          if (k) {
            var l;
            var m = k.indexOf(yb);
            if (m >= 0) {
              j = k.substring(0, m);
              l = k.substring(m + 1);
            } else {
              j = k;
              l = gb;
            }
            c[j] = l;
          }
        } else if (j == zb) {
          k = i.getAttribute(xb);
          if (k) {
            try {
              d = eval(k);
            } catch (a) {
              alert(Ab + k + Bb);
            }
          }
        } else if (j == Cb) {
          k = i.getAttribute(xb);
          if (k) {
            try {
              e = eval(k);
            } catch (a) {
              alert(Ab + k + Db);
            }
          }
        }
      }
    }
    A = function (a) {
      var b = c[a];
      if (b == null) {
        return null;
      } else {
        return b;
      }
    };
    __propertyErrorFunction = d;
    myjdownloader.__errFn = e;
  }
  function J() {
    function e(a) {
      var b = a.lastIndexOf(Eb);
      if (b == -1) {
        b = a.length;
      }
      var c = a.indexOf(Fb);
      if (c == -1) {
        c = a.length;
      }
      var d = a.lastIndexOf(Gb, Math.min(c, b));
      if (d >= 0) {
        return a.substring(0, d + 1);
      } else {
        return gb;
      }
    }
    function f(a) {
      if (a.match(/^\w+:\/\//)) {} else {
        var b = t.createElement(Hb);
        b.src = a + Ib;
        a = e(b.src);
      }
      return a;
    }
    function g() {
      var a = A(Jb);
      if (a != null) {
        return a;
      }
      return gb;
    }
    function h() {
      var a = t.getElementsByTagName(nb);
      for (var b = 0; b < a.length; ++b) {
        if (a[b].src.indexOf(Kb) != -1) {
          return e(a[b].src);
        }
      }
      return gb;
    }
    function i() {
      var a = t.getElementsByTagName(Lb);
      if (a.length > 0) {
        return a[a.length - 1].href;
      }
      return gb;
    }
    function j() {
      var a = t.location;
      return a.href == a.protocol + Mb + a.host + a.pathname + a.search + a.hash;
    }
    var k = g();
    if (k == gb) {
      k = h();
    }
    if (k == gb) {
      k = i();
    }
    if (k == gb && j()) {
      k = e(t.location.href);
    }
    k = f(k);
    return k;
  }
  function K(a) {
    if (a.match(/^\//)) {
      return a;
    }
    if (a.match(/^[a-zA-Z]+:\/\//)) {
      return a;
    }
    return myjdownloader.__moduleBase + a;
  }
  function L() {
    var k = [];
    var l = 0;
    function m(a, b) {
      var c = k;
      for (var d = 0, e = a.length - 1; d < e; ++d) {
        c = c[a[d]] ||= [];
      }
      c[a[e]] = b;
    }
    var n = [];
    var o = [];
    function p(a) {
      var b = o[a]();
      var c = n[a];
      if (b in c) {
        return b;
      }
      var d = [];
      for (var e in c) {
        d[c[e]] = e;
      }
      if (__propertyErrorFunc) {
        __propertyErrorFunc(a, d, b);
      }
      throw null;
    }
    o[Nb] = function () {
      var b = null;
      var c = Ob;
      try {
        if (!b) {
          var d = location.search;
          var e = d.indexOf(Pb);
          if (e >= 0) {
            var f = d.substring(e + 7);
            var g = d.indexOf(Qb, e);
            if (g < 0) {
              g = d.length;
            }
            b = d.substring(e + 7, g);
          }
        }
        if (!b) {
          b = A(Nb);
        }
        if (!b) {
          var h = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
          if (h) {
            var i = h.split(/[-_]/);
            if (i.length > 1) {
              i[1] = i[1].toUpperCase();
            }
            b = i.join(Rb);
          }
        }
        if (!b) {
          b = s[Sb];
        }
        if (b) {
          c = b;
        }
        while (b && !w(Nb, b)) {
          var j = b.lastIndexOf(Rb);
          if (j < 0) {
            b = null;
            break;
          }
          b = b.substring(0, j);
        }
      } catch (a) {
        alert(Tb + a);
      }
      s[Sb] = c;
      return b || Ob;
    };
    n[Nb] = {
      de: 0,
      default: 1,
      en: 2
    };
    o[Ub] = function () {
      var b = navigator.userAgent.toLowerCase();
      function c(a) {
        return parseInt(a[1]) * 1000 + parseInt(a[2]);
      }
      if (function () {
        return b.indexOf(Vb) != -1;
      }()) {
        return Wb;
      }
      if (function () {
        return b.indexOf(Xb) != -1 && t.documentMode >= 10;
      }()) {
        return Yb;
      }
      if (function () {
        return b.indexOf(Xb) != -1 && t.documentMode >= 9;
      }()) {
        return Zb;
      }
      if (function () {
        return b.indexOf(Xb) != -1 && t.documentMode >= 8;
      }()) {
        return $b;
      }
      if (function () {
        return b.indexOf(_b) != -1;
      }()) {
        return ac;
      }
      return bc;
    };
    n[Ub] = {
      gecko1_8: 0,
      ie10: 1,
      ie8: 2,
      ie9: 3,
      safari: 4
    };
    w = function (a, b) {
      return b in n[a];
    };
    myjdownloader.__getPropMap = function () {
      var a = {};
      for (var b in n) {
        if (n.hasOwnProperty(b)) {
          a[b] = p(b);
        }
      }
      return a;
    };
    myjdownloader.__computePropValue = p;
    s.__gwt_activeModules[Y].bindings = myjdownloader.__getPropMap;
    v(U, cc);
    if (u()) {
      return K(dc);
    }
    var q;
    try {
      m([ec, Wb], fc);
      m([Ob, Wb], gc);
      m([ec, $b], hc);
      m([ec, Yb], ic);
      m([jc, Wb], kc);
      m([jc, Yb], lc);
      m([Ob, Zb], mc);
      m([jc, $b], nc);
      m([Ob, $b], oc);
      m([ec, Zb], pc);
      m([jc, Zb], qc);
      m([Ob, Yb], rc);
      m([jc, ac], sc);
      m([ec, ac], tc);
      m([Ob, ac], uc);
      q = k[p(Nb)][p(Ub)];
      var r = q.indexOf(vc);
      if (r != -1) {
        l = parseInt(q.substring(r + 1), 10);
        q = q.substring(0, r);
      }
    } catch (a) {}
    myjdownloader.__softPermutationId = l;
    return K(q + wc);
  }
  function M() {
    if (!s.__gwt_stylesLoaded) {
      s.__gwt_stylesLoaded = {};
    }
    v(xc, V);
    v(xc, yc);
  }
  I();
  myjdownloader.__moduleBase = J();
  B[Y].moduleBase = myjdownloader.__moduleBase;
  var N = L();
  if (s) {
    var O = s.location.protocol == zc || s.location.protocol == Ac || s.location.protocol == Bc;
    s.__gwt_activeModules[Y].canRedirect = O;
    function P() {
      var b = Cc;
      try {
        s.sessionStorage.setItem(b, b);
        s.sessionStorage.removeItem(b);
        return true;
      } catch (a) {
        return false;
      }
    }
    if (O && P()) {
      var Q = Dc;
      var R = s.sessionStorage[Q];
      if (!/^http(s)?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/.test(R)) {
        if (R && window.console && console.log) {
          console.log(Ec + R);
        }
        R = gb;
      }
      if (R && !s[Q]) {
        s[Q] = true;
        s[Q + Fc] = J();
        var S = t.createElement(nb);
        S.src = R;
        var T = t.getElementsByTagName(rb)[0];
        T.insertBefore(S, T.firstElementChild || T.children[0]);
        return false;
      }
    }
  }
  M();
  v(U, yc);
  H(N);
  return true;
}
myjdownloader.succeeded = myjdownloader();
