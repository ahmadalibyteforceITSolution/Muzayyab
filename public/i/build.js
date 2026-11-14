/* Bulawa Studio · order -> card data
   BW.build(order, defaultCFG) returns a CFG object for the engine designs.
   Every customer string is HTML-escaped because the designs render with innerHTML. */
(function (W) {
  var UD = "۰۱۲۳۴۵۶۷۸۹";
  function ud(s) { return String(s).replace(/\d/g, function (d) { return UD[d]; }); }
  function raw(s) { return String(s == null ? "" : s).replace(/[<>]/g, "").trim(); }   // for fields written with textContent
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").trim(); }
  var DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var DOW_UR = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
  var MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var MON_UR = ["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر"];

  var TYPES = {
    mehndi:  { en: "Mehndi",  ur: "مہندی",  img: "baraat", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Dholki and songs", "ڈھولکی اور گیت", 45], ["Mehndi rasam", "رسمِ مہندی", 90], ["Dinner", "کھانا", 150]] },
    mayun:   { en: "Mayun",   ur: "مایوں",  img: "baraat", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Ubtan rasam", "رسمِ اُبٹن", 45], ["Dinner", "کھانا", 120]] },
    dholki:  { en: "Dholki",  ur: "ڈھولکی", img: "baraat", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Dholki and songs", "ڈھولکی اور گیت", 30], ["Dinner", "کھانا", 120]] },
    nikah:   { en: "Nikah",   ur: "نکاح",   img: "nikah", dur: 2.5,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Nikah ceremony", "نکاح", 30], ["Dua and mubarakbad", "دعا اور مبارکباد", 75], ["Hi tea", "چائے", 105]] },
    baraat:  { en: "Baraat",  ur: "بارات",  img: "baraat", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Baraat arrives", "بارات کی آمد", 30], ["Dinner", "کھانا", 120], ["Rukhsati", "رخصتی", 180]] },
    rukhsati:{ en: "Rukhsati",ur: "رخصتی",  img: "baraat", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Dinner", "کھانا", 90], ["Rukhsati", "رخصتی", 150]] },
    walima:  { en: "Walima",  ur: "ولیمہ",  img: "walima", dur: 3.5,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Couple arrives", "دولہا دلہن کی آمد", 45], ["Dinner", "کھانا", 90]] },
    engagement:{ en: "Engagement", ur: "منگنی", img: "nikah", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Ring ceremony", "رسمِ انگوٹھی", 45], ["Dinner", "کھانا", 90]] },
    sangeet: { en: "Sangeet", ur: "سنگیت", img: "baraat", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Songs and dances", "گیت اور رقص", 45], ["Dinner", "کھانا", 150]] },
    welcome: { en: "Welcome Party", ur: "ویلکم پارٹی", img: "baraat", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Welcome and drinks", "استقبال اور مشروبات", 30], ["Dinner", "کھانا", 90]] },
    bridalshower: { en: "Bridal Shower", ur: "برائیڈل شاور", img: "nikah", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Games and gifts", "کھیل اور تحائف", 45], ["Lunch", "کھانا", 120]] },
    bachelor: { en: "Bachelor Party", ur: "بیچلر پارٹی", img: "baraat", dur: 4,
      prog: [["Friends arrive", "دوستوں کی آمد", 0], ["Dinner", "کھانا", 60], ["Celebrations", "جشن", 120]] },
    bachelorette: { en: "Bachelorette Party", ur: "بیچلریٹ پارٹی", img: "baraat", dur: 4,
      prog: [["Friends arrive", "سہیلیوں کی آمد", 0], ["Dinner", "کھانا", 60], ["Celebrations", "جشن", 120]] },
    rehearsal: { en: "Rehearsal Dinner", ur: "ریہرسل ڈنر", img: "walima", dur: 3,
      prog: [["Rehearsal", "ریہرسل", 0], ["Dinner", "کھانا", 60], ["Toasts", "مبارکباد", 120]] },
    ceremony: { en: "Ceremony", ur: "شادی کی تقریب", img: "nikah", dur: 2,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Ceremony", "تقریب", 30], ["Photos and congratulations", "تصاویر اور مبارکباد", 75]] },
    cocktail: { en: "Cocktail Hour", ur: "کاک ٹیل آور", img: "walima", dur: 1.5,
      prog: [["Drinks and canapés", "مشروبات اور اسنیکس", 0], ["Music", "موسیقی", 30]] },
    reception: { en: "Reception", ur: "استقبالیہ", img: "walima", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Couple's entrance", "دولہا دلہن کی آمد", 45], ["Dinner", "کھانا", 90], ["Cake and first dance", "کیک اور پہلا رقص", 150]] },
    afterparty: { en: "After Party", ur: "آفٹر پارٹی", img: "baraat", dur: 3,
      prog: [["Music and dancing", "موسیقی اور رقص", 0], ["Late night snacks", "رات کے اسنیکس", 90]] },
    henna:   { en: "Henna Night", ur: "حنا نائٹ", img: "baraat", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Henna for the bride", "دلہن کی مہندی", 45], ["Dinner", "کھانا", 120]] },
    katb:    { en: "Katb Al-Kitab", ur: "کتب الکتاب", img: "nikah", dur: 2.5,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Katb Al-Kitab", "عقدِ نکاح", 30], ["Dua and congratulations", "دعا اور مبارکباد", 75], ["Refreshments", "تواضع", 105]] },
    zaffa:   { en: "Zaffa", ur: "زفّہ", img: "baraat", dur: 4,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Zaffa procession", "زفّہ کی آمد", 30], ["Dinner", "کھانا", 120]] },
    other:   { en: "Event",   ur: "تقریب",  img: "walima", dur: 3,
      prog: [["Guests arrive", "مہمانوں کی آمد", 0], ["Dinner", "کھانا", 90]] }
  };

  function parse(date, time) {           // local Pakistan time
    var t = (time || "19:00").split(":"), d = date.split("-");
    return { y: +d[0], m: +d[1], d: +d[2], h: +t[0], mi: +(t[1] || 0) };
  }
  function dow(p) { return new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay(); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  /* UTC offset ("+05:00") of an IANA time zone at that local date/time; the wedding's own zone, Pakistan by default */
  function offset(tz, p) {
    if (!tz || tz === "Asia/Karachi") return "+05:00";
    try {
      var guess = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi), f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23",
        year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }), q = {};
      f.formatToParts(new Date(guess)).forEach(function (x) { q[x.type] = x.value; });
      var m = Math.round((Date.UTC(+q.year, +q.month - 1, +q.day, +q.hour % 24, +q.minute) - guess) / 60000);
      var s = m < 0 ? "-" : "+"; m = Math.abs(m);
      return s + pad(Math.floor(m / 60)) + ":" + pad(m % 60);
    } catch (e) { return "+05:00"; }
  }
  function iso(p, addMin, tz) {
    var x = new Date(Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi) + (addMin || 0) * 60000);
    return x.getUTCFullYear() + "-" + pad(x.getUTCMonth() + 1) + "-" + pad(x.getUTCDate()) + "T" + pad(x.getUTCHours()) + ":" + pad(x.getUTCMinutes()) + ":00" + offset(tz, p);
  }
  function clock(h, mi) { var ap = h >= 12 ? "PM" : "AM", hh = h % 12 || 12; return hh + ":" + pad(mi) + " " + ap; }
  function clockShort(h, mi) { var ap = h >= 12 ? "PM" : "AM", hh = h % 12 || 12; return hh + (mi ? ":" + pad(mi) : "") + " " + ap; }
  function clockUr(h, mi) {
    var part = h < 5 ? "رات" : h < 12 ? "صبح" : h < 16 ? "دوپہر" : h < 19 ? "شام" : "رات";
    var hh = h % 12 || 12, nx = hh % 12 + 1, s;
    if (mi === 0) s = ud(hh) + " بجے";
    else if (mi === 30) s = (hh === 1 ? "ڈیڑھ" : hh === 2 ? "ڈھائی" : "ساڑھے " + ud(hh)) + " بجے";
    else if (mi === 15) s = "سوا " + ud(hh) + " بجے";
    else if (mi === 45) s = "پونے " + ud(nx) + " بجے";
    else s = ud(hh + ":" + pad(mi));
    return part + " " + s;
  }
  function hijri(p, ur) {
    try {
      var f = new Intl.DateTimeFormat((ur ? "ur" : "en") + "-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
      var s = f.format(new Date(Date.UTC(p.y, p.m - 1, p.d, 12)));
      return ur ? ud(s) : s.replace(/ AH$/, "") + " AH";
    } catch (e) { return ""; }
  }

  function build(o, D) {
    var C = JSON.parse(JSON.stringify(D)), en = C.text.en, ur = C.text.ur;
    var A = esc(o.a), B = esc(o.b), Aur = esc(o.aUr || o.a), Bur = esc(o.bUr || o.b);
    var city = esc(o.city || ""), cityUr = esc(o.cityUr || o.city || "");
    var evs = (o.events || []).filter(function (e) { return e && e.date; });
    evs.sort(function (x, y) { return (x.date + (x.time || "")) < (y.date + (y.time || "")) ? -1 : 1; });
    if (!evs.length) evs = [{ type: "nikah", date: "2026-12-12", time: "19:00", venue: "Venue to be announced" }];

    var plain = evs.some(function (e) { return String(e.plain) === "1"; });
    C.events = evs.map(function (e) {
      var T = TYPES[e.type] || TYPES.other, p = parse(e.date, e.time), w = dow(p);
      var n = esc(e.n || T.en), nUr = esc(e.nUr || (e.n ? e.n : T.ur));
      var venue = esc(e.venue || "Venue to be announced"), venueUr = esc(e.venueUr || e.venue || "");
      var area = esc(e.area || o.city || ""), areaUr = esc(e.areaUr || e.area || o.cityUr || o.city || "");
      var dress = esc(e.dress || o.dress || ""), dressUr = esc(e.dressUr || e.dress || o.dressUr || o.dress || "");
      var img = e.img || ("img/" + T.img + ".webp");
      return {
        img: img, type: e.type || "other",
        start: iso(p, 0, e.tz || o.tz), end: iso(p, (T.dur || 3) * 60, e.tz || o.tz),
        q: (e.venue || "") + (e.area || o.city ? ", " + (e.area || o.city) : ""),
        url: /^https:\/\/(maps\.app\.goo\.gl|goo\.gl\/maps|(www\.)?google\.[a-z.]+\/maps|maps\.google\.)/.test(e.map || "") ? e.map : "",
        addr: (e.venue || "") + (e.area || o.city ? ", " + (e.area || o.city) : ""),
        en: { n: n, w: DOW[w] + ", " + p.d + " " + MON[p.m - 1] + " " + p.y + " · " + clock(p.h, p.mi),
              p: venue + (area ? ", " + area : ""), d: dress,
              short: DOW[w].slice(0, 3) + " " + p.d + " " + MON[p.m - 1].slice(0, 3) + ", " + clockShort(p.h, p.mi),
              venue: venue, addr: area },
        ur: { n: nUr, w: DOW_UR[w] + "، " + ud(p.d) + " " + MON_UR[p.m - 1] + " " + ud(p.y) + " · " + clockUr(p.h, p.mi),
              p: venueUr + (areaUr ? "، " + areaUr : ""), d: dressUr,
              short: DOW_UR[w] + " " + ud(p.d) + " " + MON_UR[p.m - 1],
              venue: venueUr, addr: areaUr },
        _p: p, _T: T
      };
    });

    // main event: Nikah, else Baraat, else the first
    var mi = 0, pri = ["nikah", "katb", "ceremony", "baraat", "zaffa", "walima", "reception"];
    for (var k = 0; k < pri.length; k++) { var f = C.events.findIndex(function (e) { return e.type === pri[k]; }); if (f >= 0) { mi = f; break; } }
    if (o.main != null && C.events[o.main]) mi = o.main;
    C.mainEvent = mi;
    var M = C.events[mi], mp = M._p, mT = M._T;

    C.v.nameA = raw(o.a); C.v.nameB = raw(o.b); C.v.sig = raw(o.a) + " & " + raw(o.b);
    C.v.posterDate = pad(mp.d) + " · " + pad(mp.m) + " · " + mp.y;
    C.v.mainDay = String(mp.d); C.v.mainMonthYear = MON[mp.m - 1] + " " + mp.y;
    C.v.hijri = plain ? "" : hijri(mp, false);
    var fA = esc(o.famA || ""), fB = esc(o.famB || "");
    C.v.families = raw(o.familiesLine || "") || (o.surnameA && o.surnameB ? "The " + raw(o.surnameA) + " & " + raw(o.surnameB) + " Families" : "Together with their families");
    C.families = { en: [fA, fB], ur: [esc(o.famAUr || o.famA || ""), esc(o.famBUr || o.famB || "")] };

    en.posterPlace = city; ur.posterPlace = cityUr;
    en.mainFn = M.en.n; ur.mainFn = M.ur.n;
    en.mainDow = DOW[dow(mp)]; ur.mainDow = DOW_UR[dow(mp)];
    en.progEye = M.en.n + " day"; ur.progEye = M.ur.n + " کا دن";
    if (o.top) { en.together = esc(o.top); if (o.topUr) ur.together = esc(o.topUr); }
    if (C.text.en.mainHijri !== undefined) C.text.ur.mainHijri = plain ? "" : hijri(mp, true);
    if (plain && C.text.en.cdH) C.text.en.cdH = "Until we say I do";

    C.program = (o.program && o.program.length ? o.program.map(function (r) { return { t: esc(r.t), en: esc(r.en), ur: esc(r.ur || r.en) }; })
      : mT.prog.map(function (r) { var x = new Date(Date.UTC(2000, 0, 1, mp.h, mp.mi) + r[2] * 60000); return { t: clock(x.getUTCHours(), x.getUTCMinutes()), en: r[0], ur: r[1] }; }));

    var det = [];
    if (o.notes && o.notes.length) o.notes.forEach(function (d) { if (d && d.t) det.push({ en: [esc(d.t), esc(d.p)], ur: [esc(d.tUr || d.t), esc(d.pUr || d.p)] }); });
    else det = [
      { en: ["Arrival", "Please arrive on time so you do not miss a moment."], ur: ["آمد", "براہِ کرم وقت پر تشریف لائیں۔"] },
      { en: ["Gifts", "Your duas are the only gift we ask for."], ur: ["تحائف", "آپ کی دعائیں ہی ہمارا تحفہ ہیں۔"] }
    ];
    C.details = det;

    C.story = (o.story || []).map(function (s) { return { when: esc(s.when), en: { t: esc(s.t), p: esc(s.p) }, ur: { t: esc(s.tUr || s.t), p: esc(s.pUr || s.p) } }; });
    C.gallery = (o.photos && o.photos.length) ? o.photos.slice(0, 6).map(function (u) { return { img: esc(u), en: "", ur: "" }; })
      : (C.gallery || []).map(function (g) { return { img: g.img, en: "", ur: "" }; });
    C.wishes = [];
    C.events.forEach(function (e) { delete e._p; delete e._T; });
    return C;
  }

  W.BW = { build: build, raw: raw, esc: esc, TYPES: TYPES, ud: ud };
})(window);
