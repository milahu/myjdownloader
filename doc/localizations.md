# localizations

currently, there are these localizations

- language: german, english, default (?)
- browser: chrome, firefox, internet explorer (10, 9, 8)

so all code is duplicated (3 * 5) = 15 times



## code size

the main version has about 5 MBytes

```
$ du -shc my.jdownloader.org/myjdownloader/03C7784751705025CE36734D3ED3154C.cache.js my.jdownloader.org/myjdownloader/deferredjs/03C7784751705025CE36734D3ED3154C/
1.2M    my.jdownloader.org/myjdownloader/03C7784751705025CE36734D3ED3154C.cache.js
3.4M    my.jdownloader.org/myjdownloader/deferredjs/03C7784751705025CE36734D3ED3154C/
4.5M    total
```

so the total size is about (15 * 5) = 75 MBytes



## routing

the routing is done in `my.jdownloader.org/myjdownloader/myjdownloader.nocache.js`

```js
  // locale = language
  var ec = "de"; // german
  var Ob = "en";  // english
  var jc = "default"; // ?

  // browser = user agent
  var Wb = "safari"; // chrome
  var ac = "gecko1_8"; // firefox
  var Yb = "ie10"; // internet explorer
  var Zb = "ie9";
  var $b = "ie8";

  // $strongName = name of the main .cache.js file
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
  var rc = "C65212BAC83B163F7F821B42F5BF7BE8";
  var sc = "D59F527F83A50DE2A6A9EA8E78A6E356";
  var tc = "EEE9343D49BB206A61C5FEB572BAA4E6";
  var uc = "F70E2160EFD4D78E0C369E508EA2EA89";

  // map from locale and browser to $strongName
  m([ec, Wb], fc); // m(["de", "safari"], "00A266A30C07964133E184F334EB9319");
  m([ec, ac], tc);
  m([ec, Yb], ic);
  m([ec, Zb], pc);
  m([ec, $b], hc);
  m([Ob, Wb], gc); // m(["en", "safari"], "03C7784751705025CE36734D3ED3154C");
  m([Ob, ac], uc);
  m([Ob, Yb], rc);
  m([Ob, Zb], mc);
  m([Ob, $b], oc);
  m([jc, Wb], kc); // m(["default", "safari"], "1528997EB67ACD7FB817F56514B7B6BC");
  m([jc, ac], sc);
  m([jc, Yb], lc);
  m([jc, Zb], qc);
  m([jc, $b], nc);
```



## deduplication

so far i did

- remove all cache files for non-chrome browsers in 1f440e6e5fd67463201a2082f98277cecbe60056
- symlink all cache files from non-chrome browsers to chrome in d46bfced3d9e9f9ad2e4aeb8dc20f3911c4408c5
  - this works at least for firefox. chrome is the de-facto default browser, so any incompatibilities are browser bugs in the non-chrome browsers
- turn user agent alert into console warning in 173ff9d7586b2340f9a61706ad642efc1756f25c

so now there are only 2 versions: german, english

```js
  m([ec, Wb], fc); // m(["de", "safari"], "00A266A30C07964133E184F334EB9319");
  m([Ob, Wb], gc); // m(["en", "safari"], "03C7784751705025CE36734D3ED3154C");
```
