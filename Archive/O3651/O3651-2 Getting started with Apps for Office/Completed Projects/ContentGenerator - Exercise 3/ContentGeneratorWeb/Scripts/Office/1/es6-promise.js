/*!
 Copyright (c) 2014 Roman Dvornov
*/

var OfficeExtension = OfficeExtension || {}; (function (p) { var b = p["Promise"], r = b && "resolve" in b && "reject" in b && "all" in b && "race" in b && function () { var a; new b(function (b) { a = b }); return typeof a === "function" }(); if (r) return; var i = "pending", q = "sealed", e = "fulfilled", h = "rejected", x = function () { }; function n(a) { return Object.prototype.toString.call(a) === "[object Array]" } var v = typeof setImmediate !== "undefined" ? setImmediate : setTimeout, c = [], f; function w() { for (var a = 0; a < c.length; a++) c[a][0](c[a][1]); c = []; f = false } function g(a, b) { c.push([a, b]); if (!f) { f = true; v(w, 0) } } function u(f, b) { function e(a) { j(b, a) } function a(a) { d(b, a) } try { f(e, a) } catch (c) { a(c) } } function l(f) { var i = f.owner, c = i.state_, a = i.data_, g = f[c], b = f.then; if (typeof g === "function") { c = e; try { a = g(a) } catch (l) { d(b, l) } } if (!k(b, a)) { c === e && j(b, a); c === h && d(b, a) } } function k(c, a) { var b; try { if (c === a) throw new TypeError("A promises callback cannot return that same promise."); if (a && (typeof a === "function" || typeof a === "object")) { var e = a.then; if (typeof e === "function") { e.call(a, function (d) { if (!b) { b = true; if (a !== d) j(c, d); else m(c, d) } }, function (a) { if (!b) { b = true; d(c, a) } }); return true } } } catch (f) { !b && d(c, f); return true } return false } function j(a, b) { (a === b || !k(a, b)) && m(a, b) } function m(a, b) { if (a.state_ === i) { a.state_ = q; a.data_ = b; g(s, a) } } function d(a, b) { if (a.state_ === i) { a.state_ = q; a.data_ = b; g(t, a) } } function o(c) { var b = c.then_; c.then_ = undefined; for (var a = 0; a < b.length; a++) l(b[a]) } function s(a) { a.state_ = e; o(a) } function t(a) { a.state_ = h; o(a) } var a = function (b) { if (typeof b !== "function") throw new TypeError("Promise constructor takes a function argument"); if (this instanceof a === false) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."); this.then_ = []; u(b, this) }; a.prototype = { constructor: a, state_: i, then_: null, data_: undefined, then: function (b, c) { var a = { owner: this, then: new this.constructor(x), fulfilled: b, rejected: c }; if (this.state_ === e || this.state_ === h) g(l, a); else this.then_.push(a); return a.then }, "catch": function (a) { return this.then(null, a) } }; a.all = function (a) { var b = this; if (!n(a)) throw new TypeError("You must pass an array to Promise.all()."); return new b(function (f, h) { var d = [], e = 0; function g(a) { e++; return function (b) { d[a] = b; !--e && f(d) } } for (var c = 0, b; c < a.length; c++) { b = a[c]; if (b && typeof b.then === "function") b.then(g(c), h); else d[c] = b } !e && f(d) }) }; a.race = function (a) { var b = this; if (!n(a)) throw new TypeError("You must pass an array to Promise.race()."); return new b(function (d, e) { for (var c = 0, b; c < a.length; c++) { b = a[c]; if (b && typeof b.then === "function") b.then(d, e); else d(b) } }) }; a.resolve = function (a) { var b = this; if (a && typeof a === "object" && a.constructor === b) return a; return new b(function (b) { b(a) }) }; a.reject = function (a) { var b = this; return new b(function (c, b) { b(a) }) }; p["Promise"] = a })(OfficeExtension)