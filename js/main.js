/*
* @author: Izabely Furtado, izabely.correa@pdcase.com.br
*/
var requirejs, require, define;
(function (e) {
    function h(e, t) {
        return f.call(e, t)
    }

    function p(e, t) {
        var n, r, i, s, o, a, f, l, h, p, d, v = t && t.split("/"),
            m = u.map,
            g = m && m["*"] || {};
        if (e && e.charAt(0) === ".")
            if (t) {
                e = e.split("/"), o = e.length - 1, u.nodeIdCompat && c.test(e[o]) && (e[o] = e[o].replace(c, "")), e = v.slice(0, v.length - 1).concat(e);
                for (h = 0; h < e.length; h += 1) {
                    d = e[h];
                    if (d === ".") e.splice(h, 1), h -= 1;
                    else if (d === "..") {
                        if (h === 1 && (e[2] === ".." || e[0] === "..")) break;
                        h > 0 && (e.splice(h - 1, 2), h -= 2)
                    }
                }
                e = e.join("/")
            } else e.indexOf("./") === 0 && (e = e.substring(2));
        if ((v || g) && m) {
            n = e.split("/");
            for (h = n.length; h > 0; h -= 1) {
                r = n.slice(0, h).join("/");
                if (v)
                    for (p = v.length; p > 0; p -= 1) {
                        i = m[v.slice(0, p).join("/")];
                        if (i) {
                            i = i[r];
                            if (i) {
                                s = i, a = h;
                                break
                            }
                        }
                    }
                if (s) break;
                !f && g && g[r] && (f = g[r], l = h)
            } !s && f && (s = f, a = l), s && (n.splice(0, a, s), e = n.join("/"))
        }
        return e
    }

    function d(t, r) {
        return function () {
            var i = l.call(arguments, 0);
            return typeof i[0] != "string" && i.length === 1 && i.push(null), n.apply(e, i.concat([t, r]))
        }
    }

    function v(e) {
        return function (t) {
            return p(t, e)
        }
    }

    function m(e) {
        return function (t) {
            s[e] = t
        }
    }

    function g(n) {
        if (h(o, n)) {
            var r = o[n];
            delete o[n], a[n] = !0, t.apply(e, r)
        }
        if (!h(s, n) && !h(a, n)) throw new Error("No " + n);
        return s[n]
    }

    function y(e) {
        var t, n = e ? e.indexOf("!") : -1;
        return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
    }

    function b(e) {
        return function () {
            return u && u.config && u.config[e] || {}
        }
    }
    var t, n, r, i, s = {},
        o = {},
        u = {},
        a = {},
        f = Object.prototype.hasOwnProperty,
        l = [].slice,
        c = /\.js$/;
    r = function (e, t) {
        var n, r = y(e),
            i = r[0];
        return e = r[1], i && (i = p(i, t), n = g(i)), i ? n && n.normalize ? e = n.normalize(e, v(t)) : e = p(e, t) : (e = p(e, t), r = y(e), i = r[0], e = r[1], i && (n = g(i))), {
            f: i ? i + "!" + e : e,
            n: e,
            pr: i,
            p: n
        }
    }, i = {
        require: function (e) {
            return d(e)
        },
        exports: function (e) {
            var t = s[e];
            return typeof t != "undefined" ? t : s[e] = {}
        },
        module: function (e) {
            return {
                id: e,
                uri: "",
                exports: s[e],
                config: b(e)
            }
        }
    }, t = function (t, n, u, f) {
        var l, c, p, v, y, b = [],
            w = typeof u,
            E;
        f = f || t;
        if (w === "undefined" || w === "function") {
            n = !n.length && u.length ? ["require", "exports", "module"] : n;
            for (y = 0; y < n.length; y += 1) {
                v = r(n[y], f), c = v.f;
                if (c === "require") b[y] = i.require(t);
                else if (c === "exports") b[y] = i.exports(t), E = !0;
                else if (c === "module") l = b[y] = i.module(t);
                else if (h(s, c) || h(o, c) || h(a, c)) b[y] = g(c);
                else {
                    if (!v.p) throw new Error(t + " missing " + c);
                    v.p.load(v.n, d(f, !0), m(c), {}), b[y] = s[c]
                }
            }
            p = u ? u.apply(s[t], b) : undefined;
            if (t)
                if (l && l.exports !== e && l.exports !== s[t]) s[t] = l.exports;
                else if (p !== e || !E) s[t] = p
            } else t && (s[t] = u)
        }, requirejs = require = n = function (s, o, a, f, l) {
            if (typeof s == "string") return i[s] ? i[s](o) : g(r(s, o).f);
            if (!s.splice) {
                u = s, u.deps && n(u.deps, u.callback);
                if (!o) return;
                o.splice ? (s = o, o = a, a = null) : s = e
            }
            return o = o || function () { }, typeof a == "function" && (a = f, f = l), f ? t(e, s, o, a) : setTimeout(function () {
                t(e, s, o, a)
            }, 4), n
        }, n.config = function (e) {
            return n(e)
        }, requirejs._defined = s, define = function (e, t, n) {
            if (typeof e != "string") throw new Error("See almond README: incorrect module build, no module name");
            t.splice || (n = t, t = []), !h(s, e) && !h(o, e) && (o[e] = [e, t, n])
        }, define.amd = {
            jQuery: !0
        }
    })(), define("../bower_components/almond/almond", function () { }),
    function (e, t) {
        typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? t(e, !0) : function (e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    } (typeof window != "undefined" ? window : this, function (e, t) {
        function g(e) {
            var t = "length" in e && e.length,
                n = h.type(e);
            return n === "function" || h.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
        }

        function S(e, t, n) {
            if (h.isFunction(t)) return h.grep(e, function (e, r) {
                return !!t.call(e, r, e) !== n
            });
            if (t.nodeType) return h.grep(e, function (e) {
                return e === t !== n
            });
            if (typeof t == "string") {
                if (E.test(t)) return h.filter(t, e, n);
                t = h.filter(t, e)
            }
            return h.grep(e, function (e) {
                return h.inArray(e, t) >= 0 !== n
            })
        }

        function A(e, t) {
            do e = e[t]; while (e && e.nodeType !== 1);
            return e
        }

        function _(e) {
            var t = M[e] = {};
            return h.each(e.match(O) || [], function (e, n) {
                t[n] = !0
            }), t
        }

        function P() {
            T.addEventListener ? (T.removeEventListener("DOMContentLoaded", H, !1), e.removeEventListener("load", H, !1)) : (T.detachEvent("onreadystatechange", H), e.detachEvent("onload", H))
        }

        function H() {
            if (T.addEventListener || event.type === "load" || T.readyState === "complete") P(), h.ready()
        }

        function q(e, t, n) {
            if (n === undefined && e.nodeType === 1) {
                var r = "data-" + t.replace(I, "-$1").toLowerCase();
                n = e.getAttribute(r);
                if (typeof n == "string") {
                    try {
                        n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : F.test(n) ? h.parseJSON(n) : n
                    } catch (i) { }
                    h.data(e, t, n)
                } else n = undefined
            }
            return n
        }

        function R(e) {
            var t;
            for (t in e) {
                if (t === "data" && h.isEmptyObject(e[t])) continue;
                if (t !== "toJSON") return !1
            }
            return !0
        }

        function U(e, t, r, i) {
            if (!h.acceptData(e)) return;
            var s, o, u = h.expando,
                a = e.nodeType,
                f = a ? h.cache : e,
                l = a ? e[u] : e[u] && u;
            if ((!l || !f[l] || !i && !f[l].data) && r === undefined && typeof t == "string") return;
            l || (a ? l = e[u] = n.pop() || h.guid++ : l = u), f[l] || (f[l] = a ? {} : {
                toJSON: h.noop
            });
            if (typeof t == "object" || typeof t == "function") i ? f[l] = h.extend(f[l], t) : f[l].data = h.extend(f[l].data, t);
            return o = f[l], i || (o.data || (o.data = {}), o = o.data), r !== undefined && (o[h.camelCase(t)] = r), typeof t == "string" ? (s = o[t], s == null && (s = o[h.camelCase(t)])) : s = o, s
        }

        function z(e, t, n) {
            if (!h.acceptData(e)) return;
            var r, i, s = e.nodeType,
                o = s ? h.cache : e,
                u = s ? e[h.expando] : h.expando;
            if (!o[u]) return;
            if (t) {
                r = n ? o[u] : o[u].data;
                if (r) {
                    h.isArray(t) ? t = t.concat(h.map(t, h.camelCase)) : t in r ? t = [t] : (t = h.camelCase(t), t in r ? t = [t] : t = t.split(" ")), i = t.length;
                    while (i--) delete r[t[i]];
                    if (n ? !R(r) : !h.isEmptyObject(r)) return
                }
            }
            if (!n) {
                delete o[u].data;
                if (!R(o[u])) return
            }
            s ? h.cleanData([e], !0) : l.deleteExpando || o != o.window ? delete o[u] : o[u] = null
        }

        function et() {
            return !0
        }

        function tt() {
            return !1
        }

        function nt() {
            try {
                return T.activeElement
            } catch (e) { }
        }

        function rt(e) {
            var t = it.split("|"),
                n = e.createDocumentFragment();
            if (n.createElement)
                while (t.length) n.createElement(t.pop());
            return n
        }

        function wt(e, t) {
            var n, r, i = 0,
                s = typeof e.getElementsByTagName !== B ? e.getElementsByTagName(t || "*") : typeof e.querySelectorAll !== B ? e.querySelectorAll(t || "*") : undefined;
            if (!s)
                for (s = [], n = e.childNodes || e;
                    (r = n[i]) != null; i++) !t || h.nodeName(r, t) ? s.push(r) : h.merge(s, wt(r, t));
            return t === undefined || t && h.nodeName(e, t) ? h.merge([e], s) : s
        }

        function Et(e) {
            J.test(e.type) && (e.defaultChecked = e.checked)
        }

        function St(e, t) {
            return h.nodeName(e, "table") && h.nodeName(t.nodeType !== 11 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function xt(e) {
            return e.type = (h.find.attr(e, "type") !== null) + "/" + e.type, e
        }

        function Tt(e) {
            var t = vt.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function Nt(e, t) {
            var n, r = 0;
            for (;
                (n = e[r]) != null; r++) h._data(n, "globalEval", !t || h._data(t[r], "globalEval"))
        }

        function Ct(e, t) {
            if (t.nodeType !== 1 || !h.hasData(e)) return;
            var n, r, i, s = h._data(e),
                o = h._data(t, s),
                u = s.events;
            if (u) {
                delete o.handle, o.events = {};
                for (n in u)
                    for (r = 0, i = u[n].length; r < i; r++) h.event.add(t, n, u[n][r])
            }
            o.data && (o.data = h.extend({}, o.data))
        }

        function kt(e, t) {
            var n, r, i;
            if (t.nodeType !== 1) return;
            n = t.nodeName.toLowerCase();
            if (!l.noCloneEvent && t[h.expando]) {
                i = h._data(t);
                for (r in i.events) h.removeEvent(t, r, i.handle);
                t.removeAttribute(h.expando)
            }
            if (n === "script" && t.text !== e.text) xt(t).text = e.text, Tt(t);
            else if (n === "object") t.parentNode && (t.outerHTML = e.outerHTML), l.html5Clone && e.innerHTML && !h.trim(t.innerHTML) && (t.innerHTML = e.innerHTML);
            else if (n === "input" && J.test(e.type)) t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value);
            else if (n === "option") t.defaultSelected = t.selected = e.defaultSelected;
            else if (n === "input" || n === "textarea") t.defaultValue = e.defaultValue
        }

        function Ot(t, n) {
            var r, i = h(n.createElement(t)).appendTo(n.body),
                s = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(i[0])) ? r.display : h.css(i[0], "display");
            return i.detach(), s
        }

        function Mt(e) {
            var t = T,
                n = At[e];
            if (!n) {
                n = Ot(e, t);
                if (n === "none" || !n) Lt = (Lt || h("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = (Lt[0].contentWindow || Lt[0].contentDocument).document, t.write(), t.close(), n = Ot(e, t), Lt.detach();
                At[e] = n
            }
            return n
        }

        function jt(e, t) {
            return {
                get: function () {
                    var n = e();
                    if (n == null) return;
                    if (n) {
                        delete this.get;
                        return
                    }
                    return (this.get = t).apply(this, arguments)
                }
            }
        }

        function Vt(e, t) {
            if (t in e) return t;
            var n = t.charAt(0).toUpperCase() + t.slice(1),
                r = t,
                i = Xt.length;
            while (i--) {
                t = Xt[i] + n;
                if (t in e) return t
            }
            return r
        }

        function $t(e, t) {
            var n, r, i, s = [],
                o = 0,
                u = e.length;
            for (; o < u; o++) {
                r = e[o];
                if (!r.style) continue;
                s[o] = h._data(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && V(r) && (s[o] = h._data(r, "olddisplay", Mt(r.nodeName)))) : (i = V(r), (n && n !== "none" || !i) && h._data(r, "olddisplay", i ? n : h.css(r, "display")))
            }
            for (o = 0; o < u; o++) {
                r = e[o];
                if (!r.style) continue;
                if (!t || r.style.display === "none" || r.style.display === "") r.style.display = t ? s[o] || "" : "none"
            }
            return e
        }

        function Jt(e, t, n) {
            var r = Rt.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function Kt(e, t, n, r, i) {
            var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
                o = 0;
            for (; s < 4; s += 2) n === "margin" && (o += h.css(e, n + X[s], !0, i)), r ? (n === "content" && (o -= h.css(e, "padding" + X[s], !0, i)), n !== "margin" && (o -= h.css(e, "border" + X[s] + "Width", !0, i))) : (o += h.css(e, "padding" + X[s], !0, i), n !== "padding" && (o += h.css(e, "border" + X[s] + "Width", !0, i)));
            return o
        }

        function Qt(e, t, n) {
            var r = !0,
                i = t === "width" ? e.offsetWidth : e.offsetHeight,
                s = Pt(e),
                o = l.boxSizing && h.css(e, "boxSizing", !1, s) === "border-box";
            if (i <= 0 || i == null) {
                i = Ht(e, t, s);
                if (i < 0 || i == null) i = e.style[t];
                if (Dt.test(i)) return i;
                r = o && (l.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
            }
            return i + Kt(e, t, n || (o ? "border" : "content"), r, s) + "px"
        }

        function Gt(e, t, n, r, i) {
            return new Gt.prototype.init(e, t, n, r, i)
        }

        function on() {
            return setTimeout(function () {
                Yt = undefined
            }), Yt = h.now()
        }

        function un(e, t) {
            var n, r = {
                height: e
            },
                i = 0;
            t = t ? 1 : 0;
            for (; i < 4; i += 2 - t) n = X[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function an(e, t, n) {
            var r, i = (sn[t] || []).concat(sn["*"]),
                s = 0,
                o = i.length;
            for (; s < o; s++)
                if (r = i[s].call(n, t, e)) return r
            }

            function fn(e, t, n) {
                var r, i, s, o, u, a, f, c, p = this,
                d = {},
                v = e.style,
                m = e.nodeType && V(e),
                g = h._data(e, "fxshow");
                n.queue || (u = h._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function () {
                    u.unqueued || a()
                }), u.unqueued++, p.always(function () {
                    p.always(function () {
                        u.unqueued--, h.queue(e, "fx").length || u.empty.fire()
                    })
                })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [v.overflow, v.overflowX, v.overflowY], f = h.css(e, "display"), c = f === "none" ? h._data(e, "olddisplay") || Mt(e.nodeName) : f, c === "inline" && h.css(e, "float") === "none" && (!l.inlineBlockNeedsLayout || Mt(e.nodeName) === "inline" ? v.display = "inline-block" : v.zoom = 1)), n.overflow && (v.overflow = "hidden", l.shrinkWrapBlocks() || p.always(function () {
                    v.overflow = n.overflow[0], v.overflowX = n.overflow[1], v.overflowY = n.overflow[2]
                }));
                for (r in t) {
                    i = t[r];
                    if (en.exec(i)) {
                        delete t[r], s = s || i === "toggle";
                        if (i === (m ? "hide" : "show")) {
                            if (i !== "show" || !g || g[r] === undefined) continue;
                            m = !0
                        }
                        d[r] = g && g[r] || h.style(e, r)
                    } else f = undefined
                }
                if (!h.isEmptyObject(d)) {
                    g ? "hidden" in g && (m = g.hidden) : g = h._data(e, "fxshow", {}), s && (g.hidden = !m), m ? h(e).show() : p.done(function () {
                        h(e).hide()
                    }), p.done(function () {
                        var t;
                        h._removeData(e, "fxshow");
                        for (t in d) h.style(e, t, d[t])
                    });
                    for (r in d) o = an(m ? g[r] : 0, r, p), r in g || (g[r] = o.start, m && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
                } else (f === "none" ? Mt(e.nodeName) : f) === "inline" && (v.display = f)
            }

            function ln(e, t) {
                var n, r, i, s, o;
                for (n in e) {
                    r = h.camelCase(n), i = t[r], s = e[n], h.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = h.cssHooks[r];
                    if (o && "expand" in o) {
                        s = o.expand(s), delete e[r];
                        for (n in s) n in e || (e[n] = s[n], t[n] = i)
                    } else t[r] = i
                }
            }

            function cn(e, t, n) {
                var r, i, s = 0,
                o = rn.length,
                u = h.Deferred().always(function () {
                    delete a.elem
                }),
                a = function () {
                    if (i) return !1;
                    var t = Yt || on(),
                        n = Math.max(0, f.startTime + f.duration - t),
                        r = n / f.duration || 0,
                        s = 1 - r,
                        o = 0,
                        a = f.tweens.length;
                    for (; o < a; o++) f.tweens[o].run(s);
                    return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
                },
                f = u.promise({
                    elem: e,
                    props: h.extend({}, t),
                    opts: h.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Yt || on(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                        var r = h.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                        return f.tweens.push(r), r
                    },
                    stop: function (t) {
                        var n = 0,
                            r = t ? f.tweens.length : 0;
                        if (i) return this;
                        i = !0;
                        for (; n < r; n++) f.tweens[n].run(1);
                        return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                    }
                }),
                l = f.props;
                ln(l, f.opts.specialEasing);
                for (; s < o; s++) {
                    r = rn[s].call(f, e, l, f.opts);
                    if (r) return r
                }
                return h.map(l, an, f), h.isFunction(f.opts.start) && f.opts.start.call(e, f), h.fx.timer(h.extend(a, {
                    elem: e,
                    anim: f,
                    queue: f.opts.queue
                })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
            }

            function Fn(e) {
                return function (t, n) {
                    typeof t != "string" && (n = t, t = "*");
                    var r, i = 0,
                    s = t.toLowerCase().match(O) || [];
                    if (h.isFunction(n))
                        while (r = s[i++]) r.charAt(0) === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
                }
            }

            function In(e, t, n, r) {
                function o(u) {
                    var a;
                    return i[u] = !0, h.each(e[u] || [], function (e, u) {
                        var f = u(t, n, r);
                        if (typeof f == "string" && !s && !i[f]) return t.dataTypes.unshift(f), o(f), !1;
                        if (s) return !(a = f)
                    }), a
                }
                var i = {},
                s = e === Hn;
                return o(t.dataTypes[0]) || !i["*"] && o("*")
            }

            function qn(e, t) {
                var n, r, i = h.ajaxSettings.flatOptions || {};
                for (r in t) t[r] !== undefined && ((i[r] ? e : n || (n = {}))[r] = t[r]);
                return n && h.extend(!0, e, n), e
            }

            function Rn(e, t, n) {
                var r, i, s, o, u = e.contents,
                a = e.dataTypes;
                while (a[0] === "*") a.shift(), i === undefined && (i = e.mimeType || t.getResponseHeader("Content-Type"));
                if (i)
                    for (o in u)
                        if (u[o] && u[o].test(i)) {
                            a.unshift(o);
                            break
                        }
                if (a[0] in n) s = a[0];
                else {
                    for (o in n) {
                        if (!a[0] || e.converters[o + " " + a[0]]) {
                            s = o;
                            break
                        }
                        r || (r = o)
                    }
                    s = s || r
                }
                if (s) return s !== a[0] && a.unshift(s), n[s]
            }

            function Un(e, t, n, r) {
                var i, s, o, u, a, f = {},
                l = e.dataTypes.slice();
                if (l[1])
                    for (o in e.converters) f[o.toLowerCase()] = e.converters[o];
                s = l.shift();
                while (s) {
                    e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
                    if (s)
                        if (s === "*") s = a;
                        else if (a !== "*" && a !== s) {
                            o = f[a + " " + s] || f["* " + s];
                            if (!o)
                                for (i in f) {
                                    u = i.split(" ");
                                    if (u[1] === s) {
                                        o = f[a + " " + u[0]] || f["* " + u[0]];
                                        if (o) {
                                            o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                                            break
                                        }
                                    }
                                }
                            if (o !== !0)
                                if (o && e["throws"]) t = o(t);
                                else try {
                                    t = o(t)
                                } catch (c) {
                                    return {
                                        state: "parsererror",
                                        error: o ? c : "No conversion from " + a + " to " + s
                                    }
                                }
                        }
                }
                return {
                    state: "success",
                    data: t
                }
            }

            function Jn(e, t, n, r) {
                var i;
                if (h.isArray(t)) h.each(t, function (t, i) {
                    n || Wn.test(e) ? r(e, i) : Jn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
                });
                else if (!n && h.type(t) === "object")
                    for (i in t) Jn(e + "[" + i + "]", t[i], n, r);
                else r(e, t)
            }

            function Yn() {
                try {
                    return new e.XMLHttpRequest
                } catch (t) { }
            }

            function Zn() {
                try {
                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) { }
            }

            function ir(e) {
                return h.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
            }
            var n = [],
            r = n.slice,
            i = n.concat,
            s = n.push,
            o = n.indexOf,
            u = {},
            a = u.toString,
            f = u.hasOwnProperty,
            l = {},
            c = "1.11.3",
            h = function (e, t) {
                return new h.fn.init(e, t)
            },
            p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            d = /^-ms-/,
            v = /-([\da-z])/gi,
            m = function (e, t) {
                return t.toUpperCase()
            };
            h.fn = h.prototype = {
                jquery: c,
                constructor: h,
                selector: "",
                length: 0,
                toArray: function () {
                    return r.call(this)
                },
                get: function (e) {
                    return e != null ? e < 0 ? this[e + this.length] : this[e] : r.call(this)
                },
                pushStack: function (e) {
                    var t = h.merge(this.constructor(), e);
                    return t.prevObject = this, t.context = this.context, t
                },
                each: function (e, t) {
                    return h.each(this, e, t)
                },
                map: function (e) {
                    return this.pushStack(h.map(this, function (t, n) {
                        return e.call(t, n, t)
                    }))
                },
                slice: function () {
                    return this.pushStack(r.apply(this, arguments))
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                eq: function (e) {
                    var t = this.length,
                    n = +e + (e < 0 ? t : 0);
                    return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
                },
                end: function () {
                    return this.prevObject || this.constructor(null)
                },
                push: s,
                sort: n.sort,
                splice: n.splice
            }, h.extend = h.fn.extend = function () {
                var e, t, n, r, i, s, o = arguments[0] || {},
                u = 1,
                a = arguments.length,
                f = !1;
                typeof o == "boolean" && (f = o, o = arguments[u] || {}, u++), typeof o != "object" && !h.isFunction(o) && (o = {}), u === a && (o = this, u--);
                for (; u < a; u++)
                    if ((i = arguments[u]) != null)
                        for (r in i) {
                            e = o[r], n = i[r];
                            if (o === n) continue;
                            f && n && (h.isPlainObject(n) || (t = h.isArray(n))) ? (t ? (t = !1, s = e && h.isArray(e) ? e : []) : s = e && h.isPlainObject(e) ? e : {}, o[r] = h.extend(f, s, n)) : n !== undefined && (o[r] = n)
                        }
                return o
            }, h.extend({
                expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""),
                isReady: !0,
                error: function (e) {
                    throw new Error(e)
                },
                noop: function () { },
                isFunction: function (e) {
                    return h.type(e) === "function"
                },
                isArray: Array.isArray || function (e) {
                    return h.type(e) === "array"
                },
                isWindow: function (e) {
                    return e != null && e == e.window
                },
                isNumeric: function (e) {
                    return !h.isArray(e) && e - parseFloat(e) + 1 >= 0
                },
                isEmptyObject: function (e) {
                    var t;
                    for (t in e) return !1;
                    return !0
                },
                isPlainObject: function (e) {
                    var t;
                    if (!e || h.type(e) !== "object" || e.nodeType || h.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !f.call(e, "constructor") && !f.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    if (l.ownLast)
                        for (t in e) return f.call(e, t);
                    for (t in e);
                    return t === undefined || f.call(e, t)
                },
                type: function (e) {
                    return e == null ? e + "" : typeof e == "object" || typeof e == "function" ? u[a.call(e)] || "object" : typeof e
                },
                globalEval: function (t) {
                    t && h.trim(t) && (e.execScript || function (t) {
                        e.eval.call(e, t)
                    })(t)
                },
                camelCase: function (e) {
                    return e.replace(d, "ms-").replace(v, m)
                },
                nodeName: function (e, t) {
                    return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                },
                each: function (e, t, n) {
                    var r, i = 0,
                    s = e.length,
                    o = g(e);
                    if (n)
                        if (o)
                            for (; i < s; i++) {
                                r = t.apply(e[i], n);
                                if (r === !1) break
                            } else
                            for (i in e) {
                                r = t.apply(e[i], n);
                                if (r === !1) break
                            } else if (o)
                        for (; i < s; i++) {
                            r = t.call(e[i], i, e[i]);
                            if (r === !1) break
                        } else
                        for (i in e) {
                            r = t.call(e[i], i, e[i]);
                            if (r === !1) break
                        }
                    return e
                },
                trim: function (e) {
                    return e == null ? "" : (e + "").replace(p, "")
                },
                makeArray: function (e, t) {
                    var n = t || [];
                    return e != null && (g(Object(e)) ? h.merge(n, typeof e == "string" ? [e] : e) : s.call(n, e)), n
                },
                inArray: function (e, t, n) {
                    var r;
                    if (t) {
                        if (o) return o.call(t, e, n);
                        r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                        for (; n < r; n++)
                            if (n in t && t[n] === e) return n
                        }
                        return -1
                    },
                    merge: function (e, t) {
                        var n = +t.length,
                    r = 0,
                    i = e.length;
                        while (r < n) e[i++] = t[r++];
                        if (n !== n)
                            while (t[r] !== undefined) e[i++] = t[r++];
                        return e.length = i, e
                    },
                    grep: function (e, t, n) {
                        var r, i = [],
                    s = 0,
                    o = e.length,
                    u = !n;
                        for (; s < o; s++) r = !t(e[s], s), r !== u && i.push(e[s]);
                        return i
                    },
                    map: function (e, t, n) {
                        var r, s = 0,
                    o = e.length,
                    u = g(e),
                    a = [];
                        if (u)
                            for (; s < o; s++) r = t(e[s], s, n), r != null && a.push(r);
                        else
                            for (s in e) r = t(e[s], s, n), r != null && a.push(r);
                        return i.apply([], a)
                    },
                    guid: 1,
                    proxy: function (e, t) {
                        var n, i, s;
                        return typeof t == "string" && (s = e[t], t = e, e = s), h.isFunction(e) ? (n = r.call(arguments, 2), i = function () {
                            return e.apply(t || this, n.concat(r.call(arguments)))
                        }, i.guid = e.guid = e.guid || h.guid++, i) : undefined
                    },
                    now: function () {
                        return +(new Date)
                    },
                    support: l
                }), h.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
                    u["[object " + t + "]"] = t.toLowerCase()
                });
                var y = function (e) {
                    function ot(e, t, r, i) {
                        var s, u, f, l, c, d, g, y, S, x;
                        (t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], l = t.nodeType;
                        if (typeof e != "string" || !e || l !== 1 && l !== 9 && l !== 11) return r;
                        if (!i && v) {
                            if (l !== 11 && (s = Z.exec(e)))
                                if (f = s[1]) {
                                    if (l === 9) {
                                        u = t.getElementById(f);
                                        if (!u || !u.parentNode) return r;
                                        if (u.id === f) return r.push(u), r
                                    } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f) return r.push(u), r
                                } else {
                                    if (s[2]) return D.apply(r, t.getElementsByTagName(e)), r;
                                    if ((f = s[3]) && n.getElementsByClassName) return D.apply(r, t.getElementsByClassName(f)), r
                                }
                            if (n.qsa && (!m || !m.test(e))) {
                                y = g = w, S = t, x = l !== 1 && e;
                                if (l === 1 && t.nodeName.toLowerCase() !== "object") {
                                    d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                                    while (c--) d[c] = y + gt(d[c]);
                                    S = et.test(e) && vt(t.parentNode) || t, x = d.join(",")
                                }
                                if (x) try {
                                    return D.apply(r, S.querySelectorAll(x)), r
                                } catch (T) { } finally {
                                    g || t.removeAttribute("id")
                                }
                            }
                        }
                        return a(e.replace(z, "$1"), t, r, i)
                    }

                    function ut() {
                        function t(n, i) {
                            return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
                        }
                        var e = [];
                        return t
                    }

                    function at(e) {
                        return e[w] = !0, e
                    }

                    function ft(e) {
                        var t = p.createElement("div");
                        try {
                            return !!e(t)
                        } catch (n) {
                            return !1
                        } finally {
                            t.parentNode && t.parentNode.removeChild(t), t = null
                        }
                    }

                    function lt(e, t) {
                        var n = e.split("|"),
                    i = e.length;
                        while (i--) r.attrHandle[n[i]] = t
                    }

                    function ct(e, t) {
                        var n = t && e,
                    r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || L) - (~e.sourceIndex || L);
                        if (r) return r;
                        if (n)
                            while (n = n.nextSibling)
                                if (n === t) return -1;
                        return e ? 1 : -1
                    }

                    function ht(e) {
                        return function (t) {
                            var n = t.nodeName.toLowerCase();
                            return n === "input" && t.type === e
                        }
                    }

                    function pt(e) {
                        return function (t) {
                            var n = t.nodeName.toLowerCase();
                            return (n === "input" || n === "button") && t.type === e
                        }
                    }

                    function dt(e) {
                        return at(function (t) {
                            return t = +t, at(function (n, r) {
                                var i, s = e([], n.length, t),
                            o = s.length;
                                while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                            })
                        })
                    }

                    function vt(e) {
                        return e && typeof e.getElementsByTagName != "undefined" && e
                    }

                    function mt() { }

                    function gt(e) {
                        var t = 0,
                    n = e.length,
                    r = "";
                        for (; t < n; t++) r += e[t].value;
                        return r
                    }

                    function yt(e, t, n) {
                        var r = t.dir,
                    i = n && r === "parentNode",
                    s = x++;
                        return t.first ? function (t, n, s) {
                            while (t = t[r])
                                if (t.nodeType === 1 || i) return e(t, n, s)
                        } : function (t, n, o) {
                            var u, a, f = [S, s];
                            if (o) {
                                while (t = t[r])
                                    if (t.nodeType === 1 || i)
                                        if (e(t, n, o)) return !0
                                    } else
                                        while (t = t[r])
                                            if (t.nodeType === 1 || i) {
                                                a = t[w] || (t[w] = {});
                                                if ((u = a[r]) && u[0] === S && u[1] === s) return f[2] = u[2];
                                                a[r] = f;
                                                if (f[2] = e(t, n, o)) return !0
                                            }
                                }
                            }

                            function bt(e) {
                                return e.length > 1 ? function (t, n, r) {
                                    var i = e.length;
                                    while (i--)
                                        if (!e[i](t, n, r)) return !1;
                                    return !0
                                } : e[0]
                            }

                            function wt(e, t, n) {
                                var r = 0,
                    i = t.length;
                                for (; r < i; r++) ot(e, t[r], n);
                                return n
                            }

                            function Et(e, t, n, r, i) {
                                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                                for (; u < a; u++)
                                    if (s = e[u])
                                        if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                                return o
                            }

                            function St(e, t, n, r, i, s) {
                                return r && !r[w] && (r = St(r)), i && !i[w] && (i = St(i, s)), at(function (s, o, u, a) {
                                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || wt(t || "*", u.nodeType ? [u] : u, []),
                        m = e && (s || !t) ? Et(v, h, e, u, a) : v,
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                                    n && n(m, g, u, a);
                                    if (r) {
                                        f = Et(g, p), r(f, [], u, a), l = f.length;
                                        while (l--)
                                            if (c = f[l]) g[p[l]] = !(m[p[l]] = c)
                                        }
                                        if (s) {
                                            if (i || e) {
                                                if (i) {
                                                    f = [], l = g.length;
                                                    while (l--) (c = g[l]) && f.push(m[l] = c);
                                                    i(null, g = [], f, a)
                                                }
                                                l = g.length;
                                                while (l--) (c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                                            }
                                        } else g = Et(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
                                    })
                                }

                                function xt(e) {
                                    var t, n, i, s = e.length,
                    o = r.relative[e[0].type],
                    u = o || r.relative[" "],
                    a = o ? 1 : 0,
                    l = yt(function (e) {
                        return e === t
                    }, u, !0),
                    c = yt(function (e) {
                        return H(t, e) > -1
                    }, u, !0),
                    h = [function (e, n, r) {
                        var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                        return t = null, i
                    } ];
                                    for (; a < s; a++)
                                        if (n = r.relative[e[a].type]) h = [yt(bt(h), n)];
                                        else {
                                            n = r.filter[e[a].type].apply(null, e[a].matches);
                                            if (n[w]) {
                                                i = ++a;
                                                for (; i < s; i++)
                                                    if (r.relative[e[i].type]) break;
                                                return St(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({
                                                    value: e[a - 2].type === " " ? "*" : ""
                                                })).replace(z, "$1"), n, a < i && xt(e.slice(a, i)), i < s && xt(e = e.slice(i)), i < s && gt(e))
                                            }
                                            h.push(n)
                                        }
                                    return bt(h)
                                }

                                function Tt(e, t) {
                                    var n = t.length > 0,
                    i = e.length > 0,
                    s = function (s, o, u, a, l) {
                        var c, h, d, v = 0,
                            m = "0",
                            g = s && [],
                            y = [],
                            b = f,
                            w = s || i && r.find.TAG("*", l),
                            E = S += b == null ? 1 : Math.random() || .1,
                            x = w.length;
                        l && (f = o !== p && o);
                        for (; m !== x && (c = w[m]) != null; m++) {
                            if (i && c) {
                                h = 0;
                                while (d = e[h++])
                                    if (d(c, o, u)) {
                                        a.push(c);
                                        break
                                    }
                                l && (S = E)
                            }
                            n && ((c = !d && c) && v--, s && g.push(c))
                        }
                        v += m;
                        if (n && m !== v) {
                            h = 0;
                            while (d = t[h++]) d(g, y, o, u);
                            if (s) {
                                if (v > 0)
                                    while (m--) !g[m] && !y[m] && (y[m] = M.call(a));
                                y = Et(y)
                            }
                            D.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && ot.uniqueSort(a)
                        }
                        return l && (S = E, f = b), g
                    };
                                    return n ? at(s) : s
                                }
                                var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date,
                E = e.document,
                S = 0,
                x = 0,
                T = ut(),
                N = ut(),
                C = ut(),
                k = function (e, t) {
                    return e === t && (c = !0), 0
                },
                L = 1 << 31,
                A = {}.hasOwnProperty,
                O = [],
                M = O.pop,
                _ = O.push,
                D = O.push,
                P = O.slice,
                H = function (e, t) {
                    var n = 0,
                        r = e.length;
                    for (; n < r; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                j = "[\\x20\\t\\r\\n\\f]",
                F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                I = F.replace("w", "w#"),
                q = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + j + "*\\]",
                R = ":(" + F + ")(?:\\((" + "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" + "((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|" + ".*" + ")\\)|)",
                U = new RegExp(j + "+", "g"),
                z = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
                W = new RegExp("^" + j + "*," + j + "*"),
                X = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
                V = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"),
                $ = new RegExp(R),
                J = new RegExp("^" + I + "$"),
                K = {
                    ID: new RegExp("^#(" + F + ")"),
                    CLASS: new RegExp("^\\.(" + F + ")"),
                    TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + q),
                    PSEUDO: new RegExp("^" + R),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + B + ")$", "i"),
                    needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
                },
                Q = /^(?:input|select|textarea|button)$/i,
                G = /^h\d$/i,
                Y = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                et = /[+~]/,
                tt = /'|\\/g,
                nt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"),
                rt = function (e, t, n) {
                    var r = "0x" + t - 65536;
                    return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
                },
                it = function () {
                    h()
                };
                                try {
                                    D.apply(O = P.call(E.childNodes), E.childNodes), O[E.childNodes.length].nodeType
                                } catch (st) {
                                    D = {
                                        apply: O.length ? function (e, t) {
                                            _.apply(e, P.call(t))
                                        } : function (e, t) {
                                            var n = e.length,
                            r = 0;
                                            while (e[n++] = t[r++]);
                                            e.length = n - 1
                                        }
                                    }
                                }
                                n = ot.support = {}, s = ot.isXML = function (e) {
                                    var t = e && (e.ownerDocument || e).documentElement;
                                    return t ? t.nodeName !== "HTML" : !1
                                }, h = ot.setDocument = function (e) {
                                    var t, i, o = e ? e.ownerDocument || e : E;
                                    if (o === p || o.nodeType !== 9 || !o.documentElement) return p;
                                    p = o, d = o.documentElement, i = o.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), v = !s(o), n.attributes = ft(function (e) {
                                        return e.className = "i", !e.getAttribute("className")
                                    }), n.getElementsByTagName = ft(function (e) {
                                        return e.appendChild(o.createComment("")), !e.getElementsByTagName("*").length
                                    }), n.getElementsByClassName = Y.test(o.getElementsByClassName), n.getById = ft(function (e) {
                                        return d.appendChild(e).id = w, !o.getElementsByName || !o.getElementsByName(w).length
                                    }), n.getById ? (r.find.ID = function (e, t) {
                                        if (typeof t.getElementById != "undefined" && v) {
                                            var n = t.getElementById(e);
                                            return n && n.parentNode ? [n] : []
                                        }
                                    }, r.filter.ID = function (e) {
                                        var t = e.replace(nt, rt);
                                        return function (e) {
                                            return e.getAttribute("id") === t
                                        }
                                    }) : (delete r.find.ID, r.filter.ID = function (e) {
                                        var t = e.replace(nt, rt);
                                        return function (e) {
                                            var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                                            return n && n.value === t
                                        }
                                    }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
                                        if (typeof t.getElementsByTagName != "undefined") return t.getElementsByTagName(e);
                                        if (n.qsa) return t.querySelectorAll(e)
                                    } : function (e, t) {
                                        var n, r = [],
                        i = 0,
                        s = t.getElementsByTagName(e);
                                        if (e === "*") {
                                            while (n = s[i++]) n.nodeType === 1 && r.push(n);
                                            return r
                                        }
                                        return s
                                    }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
                                        if (v) return t.getElementsByClassName(e)
                                    }, g = [], m = [];
                                    if (n.qsa = Y.test(o.querySelectorAll)) ft(function (e) {
                                        d.appendChild(e).innerHTML = "<a id='" + w + "'></a>" + "<select id='" + w + "-\f]' msallowcapture=''>" + "<option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
                                    }), ft(function (e) {
                                        var t = o.createElement("input");
                                        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
                                    });
                                    return (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ft(function (e) {
                                        n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", R)
                                    }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function (e, t) {
                                        var n = e.nodeType === 9 ? e.documentElement : e,
                        r = t && t.parentNode;
                                        return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                                    } : function (e, t) {
                                        if (t)
                                            while (t = t.parentNode)
                                                if (t === e) return !0;
                                        return !1
                                    }, k = t ? function (e, t) {
                                        if (e === t) return c = !0, 0;
                                        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                        return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, r & 1 || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === o || e.ownerDocument === E && b(E, e) ? -1 : t === o || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : r & 4 ? -1 : 1)
                                    } : function (e, t) {
                                        if (e === t) return c = !0, 0;
                                        var n, r = 0,
                        i = e.parentNode,
                        s = t.parentNode,
                        u = [e],
                        a = [t];
                                        if (!i || !s) return e === o ? -1 : t === o ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
                                        if (i === s) return ct(e, t);
                                        n = e;
                                        while (n = n.parentNode) u.unshift(n);
                                        n = t;
                                        while (n = n.parentNode) a.unshift(n);
                                        while (u[r] === a[r]) r++;
                                        return r ? ct(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
                                    }, o
                                }, ot.matches = function (e, t) {
                                    return ot(e, null, null, t)
                                }, ot.matchesSelector = function (e, t) {
                                    (e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']");
                                    if (n.matchesSelector && v && (!g || !g.test(t)) && (!m || !m.test(t))) try {
                                        var r = y.call(e, t);
                                        if (r || n.disconnectedMatch || e.document && e.document.nodeType !== 11) return r
                                    } catch (i) { }
                                    return ot(t, p, null, [e]).length > 0
                                }, ot.contains = function (e, t) {
                                    return (e.ownerDocument || e) !== p && h(e), b(e, t)
                                }, ot.attr = function (e, t) {
                                    (e.ownerDocument || e) !== p && h(e);
                                    var i = r.attrHandle[t.toLowerCase()],
                    s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : undefined;
                                    return s !== undefined ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
                                }, ot.error = function (e) {
                                    throw new Error("Syntax error, unrecognized expression: " + e)
                                }, ot.uniqueSort = function (e) {
                                    var t, r = [],
                    i = 0,
                    s = 0;
                                    c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k);
                                    if (c) {
                                        while (t = e[s++]) t === e[s] && (i = r.push(s));
                                        while (i--) e.splice(r[i], 1)
                                    }
                                    return l = null, e
                                }, i = ot.getText = function (e) {
                                    var t, n = "",
                    r = 0,
                    s = e.nodeType;
                                    if (!s)
                                        while (t = e[r++]) n += i(t);
                                    else if (s === 1 || s === 9 || s === 11) {
                                        if (typeof e.textContent == "string") return e.textContent;
                                        for (e = e.firstChild; e; e = e.nextSibling) n += i(e)
                                    } else if (s === 3 || s === 4) return e.nodeValue;
                                    return n
                                }, r = ot.selectors = {
                                    cacheLength: 50,
                                    createPseudo: at,
                                    match: K,
                                    attrHandle: {},
                                    find: {},
                                    relative: {
                                        ">": {
                                            dir: "parentNode",
                                            first: !0
                                        },
                                        " ": {
                                            dir: "parentNode"
                                        },
                                        "+": {
                                            dir: "previousSibling",
                                            first: !0
                                        },
                                        "~": {
                                            dir: "previousSibling"
                                        }
                                    },
                                    preFilter: {
                                        ATTR: function (e) {
                                            return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                                        },
                                        CHILD: function (e) {
                                            return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && ot.error(e[0]), e
                                        },
                                        PSEUDO: function (e) {
                                            var t, n = !e[6] && e[2];
                                            return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                                        }
                                    },
                                    filter: {
                                        TAG: function (e) {
                                            var t = e.replace(nt, rt).toLowerCase();
                                            return e === "*" ? function () {
                                                return !0
                                            } : function (e) {
                                                return e.nodeName && e.nodeName.toLowerCase() === t
                                            }
                                        },
                                        CLASS: function (e) {
                                            var t = T[e + " "];
                                            return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e, function (e) {
                                                return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute != "undefined" && e.getAttribute("class") || "")
                                            })
                                        },
                                        ATTR: function (e, t, n) {
                                            return function (r) {
                                                var i = ot.attr(r, e);
                                                return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                                            }
                                        },
                                        CHILD: function (e, t, n, r, i) {
                                            var s = e.slice(0, 3) !== "nth",
                            o = e.slice(-4) !== "last",
                            u = t === "of-type";
                                            return r === 1 && i === 0 ? function (e) {
                                                return !!e.parentNode
                                            } : function (t, n, a) {
                                                var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                g = u && t.nodeName.toLowerCase(),
                                y = !a && !u;
                                                if (m) {
                                                    if (s) {
                                                        while (v) {
                                                            c = t;
                                                            while (c = c[v])
                                                                if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) return !1;
                                                            d = v = e === "only" && !d && "nextSibling"
                                                        }
                                                        return !0
                                                    }
                                                    d = [o ? m.firstChild : m.lastChild];
                                                    if (o && y) {
                                                        l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                            if (c.nodeType === 1 && ++h && c === t) {
                                                                l[e] = [S, p, h];
                                                                break
                                                            }
                                                    } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1];
                                                    else
                                                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop())
                                                            if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                                                                y && ((c[w] || (c[w] = {}))[e] = [S, h]);
                                                                if (c === t) break
                                                            } return h -= i, h === r || h % r === 0 && h / r >= 0
                                                }
                                            }
                                        },
                                        PSEUDO: function (e, t) {
                                            var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                                            return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function (e, n) {
                                                var r, s = i(e, t),
                                o = s.length;
                                                while (o--) r = H(e, s[o]), e[r] = !(n[r] = s[o])
                                            }) : function (e) {
                                                return i(e, 0, n)
                                            }) : i
                                        }
                                    },
                                    pseudos: {
                                        not: at(function (e) {
                                            var t = [],
                            n = [],
                            r = u(e.replace(z, "$1"));
                                            return r[w] ? at(function (e, t, n, i) {
                                                var s, o = r(e, null, i, []),
                                u = e.length;
                                                while (u--)
                                                    if (s = o[u]) e[u] = !(t[u] = s)
                                                }) : function (e, i, s) {
                                                    return t[0] = e, r(t, null, s, n), t[0] = null, !n.pop()
                                                }
                                            }),
                                            has: at(function (e) {
                                                return function (t) {
                                                    return ot(e, t).length > 0
                                                }
                                            }),
                                            contains: at(function (e) {
                                                return e = e.replace(nt, rt),
                            function (t) {
                                return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                            }
                                            }),
                                            lang: at(function (e) {
                                                return J.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(),
                            function (t) {
                                var n;
                                do
                                    if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                                return !1
                            }
                                            }),
                                            target: function (t) {
                                                var n = e.location && e.location.hash;
                                                return n && n.slice(1) === t.id
                                            },
                                            root: function (e) {
                                                return e === d
                                            },
                                            focus: function (e) {
                                                return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                            },
                                            enabled: function (e) {
                                                return e.disabled === !1
                                            },
                                            disabled: function (e) {
                                                return e.disabled === !0
                                            },
                                            checked: function (e) {
                                                var t = e.nodeName.toLowerCase();
                                                return t === "input" && !!e.checked || t === "option" && !!e.selected
                                            },
                                            selected: function (e) {
                                                return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                                            },
                                            empty: function (e) {
                                                for (e = e.firstChild; e; e = e.nextSibling)
                                                    if (e.nodeType < 6) return !1;
                                                return !0
                                            },
                                            parent: function (e) {
                                                return !r.pseudos.empty(e)
                                            },
                                            header: function (e) {
                                                return G.test(e.nodeName)
                                            },
                                            input: function (e) {
                                                return Q.test(e.nodeName)
                                            },
                                            button: function (e) {
                                                var t = e.nodeName.toLowerCase();
                                                return t === "input" && e.type === "button" || t === "button"
                                            },
                                            text: function (e) {
                                                var t;
                                                return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text")
                                            },
                                            first: dt(function () {
                                                return [0]
                                            }),
                                            last: dt(function (e, t) {
                                                return [t - 1]
                                            }),
                                            eq: dt(function (e, t, n) {
                                                return [n < 0 ? n + t : n]
                                            }),
                                            even: dt(function (e, t) {
                                                var n = 0;
                                                for (; n < t; n += 2) e.push(n);
                                                return e
                                            }),
                                            odd: dt(function (e, t) {
                                                var n = 1;
                                                for (; n < t; n += 2) e.push(n);
                                                return e
                                            }),
                                            lt: dt(function (e, t, n) {
                                                var r = n < 0 ? n + t : n;
                                                for (; --r >= 0; ) e.push(r);
                                                return e
                                            }),
                                            gt: dt(function (e, t, n) {
                                                var r = n < 0 ? n + t : n;
                                                for (; ++r < t; ) e.push(r);
                                                return e
                                            })
                                        }
                                    }, r.pseudos.nth = r.pseudos.eq;
                                    for (t in {
                                        radio: !0,
                                        checkbox: !0,
                                        file: !0,
                                        password: !0,
                                        image: !0
                                    }) r.pseudos[t] = ht(t);
                                    for (t in {
                                        submit: !0,
                                        reset: !0
                                    }) r.pseudos[t] = pt(t);
                                    return mt.prototype = r.filters = r.pseudos, r.setFilters = new mt, o = ot.tokenize = function (e, t) {
                                        var n, i, s, o, u, a, f, l = N[e + " "];
                                        if (l) return t ? 0 : l.slice(0);
                                        u = e, a = [], f = r.preFilter;
                                        while (u) {
                                            if (!n || (i = W.exec(u))) i && (u = u.slice(i[0].length) || u), a.push(s = []);
                                            n = !1;
                                            if (i = X.exec(u)) n = i.shift(), s.push({
                                                value: n,
                                                type: i[0].replace(z, " ")
                                            }), u = u.slice(n.length);
                                            for (o in r.filter) (i = K[o].exec(u)) && (!f[o] || (i = f[o](i))) && (n = i.shift(), s.push({
                                                value: n,
                                                type: o,
                                                matches: i
                                            }), u = u.slice(n.length));
                                            if (!n) break
                                        }
                                        return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
                                    }, u = ot.compile = function (e, t) {
                                        var n, r = [],
                    i = [],
                    s = C[e + " "];
                                        if (!s) {
                                            t || (t = o(e)), n = t.length;
                                            while (n--) s = xt(t[n]), s[w] ? r.push(s) : i.push(s);
                                            s = C(e, Tt(i, r)), s.selector = e
                                        }
                                        return s
                                    }, a = ot.select = function (e, t, i, s) {
                                        var a, f, l, c, h, p = typeof e == "function" && e,
                    d = !s && o(e = p.selector || e);
                                        i = i || [];
                                        if (d.length === 1) {
                                            f = d[0] = d[0].slice(0);
                                            if (f.length > 2 && (l = f[0]).type === "ID" && n.getById && t.nodeType === 9 && v && r.relative[f[1].type]) {
                                                t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0];
                                                if (!t) return i;
                                                p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                                            }
                                            a = K.needsContext.test(e) ? 0 : f.length;
                                            while (a--) {
                                                l = f[a];
                                                if (r.relative[c = l.type]) break;
                                                if (h = r.find[c])
                                                    if (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && vt(t.parentNode) || t)) {
                                                        f.splice(a, 1), e = s.length && gt(f);
                                                        if (!e) return D.apply(i, s), i;
                                                        break
                                                    }
                                            }
                                        }
                                        return (p || u(e, d))(s, t, !v, i, et.test(e) && vt(t.parentNode) || t), i
                                    }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = ft(function (e) {
                                        return e.compareDocumentPosition(p.createElement("div")) & 1
                                    }), ft(function (e) {
                                        return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
                                    }) || lt("type|href|height|width", function (e, t, n) {
                                        if (!n) return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
                                    }), (!n.attributes || !ft(function (e) {
                                        return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
                                    })) && lt("value", function (e, t, n) {
                                        if (!n && e.nodeName.toLowerCase() === "input") return e.defaultValue
                                    }), ft(function (e) {
                                        return e.getAttribute("disabled") == null
                                    }) || lt(B, function (e, t, n) {
                                        var r;
                                        if (!n) return e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
                                    }), ot
                                } (e);
                                h.find = y, h.expr = y.selectors, h.expr[":"] = h.expr.pseudos, h.unique = y.uniqueSort, h.text = y.getText, h.isXMLDoc = y.isXML, h.contains = y.contains;
                                var b = h.expr.match.needsContext,
            w = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            E = /^.[^:#\[\.,]*$/;
                                h.filter = function (e, t, n) {
                                    var r = t[0];
                                    return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? h.find.matchesSelector(r, e) ? [r] : [] : h.find.matches(e, h.grep(t, function (e) {
                                        return e.nodeType === 1
                                    }))
                                }, h.fn.extend({
                                    find: function (e) {
                                        var t, n = [],
                    r = this,
                    i = r.length;
                                        if (typeof e != "string") return this.pushStack(h(e).filter(function () {
                                            for (t = 0; t < i; t++)
                                                if (h.contains(r[t], this)) return !0
                                            }));
                                            for (t = 0; t < i; t++) h.find(e, r[t], n);
                                            return n = this.pushStack(i > 1 ? h.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
                                        },
                                        filter: function (e) {
                                            return this.pushStack(S(this, e || [], !1))
                                        },
                                        not: function (e) {
                                            return this.pushStack(S(this, e || [], !0))
                                        },
                                        is: function (e) {
                                            return !!S(this, typeof e == "string" && b.test(e) ? h(e) : e || [], !1).length
                                        }
                                    });
                                    var x, T = e.document,
            N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            C = h.fn.init = function (e, t) {
                var n, r;
                if (!e) return this;
                if (typeof e == "string") {
                    e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? n = [null, e, null] : n = N.exec(e);
                    if (n && (n[1] || !t)) {
                        if (n[1]) {
                            t = t instanceof h ? t[0] : t, h.merge(this, h.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : T, !0));
                            if (w.test(n[1]) && h.isPlainObject(t))
                                for (n in t) h.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                            return this
                        }
                        r = T.getElementById(n[2]);
                        if (r && r.parentNode) {
                            if (r.id !== n[2]) return x.find(e);
                            this.length = 1, this[0] = r
                        }
                        return this.context = T, this.selector = e, this
                    }
                    return !t || t.jquery ? (t || x).find(e) : this.constructor(t).find(e)
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : h.isFunction(e) ? typeof x.ready != "undefined" ? x.ready(e) : e(h) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), h.makeArray(e, this))
            };
                                    C.prototype = h.fn, x = h(T);
                                    var k = /^(?:parents|prev(?:Until|All))/,
            L = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
                                    h.extend({
                                        dir: function (e, t, n) {
                                            var r = [],
                    i = e[t];
                                            while (i && i.nodeType !== 9 && (n === undefined || i.nodeType !== 1 || !h(i).is(n))) i.nodeType === 1 && r.push(i), i = i[t];
                                            return r
                                        },
                                        sibling: function (e, t) {
                                            var n = [];
                                            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
                                            return n
                                        }
                                    }), h.fn.extend({
                                        has: function (e) {
                                            var t, n = h(e, this),
                    r = n.length;
                                            return this.filter(function () {
                                                for (t = 0; t < r; t++)
                                                    if (h.contains(this, n[t])) return !0
                                                })
                                            },
                                            closest: function (e, t) {
                                                var n, r = 0,
                    i = this.length,
                    s = [],
                    o = b.test(e) || typeof e != "string" ? h(e, t || this.context) : 0;
                                                for (; r < i; r++)
                                                    for (n = this[r]; n && n !== t; n = n.parentNode)
                                                        if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && h.find.matchesSelector(n, e))) {
                                                            s.push(n);
                                                            break
                                                        }
                                                return this.pushStack(s.length > 1 ? h.unique(s) : s)
                                            },
                                            index: function (e) {
                                                return e ? typeof e == "string" ? h.inArray(this[0], h(e)) : h.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                                            },
                                            add: function (e, t) {
                                                return this.pushStack(h.unique(h.merge(this.get(), h(e, t))))
                                            },
                                            addBack: function (e) {
                                                return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
                                            }
                                        }), h.each({
                                            parent: function (e) {
                                                var t = e.parentNode;
                                                return t && t.nodeType !== 11 ? t : null
                                            },
                                            parents: function (e) {
                                                return h.dir(e, "parentNode")
                                            },
                                            parentsUntil: function (e, t, n) {
                                                return h.dir(e, "parentNode", n)
                                            },
                                            next: function (e) {
                                                return A(e, "nextSibling")
                                            },
                                            prev: function (e) {
                                                return A(e, "previousSibling")
                                            },
                                            nextAll: function (e) {
                                                return h.dir(e, "nextSibling")
                                            },
                                            prevAll: function (e) {
                                                return h.dir(e, "previousSibling")
                                            },
                                            nextUntil: function (e, t, n) {
                                                return h.dir(e, "nextSibling", n)
                                            },
                                            prevUntil: function (e, t, n) {
                                                return h.dir(e, "previousSibling", n)
                                            },
                                            siblings: function (e) {
                                                return h.sibling((e.parentNode || {}).firstChild, e)
                                            },
                                            children: function (e) {
                                                return h.sibling(e.firstChild)
                                            },
                                            contents: function (e) {
                                                return h.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : h.merge([], e.childNodes)
                                            }
                                        }, function (e, t) {
                                            h.fn[e] = function (n, r) {
                                                var i = h.map(this, t, n);
                                                return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = h.filter(r, i)), this.length > 1 && (L[e] || (i = h.unique(i)), k.test(e) && (i = i.reverse())), this.pushStack(i)
                                            }
                                        });
                                        var O = /\S+/g,
            M = {};
                                        h.Callbacks = function (e) {
                                            e = typeof e == "string" ? M[e] || _(e) : h.extend({}, e);
                                            var t, n, r, i, s, o, u = [],
                a = !e.once && [],
                f = function (c) {
                    n = e.memory && c, r = !0, s = o || 0, o = 0, i = u.length, t = !0;
                    for (; u && s < i; s++)
                        if (u[s].apply(c[0], c[1]) === !1 && e.stopOnFalse) {
                            n = !1;
                            break
                        }
                    t = !1, u && (a ? a.length && f(a.shift()) : n ? u = [] : l.disable())
                },
                l = {
                    add: function () {
                        if (u) {
                            var r = u.length;
                            (function s(t) {
                                h.each(t, function (t, n) {
                                    var r = h.type(n);
                                    r === "function" ? (!e.unique || !l.has(n)) && u.push(n) : n && n.length && r !== "string" && s(n)
                                })
                            })(arguments), t ? i = u.length : n && (o = r, f(n))
                        }
                        return this
                    },
                    remove: function () {
                        return u && h.each(arguments, function (e, n) {
                            var r;
                            while ((r = h.inArray(n, u, r)) > -1) u.splice(r, 1), t && (r <= i && i--, r <= s && s--)
                        }), this
                    },
                    has: function (e) {
                        return e ? h.inArray(e, u) > -1 : !!u && !!u.length
                    },
                    empty: function () {
                        return u = [], i = 0, this
                    },
                    disable: function () {
                        return u = a = n = undefined, this
                    },
                    disabled: function () {
                        return !u
                    },
                    lock: function () {
                        return a = undefined, n || l.disable(), this
                    },
                    locked: function () {
                        return !a
                    },
                    fireWith: function (e, n) {
                        return u && (!r || a) && (n = n || [], n = [e, n.slice ? n.slice() : n], t ? a.push(n) : f(n)), this
                    },
                    fire: function () {
                        return l.fireWith(this, arguments), this
                    },
                    fired: function () {
                        return !!r
                    }
                };
                                            return l
                                        }, h.extend({
                                            Deferred: function (e) {
                                                var t = [
                        ["resolve", "done", h.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", h.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", h.Callbacks("memory")]
                    ],
                    n = "pending",
                    r = {
                        state: function () {
                            return n
                        },
                        always: function () {
                            return i.done(arguments).fail(arguments), this
                        },
                        then: function () {
                            var e = arguments;
                            return h.Deferred(function (n) {
                                h.each(t, function (t, s) {
                                    var o = h.isFunction(e[t]) && e[t];
                                    i[s[1]](function () {
                                        var e = o && o.apply(this, arguments);
                                        e && h.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s[0] + "With"](this === r ? n.promise() : this, o ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function (e) {
                            return e != null ? h.extend(e, r) : r
                        }
                    },
                    i = {};
                                                return r.pipe = r.then, h.each(t, function (e, s) {
                                                    var o = s[2],
                        u = s[3];
                                                    r[s[1]] = o.add, u && o.add(function () {
                                                        n = u
                                                    }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function () {
                                                        return i[s[0] + "With"](this === i ? r : this, arguments), this
                                                    }, i[s[0] + "With"] = o.fireWith
                                                }), r.promise(i), e && e.call(i, i), i
                                            },
                                            when: function (e) {
                                                var t = 0,
                    n = r.call(arguments),
                    i = n.length,
                    s = i !== 1 || e && h.isFunction(e.promise) ? i : 0,
                    o = s === 1 ? e : h.Deferred(),
                    u = function (e, t, n) {
                        return function (i) {
                            t[e] = this, n[e] = arguments.length > 1 ? r.call(arguments) : i, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                        }
                    },
                    a, f, l;
                                                if (i > 1) {
                                                    a = new Array(i), f = new Array(i), l = new Array(i);
                                                    for (; t < i; t++) n[t] && h.isFunction(n[t].promise) ? n[t].promise().done(u(t, l, n)).fail(o.reject).progress(u(t, f, a)) : --s
                                                }
                                                return s || o.resolveWith(l, n), o.promise()
                                            }
                                        });
                                        var D;
                                        h.fn.ready = function (e) {
                                            return h.ready.promise().done(e), this
                                        }, h.extend({
                                            isReady: !1,
                                            readyWait: 1,
                                            holdReady: function (e) {
                                                e ? h.readyWait++ : h.ready(!0)
                                            },
                                            ready: function (e) {
                                                if (e === !0 ? --h.readyWait : h.isReady) return;
                                                if (!T.body) return setTimeout(h.ready);
                                                h.isReady = !0;
                                                if (e !== !0 && --h.readyWait > 0) return;
                                                D.resolveWith(T, [h]), h.fn.triggerHandler && (h(T).triggerHandler("ready"), h(T).off("ready"))
                                            }
                                        }), h.ready.promise = function (t) {
                                            if (!D) {
                                                D = h.Deferred();
                                                if (T.readyState === "complete") setTimeout(h.ready);
                                                else if (T.addEventListener) T.addEventListener("DOMContentLoaded", H, !1), e.addEventListener("load", H, !1);
                                                else {
                                                    T.attachEvent("onreadystatechange", H), e.attachEvent("onload", H);
                                                    var n = !1;
                                                    try {
                                                        n = e.frameElement == null && T.documentElement
                                                    } catch (r) { }
                                                    n && n.doScroll && function i() {
                                                        if (!h.isReady) {
                                                            try {
                                                                n.doScroll("left")
                                                            } catch (e) {
                                                                return setTimeout(i, 50)
                                                            }
                                                            P(), h.ready()
                                                        }
                                                    } ()
                                                }
                                            }
                                            return D.promise(t)
                                        };
                                        var B = typeof undefined,
            j;
                                        for (j in h(l)) break;
                                        l.ownLast = j !== "0", l.inlineBlockNeedsLayout = !1, h(function () {
                                            var e, t, n, r;
                                            n = T.getElementsByTagName("body")[0];
                                            if (!n || !n.style) return;
                                            t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", l.inlineBlockNeedsLayout = e = t.offsetWidth === 3, e && (n.style.zoom = 1)), n.removeChild(r)
                                        }),
            function () {
                var e = T.createElement("div");
                if (l.deleteExpando == null) {
                    l.deleteExpando = !0;
                    try {
                        delete e.test
                    } catch (t) {
                        l.deleteExpando = !1
                    }
                }
                e = null
            } (), h.acceptData = function (e) {
                var t = h.noData[(e.nodeName + " ").toLowerCase()],
                    n = +e.nodeType || 1;
                return n !== 1 && n !== 9 ? !1 : !t || t !== !0 && e.getAttribute("classid") === t
            };
                                        var F = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            I = /([A-Z])/g;
                                        h.extend({
                                            cache: {},
                                            noData: {
                                                "applet ": !0,
                                                "embed ": !0,
                                                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                                            },
                                            hasData: function (e) {
                                                return e = e.nodeType ? h.cache[e[h.expando]] : e[h.expando], !!e && !R(e)
                                            },
                                            data: function (e, t, n) {
                                                return U(e, t, n)
                                            },
                                            removeData: function (e, t) {
                                                return z(e, t)
                                            },
                                            _data: function (e, t, n) {
                                                return U(e, t, n, !0)
                                            },
                                            _removeData: function (e, t) {
                                                return z(e, t, !0)
                                            }
                                        }), h.fn.extend({
                                            data: function (e, t) {
                                                var n, r, i, s = this[0],
                    o = s && s.attributes;
                                                if (e === undefined) {
                                                    if (this.length) {
                                                        i = h.data(s);
                                                        if (s.nodeType === 1 && !h._data(s, "parsedAttrs")) {
                                                            n = o.length;
                                                            while (n--) o[n] && (r = o[n].name, r.indexOf("data-") === 0 && (r = h.camelCase(r.slice(5)), q(s, r, i[r])));
                                                            h._data(s, "parsedAttrs", !0)
                                                        }
                                                    }
                                                    return i
                                                }
                                                return typeof e == "object" ? this.each(function () {
                                                    h.data(this, e)
                                                }) : arguments.length > 1 ? this.each(function () {
                                                    h.data(this, e, t)
                                                }) : s ? q(s, e, h.data(s, e)) : undefined
                                            },
                                            removeData: function (e) {
                                                return this.each(function () {
                                                    h.removeData(this, e)
                                                })
                                            }
                                        }), h.extend({
                                            queue: function (e, t, n) {
                                                var r;
                                                if (e) return t = (t || "fx") + "queue", r = h._data(e, t), n && (!r || h.isArray(n) ? r = h._data(e, t, h.makeArray(n)) : r.push(n)), r || []
                                            },
                                            dequeue: function (e, t) {
                                                t = t || "fx";
                                                var n = h.queue(e, t),
                    r = n.length,
                    i = n.shift(),
                    s = h._queueHooks(e, t),
                    o = function () {
                        h.dequeue(e, t)
                    };
                                                i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
                                            },
                                            _queueHooks: function (e, t) {
                                                var n = t + "queueHooks";
                                                return h._data(e, n) || h._data(e, n, {
                                                    empty: h.Callbacks("once memory").add(function () {
                                                        h._removeData(e, t + "queue"), h._removeData(e, n)
                                                    })
                                                })
                                            }
                                        }), h.fn.extend({
                                            queue: function (e, t) {
                                                var n = 2;
                                                return typeof e != "string" && (t = e, e = "fx", n--), arguments.length < n ? h.queue(this[0], e) : t === undefined ? this : this.each(function () {
                                                    var n = h.queue(this, e, t);
                                                    h._queueHooks(this, e), e === "fx" && n[0] !== "inprogress" && h.dequeue(this, e)
                                                })
                                            },
                                            dequeue: function (e) {
                                                return this.each(function () {
                                                    h.dequeue(this, e)
                                                })
                                            },
                                            clearQueue: function (e) {
                                                return this.queue(e || "fx", [])
                                            },
                                            promise: function (e, t) {
                                                var n, r = 1,
                    i = h.Deferred(),
                    s = this,
                    o = this.length,
                    u = function () {
                        --r || i.resolveWith(s, [s])
                    };
                                                typeof e != "string" && (t = e, e = undefined), e = e || "fx";
                                                while (o--) n = h._data(s[o], e + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
                                                return u(), i.promise(t)
                                            }
                                        });
                                        var W = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            X = ["Top", "Right", "Bottom", "Left"],
            V = function (e, t) {
                return e = t || e, h.css(e, "display") === "none" || !h.contains(e.ownerDocument, e)
            },
            $ = h.access = function (e, t, n, r, i, s, o) {
                var u = 0,
                    a = e.length,
                    f = n == null;
                if (h.type(n) === "object") {
                    i = !0;
                    for (u in n) h.access(e, t, u, n[u], !0, s, o)
                } else if (r !== undefined) {
                    i = !0, h.isFunction(r) || (o = !0), f && (o ? (t.call(e, r), t = null) : (f = t, t = function (e, t, n) {
                        return f.call(h(e), n)
                    }));
                    if (t)
                        for (; u < a; u++) t(e[u], n, o ? r : r.call(e[u], u, t(e[u], n)))
                }
                return i ? e : f ? t.call(e) : a ? t(e[0], n) : s
            },
            J = /^(?:checkbox|radio)$/i;
                                        (function () {
                                            var e = T.createElement("input"),
                t = T.createElement("div"),
                n = T.createDocumentFragment();
                                            t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", l.leadingWhitespace = t.firstChild.nodeType === 3, l.tbody = !t.getElementsByTagName("tbody").length, l.htmlSerialize = !!t.getElementsByTagName("link").length, l.html5Clone = T.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", e.type = "checkbox", e.checked = !0, n.appendChild(e), l.appendChecked = e.checked, t.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue, n.appendChild(t), t.innerHTML = "<input type='radio' checked='checked' name='t'/>", l.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, l.noCloneEvent = !0, t.attachEvent && (t.attachEvent("onclick", function () {
                                                l.noCloneEvent = !1
                                            }), t.cloneNode(!0).click());
                                            if (l.deleteExpando == null) {
                                                l.deleteExpando = !0;
                                                try {
                                                    delete t.test
                                                } catch (r) {
                                                    l.deleteExpando = !1
                                                }
                                            }
                                        })(),
        function () {
            var t, n, r = T.createElement("div");
            for (t in {
                submit: !0,
                change: !0,
                focusin: !0
            }) n = "on" + t, (l[t + "Bubbles"] = n in e) || (r.setAttribute(n, "t"), l[t + "Bubbles"] = r.attributes[n].expando === !1);
            r = null
        } ();
                                        var K = /^(?:input|select|textarea)$/i,
            Q = /^key/,
            G = /^(?:mouse|pointer|contextmenu)|click/,
            Y = /^(?:focusinfocus|focusoutblur)$/,
            Z = /^([^.]*)(?:\.(.+)|)$/;
                                        h.event = {
                                            global: {},
                                            add: function (e, t, n, r, i) {
                                                var s, o, u, a, f, l, c, p, d, v, m, g = h._data(e);
                                                if (!g) return;
                                                n.handler && (a = n, n = a.handler, i = a.selector), n.guid || (n.guid = h.guid++), (o = g.events) || (o = g.events = {}), (l = g.handle) || (l = g.handle = function (e) {
                                                    return typeof h === B || !!e && h.event.triggered === e.type ? undefined : h.event.dispatch.apply(l.elem, arguments)
                                                }, l.elem = e), t = (t || "").match(O) || [""], u = t.length;
                                                while (u--) {
                                                    s = Z.exec(t[u]) || [], d = m = s[1], v = (s[2] || "").split(".").sort();
                                                    if (!d) continue;
                                                    f = h.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = h.event.special[d] || {}, c = h.extend({
                                                        type: d,
                                                        origType: m,
                                                        data: r,
                                                        handler: n,
                                                        guid: n.guid,
                                                        selector: i,
                                                        needsContext: i && h.expr.match.needsContext.test(i),
                                                        namespace: v.join(".")
                                                    }, a);
                                                    if (!(p = o[d])) {
                                                        p = o[d] = [], p.delegateCount = 0;
                                                        if (!f.setup || f.setup.call(e, r, v, l) === !1) e.addEventListener ? e.addEventListener(d, l, !1) : e.attachEvent && e.attachEvent("on" + d, l)
                                                    }
                                                    f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), h.event.global[d] = !0
                                                }
                                                e = null
                                            },
                                            remove: function (e, t, n, r, i) {
                                                var s, o, u, a, f, l, c, p, d, v, m, g = h.hasData(e) && h._data(e);
                                                if (!g || !(l = g.events)) return;
                                                t = (t || "").match(O) || [""], f = t.length;
                                                while (f--) {
                                                    u = Z.exec(t[f]) || [], d = m = u[1], v = (u[2] || "").split(".").sort();
                                                    if (!d) {
                                                        for (d in l) h.event.remove(e, d + t[f], n, r, !0);
                                                        continue
                                                    }
                                                    c = h.event.special[d] || {}, d = (r ? c.delegateType : c.bindType) || d, p = l[d] || [], u = u[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = p.length;
                                                    while (s--) o = p[s], (i || m === o.origType) && (!n || n.guid === o.guid) && (!u || u.test(o.namespace)) && (!r || r === o.selector || r === "**" && o.selector) && (p.splice(s, 1), o.selector && p.delegateCount--, c.remove && c.remove.call(e, o));
                                                    a && !p.length && ((!c.teardown || c.teardown.call(e, v, g.handle) === !1) && h.removeEvent(e, d, g.handle), delete l[d])
                                                }
                                                h.isEmptyObject(l) && (delete g.handle, h._removeData(e, "events"))
                                            },
                                            trigger: function (t, n, r, i) {
                                                var s, o, u, a, l, c, p, d = [r || T],
                    v = f.call(t, "type") ? t.type : t,
                    m = f.call(t, "namespace") ? t.namespace.split(".") : [];
                                                u = c = r = r || T;
                                                if (r.nodeType === 3 || r.nodeType === 8) return;
                                                if (Y.test(v + h.event.triggered)) return;
                                                v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), o = v.indexOf(":") < 0 && "on" + v, t = t[h.expando] ? t : new h.Event(v, typeof t == "object" && t), t.isTrigger = i ? 2 : 3, t.namespace = m.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = undefined, t.target || (t.target = r), n = n == null ? [t] : h.makeArray(n, [t]), l = h.event.special[v] || {};
                                                if (!i && l.trigger && l.trigger.apply(r, n) === !1) return;
                                                if (!i && !l.noBubble && !h.isWindow(r)) {
                                                    a = l.delegateType || v, Y.test(a + v) || (u = u.parentNode);
                                                    for (; u; u = u.parentNode) d.push(u), c = u;
                                                    c === (r.ownerDocument || T) && d.push(c.defaultView || c.parentWindow || e)
                                                }
                                                p = 0;
                                                while ((u = d[p++]) && !t.isPropagationStopped()) t.type = p > 1 ? a : l.bindType || v, s = (h._data(u, "events") || {})[t.type] && h._data(u, "handle"), s && s.apply(u, n), s = o && u[o], s && s.apply && h.acceptData(u) && (t.result = s.apply(u, n), t.result === !1 && t.preventDefault());
                                                t.type = v;
                                                if (!i && !t.isDefaultPrevented() && (!l._default || l._default.apply(d.pop(), n) === !1) && h.acceptData(r) && o && r[v] && !h.isWindow(r)) {
                                                    c = r[o], c && (r[o] = null), h.event.triggered = v;
                                                    try {
                                                        r[v]()
                                                    } catch (g) { }
                                                    h.event.triggered = undefined, c && (r[o] = c)
                                                }
                                                return t.result
                                            },
                                            dispatch: function (e) {
                                                e = h.event.fix(e);
                                                var t, n, i, s, o, u = [],
                    a = r.call(arguments),
                    f = (h._data(this, "events") || {})[e.type] || [],
                    l = h.event.special[e.type] || {};
                                                a[0] = e, e.delegateTarget = this;
                                                if (l.preDispatch && l.preDispatch.call(this, e) === !1) return;
                                                u = h.event.handlers.call(this, e, f), t = 0;
                                                while ((s = u[t++]) && !e.isPropagationStopped()) {
                                                    e.currentTarget = s.elem, o = 0;
                                                    while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())
                                                        if (!e.namespace_re || e.namespace_re.test(i.namespace)) e.handleObj = i, e.data = i.data, n = ((h.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), n !== undefined && (e.result = n) === !1 && (e.preventDefault(), e.stopPropagation())
                                                }
                                                return l.postDispatch && l.postDispatch.call(this, e), e.result
                                            },
                                            handlers: function (e, t) {
                                                var n, r, i, s, o = [],
                    u = t.delegateCount,
                    a = e.target;
                                                if (u && a.nodeType && (!e.button || e.type !== "click"))
                                                    for (; a != this; a = a.parentNode || this)
                                                        if (a.nodeType === 1 && (a.disabled !== !0 || e.type !== "click")) {
                                                            i = [];
                                                            for (s = 0; s < u; s++) r = t[s], n = r.selector + " ", i[n] === undefined && (i[n] = r.needsContext ? h(n, this).index(a) >= 0 : h.find(n, this, null, [a]).length), i[n] && i.push(r);
                                                            i.length && o.push({
                                                                elem: a,
                                                                handlers: i
                                                            })
                                                        }
                                                return u < t.length && o.push({
                                                    elem: this,
                                                    handlers: t.slice(u)
                                                }), o
                                            },
                                            fix: function (e) {
                                                if (e[h.expando]) return e;
                                                var t, n, r, i = e.type,
                    s = e,
                    o = this.fixHooks[i];
                                                o || (this.fixHooks[i] = o = G.test(i) ? this.mouseHooks : Q.test(i) ? this.keyHooks : {}), r = o.props ? this.props.concat(o.props) : this.props, e = new h.Event(s), t = r.length;
                                                while (t--) n = r[t], e[n] = s[n];
                                                return e.target || (e.target = s.srcElement || T), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, o.filter ? o.filter(e, s) : e
                                            },
                                            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                                            fixHooks: {},
                                            keyHooks: {
                                                props: "char charCode key keyCode".split(" "),
                                                filter: function (e, t) {
                                                    return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
                                                }
                                            },
                                            mouseHooks: {
                                                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                                                filter: function (e, t) {
                                                    var n, r, i, s = t.button,
                        o = t.fromElement;
                                                    return e.pageX == null && t.clientX != null && (r = e.target.ownerDocument || T, i = r.documentElement, n = r.body, e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), !e.which && s !== undefined && (e.which = s & 1 ? 1 : s & 2 ? 3 : s & 4 ? 2 : 0), e
                                                }
                                            },
                                            special: {
                                                load: {
                                                    noBubble: !0
                                                },
                                                focus: {
                                                    trigger: function () {
                                                        if (this !== nt() && this.focus) try {
                                                            return this.focus(), !1
                                                        } catch (e) { }
                                                    },
                                                    delegateType: "focusin"
                                                },
                                                blur: {
                                                    trigger: function () {
                                                        if (this === nt() && this.blur) return this.blur(), !1
                                                    },
                                                    delegateType: "focusout"
                                                },
                                                click: {
                                                    trigger: function () {
                                                        if (h.nodeName(this, "input") && this.type === "checkbox" && this.click) return this.click(), !1
                                                    },
                                                    _default: function (e) {
                                                        return h.nodeName(e.target, "a")
                                                    }
                                                },
                                                beforeunload: {
                                                    postDispatch: function (e) {
                                                        e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                                                    }
                                                }
                                            },
                                            simulate: function (e, t, n, r) {
                                                var i = h.extend(new h.Event, n, {
                                                    type: e,
                                                    isSimulated: !0,
                                                    originalEvent: {}
                                                });
                                                r ? h.event.trigger(i, null, t) : h.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
                                            }
                                        }, h.removeEvent = T.removeEventListener ? function (e, t, n) {
                                            e.removeEventListener && e.removeEventListener(t, n, !1)
                                        } : function (e, t, n) {
                                            var r = "on" + t;
                                            e.detachEvent && (typeof e[r] === B && (e[r] = null), e.detachEvent(r, n))
                                        }, h.Event = function (e, t) {
                                            if (!(this instanceof h.Event)) return new h.Event(e, t);
                                            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && e.returnValue === !1 ? et : tt) : this.type = e, t && h.extend(this, t), this.timeStamp = e && e.timeStamp || h.now(), this[h.expando] = !0
                                        }, h.Event.prototype = {
                                            isDefaultPrevented: tt,
                                            isPropagationStopped: tt,
                                            isImmediatePropagationStopped: tt,
                                            preventDefault: function () {
                                                var e = this.originalEvent;
                                                this.isDefaultPrevented = et;
                                                if (!e) return;
                                                e.preventDefault ? e.preventDefault() : e.returnValue = !1
                                            },
                                            stopPropagation: function () {
                                                var e = this.originalEvent;
                                                this.isPropagationStopped = et;
                                                if (!e) return;
                                                e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
                                            },
                                            stopImmediatePropagation: function () {
                                                var e = this.originalEvent;
                                                this.isImmediatePropagationStopped = et, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
                                            }
                                        }, h.each({
                                            mouseenter: "mouseover",
                                            mouseleave: "mouseout",
                                            pointerenter: "pointerover",
                                            pointerleave: "pointerout"
                                        }, function (e, t) {
                                            h.event.special[e] = {
                                                delegateType: t,
                                                bindType: t,
                                                handle: function (e) {
                                                    var n, r = this,
                        i = e.relatedTarget,
                        s = e.handleObj;
                                                    if (!i || i !== r && !h.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                                                    return n
                                                }
                                            }
                                        }), l.submitBubbles || (h.event.special.submit = {
                                            setup: function () {
                                                if (h.nodeName(this, "form")) return !1;
                                                h.event.add(this, "click._submit keypress._submit", function (e) {
                                                    var t = e.target,
                        n = h.nodeName(t, "input") || h.nodeName(t, "button") ? t.form : undefined;
                                                    n && !h._data(n, "submitBubbles") && (h.event.add(n, "submit._submit", function (e) {
                                                        e._submit_bubble = !0
                                                    }), h._data(n, "submitBubbles", !0))
                                                })
                                            },
                                            postDispatch: function (e) {
                                                e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && h.event.simulate("submit", this.parentNode, e, !0))
                                            },
                                            teardown: function () {
                                                if (h.nodeName(this, "form")) return !1;
                                                h.event.remove(this, "._submit")
                                            }
                                        }), l.changeBubbles || (h.event.special.change = {
                                            setup: function () {
                                                if (K.test(this.nodeName)) {
                                                    if (this.type === "checkbox" || this.type === "radio") h.event.add(this, "propertychange._change", function (e) {
                                                        e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                                                    }), h.event.add(this, "click._change", function (e) {
                                                        this._just_changed && !e.isTrigger && (this._just_changed = !1), h.event.simulate("change", this, e, !0)
                                                    });
                                                    return !1
                                                }
                                                h.event.add(this, "beforeactivate._change", function (e) {
                                                    var t = e.target;
                                                    K.test(t.nodeName) && !h._data(t, "changeBubbles") && (h.event.add(t, "change._change", function (e) {
                                                        this.parentNode && !e.isSimulated && !e.isTrigger && h.event.simulate("change", this.parentNode, e, !0)
                                                    }), h._data(t, "changeBubbles", !0))
                                                })
                                            },
                                            handle: function (e) {
                                                var t = e.target;
                                                if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
                                            },
                                            teardown: function () {
                                                return h.event.remove(this, "._change"), !K.test(this.nodeName)
                                            }
                                        }), l.focusinBubbles || h.each({
                                            focus: "focusin",
                                            blur: "focusout"
                                        }, function (e, t) {
                                            var n = function (e) {
                                                h.event.simulate(t, e.target, h.event.fix(e), !0)
                                            };
                                            h.event.special[t] = {
                                                setup: function () {
                                                    var r = this.ownerDocument || this,
                        i = h._data(r, t);
                                                    i || r.addEventListener(e, n, !0), h._data(r, t, (i || 0) + 1)
                                                },
                                                teardown: function () {
                                                    var r = this.ownerDocument || this,
                        i = h._data(r, t) - 1;
                                                    i ? h._data(r, t, i) : (r.removeEventListener(e, n, !0), h._removeData(r, t))
                                                }
                                            }
                                        }), h.fn.extend({
                                            on: function (e, t, n, r, i) {
                                                var s, o;
                                                if (typeof e == "object") {
                                                    typeof t != "string" && (n = n || t, t = undefined);
                                                    for (s in e) this.on(s, t, n, e[s], i);
                                                    return this
                                                }
                                                n == null && r == null ? (r = t, n = t = undefined) : r == null && (typeof t == "string" ? (r = n, n = undefined) : (r = n, n = t, t = undefined));
                                                if (r === !1) r = tt;
                                                else if (!r) return this;
                                                return i === 1 && (o = r, r = function (e) {
                                                    return h().off(e), o.apply(this, arguments)
                                                }, r.guid = o.guid || (o.guid = h.guid++)), this.each(function () {
                                                    h.event.add(this, e, r, n, t)
                                                })
                                            },
                                            one: function (e, t, n, r) {
                                                return this.on(e, t, n, r, 1)
                                            },
                                            off: function (e, t, n) {
                                                var r, i;
                                                if (e && e.preventDefault && e.handleObj) return r = e.handleObj, h(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                                                if (typeof e == "object") {
                                                    for (i in e) this.off(i, t, e[i]);
                                                    return this
                                                }
                                                if (t === !1 || typeof t == "function") n = t, t = undefined;
                                                return n === !1 && (n = tt), this.each(function () {
                                                    h.event.remove(this, e, n, t)
                                                })
                                            },
                                            trigger: function (e, t) {
                                                return this.each(function () {
                                                    h.event.trigger(e, t, this)
                                                })
                                            },
                                            triggerHandler: function (e, t) {
                                                var n = this[0];
                                                if (n) return h.event.trigger(e, t, n, !0)
                                            }
                                        });
                                        var it = "abbr|article|aside|di|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            st = / jQuery\d+="(?:null|\d+)"/g,
            ot = new RegExp("<(?:" + it + ")[\\s/>]", "i"),
            ut = /^\s+/,
            at = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            ft = /<([\w:]+)/,
            lt = /<tbody/i,
            ct = /<|&#?\w+;/,
            ht = /<(?:script|style|link)/i,
            pt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            dt = /^$|\/(?:java|ecma)script/i,
            vt = /^true\/(.*)/,
            mt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            gt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            yt = rt(T),
            bt = yt.appendChild(T.createElement("div"));
                                        gt.optgroup = gt.option, gt.tbody = gt.tfoot = gt.colgroup = gt.caption = gt.thead, gt.th = gt.td, h.extend({
                                            clone: function (e, t, n) {
                                                var r, i, s, o, u, a = h.contains(e.ownerDocument, e);
                                                l.html5Clone || h.isXMLDoc(e) || !ot.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (bt.innerHTML = e.outerHTML, bt.removeChild(s = bt.firstChild));
                                                if ((!l.noCloneEvent || !l.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !h.isXMLDoc(e)) {
                                                    r = wt(s), u = wt(e);
                                                    for (o = 0;
                        (i = u[o]) != null; ++o) r[o] && kt(i, r[o])
                                                }
                                                if (t)
                                                    if (n) {
                                                        u = u || wt(e), r = r || wt(s);
                                                        for (o = 0;
                            (i = u[o]) != null; o++) Ct(i, r[o])
                                                    } else Ct(e, s);
                                                return r = wt(s, "script"), r.length > 0 && Nt(r, !a && wt(e, "script")), r = u = i = null, s
                                            },
                                            buildFragment: function (e, t, n, r) {
                                                var i, s, o, u, a, f, c, p = e.length,
                    d = rt(t),
                    v = [],
                    m = 0;
                                                for (; m < p; m++) {
                                                    s = e[m];
                                                    if (s || s === 0)
                                                        if (h.type(s) === "object") h.merge(v, s.nodeType ? [s] : s);
                                                        else if (!ct.test(s)) v.push(t.createTextNode(s));
                                                        else {
                                                            u = u || d.appendChild(t.createElement("div")), a = (ft.exec(s) || ["", ""])[1].toLowerCase(), c = gt[a] || gt._default, u.innerHTML = c[1] + s.replace(at, "<$1></$2>") + c[2], i = c[0];
                                                            while (i--) u = u.lastChild;
                                                            !l.leadingWhitespace && ut.test(s) && v.push(t.createTextNode(ut.exec(s)[0]));
                                                            if (!l.tbody) {
                                                                s = a === "table" && !lt.test(s) ? u.firstChild : c[1] === "<table>" && !lt.test(s) ? u : 0, i = s && s.childNodes.length;
                                                                while (i--) h.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
                                                            }
                                                            h.merge(v, u.childNodes), u.textContent = "";
                                                            while (u.firstChild) u.removeChild(u.firstChild);
                                                            u = d.lastChild
                                                        }
                                                }
                                                u && d.removeChild(u), l.appendChecked || h.grep(wt(v, "input"), Et), m = 0;
                                                while (s = v[m++]) {
                                                    if (r && h.inArray(s, r) !== -1) continue;
                                                    o = h.contains(s.ownerDocument, s), u = wt(d.appendChild(s), "script"), o && Nt(u);
                                                    if (n) {
                                                        i = 0;
                                                        while (s = u[i++]) dt.test(s.type || "") && n.push(s)
                                                    }
                                                }
                                                return u = null, d
                                            },
                                            cleanData: function (e, t) {
                                                var r, i, s, o, u = 0,
                    a = h.expando,
                    f = h.cache,
                    c = l.deleteExpando,
                    p = h.event.special;
                                                for (;
                    (r = e[u]) != null; u++)
                                                    if (t || h.acceptData(r)) {
                                                        s = r[a], o = s && f[s];
                                                        if (o) {
                                                            if (o.events)
                                                                for (i in o.events) p[i] ? h.event.remove(r, i) : h.removeEvent(r, i, o.handle);
                                                            f[s] && (delete f[s], c ? delete r[a] : typeof r.removeAttribute !== B ? r.removeAttribute(a) : r[a] = null, n.push(s))
                                                        }
                                                    }
                                            }
                                        }), h.fn.extend({
                                            text: function (e) {
                                                return $(this, function (e) {
                                                    return e === undefined ? h.text(this) : this.empty().append((this[0] && this[0].ownerDocument || T).createTextNode(e))
                                                }, null, e, arguments.length)
                                            },
                                            append: function () {
                                                return this.domManip(arguments, function (e) {
                                                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                                        var t = St(this, e);
                                                        t.appendChild(e)
                                                    }
                                                })
                                            },
                                            prepend: function () {
                                                return this.domManip(arguments, function (e) {
                                                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                                                        var t = St(this, e);
                                                        t.insertBefore(e, t.firstChild)
                                                    }
                                                })
                                            },
                                            before: function () {
                                                return this.domManip(arguments, function (e) {
                                                    this.parentNode && this.parentNode.insertBefore(e, this)
                                                })
                                            },
                                            after: function () {
                                                return this.domManip(arguments, function (e) {
                                                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                                                })
                                            },
                                            remove: function (e, t) {
                                                var n, r = e ? h.filter(e, this) : this,
                    i = 0;
                                                for (;
                    (n = r[i]) != null; i++) !t && n.nodeType === 1 && h.cleanData(wt(n)), n.parentNode && (t && h.contains(n.ownerDocument, n) && Nt(wt(n, "script")), n.parentNode.removeChild(n));
                                                return this
                                            },
                                            empty: function () {
                                                var e, t = 0;
                                                for (;
                    (e = this[t]) != null; t++) {
                                                    e.nodeType === 1 && h.cleanData(wt(e, !1));
                                                    while (e.firstChild) e.removeChild(e.firstChild);
                                                    e.options && h.nodeName(e, "select") && (e.options.length = 0)
                                                }
                                                return this
                                            },
                                            clone: function (e, t) {
                                                return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
                                                    return h.clone(this, e, t)
                                                })
                                            },
                                            html: function (e) {
                                                return $(this, function (e) {
                                                    var t = this[0] || {},
                        n = 0,
                        r = this.length;
                                                    if (e === undefined) return t.nodeType === 1 ? t.innerHTML.replace(st, "") : undefined;
                                                    if (typeof e == "string" && !ht.test(e) && (l.htmlSerialize || !ot.test(e)) && (l.leadingWhitespace || !ut.test(e)) && !gt[(ft.exec(e) || ["", ""])[1].toLowerCase()]) {
                                                        e = e.replace(at, "<$1></$2>");
                                                        try {
                                                            for (; n < r; n++) t = this[n] || {}, t.nodeType === 1 && (h.cleanData(wt(t, !1)), t.innerHTML = e);
                                                            t = 0
                                                        } catch (i) { }
                                                    }
                                                    t && this.empty().append(e)
                                                }, null, e, arguments.length)
                                            },
                                            replaceWith: function () {
                                                var e = arguments[0];
                                                return this.domManip(arguments, function (t) {
                                                    e = this.parentNode, h.cleanData(wt(this)), e && e.replaceChild(t, this)
                                                }), e && (e.length || e.nodeType) ? this : this.remove()
                                            },
                                            detach: function (e) {
                                                return this.remove(e, !0)
                                            },
                                            domManip: function (e, t) {
                                                e = i.apply([], e);
                                                var n, r, s, o, u, a, f = 0,
                    c = this.length,
                    p = this,
                    d = c - 1,
                    v = e[0],
                    m = h.isFunction(v);
                                                if (m || c > 1 && typeof v == "string" && !l.checkClone && pt.test(v)) return this.each(function (n) {
                                                    var r = p.eq(n);
                                                    m && (e[0] = v.call(this, n, r.html())), r.domManip(e, t)
                                                });
                                                if (c) {
                                                    a = h.buildFragment(e, this[0].ownerDocument, !1, this), n = a.firstChild, a.childNodes.length === 1 && (a = n);
                                                    if (n) {
                                                        o = h.map(wt(a, "script"), xt), s = o.length;
                                                        for (; f < c; f++) r = a, f !== d && (r = h.clone(r, !0, !0), s && h.merge(o, wt(r, "script"))), t.call(this[f], r, f);
                                                        if (s) {
                                                            u = o[o.length - 1].ownerDocument, h.map(o, Tt);
                                                            for (f = 0; f < s; f++) r = o[f], dt.test(r.type || "") && !h._data(r, "globalEval") && h.contains(u, r) && (r.src ? h._evalUrl && h._evalUrl(r.src) : h.globalEval((r.text || r.textContent || r.innerHTML || "").replace(mt, "")))
                                                        }
                                                        a = n = null
                                                    }
                                                }
                                                return this
                                            }
                                        }), h.each({
                                            appendTo: "append",
                                            prependTo: "prepend",
                                            insertBefore: "before",
                                            insertAfter: "after",
                                            replaceAll: "replaceWith"
                                        }, function (e, t) {
                                            h.fn[e] = function (e) {
                                                var n, r = 0,
                    i = [],
                    o = h(e),
                    u = o.length - 1;
                                                for (; r <= u; r++) n = r === u ? this : this.clone(!0), h(o[r])[t](n), s.apply(i, n.get());
                                                return this.pushStack(i)
                                            }
                                        });
                                        var Lt, At = {};
                                        (function () {
                                            var e;
                                            l.shrinkWrapBlocks = function () {
                                                if (e != null) return e;
                                                e = !1;
                                                var t, n, r;
                                                n = T.getElementsByTagName("body")[0];
                                                if (!n || !n.style) return;
                                                return t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), typeof t.style.zoom !== B && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(T.createElement("div")).style.width = "5px", e = t.offsetWidth !== 3), n.removeChild(r), e
                                            }
                                        })();
                                        var _t = /^margin/,
            Dt = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i"),
            Pt, Ht, Bt = /^(top|right|bottom|left)$/;
                                        e.getComputedStyle ? (Pt = function (t) {
                                            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
                                        }, Ht = function (e, t, n) {
                                            var r, i, s, o, u = e.style;
                                            return n = n || Pt(e), o = n ? n.getPropertyValue(t) || n[t] : undefined, n && (o === "" && !h.contains(e.ownerDocument, e) && (o = h.style(e, t)), Dt.test(o) && _t.test(t) && (r = u.width, i = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = o, o = n.width, u.width = r, u.minWidth = i, u.maxWidth = s)), o === undefined ? o : o + ""
                                        }) : T.documentElement.currentStyle && (Pt = function (e) {
                                            return e.currentStyle
                                        }, Ht = function (e, t, n) {
                                            var r, i, s, o, u = e.style;
                                            return n = n || Pt(e), o = n ? n[t] : undefined, o == null && u && u[t] && (o = u[t]), Dt.test(o) && !Bt.test(t) && (r = u.left, i = e.runtimeStyle, s = i && i.left, s && (i.left = e.currentStyle.left), u.left = t === "fontSize" ? "1em" : o, o = u.pixelLeft + "px", u.left = r, s && (i.left = s)), o === undefined ? o : o + "" || "auto"
                                        }),
            function () {
                function a() {
                    var t, n, r, a;
                    n = T.getElementsByTagName("body")[0];
                    if (!n || !n.style) return;
                    t = T.createElement("div"), r = T.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(r).appendChild(t), t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", i = s = !1, u = !0, e.getComputedStyle && (i = (e.getComputedStyle(t, null) || {}).top !== "1%", s = (e.getComputedStyle(t, null) || {
                        width: "4px"
                    }).width === "4px", a = t.appendChild(T.createElement("div")), a.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", a.style.marginRight = a.style.width = "0", t.style.width = "1px", u = !parseFloat((e.getComputedStyle(a, null) || {}).marginRight), t.removeChild(a)), t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", a = t.getElementsByTagName("td"), a[0].style.cssText = "margin:0;border:0;padding:0;display:none", o = a[0].offsetHeight === 0, o && (a[0].style.display = "", a[1].style.display = "none", o = a[0].offsetHeight === 0), n.removeChild(r)
                }
                var t, n, r, i, s, o, u;
                t = T.createElement("div"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = r && r.style;
                if (!n) return;
                n.cssText = "float:left;opacity:.5", l.opacity = n.opacity === "0.5", l.cssFloat = !!n.cssFloat, t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = t.style.backgroundClip === "content-box", l.boxSizing = n.boxSizing === "" || n.MozBoxSizing === "" || n.WebkitBoxSizing === "", h.extend(l, {
                    reliableHiddenOffsets: function () {
                        return o == null && a(), o
                    },
                    boxSizingReliable: function () {
                        return s == null && a(), s
                    },
                    pixelPosition: function () {
                        return i == null && a(), i
                    },
                    reliableMarginRight: function () {
                        return u == null && a(), u
                    }
                })
            } (), h.swap = function (e, t, n, r) {
                var i, s, o = {};
                for (s in t) o[s] = e.style[s], e.style[s] = t[s];
                i = n.apply(e, r || []);
                for (s in t) e.style[s] = o[s];
                return i
            };
                                        var Ft = /alpha\([^)]*\)/i,
            It = /opacity\s*=\s*([^)]*)/,
            qt = /^(none|table(?!-c[ea]).+)/,
            Rt = new RegExp("^(" + W + ")(.*)$", "i"),
            Ut = new RegExp("^([+-])=(" + W + ")", "i"),
            zt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Wt = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Xt = ["Webkit", "O", "Moz", "ms"];
                                        h.extend({
                                            cssHooks: {
                                                opacity: {
                                                    get: function (e, t) {
                                                        if (t) {
                                                            var n = Ht(e, "opacity");
                                                            return n === "" ? "1" : n
                                                        }
                                                    }
                                                }
                                            },
                                            cssNumber: {
                                                columnCount: !0,
                                                fillOpacity: !0,
                                                flexGrow: !0,
                                                flexShrink: !0,
                                                fontWeight: !0,
                                                lineHeight: !0,
                                                opacity: !0,
                                                order: !0,
                                                orphans: !0,
                                                widows: !0,
                                                zIndex: !0,
                                                zoom: !0
                                            },
                                            cssProps: {
                                                "float": l.cssFloat ? "cssFloat" : "styleFloat"
                                            },
                                            style: function (e, t, n, r) {
                                                if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
                                                var i, s, o, u = h.camelCase(t),
                    a = e.style;
                                                t = h.cssProps[u] || (h.cssProps[u] = Vt(a, u)), o = h.cssHooks[t] || h.cssHooks[u];
                                                if (n === undefined) return o && "get" in o && (i = o.get(e, !1, r)) !== undefined ? i : a[t];
                                                s = typeof n, s === "string" && (i = Ut.exec(n)) && (n = (i[1] + 1) * i[2] + parseFloat(h.css(e, t)), s = "number");
                                                if (n == null || n !== n) return;
                                                s === "number" && !h.cssNumber[u] && (n += "px"), !l.clearCloneStyle && n === "" && t.indexOf("background") === 0 && (a[t] = "inherit");
                                                if (!o || !("set" in o) || (n = o.set(e, n, r)) !== undefined) try {
                                                    a[t] = n
                                                } catch (f) { }
                                            },
                                            css: function (e, t, n, r) {
                                                var i, s, o, u = h.camelCase(t);
                                                return t = h.cssProps[u] || (h.cssProps[u] = Vt(e.style, u)), o = h.cssHooks[t] || h.cssHooks[u], o && "get" in o && (s = o.get(e, !0, n)), s === undefined && (s = Ht(e, t, r)), s === "normal" && t in Wt && (s = Wt[t]), n === "" || n ? (i = parseFloat(s), n === !0 || h.isNumeric(i) ? i || 0 : s) : s
                                            }
                                        }), h.each(["height", "width"], function (e, t) {
                                            h.cssHooks[t] = {
                                                get: function (e, n, r) {
                                                    if (n) return qt.test(h.css(e, "display")) && e.offsetWidth === 0 ? h.swap(e, zt, function () {
                                                        return Qt(e, t, r)
                                                    }) : Qt(e, t, r)
                                                },
                                                set: function (e, n, r) {
                                                    var i = r && Pt(e);
                                                    return Jt(e, n, r ? Kt(e, t, r, l.boxSizing && h.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
                                                }
                                            }
                                        }), l.opacity || (h.cssHooks.opacity = {
                                            get: function (e, t) {
                                                return It.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
                                            },
                                            set: function (e, t) {
                                                var n = e.style,
                    r = e.currentStyle,
                    i = h.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                    s = r && r.filter || n.filter || "";
                                                n.zoom = 1;
                                                if ((t >= 1 || t === "") && h.trim(s.replace(Ft, "")) === "" && n.removeAttribute) {
                                                    n.removeAttribute("filter");
                                                    if (t === "" || r && !r.filter) return
                                                }
                                                n.filter = Ft.test(s) ? s.replace(Ft, i) : s + " " + i
                                            }
                                        }), h.cssHooks.marginRight = jt(l.reliableMarginRight, function (e, t) {
                                            if (t) return h.swap(e, {
                                                display: "inline-block"
                                            }, Ht, [e, "marginRight"])
                                        }), h.each({
                                            margin: "",
                                            padding: "",
                                            border: "Width"
                                        }, function (e, t) {
                                            h.cssHooks[e + t] = {
                                                expand: function (n) {
                                                    var r = 0,
                        i = {},
                        s = typeof n == "string" ? n.split(" ") : [n];
                                                    for (; r < 4; r++) i[e + X[r] + t] = s[r] || s[r - 2] || s[0];
                                                    return i
                                                }
                                            }, _t.test(e) || (h.cssHooks[e + t].set = Jt)
                                        }), h.fn.extend({
                                            css: function (e, t) {
                                                return $(this, function (e, t, n) {
                                                    var r, i, s = {},
                        o = 0;
                                                    if (h.isArray(t)) {
                                                        r = Pt(e), i = t.length;
                                                        for (; o < i; o++) s[t[o]] = h.css(e, t[o], !1, r);
                                                        return s
                                                    }
                                                    return n !== undefined ? h.style(e, t, n) : h.css(e, t)
                                                }, e, t, arguments.length > 1)
                                            },
                                            show: function () {
                                                return $t(this, !0)
                                            },
                                            hide: function () {
                                                return $t(this)
                                            },
                                            toggle: function (e) {
                                                return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function () {
                                                    V(this) ? h(this).show() : h(this).hide()
                                                })
                                            }
                                        }), h.Tween = Gt, Gt.prototype = {
                                            constructor: Gt,
                                            init: function (e, t, n, r, i, s) {
                                                this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (h.cssNumber[n] ? "" : "px")
                                            },
                                            cur: function () {
                                                var e = Gt.propHooks[this.prop];
                                                return e && e.get ? e.get(this) : Gt.propHooks._default.get(this)
                                            },
                                            run: function (e) {
                                                var t, n = Gt.propHooks[this.prop];
                                                return this.options.duration ? this.pos = t = h.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Gt.propHooks._default.set(this), this
                                            }
                                        }, Gt.prototype.init.prototype = Gt.prototype, Gt.propHooks = {
                                            _default: {
                                                get: function (e) {
                                                    var t;
                                                    return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = h.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
                                                },
                                                set: function (e) {
                                                    h.fx.step[e.prop] ? h.fx.step[e.prop](e) : e.elem.style && (e.elem.style[h.cssProps[e.prop]] != null || h.cssHooks[e.prop]) ? h.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                                                }
                                            }
                                        }, Gt.propHooks.scrollTop = Gt.propHooks.scrollLeft = {
                                            set: function (e) {
                                                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                                            }
                                        }, h.easing = {
                                            linear: function (e) {
                                                return e
                                            },
                                            swing: function (e) {
                                                return .5 - Math.cos(e * Math.PI) / 2
                                            }
                                        }, h.fx = Gt.prototype.init, h.fx.step = {};
                                        var Yt, Zt, en = /^(?:toggle|show|hide)$/,
            tn = new RegExp("^(?:([+-])=|)(" + W + ")([a-z%]*)$", "i"),
            nn = /queueHooks$/,
            rn = [fn],
            sn = {
                "*": [function (e, t) {
                    var n = this.createTween(e, t),
                        r = n.cur(),
                        i = tn.exec(t),
                        s = i && i[3] || (h.cssNumber[e] ? "" : "px"),
                        o = (h.cssNumber[e] || s !== "px" && +r) && tn.exec(h.css(n.elem, e)),
                        u = 1,
                        a = 20;
                    if (o && o[3] !== s) {
                        s = s || o[3], i = i || [], o = +r || 1;
                        do u = u || ".5", o /= u, h.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
                    }
                    return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
                } ]
            };
                                        h.Animation = h.extend(cn, {
                                            tweener: function (e, t) {
                                                h.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                                                var n, r = 0,
                        i = e.length;
                                                for (; r < i; r++) n = e[r], sn[n] = sn[n] || [], sn[n].unshift(t)
                                            },
                                            prefilter: function (e, t) {
                                                t ? rn.unshift(e) : rn.push(e)
                                            }
                                        }), h.speed = function (e, t, n) {
                                            var r = e && typeof e == "object" ? h.extend({}, e) : {
                                                complete: n || !n && t || h.isFunction(e) && e,
                                                duration: e,
                                                easing: n && t || t && !h.isFunction(t) && t
                                            };
                                            r.duration = h.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in h.fx.speeds ? h.fx.speeds[r.duration] : h.fx.speeds._default;
                                            if (r.queue == null || r.queue === !0) r.queue = "fx";
                                            return r.old = r.complete, r.complete = function () {
                                                h.isFunction(r.old) && r.old.call(this), r.queue && h.dequeue(this, r.queue)
                                            }, r
                                        }, h.fn.extend({
                                            fadeTo: function (e, t, n, r) {
                                                return this.filter(V).css("opacity", 0).show().end().animate({
                                                    opacity: t
                                                }, e, n, r)
                                            },
                                            animate: function (e, t, n, r) {
                                                var i = h.isEmptyObject(e),
                        s = h.speed(t, n, r),
                        o = function () {
                            var t = cn(this, h.extend({}, e), s);
                            (i || h._data(this, "finish")) && t.stop(!0)
                        };
                                                return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
                                            },
                                            stop: function (e, t, n) {
                                                var r = function (e) {
                                                    var t = e.stop;
                                                    delete e.stop, t(n)
                                                };
                                                return typeof e != "string" && (n = t, t = e, e = undefined), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                                                    var t = !0,
                            i = e != null && e + "queueHooks",
                            s = h.timers,
                            o = h._data(this);
                                                    if (i) o[i] && o[i].stop && r(o[i]);
                                                    else
                                                        for (i in o) o[i] && o[i].stop && nn.test(i) && r(o[i]);
                                                    for (i = s.length; i--; ) s[i].elem === this && (e == null || s[i].queue === e) && (s[i].anim.stop(n), t = !1, s.splice(i, 1));
                                                    (t || !n) && h.dequeue(this, e)
                                                })
                                            },
                                            finish: function (e) {
                                                return e !== !1 && (e = e || "fx"), this.each(function () {
                                                    var t, n = h._data(this),
                            r = n[e + "queue"],
                            i = n[e + "queueHooks"],
                            s = h.timers,
                            o = r ? r.length : 0;
                                                    n.finish = !0, h.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
                                                    for (t = s.length; t--; ) s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                                                    for (t = 0; t < o; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                                    delete n.finish
                                                })
                                            }
                                        }), h.each(["toggle", "show", "hide"], function (e, t) {
                                            var n = h.fn[t];
                                            h.fn[t] = function (e, r, i) {
                                                return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(un(t, !0), e, r, i)
                                            }
                                        }), h.each({
                                            slideDown: un("show"),
                                            slideUp: un("hide"),
                                            slideToggle: un("toggle"),
                                            fadeIn: {
                                                opacity: "show"
                                            },
                                            fadeOut: {
                                                opacity: "hide"
                                            },
                                            fadeToggle: {
                                                opacity: "toggle"
                                            }
                                        }, function (e, t) {
                                            h.fn[e] = function (e, n, r) {
                                                return this.animate(t, e, n, r)
                                            }
                                        }), h.timers = [], h.fx.tick = function () {
                                            var e, t = h.timers,
                    n = 0;
                                            Yt = h.now();
                                            for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
                                            t.length || h.fx.stop(), Yt = undefined
                                        }, h.fx.timer = function (e) {
                                            h.timers.push(e), e() ? h.fx.start() : h.timers.pop()
                                        }, h.fx.interval = 13, h.fx.start = function () {
                                            Zt || (Zt = setInterval(h.fx.tick, h.fx.interval))
                                        }, h.fx.stop = function () {
                                            clearInterval(Zt), Zt = null
                                        }, h.fx.speeds = {
                                            slow: 600,
                                            fast: 200,
                                            _default: 400
                                        }, h.fn.delay = function (e, t) {
                                            return e = h.fx ? h.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                                                var r = setTimeout(t, e);
                                                n.stop = function () {
                                                    clearTimeout(r)
                                                }
                                            })
                                        },
            function () {
                var e, t, n, r, i;
                t = T.createElement("div"), t.setAttribute("className", "t"), t.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", r = t.getElementsByTagName("a")[0], n = T.createElement("select"), i = n.appendChild(T.createElement("option")), e = t.getElementsByTagName("input")[0], r.style.cssText = "top:1px", l.getSetAttribute = t.className !== "t", l.style = /top/.test(r.getAttribute("style")), l.hrefNormalized = r.getAttribute("href") === "/a", l.checkOn = !!e.value, l.optSelected = i.selected, l.enctype = !!T.createElement("form").enctype, n.disabled = !0, l.optDisabled = !i.disabled, e = T.createElement("input"), e.setAttribute("value", ""), l.input = e.getAttribute("value") === "", e.value = "t", e.setAttribute("type", "radio"), l.radioValue = e.value === "t"
            } ();
                                        var hn = /\r/g;
                                        h.fn.extend({
                                            val: function (e) {
                                                var t, n, r, i = this[0];
                                                if (!arguments.length) {
                                                    if (i) return t = h.valHooks[i.type] || h.valHooks[i.nodeName.toLowerCase()], t && "get" in t && (n = t.get(i, "value")) !== undefined ? n : (n = i.value, typeof n == "string" ? n.replace(hn, "") : n == null ? "" : n);
                                                    return
                                                }
                                                return r = h.isFunction(e), this.each(function (n) {
                                                    var i;
                                                    if (this.nodeType !== 1) return;
                                                    r ? i = e.call(this, n, h(this).val()) : i = e, i == null ? i = "" : typeof i == "number" ? i += "" : h.isArray(i) && (i = h.map(i, function (e) {
                                                        return e == null ? "" : e + ""
                                                    })), t = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()];
                                                    if (!t || !("set" in t) || t.set(this, i, "value") === undefined) this.value = i
                                                })
                                            }
                                        }), h.extend({
                                            valHooks: {
                                                option: {
                                                    get: function (e) {
                                                        var t = h.find.attr(e, "value");
                                                        return t != null ? t : h.trim(h.text(e))
                                                    }
                                                },
                                                select: {
                                                    get: function (e) {
                                                        var t, n, r = e.options,
                            i = e.selectedIndex,
                            s = e.type === "select-one" || i < 0,
                            o = s ? null : [],
                            u = s ? i + 1 : r.length,
                            a = i < 0 ? u : s ? i : 0;
                                                        for (; a < u; a++) {
                                                            n = r[a];
                                                            if ((n.selected || a === i) && (l.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !h.nodeName(n.parentNode, "optgroup"))) {
                                                                t = h(n).val();
                                                                if (s) return t;
                                                                o.push(t)
                                                            }
                                                        }
                                                        return o
                                                    },
                                                    set: function (e, t) {
                                                        var n, r, i = e.options,
                            s = h.makeArray(t),
                            o = i.length;
                                                        while (o--) {
                                                            r = i[o];
                                                            if (h.inArray(h.valHooks.option.get(r), s) >= 0) try {
                                                                r.selected = n = !0
                                                            } catch (u) {
                                                                r.scrollHeight
                                                            } else r.selected = !1
                                                        }
                                                        return n || (e.selectedIndex = -1), i
                                                    }
                                                }
                                            }
                                        }), h.each(["radio", "checkbox"], function () {
                                            h.valHooks[this] = {
                                                set: function (e, t) {
                                                    if (h.isArray(t)) return e.checked = h.inArray(h(e).val(), t) >= 0
                                                }
                                            }, l.checkOn || (h.valHooks[this].get = function (e) {
                                                return e.getAttribute("value") === null ? "on" : e.value
                                            })
                                        });
                                        var pn, dn, vn = h.expr.attrHandle,
            mn = /^(?:checked|selected)$/i,
            gn = l.getSetAttribute,
            yn = l.input;
                                        h.fn.extend({
                                            attr: function (e, t) {
                                                return $(this, h.attr, e, t, arguments.length > 1)
                                            },
                                            removeAttr: function (e) {
                                                return this.each(function () {
                                                    h.removeAttr(this, e)
                                                })
                                            }
                                        }), h.extend({
                                            attr: function (e, t, n) {
                                                var r, i, s = e.nodeType;
                                                if (!e || s === 3 || s === 8 || s === 2) return;
                                                if (typeof e.getAttribute === B) return h.prop(e, t, n);
                                                if (s !== 1 || !h.isXMLDoc(e)) t = t.toLowerCase(), r = h.attrHooks[t] || (h.expr.match.bool.test(t) ? dn : pn);
                                                if (n === undefined) return r && "get" in r && (i = r.get(e, t)) !== null ? i : (i = h.find.attr(e, t), i == null ? undefined : i);
                                                if (n !== null) return r && "set" in r && (i = r.set(e, n, t)) !== undefined ? i : (e.setAttribute(t, n + ""), n);
                                                h.removeAttr(e, t)
                                            },
                                            removeAttr: function (e, t) {
                                                var n, r, i = 0,
                    s = t && t.match(O);
                                                if (s && e.nodeType === 1)
                                                    while (n = s[i++]) r = h.propFix[n] || n, h.expr.match.bool.test(n) ? yn && gn || !mn.test(n) ? e[r] = !1 : e[h.camelCase("default-" + n)] = e[r] = !1 : h.attr(e, n, ""), e.removeAttribute(gn ? n : r)
                                            },
                                            attrHooks: {
                                                type: {
                                                    set: function (e, t) {
                                                        if (!l.radioValue && t === "radio" && h.nodeName(e, "input")) {
                                                            var n = e.value;
                                                            return e.setAttribute("type", t), n && (e.value = n), t
                                                        }
                                                    }
                                                }
                                            }
                                        }), dn = {
                                            set: function (e, t, n) {
                                                return t === !1 ? h.removeAttr(e, n) : yn && gn || !mn.test(n) ? e.setAttribute(!gn && h.propFix[n] || n, n) : e[h.camelCase("default-" + n)] = e[n] = !0, n
                                            }
                                        }, h.each(h.expr.match.bool.source.match(/\w+/g), function (e, t) {
                                            var n = vn[t] || h.find.attr;
                                            vn[t] = yn && gn || !mn.test(t) ? function (e, t, r) {
                                                var i, s;
                                                return r || (s = vn[t], vn[t] = i, i = n(e, t, r) != null ? t.toLowerCase() : null, vn[t] = s), i
                                            } : function (e, t, n) {
                                                if (!n) return e[h.camelCase("default-" + t)] ? t.toLowerCase() : null
                                            }
                                        });
                                        if (!yn || !gn) h.attrHooks.value = {
                                            set: function (e, t, n) {
                                                if (!h.nodeName(e, "input")) return pn && pn.set(e, t, n);
                                                e.defaultValue = t
                                            }
                                        };
                                        gn || (pn = {
                                            set: function (e, t, n) {
                                                var r = e.getAttributeNode(n);
                                                r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "";
                                                if (n === "value" || t === e.getAttribute(n)) return t
                                            }
                                        }, vn.id = vn.name = vn.coords = function (e, t, n) {
                                            var r;
                                            if (!n) return (r = e.getAttributeNode(t)) && r.value !== "" ? r.value : null
                                        }, h.valHooks.button = {
                                            get: function (e, t) {
                                                var n = e.getAttributeNode(t);
                                                if (n && n.specified) return n.value
                                            },
                                            set: pn.set
                                        }, h.attrHooks.contenteditable = {
                                            set: function (e, t, n) {
                                                pn.set(e, t === "" ? !1 : t, n)
                                            }
                                        }, h.each(["width", "height"], function (e, t) {
                                            h.attrHooks[t] = {
                                                set: function (e, n) {
                                                    if (n === "") return e.setAttribute(t, "auto"), n
                                                }
                                            }
                                        })), l.style || (h.attrHooks.style = {
                                            get: function (e) {
                                                return e.style.cssText || undefined
                                            },
                                            set: function (e, t) {
                                                return e.style.cssText = t + ""
                                            }
                                        });
                                        var bn = /^(?:input|select|textarea|button|object)$/i,
            wn = /^(?:a|area)$/i;
                                        h.fn.extend({
                                            prop: function (e, t) {
                                                return $(this, h.prop, e, t, arguments.length > 1)
                                            },
                                            removeProp: function (e) {
                                                return e = h.propFix[e] || e, this.each(function () {
                                                    try {
                                                        this[e] = undefined, delete this[e]
                                                    } catch (t) { }
                                                })
                                            }
                                        }), h.extend({
                                            propFix: {
                                                "for": "htmlFor",
                                                "class": "className"
                                            },
                                            prop: function (e, t, n) {
                                                var r, i, s, o = e.nodeType;
                                                if (!e || o === 3 || o === 8 || o === 2) return;
                                                return s = o !== 1 || !h.isXMLDoc(e), s && (t = h.propFix[t] || t, i = h.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && (r = i.get(e, t)) !== null ? r : e[t]
                                            },
                                            propHooks: {
                                                tabIndex: {
                                                    get: function (e) {
                                                        var t = h.find.attr(e, "tabindex");
                                                        return t ? parseInt(t, 10) : bn.test(e.nodeName) || wn.test(e.nodeName) && e.href ? 0 : -1
                                                    }
                                                }
                                            }
                                        }), l.hrefNormalized || h.each(["href", "src"], function (e, t) {
                                            h.propHooks[t] = {
                                                get: function (e) {
                                                    return e.getAttribute(t, 4)
                                                }
                                            }
                                        }), l.optSelected || (h.propHooks.selected = {
                                            get: function (e) {
                                                var t = e.parentNode;
                                                return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                                            }
                                        }), h.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                                            h.propFix[this.toLowerCase()] = this
                                        }), l.enctype || (h.propFix.enctype = "encoding");
                                        var En = /[\t\r\n\f]/g;
                                        h.fn.extend({
                                            addClass: function (e) {
                                                var t, n, r, i, s, o, u = 0,
                    a = this.length,
                    f = typeof e == "string" && e;
                                                if (h.isFunction(e)) return this.each(function (t) {
                                                    h(this).addClass(e.call(this, t, this.className))
                                                });
                                                if (f) {
                                                    t = (e || "").match(O) || [];
                                                    for (; u < a; u++) {
                                                        n = this[u], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(En, " ") : " ");
                                                        if (r) {
                                                            s = 0;
                                                            while (i = t[s++]) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                                            o = h.trim(r), n.className !== o && (n.className = o)
                                                        }
                                                    }
                                                }
                                                return this
                                            },
                                            removeClass: function (e) {
                                                var t, n, r, i, s, o, u = 0,
                    a = this.length,
                    f = arguments.length === 0 || typeof e == "string" && e;
                                                if (h.isFunction(e)) return this.each(function (t) {
                                                    h(this).removeClass(e.call(this, t, this.className))
                                                });
                                                if (f) {
                                                    t = (e || "").match(O) || [];
                                                    for (; u < a; u++) {
                                                        n = this[u], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(En, " ") : "");
                                                        if (r) {
                                                            s = 0;
                                                            while (i = t[s++])
                                                                while (r.indexOf(" " + i + " ") >= 0) r = r.replace(" " + i + " ", " ");
                                                            o = e ? h.trim(r) : "", n.className !== o && (n.className = o)
                                                        }
                                                    }
                                                }
                                                return this
                                            },
                                            toggleClass: function (e, t) {
                                                var n = typeof e;
                                                return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : h.isFunction(e) ? this.each(function (n) {
                                                    h(this).toggleClass(e.call(this, n, this.className, t), t)
                                                }) : this.each(function () {
                                                    if (n === "string") {
                                                        var t, r = 0,
                            i = h(this),
                            s = e.match(O) || [];
                                                        while (t = s[r++]) i.hasClass(t) ? i.removeClass(t) : i.addClass(t)
                                                    } else if (n === B || n === "boolean") this.className && h._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : h._data(this, "__className__") || ""
                                                })
                                            },
                                            hasClass: function (e) {
                                                var t = " " + e + " ",
                    n = 0,
                    r = this.length;
                                                for (; n < r; n++)
                                                    if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(En, " ").indexOf(t) >= 0) return !0;
                                                return !1
                                            }
                                        }), h.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
                                            h.fn[t] = function (e, n) {
                                                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                                            }
                                        }), h.fn.extend({
                                            hover: function (e, t) {
                                                return this.mouseenter(e).mouseleave(t || e)
                                            },
                                            bind: function (e, t, n) {
                                                return this.on(e, null, t, n)
                                            },
                                            unbind: function (e, t) {
                                                return this.off(e, null, t)
                                            },
                                            delegate: function (e, t, n, r) {
                                                return this.on(t, e, n, r)
                                            },
                                            undelegate: function (e, t, n) {
                                                return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
                                            }
                                        });
                                        var Sn = h.now(),
            xn = /\?/,
            Tn = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
                                        h.parseJSON = function (t) {
                                            if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
                                            var n, r = null,
                i = h.trim(t + "");
                                            return i && !h.trim(i.replace(Tn, function (e, t, i, s) {
                                                return n && t && (r = 0), r === 0 ? e : (n = i || t, r += !s - !i, "")
                                            })) ? Function("return " + i)() : h.error("Invalid JSON: " + t)
                                        }, h.parseXML = function (t) {
                                            var n, r;
                                            if (!t || typeof t != "string") return null;
                                            try {
                                                e.DOMParser ? (r = new DOMParser, n = r.parseFromString(t, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(t))
                                            } catch (i) {
                                                n = undefined
                                            }
                                            return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && h.error("Invalid XML: " + t), n
                                        };
                                        var Nn, Cn, kn = /#.*$/,
            Ln = /([?&])_=[^&]*/,
            An = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            On = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Mn = /^(?:GET|HEAD)$/,
            _n = /^\/\//,
            Dn = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            Pn = {},
            Hn = {},
            Bn = "*/".concat("*");
                                        try {
                                            Cn = location.href
                                        } catch (jn) {
                                            Cn = T.createElement("a"), Cn.href = "", Cn = Cn.href
                                        }
                                        Nn = Dn.exec(Cn.toLowerCase()) || [], h.extend({
                                            active: 0,
                                            lastModified: {},
                                            etag: {},
                                            ajaxSettings: {
                                                url: Cn,
                                                type: "GET",
                                                isLocal: On.test(Nn[1]),
                                                global: !0,
                                                processData: !0,
                                                async: !0,
                                                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                                accepts: {
                                                    "*": Bn,
                                                    text: "text/plain",
                                                    html: "text/html",
                                                    xml: "application/xml, text/xml",
                                                    json: "application/json, text/javascript"
                                                },
                                                contents: {
                                                    xml: /xml/,
                                                    html: /html/,
                                                    json: /json/
                                                },
                                                responseFields: {
                                                    xml: "responseXML",
                                                    text: "responseText",
                                                    json: "responseJSON"
                                                },
                                                converters: {
                                                    "* text": String,
                                                    "text html": !0,
                                                    "text json": h.parseJSON,
                                                    "text xml": h.parseXML
                                                },
                                                flatOptions: {
                                                    url: !0,
                                                    context: !0
                                                }
                                            },
                                            ajaxSetup: function (e, t) {
                                                return t ? qn(qn(e, h.ajaxSettings), t) : qn(h.ajaxSettings, e)
                                            },
                                            ajaxPrefilter: Fn(Pn),
                                            ajaxTransport: Fn(Hn),
                                            ajax: function (e, t) {
                                                function x(e, t, n, r) {
                                                    var f, g, y, w, S, x = t;
                                                    if (b === 2) return;
                                                    b = 2, o && clearTimeout(o), a = undefined, s = r || "", E.readyState = e > 0 ? 4 : 0, f = e >= 200 && e < 300 || e === 304, n && (w = Rn(l, E, n)), w = Un(l, w, E, f);
                                                    if (f) l.ifModified && (S = E.getResponseHeader("Last-Modified"), S && (h.lastModified[i] = S), S = E.getResponseHeader("etag"), S && (h.etag[i] = S)), e === 204 || l.type === "HEAD" ? x = "nocontent" : e === 304 ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, f = !y);
                                                    else {
                                                        y = x;
                                                        if (e || !x) x = "error", e < 0 && (e = 0)
                                                    }
                                                    E.status = e, E.statusText = (t || x) + "", f ? d.resolveWith(c, [g, x, E]) : d.rejectWith(c, [E, x, y]), E.statusCode(m), m = undefined, u && p.trigger(f ? "ajaxSuccess" : "ajaxError", [E, l, f ? g : y]), v.fireWith(c, [E, x]), u && (p.trigger("ajaxComplete", [E, l]), --h.active || h.event.trigger("ajaxStop"))
                                                }
                                                typeof e == "object" && (t = e, e = undefined), t = t || {};
                                                var n, r, i, s, o, u, a, f, l = h.ajaxSetup({}, t),
                    c = l.context || l,
                    p = l.context && (c.nodeType || c.jquery) ? h(c) : h.event,
                    d = h.Deferred(),
                    v = h.Callbacks("once memory"),
                    m = l.statusCode || {},
                    g = {},
                    y = {},
                    b = 0,
                    w = "canceled",
                    E = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (b === 2) {
                                if (!f) {
                                    f = {};
                                    while (t = An.exec(s)) f[t[1].toLowerCase()] = t[2]
                                }
                                t = f[e.toLowerCase()]
                            }
                            return t == null ? null : t
                        },
                        getAllResponseHeaders: function () {
                            return b === 2 ? s : null
                        },
                        setRequestHeader: function (e, t) {
                            var n = e.toLowerCase();
                            return b || (e = y[n] = y[n] || e, g[e] = t), this
                        },
                        overrideMimeType: function (e) {
                            return b || (l.mimeType = e), this
                        },
                        statusCode: function (e) {
                            var t;
                            if (e)
                                if (b < 2)
                                    for (t in e) m[t] = [m[t], e[t]];
                                else E.always(e[E.status]);
                            return this
                        },
                        abort: function (e) {
                            var t = e || w;
                            return a && a.abort(t), x(0, t), this
                        }
                    };
                                                d.promise(E).complete = v.add, E.success = E.done, E.error = E.fail, l.url = ((e || l.url || Cn) + "").replace(kn, "").replace(_n, Nn[1] + "//"), l.type = t.method || t.type || l.method || l.type, l.dataTypes = h.trim(l.dataType || "*").toLowerCase().match(O) || [""], l.crossDomain == null && (n = Dn.exec(l.url.toLowerCase()), l.crossDomain = !(!n || n[1] === Nn[1] && n[2] === Nn[2] && (n[3] || (n[1] === "http:" ? "80" : "443")) === (Nn[3] || (Nn[1] === "http:" ? "80" : "443")))), l.data && l.processData && typeof l.data != "string" && (l.data = h.param(l.data, l.traditional)), In(Pn, l, t, E);
                                                if (b === 2) return E;
                                                u = h.event && l.global, u && h.active++ === 0 && h.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !Mn.test(l.type), i = l.url, l.hasContent || (l.data && (i = l.url += (xn.test(i) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = Ln.test(i) ? i.replace(Ln, "$1_=" + Sn++) : i + (xn.test(i) ? "&" : "?") + "_=" + Sn++)), l.ifModified && (h.lastModified[i] && E.setRequestHeader("If-Modified-Since", h.lastModified[i]), h.etag[i] && E.setRequestHeader("If-None-Match", h.etag[i])), (l.data && l.hasContent && l.contentType !== !1 || t.contentType) && E.setRequestHeader("Content-Type", l.contentType), E.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + Bn + "; q=0.01" : "") : l.accepts["*"]);
                                                for (r in l.headers) E.setRequestHeader(r, l.headers[r]);
                                                if (!l.beforeSend || l.beforeSend.call(c, E, l) !== !1 && b !== 2) {
                                                    w = "abort";
                                                    for (r in {
                                                        success: 1,
                                                        error: 1,
                                                        complete: 1
                                                    }) E[r](l[r]);
                                                    a = In(Hn, l, t, E);
                                                    if (!a) x(-1, "No Transport");
                                                    else {
                                                        E.readyState = 1, u && p.trigger("ajaxSend", [E, l]), l.async && l.timeout > 0 && (o = setTimeout(function () {
                                                            E.abort("timeout")
                                                        }, l.timeout));
                                                        try {
                                                            b = 1, a.send(g, x)
                                                        } catch (S) {
                                                            if (!(b < 2)) throw S;
                                                            x(-1, S)
                                                        }
                                                    }
                                                    return E
                                                }
                                                return E.abort()
                                            },
                                            getJSON: function (e, t, n) {
                                                return h.get(e, t, n, "json")
                                            },
                                            getScript: function (e, t) {
                                                return h.get(e, undefined, t, "script")
                                            }
                                        }), h.each(["get", "post"], function (e, t) {
                                            h[t] = function (e, n, r, i) {
                                                return h.isFunction(n) && (i = i || r, r = n, n = undefined), h.ajax({
                                                    url: e,
                                                    type: t,
                                                    dataType: i,
                                                    data: n,
                                                    success: r
                                                })
                                            }
                                        }), h._evalUrl = function (e) {
                                            return h.ajax({
                                                url: e,
                                                type: "GET",
                                                dataType: "script",
                                                async: !1,
                                                global: !1,
                                                "throws": !0
                                            })
                                        }, h.fn.extend({
                                            wrapAll: function (e) {
                                                if (h.isFunction(e)) return this.each(function (t) {
                                                    h(this).wrapAll(e.call(this, t))
                                                });
                                                if (this[0]) {
                                                    var t = h(e, this[0].ownerDocument).eq(0).clone(!0);
                                                    this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                                                        var e = this;
                                                        while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                                                        return e
                                                    }).append(this)
                                                }
                                                return this
                                            },
                                            wrapInner: function (e) {
                                                return h.isFunction(e) ? this.each(function (t) {
                                                    h(this).wrapInner(e.call(this, t))
                                                }) : this.each(function () {
                                                    var t = h(this),
                        n = t.contents();
                                                    n.length ? n.wrapAll(e) : t.append(e)
                                                })
                                            },
                                            wrap: function (e) {
                                                var t = h.isFunction(e);
                                                return this.each(function (n) {
                                                    h(this).wrapAll(t ? e.call(this, n) : e)
                                                })
                                            },
                                            unwrap: function () {
                                                return this.parent().each(function () {
                                                    h.nodeName(this, "body") || h(this).replaceWith(this.childNodes)
                                                }).end()
                                            }
                                        }), h.expr.filters.hidden = function (e) {
                                            return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !l.reliableHiddenOffsets() && (e.style && e.style.display || h.css(e, "display")) === "none"
                                        }, h.expr.filters.visible = function (e) {
                                            return !h.expr.filters.hidden(e)
                                        };
                                        var zn = /%20/g,
            Wn = /\[\]$/,
            Xn = /\r?\n/g,
            Vn = /^(?:submit|button|image|reset|file)$/i,
            $n = /^(?:input|select|textarea|keygen)/i;
                                        h.param = function (e, t) {
                                            var n, r = [],
                i = function (e, t) {
                    t = h.isFunction(t) ? t() : t == null ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
                                            t === undefined && (t = h.ajaxSettings && h.ajaxSettings.traditional);
                                            if (h.isArray(e) || e.jquery && !h.isPlainObject(e)) h.each(e, function () {
                                                i(this.name, this.value)
                                            });
                                            else
                                                for (n in e) Jn(n, e[n], t, i);
                                            return r.join("&").replace(zn, "+")
                                        }, h.fn.extend({
                                            serialize: function () {
                                                return h.param(this.serializeArray())
                                            },
                                            serializeArray: function () {
                                                return this.map(function () {
                                                    var e = h.prop(this, "elements");
                                                    return e ? h.makeArray(e) : this
                                                }).filter(function () {
                                                    var e = this.type;
                                                    return this.name && !h(this).is(":disabled") && $n.test(this.nodeName) && !Vn.test(e) && (this.checked || !J.test(e))
                                                }).map(function (e, t) {
                                                    var n = h(this).val();
                                                    return n == null ? null : h.isArray(n) ? h.map(n, function (e) {
                                                        return {
                                                            name: t.name,
                                                            value: e.replace(Xn, "\r\n")
                                                        }
                                                    }) : {
                                                        name: t.name,
                                                        value: n.replace(Xn, "\r\n")
                                                    }
                                                }).get()
                                            }
                                        }), h.ajaxSettings.xhr = e.ActiveXObject !== undefined ? function () {
                                            return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Yn() || Zn()
                                        } : Yn;
                                        var Kn = 0,
            Qn = {},
            Gn = h.ajaxSettings.xhr();
                                        e.attachEvent && e.attachEvent("onunload", function () {
                                            for (var e in Qn) Qn[e](undefined, !0)
                                        }), l.cors = !!Gn && "withCredentials" in Gn, Gn = l.ajax = !!Gn, Gn && h.ajaxTransport(function (e) {
                                            if (!e.crossDomain || l.cors) {
                                                var t;
                                                return {
                                                    send: function (n, r) {
                                                        var i, s = e.xhr(),
                            o = ++Kn;
                                                        s.open(e.type, e.url, e.async, e.username, e.password);
                                                        if (e.xhrFields)
                                                            for (i in e.xhrFields) s[i] = e.xhrFields[i];
                                                        e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), !e.crossDomain && !n["X-Requested-With"] && (n["X-Requested-With"] = "XMLHttpRequest");
                                                        for (i in n) n[i] !== undefined && s.setRequestHeader(i, n[i] + "");
                                                        s.send(e.hasContent && e.data || null), t = function (n, i) {
                                                            var u, a, f;
                                                            if (t && (i || s.readyState === 4)) {
                                                                delete Qn[o], t = undefined, s.onreadystatechange = h.noop;
                                                                if (i) s.readyState !== 4 && s.abort();
                                                                else {
                                                                    f = {}, u = s.status, typeof s.responseText == "string" && (f.text = s.responseText);
                                                                    try {
                                                                        a = s.statusText
                                                                    } catch (l) {
                                                                        a = ""
                                                                    } !u && e.isLocal && !e.crossDomain ? u = f.text ? 200 : 404 : u === 1223 && (u = 204)
                                                                }
                                                            }
                                                            f && r(u, a, f, s.getAllResponseHeaders())
                                                        }, e.async ? s.readyState === 4 ? setTimeout(t) : s.onreadystatechange = Qn[o] = t : t()
                                                    },
                                                    abort: function () {
                                                        t && t(undefined, !0)
                                                    }
                                                }
                                            }
                                        }), h.ajaxSetup({
                                            accepts: {
                                                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                                            },
                                            contents: {
                                                script: /(?:java|ecma)script/
                                            },
                                            converters: {
                                                "text script": function (e) {
                                                    return h.globalEval(e), e
                                                }
                                            }
                                        }), h.ajaxPrefilter("script", function (e) {
                                            e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
                                        }), h.ajaxTransport("script", function (e) {
                                            if (e.crossDomain) {
                                                var t, n = T.head || h("head")[0] || T.documentElement;
                                                return {
                                                    send: function (r, i) {
                                                        t = T.createElement("script"), t.async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
                                                            if (n || !t.readyState || /loaded|complete/.test(t.readyState)) t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || i(200, "success")
                                                        }, n.insertBefore(t, n.firstChild)
                                                    },
                                                    abort: function () {
                                                        t && t.onload(undefined, !0)
                                                    }
                                                }
                                            }
                                        });
                                        var er = [],
            tr = /(=)\?(?=&|$)|\?\?/;
                                        h.ajaxSetup({
                                            jsonp: "callback",
                                            jsonpCallback: function () {
                                                var e = er.pop() || h.expando + "_" + Sn++;
                                                return this[e] = !0, e
                                            }
                                        }), h.ajaxPrefilter("json jsonp", function (t, n, r) {
                                            var i, s, o, u = t.jsonp !== !1 && (tr.test(t.url) ? "url" : typeof t.data == "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && tr.test(t.data) && "data");
                                            if (u || t.dataTypes[0] === "jsonp") return i = t.jsonpCallback = h.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, u ? t[u] = t[u].replace(tr, "$1" + i) : t.jsonp !== !1 && (t.url += (xn.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
                                                return o || h.error(i + " was not called"), o[0]
                                            }, t.dataTypes[0] = "json", s = e[i], e[i] = function () {
                                                o = arguments
                                            }, r.always(function () {
                                                e[i] = s, t[i] && (t.jsonpCallback = n.jsonpCallback, er.push(i)), o && h.isFunction(s) && s(o[0]), o = s = undefined
                                            }), "script"
                                        }), h.parseHTML = function (e, t, n) {
                                            if (!e || typeof e != "string") return null;
                                            typeof t == "boolean" && (n = t, t = !1), t = t || T;
                                            var r = w.exec(e),
                i = !n && [];
                                            return r ? [t.createElement(r[1])] : (r = h.buildFragment([e], t, i), i && i.length && h(i).remove(), h.merge([], r.childNodes))
                                        };
                                        var nr = h.fn.load;
                                        h.fn.load = function (e, t, n) {
                                            if (typeof e != "string" && nr) return nr.apply(this, arguments);
                                            var r, i, s, o = this,
                u = e.indexOf(" ");
                                            return u >= 0 && (r = h.trim(e.slice(u, e.length)), e = e.slice(0, u)), h.isFunction(t) ? (n = t, t = undefined) : t && typeof t == "object" && (s = "POST"), o.length > 0 && h.ajax({
                                                url: e,
                                                type: s,
                                                dataType: "html",
                                                data: t
                                            }).done(function (e) {
                                                i = arguments, o.html(r ? h("<div>").append(h.parseHTML(e)).find(r) : e)
                                            }).complete(n && function (e, t) {
                                                o.each(n, i || [e.responseText, t, e])
                                            }), this
                                        }, h.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
                                            h.fn[t] = function (e) {
                                                return this.on(t, e)
                                            }
                                        }), h.expr.filters.animated = function (e) {
                                            return h.grep(h.timers, function (t) {
                                                return e === t.elem
                                            }).length
                                        };
                                        var rr = e.document.documentElement;
                                        h.offset = {
                                            setOffset: function (e, t, n) {
                                                var r, i, s, o, u, a, f, l = h.css(e, "position"),
                    c = h(e),
                    p = {};
                                                l === "static" && (e.style.position = "relative"), u = c.offset(), s = h.css(e, "top"), a = h.css(e, "left"), f = (l === "absolute" || l === "fixed") && h.inArray("auto", [s, a]) > -1, f ? (r = c.position(), o = r.top, i = r.left) : (o = parseFloat(s) || 0, i = parseFloat(a) || 0), h.isFunction(t) && (t = t.call(e, n, u)), t.top != null && (p.top = t.top - u.top + o), t.left != null && (p.left = t.left - u.left + i), "using" in t ? t.using.call(e, p) : c.css(p)
                                            }
                                        }, h.fn.extend({
                                            offset: function (e) {
                                                if (arguments.length) return e === undefined ? this : this.each(function (t) {
                                                    h.offset.setOffset(this, e, t)
                                                });
                                                var t, n, r = {
                                                    top: 0,
                                                    left: 0
                                                },
                    i = this[0],
                    s = i && i.ownerDocument;
                                                if (!s) return;
                                                return t = s.documentElement, h.contains(t, i) ? (typeof i.getBoundingClientRect !== B && (r = i.getBoundingClientRect()), n = ir(s), {
                                                    top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                                                    left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                                                }) : r
                                            },
                                            position: function () {
                                                if (!this[0]) return;
                                                var e, t, n = {
                                                    top: 0,
                                                    left: 0
                                                },
                    r = this[0];
                                                return h.css(r, "position") === "fixed" ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), h.nodeName(e[0], "html") || (n = e.offset()), n.top += h.css(e[0], "borderTopWidth", !0), n.left += h.css(e[0], "borderLeftWidth", !0)), {
                                                    top: t.top - n.top - h.css(r, "marginTop", !0),
                                                    left: t.left - n.left - h.css(r, "marginLeft", !0)
                                                }
                                            },
                                            offsetParent: function () {
                                                return this.map(function () {
                                                    var e = this.offsetParent || rr;
                                                    while (e && !h.nodeName(e, "html") && h.css(e, "position") === "static") e = e.offsetParent;
                                                    return e || rr
                                                })
                                            }
                                        }), h.each({
                                            scrollLeft: "pageXOffset",
                                            scrollTop: "pageYOffset"
                                        }, function (e, t) {
                                            var n = /Y/.test(t);
                                            h.fn[e] = function (r) {
                                                return $(this, function (e, r, i) {
                                                    var s = ir(e);
                                                    if (i === undefined) return s ? t in s ? s[t] : s.document.documentElement[r] : e[r];
                                                    s ? s.scrollTo(n ? h(s).scrollLeft() : i, n ? i : h(s).scrollTop()) : e[r] = i
                                                }, e, r, arguments.length, null)
                                            }
                                        }), h.each(["top", "left"], function (e, t) {
                                            h.cssHooks[t] = jt(l.pixelPosition, function (e, n) {
                                                if (n) return n = Ht(e, t), Dt.test(n) ? h(e).position()[t] + "px" : n
                                            })
                                        }), h.each({
                                            Height: "height",
                                            Width: "width"
                                        }, function (e, t) {
                                            h.each({
                                                padding: "inner" + e,
                                                content: t,
                                                "": "outer" + e
                                            }, function (n, r) {
                                                h.fn[r] = function (r, i) {
                                                    var s = arguments.length && (n || typeof r != "boolean"),
                        o = n || (r === !0 || i === !0 ? "margin" : "border");
                                                    return $(this, function (t, n, r) {
                                                        var i;
                                                        return h.isWindow(t) ? t.document.documentElement["client" + e] : t.nodeType === 9 ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : r === undefined ? h.css(t, n, o) : h.style(t, n, r, o)
                                                    }, t, s ? r : undefined, s, null)
                                                }
                                            })
                                        }), h.fn.size = function () {
                                            return this.length
                                        }, h.fn.andSelf = h.fn.addBack, typeof define == "function" && define.amd && define("jquery", [], function () {
                                            return h
                                        });
                                        var sr = e.jQuery,
            or = e.$;
                                        return h.noConflict = function (t) {
                                            return e.$ === h && (e.$ = or), t && e.jQuery === h && (e.jQuery = sr), h
                                        }, typeof t === B && (e.jQuery = e.$ = h), h
                                    }), define("utils/loadTracker", [], function () {
                                        "use strict";

                                        function e() {
                                            this.files = {}
                                        }

                                        function t(e) {
                                            for (var t = 0; t < e.length; t++) {
                                                if (this.files[e[t].id]) {
                                                    console.warn("a file with the id " + e[t].id + " already exists");
                                                    continue
                                                }
                                                this.files[e[t].id] = {
                                                    path: e[t].path,
                                                    loaded: !1,
                                                    started: !1
                                                }
                                            }
                                        }

                                        function n(e, t) {
                                            for (var n = 0; n < e.length; n++) this.files[e[n].id] && !this.files[e[n].id].started && (this.files[e[n].id].started = !0, i(this.files[e[n].id]));
                                            t && s.call(this, e, t)
                                        }

                                        function r(e) {
                                            var t = new Image;
                                            $(t).load(function () {
                                                e.loaded = !0
                                            }), t.src = e.path
                                        }

                                        function i(e) {
                                            var t = new XMLHttpRequest;
                                            t.onreadystatechange = function () {
                                                if (t.readyState == 4)
                                                    if (t.status == 200 || t.status == 0) try {
                                                        e.loaded = !0
                                                    } catch (n) { }
                                            }, t.open("GET", e.path, !0), t.overrideMimeType("text/plain; charset=x-user-defined"), t.setRequestHeader("Content-Type", "text/plain"), t.send(null)
                                        }

                                        function s(e, t) {
                                            this.checkFiles(e) ? t() : window.requestAnimationFrame(function () {
                                                s.call(this, e, t)
                                            } .bind(this))
                                        }

                                        function o(e) {
                                            var t = !0;
                                            for (var n = 0; n < e.length; n++) this.files[e[n].id] && !this.files[e[n].id].loaded && (t = !1);
                                            return t
                                        }
                                        return e.prototype.addFiles = t, e.prototype.loadFiles = n, e.prototype.checkFiles = o, e
                                    }), define("utils/history", [], function () {
                                        "use strict";

                                        function e() {
                                            this.active = history && history.pushState ? !0 : !1, this.baseURL = t(), window.addEventListener("popstate", r)
                                        }

                                        function t() {
                                            var e = window.location.protocol + "//" + window.location.host,
                t = "";
                                            window.location.port && window.location.port != "" && (t += ":" + window.location.port);
                                            var t = window.location.pathname;
                                            return t = t.substring(0, t.lastIndexOf("/") + 1), e + t
                                        }

                                        function n() {
                                            this.deeplink = !1;
                                            var e = String(window.deeplink).toLowerCase();
                                            if (e == "") return;
                                            var t, n = [{
                                                str: "grid",
                                                sections: "grid",
                                                alphabet: null
                                            }, {
                                                str: "home",
                                                sections: "home",
                                                alphabet: null
                                            }];
                                            for (t = 0; t < siteSettings.alphabet.length; t++) n.push({
                                                str: siteSettings.alphabet[t].id,
                                                sections: "alphabet",
                                                alphabet: siteSettings.alphabet[t].id
                                            });
                                            for (t = 0; t < n.length; t++)
                                                if (e == n[t].str) {
                                                    this.deeplink = n[t];
                                                    return
                                                }
                                        }

                                        function r(e) {
                                            if (!e.state) return;
                                            app.sections.gotoSlide(e.state.sections), app.alphabet.gotoSlide(e.state.alphabet)
                                        }

                                        function i(e) {
                                            if (!this.active) return;
                                            document.title = app.sections.currId == "alphabet" ? "RECUPERA JÁ!: Recuperação de Crédito" + siteSettings.alphabet[app.alphabet.currSlide].title : "RECUPERA JÁ!: Recuperação de Crédito", history.pushState({
                                                sections: app.sections.currSlide,
                                                alphabet: app.alphabet.currSlide
                                            }, e, this.baseURL + e)
                                        }
                                        return e.prototype.checkDeeplink = n, e.prototype.change = i, e
                                    }), define("grid", [], function () {
                                        "use strict";

                                        function e() {
                                            this.gridItems = $("#grid li"), this.gridList = $("#grid ul")[0], this.filesToLoad = [{
                                                id: "gridImages",
                                                path: "images/gridImages.jpg"
                                            }], this.infoBox = document.getElementById("gridInfo"), this.gridClose = document.getElementById("gridClose");
                                            var e = $("#grid .gridLetter");
                                            this.letters = [];
                                            var n, o, u, a, f;
                                            for (var l = 0; l < e.length; l++) n = document.createElement("div"), n.className = "gridCover1", o = document.createElement("div"), o.className = "gridCover2", u = document.createElement("div"), u.className = "gridLabel", a = document.createElement("div"), a.className = "gridLabelUnderline", u.innerHTML = siteSettings.alphabet[l].id, e[l].innerHTML = "", e[l].appendChild(o), e[l].appendChild(n), n.appendChild(u), n.appendChild(a), o.style.background = siteSettings.alphabet[l].gridColor, e[l].style.background = "url(images/gridImages.jpg)", f = {
                                                id: siteSettings.alphabet[l].id,
                                                imgPos: {
                                                    x: l % 6,
                                                    y: Math.floor(l / 6)
                                                },
                                                btn: e[l],
                                                label: u,
                                                line: a,
                                                cover: o,
                                                cover1: n,
                                                grid: this
                                            }, this.letters.push(f), $(e[l]).on("mouseenter", t.bind(f)), $(e[l]).on("touchstart mousedown", s.bind(f));
                                            var c = {
                                                grid: this,
                                                btn: this.infoBox
                                            };
                                            $(this.infoBox).on("mouseenter", t.bind(c));
                                            var h = {
                                                imgPos: {
                                                    x: 2,
                                                    y: 4
                                                },
                                                grid: this,
                                                cover: document.getElementById("gridCloseCover2"),
                                                cover1: document.getElementById("gridCloseCover1"),
                                                btn: this.gridClose,
                                                closeBtn: this.gridClose
                                            };
                                            this.letters.push(h), $(this.gridClose).on("mouseenter", t.bind(h)), $(this.gridClose).on("click", i), $("#gridAbout").on("click", r), this.prevMouse = {
                                                x: 0,
                                                y: 0
                                            }, this.prevBtn = null
                                        }

                                        function t(e) {
                                            function c(e, t, n, r, i) {
                                                TweenLite.fromTo(e.cover, s * a, {
                                                    left: t + "%",
                                                    top: n + "%"
                                                }, {
                                                    left: r + "%",
                                                    top: i + "%",
                                                    ease: f,
                                                    delay: u * a
                                                }), TweenLite.fromTo(e.cover1, o * a, {
                                                    left: t + "%",
                                                    top: n + "%"
                                                }, {
                                                    left: r + "%",
                                                    top: i + "%",
                                                    ease: l
                                                })
                                            }
                                            app.sound.play("rollover_grid");
                                            var t = e.clientX - e.offsetX,
                n = e.clientY - e.offsetY,
                r = t - this.grid.prevMouse.x,
                i = n - this.grid.prevMouse.y,
                s = .4,
                o = .65,
                u = .2,
                a = .75,
                f = Power4.easeOut,
                l = Back.easeInOut;
                                            Math.abs(r) > Math.abs(i) ? r > 0 ? (this.cover && c(this, 0, 0, 100, 0), this.grid.prevBtn && this.grid.prevBtn.cover && c(this.grid.prevBtn, -100, 0, 0, 0)) : (this.cover && c(this, 0, 0, -100, 0), this.grid.prevBtn && this.grid.prevBtn.cover && c(this.grid.prevBtn, 100, 0, 0, 0)) : i > 0 ? (this.cover && c(this, 0, 0, 0, 100), this.grid.prevBtn && this.grid.prevBtn.cover && c(this.grid.prevBtn, 0, -100, 0, 0)) : (this.cover && c(this, 0, 0, 0, -100), this.grid.prevBtn && this.grid.prevBtn.cover && c(this.grid.prevBtn, 0, 100, 0, 0)), this.grid.prevBtn = this, this.grid.prevMouse = {
                                                x: t,
                                                y: n
                                            }
                                        }

                                        function n() {
                                            for (var e = 0; e < this.letters.length; e++) this.letters[e].cover.style.left = "0%", this.letters[e].cover1.style.left = "0%", this.letters[e].cover.style.top = "0%", this.letters[e].cover1.style.top = "0%";
                                            this.prevMouse = {
                                                x: 0,
                                                y: 0
                                            }, this.prevBtn = null
                                        }

                                        function r(e) {
                                            e.preventDefault(), app.sound.play("click"), app.about.show()
                                        }

                                        function i(e) {
                                            e.preventDefault(), app.sound.play("click"), app.home.introDelay = 1, app.gotoHome()
                                        }

                                        function s(e) {
                                            e.preventDefault(), app.sound.play("click"), app.changeLetter(this.id)
                                        }

                                        function o(e, t) {
                                            var n = null,
                r = 0,
                i, s, o, u, a;
                                            for (i = 2; i <= 14; i++) {
                                                s = Math.ceil(28 / i), o = e / s, u = t / i, a = Math.abs(o - u);
                                                if (n == null || a < n) n = a, r = i
                                            }
                                            var f = Math.ceil(28 / r),
                l = 100 / f,
                c = 100 / r,
                h;
                                            for (h = 0; h < this.gridItems.length; h++) this.gridItems[h].style.width = l + "%", this.gridItems[h].style.height = c + "%";
                                            var p = e / f,
                d = t / r,
                v = Math.max((6 + p) / 340, (6 + d) / 340),
                m = 2048 * v,
                g = Math.round((p - v * 340) / 2),
                y = Math.round((d - v * 340) / 2),
                b, w;
                                            for (h = 0; h < this.letters.length; h++) b = g + (-3 - this.letters[h].imgPos.x * 341) * v, w = y + (-3 - this.letters[h].imgPos.y * 341) * v, this.letters[h].btn.style.backgroundPosition = b + "px " + w + "px ", this.letters[h].btn.style.backgroundSize = m + "px " + m + "px";
                                            var E = f * r - 28;
                                            this.infoBox.style.width = l * (1 + E) + "%", this.infoBox.className = E ? "wide" : "", this.infoBox.style.fontSize = Math.min(17.14 * p / 146, 20 * d / 200) + "px"
                                        }
                                        return e.prototype.reset = n, e.prototype.resize = o, e
                                    }), define("colorWipe", [], function () {
                                        "use strict";

                                        function t() {
                                            this.moving = !1, this.instant = !1, this.container = document.getElementById("colorWipe"), this.container.style.visibility = "hidden", this.colors = [], this.colorScheme = ["#b2c8d3", "#345e86", "#6d8746"];
                                            var t;
                                            for (var r = 0; r < e; r++) t = document.getElementById("colorWipe" + (r + 1)), t.style.background = this.colorScheme[r], this.colors.push(t);
                                            this.loaderContainer = document.getElementById("colorWipeLoader"), this.treePath1 = document.getElementById("treePath1"), this.treePath2 = document.getElementById("treePath2"), this.container.addEventListener("touchstart", n)
                                        }

                                        function n(e) {
                                            e.preventDefault()
                                        }

                                        function r(e, t, n, r) {
                                            this.dir = t;
                                            var s = {};
                                            this.moving = !0, this.done = !1, n && (s.onUpdate = function (e) {
                                                n(.5 + (t * 2 - 1) * e.progress() / 2)
                                            }, s.onUpdateParams = ["{self}"]), s.onComplete = function () {
                                                setTimeout(i.bind(this), 500), r && r()
                                            } .bind(this);
                                            var o = new TimelineLite(s);
                                            o.pause();
                                            for (var u = 0; u < this.colors.length; u++) e && (this.colors[u].style.background = e[u], this.colorScheme[u] = e[u]), this.dir ? (this.colors[u].style.top = "100%", this.colors[u].style.height = "100%", o.to(this.colors[u], .65, {
                                                top: "0%",
                                                ease: Power3.easeIn
                                            }, u * .1)) : (this.colors[u].style.top = "0%", this.colors[u].style.height = "0%", o.to(this.colors[u], .65, {
                                                height: "100%",
                                                ease: Power3.easeIn
                                            }, u * .1));
                                            this.container.style.visibility = "visible", this.instant ? (o.progress(1), this.instant = !1) : o.play()
                                        }

                                        function i() {
                                            if (this.done) return;
                                            this.loadPos = {
                                                path1: 0,
                                                path2: 0,
                                                currCol: 0,
                                                dur: .75
                                            }, o(this.treePath1, 0), o(this.treePath2, 0), this.treePath1.setAttribute("fill", this.colorScheme[0]), TweenLite.to(this.loadPos, this.loadPos.dur, {
                                                path1: 1,
                                                ease: Power2.easeOut,
                                                overwrite: "all",
                                                onComplete: function () {
                                                    s.call(this)
                                                } .bind(this),
                                                onUpdate: function () {
                                                    o(this.treePath1, this.loadPos.path1)
                                                } .bind(this)
                                            }), this.dir ? TweenLite.fromTo(this.loaderContainer, .75, {
                                                top: "55%"
                                            }, {
                                                top: "50%",
                                                ease: Power4.easeOut
                                            }) : TweenLite.fromTo(this.loaderContainer, .75, {
                                                top: "45%"
                                            }, {
                                                top: "50%",
                                                ease: Power4.easeOut
                                            })
                                        }

                                        function s() {
                                            if (this.done) return;
                                            this.loadPos.currCol++, this.treePath1.setAttribute("fill", this.colorScheme[(this.loadPos.currCol + 1) % 2]), this.treePath2.setAttribute("fill", this.colorScheme[this.loadPos.currCol % 2]), this.loadPos.path2 = 0, o(this.treePath2, 0), o(this.treePath1, 1), TweenLite.to(this.loadPos, this.loadPos.dur, {
                                                path2: 1,
                                                ease: Linear.easeInOut,
                                                overwrite: "all",
                                                onComplete: s.bind(this),
                                                onUpdate: function () {
                                                    o(this.treePath2, this.loadPos.path2)
                                                } .bind(this)
                                            })
                                        }

                                        function o(e, t) {
                                            var n = [
                    [
                        [19, 37], 57
                    ],
                    [
                        [19, 37], 52
                    ],
                    [
                        [3, 53], 52
                    ],
                    [
                        [17, 39], 34
                    ],
                    [
                        [9, 47], 34
                    ],
                    [
                        [23, 33], 16
                    ],
                    [
                        [17, 39], 16
                    ]
                ],
                r = "M 28 2 L 17 16 L 23 16 L 9 34 L 17 34 L 3 52 L 19 52 L 19 57 ";
                                            for (var i = 0; i < n.length; i++) r += "L " + (n[i][0][0] + (n[i][0][1] - n[i][0][0]) * t) + " " + n[i][1];
                                            r += " z", e.setAttribute("d", r)
                                        }

                                        function u(e, t) {
                                            this.done = !0, app.sound.play("letterchange");
                                            var n = {},
                r = this.dir;
                                            e && (n.onUpdate = function (t) {
                                                e(1 - r + (r * 2 - 1) * t.progress() / 2)
                                            }, n.onUpdateParams = ["{self}"]), n.onComplete = function (e) {
                                                this.container.style.visibility = "hidden", this.moving = !1, this.done = !0, t && t()
                                            } .bind(this);
                                            var i = new TimelineLite(n),
                s = 0;
                                            i.pause(), this.dir ? i.to(this.loaderContainer, .75, {
                                                top: "-20%",
                                                ease: Power4.easeOut
                                            }, s * .1) : i.to(this.loaderContainer, .75, {
                                                top: "120%",
                                                ease: Power4.easeOut
                                            }, s * .1);
                                            for (s = 0; s < this.colors.length; s++) this.dir ? i.to(this.colors[this.colors.length - 1 - s], .75, {
                                                height: "0%",
                                                ease: Power4.easeOut
                                            }, s * .1) : i.to(this.colors[this.colors.length - 1 - s], .75, {
                                                top: "100%",
                                                ease: Power4.easeOut
                                            }, s * .1);
                                            i.play()
                                        }
                                        var e = 3;
                                        return t.prototype.show = r, t.prototype.hide = u, t
                                    }), define("colorDrag", [], function () {
                                        "use strict";

                                        function t() {
                                            this.isSetup = !1, this.flipped = !1, this.moved = !1, this.container = document.getElementById("colorDrag"), this.container.style.visibility = "hidden", this.counterEase = {
                                                value: 0
                                            }, this.counterEase.timeline = new TimelineLite, this.counterEase.timeline.fromTo(this.counterEase, 1, {
                                                value: 0
                                            }, {
                                                value: .5,
                                                ease: Power2.easeIn
                                            }, 0), this.counterEase.timeline.fromTo(this.counterEase, 1, {
                                                value: .5
                                            }, {
                                                value: 1,
                                                ease: Power2.easeOut
                                            }, 1), this.tl = new TimelineLite, this.tl.pause(), this.topColors = n.call(this, this.container, "-100%"), this.bottomColors = n.call(this, this.container, "100%"), this.allColors = this.topColors.concat(this.bottomColors), this.onMouseDown = r.bind(this), this.onMouseMove = o.bind(this), this.onMouseUp = u.bind(this), this.onTouchStart = a.bind(this), this.onTouchMove = c.bind(this), this.onTouchEnd = h.bind(this), this.dragStart = p.bind(this), this.dragMove = d.bind(this), this.dragEnd = m.bind(this), this.setPositions = v.bind(this), this.dragPosition = {}, this.dragOffset = {}
                                        }

                                        function n(e, t) {
                                            var n = [],
                r = document.createElement("div");
                                            r.className = "colorDragInner", r.style.top = t, e.appendChild(r);
                                            for (var i = 0; i < 3; i++) {
                                                var s = document.createElement("div");
                                                s.className = "colorDragInnerChild", r.appendChild(s), n.push(s), this.tl.fromTo(s, .8, {
                                                    top: "-100%"
                                                }, {
                                                    top: "0%",
                                                    ease: Power3.easeOut
                                                }, 1 - .8 - i * .1), this.tl.fromTo(s, .8, {
                                                    top: "0%"
                                                }, {
                                                    top: "100%",
                                                    ease: Power3.easeIn
                                                }, 1 + i * .1)
                                            }
                                            return n
                                        }

                                        function r(e) {
                                            e.preventDefault();
                                            if (this.dragging || app.colorWipe.moving) return;
                                            this.dragStart(e.pageX, e.pageY), i.call(this)
                                        }

                                        function i() {
                                            this.mousedrag = !0, document.body.addEventListener("mousemove", this.onMouseMove), document.body.addEventListener("mouseup", this.onMouseUp), $(document.body).on("mouseleave", this.onMouseUp)
                                        }

                                        function s() {
                                            this.mousedrag = !1, document.body.removeEventListener("mousemove", this.onMouseMove), document.body.removeEventListener("mouseup", this.onMouseUp), $(document.body).off("mouseleave", this.onMouseUp)
                                        }

                                        function o(e) {
                                            this.dragMove(e.pageX, e.pageY)
                                        }

                                        function u(e) {
                                            this.dragEnd(e.pageX, e.pageY), s.call(this)
                                        }

                                        function a(e) {
                                            e.preventDefault();
                                            if (this.dragging || app.colorWipe.moving) return;
                                            var t = e.touches[0];
                                            this.dragStart(t.pageX, t.pageY), f.call(this)
                                        }

                                        function f() {
                                            this.touchdrag = !0, document.body.addEventListener("touchmove", this.onTouchMove), document.body.addEventListener("touchend", this.onTouchEnd)
                                        }

                                        function l() {
                                            this.touchdrag = !1, document.body.removeEventListener("touchmove", this.onTouchMove), document.body.removeEventListener("touchend", this.onTouchEnd)
                                        }

                                        function c(e) {
                                            var t = e.touches[0];
                                            this.dragMove(t.pageX, t.pageY)
                                        }

                                        function h(e) {
                                            var t = e.changedTouches[0];
                                            this.dragEnd(t.pageX, t.pageY), l.call(this)
                                        }

                                        function p(e, t) {
                                            this.moved = !1, this.dragging = !0, this.dragPosition.y = this.dragPosition.startY = this.dragPosition.lastY = t, this.setPositions(0), this.container.style.visibility = "visible"
                                        }

                                        function d(e, t) {
                                            this.moved = !0, this.dragPosition.x = e, this.dragPosition.y = t, this.dragPosition.velocity = this.dragPosition.y - this.dragPosition.lastY, this.dragPosition.lastY = this.dragPosition.y, this.setPositions(100 * (t - this.dragPosition.startY) / this.h)
                                        }

                                        function v(e) {
                                            this.counterEase.timeline.progress(e / 200 + .5), this.tl.progress(this.counterEase.value), this.section.transition(1 - this.counterEase.value)
                                        }

                                        function m(e, t) {
                                            this.dragging = !1;
                                            if (!this.moved) {
                                                this.hide();
                                                return
                                            }
                                            var n = this.dragPosition.y - this.dragPosition.startY,
                r = 5,
                i = this.h / 3;
                                            Math.abs(this.dragPosition.velocity) < 1 && (this.dragPosition.velocity = Math.abs(n) / n), this.dragPosition.velocity < -r ? (this.direction = 1, this.goal = -100) : this.dragPosition.velocity > r ? (this.direction = -1, this.goal = 100) : n < -i ? (this.direction = 1, this.goal = -100) : n > i ? (this.direction = -1, this.goal = 100) : (this.direction = 0, this.goal = 0), this.direction != 0 && (this.flipped = !0), this.dragPosition.y = 100 * n / this.h, this.dragPosition.velocity = 100 * this.dragPosition.velocity / this.h, g.call(this)
                                        }

                                        function g() {
                                            if (this.dragging) return;
                                            var e = this.goal - this.dragPosition.y,
                t = Math.abs(e) / e,
                n = this.dragPosition.velocity;
                                            this.direction == 0 && (n = Math.min(Math.abs(this.dragPosition.velocity), Math.abs(e / 5)) * t), this.dragPosition.velocity = Math.min(this.dragPosition.velocity * 1.25, 5), n = Math.min(Math.abs(n), Math.abs(e)) * t, this.dragPosition.y += n;
                                            var r = this.goal - this.dragPosition.y;
                                            Math.abs(r) < 1 ? (this.dragPosition.y = this.goal, this.direction != 0 ? app.changeLetter(this.direction) : this.hide()) : window.requestAnimationFrame(g.bind(this)), this.setPositions(this.dragPosition.y)
                                        }

                                        function y() {
                                            this.container.style.visibility = "hidden"
                                        }

                                        function b(e) {
                                            this.isSetup && S.call(this), this.isSetup = !0, this.dragging = !1, this.section = e, this.currDiv = e.data.el, w(this.bottomColors, app.alphabet.slides[(e.data.index + 1) % app.alphabet.slides.length]), w(this.topColors, app.alphabet.slides[(e.data.index - 1 + app.alphabet.slides.length) % app.alphabet.slides.length]), E.call(this)
                                        }

                                        function w(e, t) {
                                            var n = t.wipeColors ? t.wipeColors : [t.gridColor, t.contentColor, t.accentColor];
                                            for (var r = 0; r < 3; r++) e[r].style.backgroundColor = n[r]
                                        }

                                        function E() {
                                            this.currDiv.addEventListener("mousedown", this.onMouseDown), this.currDiv.addEventListener("touchstart", this.onTouchStart)
                                        }

                                        function S() {
                                            this.currDiv.removeEventListener("mousedown", this.onMouseDown), this.currDiv.removeEventListener("touchstart", this.onTouchStart), this.mousedrag && s.call(this), this.touchdrag && l.call(this)
                                        }

                                        function x(e, t) {
                                            this.w = e, this.h = t
                                        }
                                        var e = 3;
                                        return t.prototype.hide = y, t.prototype.setup = b, t.prototype.resize = x, t
                                    }),
    function (t, n) {
        typeof exports == "object" && exports && typeof exports.nodeName != "string" ? n(exports) : typeof define == "function" && define.amd ? define("mustache", ["exports"], n) : (t.Mustache = {}, n(Mustache))
    } (this, function (t) {
        function i(e) {
            return typeof e == "function"
        }

        function s(e) {
            return r(e) ? "array" : typeof e
        }

        function o(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function u(e, t) {
            return e != null && typeof e == "object" && t in e
        }

        function f(e, t) {
            return a.call(e, t)
        }

        function c(e) {
            return !f(l, e)
        }

        function p(e) {
            return String(e).replace(/[&<>"'\/]/g, function (t) {
                return h[t]
            })
        }

        function b(e, n) {
            function l() {
                if (a && !f)
                    while (u.length) delete s[u.pop()];
                else u = [];
                a = !1, f = !1
            }

            function x(e) {
                typeof e == "string" && (e = e.split(v, 2));
                if (!r(e) || e.length !== 2) throw new Error("Invalid tags: " + e);
                h = new RegExp(o(e[0]) + "\\s*"), p = new RegExp("\\s*" + o(e[1])), b = new RegExp("\\s*" + o("}" + e[1]))
            }
            if (!e) return [];
            var i = [],
                s = [],
                u = [],
                a = !1,
                f = !1,
                h, p, b;
            x(n || t.tags);
            var T = new S(e),
                N, C, k, L, A, O;
            while (!T.eos()) {
                N = T.pos, k = T.scanUntil(h);
                if (k)
                    for (var M = 0, _ = k.length; M < _; ++M) L = k.charAt(M), c(L) ? u.push(s.length) : f = !0, s.push(["text", L, N, N + 1]), N += 1, L === "\n" && l();
                if (!T.scan(h)) break;
                a = !0, C = T.scan(y) || "name", T.scan(d), C === "=" ? (k = T.scanUntil(m), T.scan(m), T.scanUntil(p)) : C === "{" ? (k = T.scanUntil(b), T.scan(g), T.scanUntil(p), C = "&") : k = T.scanUntil(p);
                if (!T.scan(p)) throw new Error("Unclosed tag at " + T.pos);
                A = [C, k, N, T.pos], s.push(A);
                if (C === "#" || C === "^") i.push(A);
                else if (C === "/") {
                    O = i.pop();
                    if (!O) throw new Error('Unopened section "' + k + '" at ' + N);
                    if (O[1] !== k) throw new Error('Unclosed section "' + O[1] + '" at ' + N)
                } else C === "name" || C === "{" || C === "&" ? f = !0 : C === "=" && x(k)
            }
            O = i.pop();
            if (O) throw new Error('Unclosed section "' + O[1] + '" at ' + T.pos);
            return E(w(s))
        }

        function w(e) {
            var t = [],
                n, r;
            for (var i = 0, s = e.length; i < s; ++i) n = e[i], n && (n[0] === "text" && r && r[0] === "text" ? (r[1] += n[1], r[3] = n[3]) : (t.push(n), r = n));
            return t
        }

        function E(e) {
            var t = [],
                n = t,
                r = [],
                i, s;
            for (var o = 0, u = e.length; o < u; ++o) {
                i = e[o];
                switch (i[0]) {
                    case "#":
                    case "^":
                        n.push(i), r.push(i), n = i[4] = [];
                        break;
                    case "/":
                        s = r.pop(), s[5] = i[2], n = r.length > 0 ? r[r.length - 1][4] : t;
                        break;
                    default:
                        n.push(i)
                }
            }
            return t
        }

        function S(e) {
            this.string = e, this.tail = e, this.pos = 0
        }

        function x(e, t) {
            this.view = e, this.cache = {
                ".": this.view
            }, this.parent = t
        }

        function T() {
            this.cache = {}
        }
        var n = Object.prototype.toString,
            r = Array.isArray || function (t) {
                return n.call(t) === "[object Array]"
            },
            a = RegExp.prototype.test,
            l = /\S/,
            h = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;"
            },
            d = /\s*/,
            v = /\s+/,
            m = /\s*=/,
            g = /\s*\}/,
            y = /#|\^|\/|>|\{|&|=|!/;
        S.prototype.eos = function () {
            return this.tail === ""
        }, S.prototype.scan = function (t) {
            var n = this.tail.match(t);
            if (!n || n.index !== 0) return "";
            var r = n[0];
            return this.tail = this.tail.substring(r.length), this.pos += r.length, r
        }, S.prototype.scanUntil = function (t) {
            var n = this.tail.search(t),
                r;
            switch (n) {
                case -1:
                    r = this.tail, this.tail = "";
                    break;
                case 0:
                    r = "";
                    break;
                default:
                    r = this.tail.substring(0, n), this.tail = this.tail.substring(n)
            }
            return this.pos += r.length, r
        }, x.prototype.push = function (t) {
            return new x(t, this)
        }, x.prototype.lookup = function (t) {
            var n = this.cache,
                r;
            if (n.hasOwnProperty(t)) r = n[t];
            else {
                var s = this,
                    o, a, f = !1;
                while (s) {
                    if (t.indexOf(".") > 0) {
                        r = s.view, o = t.split("."), a = 0;
                        while (r != null && a < o.length) a === o.length - 1 && (f = u(r, o[a])), r = r[o[a++]]
                    } else r = s.view[t], f = u(s.view, t);
                    if (f) break;
                    s = s.parent
                }
                n[t] = r
            }
            return i(r) && (r = r.call(this.view)), r
        }, T.prototype.clearCache = function () {
            this.cache = {}
        }, T.prototype.parse = function (t, n) {
            var r = this.cache,
                i = r[t];
            return i == null && (i = r[t] = b(t, n)), i
        }, T.prototype.render = function (t, n, r) {
            var i = this.parse(t),
                s = n instanceof x ? n : new x(n);
            return this.renderTokens(i, s, r, t)
        }, T.prototype.renderTokens = function (t, n, r, i) {
            var s = "",
                o, u, a;
            for (var f = 0, l = t.length; f < l; ++f) a = undefined, o = t[f], u = o[0], u === "#" ? a = this.renderSection(o, n, r, i) : u === "^" ? a = this.renderInverted(o, n, r, i) : u === ">" ? a = this.renderPartial(o, n, r, i) : u === "&" ? a = this.unescapedValue(o, n) : u === "name" ? a = this.escapedValue(o, n) : u === "text" && (a = this.rawValue(o)), a !== undefined && (s += a);
            return s
        }, T.prototype.renderSection = function (t, n, s, o) {
            function l(e) {
                return u.render(e, n, s)
            }
            var u = this,
                a = "",
                f = n.lookup(t[1]);
            if (!f) return;
            if (r(f))
                for (var c = 0, h = f.length; c < h; ++c) a += this.renderTokens(t[4], n.push(f[c]), s, o);
            else if (typeof f == "object" || typeof f == "string" || typeof f == "number") a += this.renderTokens(t[4], n.push(f), s, o);
            else if (i(f)) {
                if (typeof o != "string") throw new Error("Cannot use higher-order sections without the original template");
                f = f.call(n.view, o.slice(t[3], t[5]), l), f != null && (a += f)
            } else a += this.renderTokens(t[4], n, s, o);
            return a
        }, T.prototype.renderInverted = function (t, n, i, s) {
            var o = n.lookup(t[1]);
            if (!o || r(o) && o.length === 0) return this.renderTokens(t[4], n, i, s)
        }, T.prototype.renderPartial = function (t, n, r) {
            if (!r) return;
            var s = i(r) ? r(t[1]) : r[t[1]];
            if (s != null) return this.renderTokens(this.parse(s), n, r, s)
        }, T.prototype.unescapedValue = function (t, n) {
            var r = n.lookup(t[1]);
            if (r != null) return r
        }, T.prototype.escapedValue = function (n, r) {
            var i = r.lookup(n[1]);
            if (i != null) return t.escape(i)
        }, T.prototype.rawValue = function (t) {
            return t[1]
        }, t.name = "mustache.js", t.version = "2.1.3", t.tags = ["{{", "}}"];
        var N = new T;
        t.clearCache = function () {
            return N.clearCache()
        }, t.parse = function (t, n) {
            return N.parse(t, n)
        }, t.render = function (t, n, r) {
            if (typeof t != "string") throw new TypeError('Invalid template! Template should be a "string" but "' + s(t) + '" was given as the first ' + "argument for mustache#render(template, view, partials)");
            return N.render(t, n, r)
        }, t.to_html = function (n, r, s, o) {
            var u = t.render(n, r, s);
            if (!i(o)) return u;
            o(u)
        }, t.escape = p, t.Scanner = S, t.Context = x, t.Writer = T
    }), define("arrowBtn", [], function () {
        "use strict";

        function e(e) {
            this.onClick = null, this.overPath = $(e).find(".arrowLineOver")[0], this.length = this.overPath.getTotalLength(), this.overPath.style.strokeDasharray = this.length + " " + this.length, this.currOffset = this.length, this.overPath.style.strokeDashoffset = this.currOffset + "px", $(e).on("mouseenter", t.bind(this)), $(e).on("mouseleave", n.bind(this)), $(e).on("click", r.bind(this))
        }

        function t(e) {
            e.preventDefault(), app.sound.play("rollover_arrow"), this.currOffset -= this.length, this.overPath.style.strokeDashoffset = this.currOffset + "px"
        }

        function n(e) {
            e.preventDefault(), app.sound.play("rollout_arrow"), this.currOffset -= this.length, Math.abs(this.currOffset) % this.length * 2 && (this.currOffset -= this.length), this.overPath.style.strokeDashoffset = this.currOffset + "px"
        }

        function r(e) {
            e.preventDefault(), e.stopPropagation && e.stopPropagation(), this.onClick && this.onClick(e)
        }
        return e
    }), define("letter", ["mustache", "arrowBtn"], function (e, t) {
        "use strict";

        function r(e) {
            e.description = i(e.description), this.ready = !1, this.initialized = !1, this.data = e, this.data.imagePath = "images/letters/" + e.id, e.el.className += " letter", this.filesToLoad = [{
                id: this.data.id + "_bg",
                path: this.data.imagePath + ".jpg"
            }, {
                id: this.data.id + "_bgTile",
                path: this.data.imagePath + "-tile.jpg"
            }]
        }

        function i(e) {
            var t = e.indexOf("See: ");
            return t > 0 && (e = e.substring(0, t) + "<a onclick=\"changeLetter('" + e.charAt(t + 5).toLowerCase() + "')\">" + e.substring(t, t + 6) + "</a>" + e.substring(t + 6)), e
        }

        function s(t) {
            this.initialized = !0, this.data.el.innerHTML = e.render(n, this.data), window.requestAnimationFrame(function () {
                o.call(this, t)
            } .bind(this))
        }

        function o(e) {
            this.ready = !0, this.img = $(this.data.el).find(".lImgCont img")[0], this.imgCont = $(this.data.el).find(".lImgCont")[0], this.imgContBg = $(this.data.el).find(".lImgContBackground")[0], this.bottomBar = $(this.data.el).find(".lBottomBar")[0], this.bottomContent = $(this.data.el).find(".letterBottomContent")[0], this.triangle = $(this.data.el).find(".letterTriangle")[0], this.desktopCntrls = $(this.data.el).find(".desktopCntrls")[0], this.mobileCntrls = $(this.data.el).find(".mobileCntrls")[0], this.arrowUp = $(this.data.el).find(".desktopCntrls .upArrow")[0], this.arrowDown = $(this.data.el).find(".desktopCntrls .downArrow")[0], this.menuBtn = $(this.data.el).find(".desktopCntrls .menuButton")[0], this.menuBtnMobile = $(this.data.el).find(".mobileCntrls .menuButton")[0], this.arrowUpMobile = $(this.data.el).find(".mobileCntrls .upArrow")[0], this.arrowDownMobile = $(this.data.el).find(".mobileCntrls .downArrow")[0], this.desktopShareBtn = $(this.data.el).find(".desktopLetterShare .letterShareBtn")[0], this.desktopShareShelf = $(this.data.el).find(".desktopLetterShare .letterShareShelf")[0], $(this.desktopShareBtn).on("click", g.bind(this)), $(this.desktopShareBtn).on("mouseenter", f), $(this.desktopShareBtn).on("mouseleave", l), this.mobileLetterShare = $(this.data.el).find(".mobileLetterShare")[0], this.mobileShareBtn = $(this.data.el).find(".mobileLetterShare .letterShareBtn")[0], this.mobileShareShelf = $(this.data.el).find(".mobileLetterShare .letterShareShelf")[0], $(this.mobileShareBtn).on("click touchstart", y.bind(this)), h.call(this), $(this.mobileShareShelf).find("a").on("touchstart", c);
            var n = new t(this.arrowUp);
            n.onClick = d, $(this.arrowUpMobile).on("click touchstart", d);
            var r = new t(this.arrowDown);
            r.onClick = v, $(this.arrowDownMobile).on("click touchstart", v), $(this.menuBtn).on("click", m), $(this.menuBtn).on("mouseenter", u), $(this.menuBtn).on("mouseleave", a), $(this.menuBtnMobile).on("click touchstart", m), this.transitionTimeline = new TimelineLite, this.transitionTimeline.pause(), this.transitionTimeline.fromTo(this.imgCont, 1, {
                top: "20%"
            }, {
                top: "0%",
                ease: Power3.easeOut
            }, 0), this.transitionTimeline.fromTo(this.imgCont, 1, {
                top: "0%"
            }, {
                top: "-50%",
                ease: Power3.easeIn
            }, 1), this.transitionTimeline.fromTo(this.bottomBar, 1, {
                bottom: "-40%"
            }, {
                bottom: "0%",
                ease: Power3.easeOut
            }, 0), this.transitionTimeline.fromTo(this.bottomBar, 1, {
                bottom: "0%"
            }, {
                bottom: "100%",
                ease: Power3.easeIn
            }, 1), this.transitionTimeline.fromTo(this.desktopCntrls, 1, {
                top: "40%"
            }, {
                top: "0%",
                ease: Power3.easeOut
            }, 0), this.transitionTimeline.fromTo(this.desktopCntrls, 1, {
                top: "0%"
            }, {
                top: "-100%",
                ease: Power3.easeIn
            }, 1), this.transitionTimeline.fromTo(this.mobileCntrls, 1, {
                top: "20%"
            }, {
                top: "0%",
                ease: Power3.easeOut
            }, 0), this.transitionTimeline.fromTo(this.mobileCntrls, 1, {
                top: "0%"
            }, {
                top: "-50%",
                ease: Power3.easeIn
            }, 1), e && e()
        }

        function u() {
            app.sound.play("rollover_menuBtn")
        }

        function a() {
            app.sound.play("rollout_menuBtn")
        }

        function f() {
            app.sound.play("rollover_homeshare")
        }

        function l() {
            app.sound.play("rollout_homeshare")
        }

        function c(e) {
            console.log("shareLinkClick"), window.open(e.target.href)
        }

        function h() {
            var e = $(this.data.el).find(".desktopLetterShare .letterShareBtnLabel")[0],
                t = String(e.innerHTML),
                n = document.createElement("div"),
                r = document.createElement("div");
            e.innerHTML = "", e.appendChild(n), e.appendChild(r);
            for (var i = 0; i < t.length; i++) {
                var s = document.createElement("span"),
                    o = document.createElement("span");
                s.style.transitionDelay = o.style.transitionDelay = .05 * i + "s", s.className = "letterShareLabelReg", o.className = "letterShareLabelHover", s.innerHTML = o.innerHTML = t.charAt(i), n.appendChild(s), r.appendChild(o)
            }
        }

        function p(e) {
            this.transitionTimeline.progress(e)
        }

        function d(e) {
            e && e.preventDefault(), app.changeLetter(-1), app.sound.play("click")
        }

        function v(e) {
            e && e.preventDefault(), app.changeLetter(1), app.sound.play("click")
        }

        function m(e) {
            e && e.preventDefault(), e.stopPropagation ? e.stopPropagation() : event.cancelBubble = !0, app.sound.play("click"), app.gotoMenu()
        }

        function g(e) {
            e && e.preventDefault();
            var t = String(this.desktopShareShelf.className);
            t.indexOf("open") >= 0 ? (app.sound.play("shelf_close"), this.desktopShareShelf.className = "letterShareShelf") : (app.sound.play("shelf_open"), this.desktopShareShelf.className = "letterShareShelf open")
        }

        function y(e) {
            e && e.preventDefault();
            var t = String(this.mobileShareShelf.className);
            t.indexOf("open") >= 0 ? (app.sound.play("shelf_close"), this.mobileShareShelf.className = "letterShareShelf") : (app.sound.play("shelf_open"), this.mobileShareShelf.className = "letterShareShelf open")
        }

        function b() {
            app.colorDrag.setup(this)
        }

        function w() {
            var e = String(this.desktopShareShelf.className);
            e.indexOf("open") >= 0 && (this.desktopShareShelf.className = "letterShareShelf");
            var t = String(this.mobileShareShelf.className);
            t.indexOf("open") >= 0 && (this.mobileShareShelf.className = "letterShareShelf")
        }

        function E(e, t) {
            if (!this.ready) return;
            var n = {
                w: 1600,
                h: 700
            },
                r = e / 800,
                i = this.imgCont.offsetHeight / (n.h - 60),
                s = i,
                o = Math.round(n.h * s),
                u = Math.round(n.w * s),
                a = e - u,
                f = this.data.imageCenter !== undefined ? this.data.imageCenter : .5,
                l = a > 0 ? a * f : a / 2;
            this.img.style.height = o + "px", this.img.style.width = u + "px", this.img.style.left = l + "px", this.imgContBg.style.height = o + "px", this.imgContBg.style.backgroundSize = 100 * s + "px " + 700 * s + "px";
            var c = this.bottomContent.offsetWidth;
            this.bottomContent.style.left = e < 500 ? "30px" : Math.max(70, (e - c) * .3) + "px", this.triangle.style.left = this.bottomContent.style.left
        }
        var n = document.getElementById("letterTemplate").innerHTML;
        return e.parse(n), r.prototype.init = s, r.prototype.show = b, r.prototype.hide = w, r.prototype.transition = p, r.prototype.resize = E, r
    }), define("about", [], function () {
        "use strict";

        function e() {
            this.active = !1, this.container = document.getElementById("aboutTheSite"), this.closeBtn = document.getElementById("aboutClose"), this.cover = document.getElementById("aboutCover"), this.content = document.getElementById("aboutBottomContent"), $(this.closeBtn).on("click", n.bind(this))
        }

        function t() {
            this.active = !0, this.container.style.display = "block", app.resize(), app.sound.play("about_open"), TweenLite.fromTo(this.cover, .65, {
                top: "100%"
            }, {
                top: "0%",
                ease: Expo.easeOut,
                delay: 0
            }), TweenLite.fromTo("#aboutBottom", .5, {
                bottom: "-7em"
            }, {
                bottom: "-1em",
                ease: Expo.easeOut,
                delay: .2
            }), TweenLite.fromTo(this.content, .65, {
                top: "200px"
            }, {
                top: "0em",
                ease: Back.easeOut,
                delay: .2
            })
        }

        function n(e) {
            this.active = !1, app.resize(), app.sound.play("click"), app.sound.play("about_close"), e && e.preventDefault(), TweenLite.fromTo(this.cover, .65, {
                top: "0%"
            }, {
                top: "100%",
                ease: Expo.easeIn,
                delay: .2,
                onComplete: function () {
                    this.container.style.display = "none"
                } .bind(this)
            }), TweenLite.fromTo("#aboutBottom", .65, {
                bottom: "-1em"
            }, {
                bottom: "-7em",
                ease: Back.easeIn,
                delay: 0
            })
        }

        function r(e, t) {
            if (e > 900) {
                document.body.className = "", this.container.className = "";
                var n = Math.min(1, e / 1370);
                this.container.style.fontSize = Math.round(n * 100) + "px", this.content.style.left = Math.max(70 * n, (e - this.content.offsetWidth) * .3) + "px"
            } else {
                this.container.className = "stack", this.active ? document.body.className = "scroll" : document.body.className = "";
                var n = 1 + (e / 400 - 1) / 3;
                this.container.style.fontSize = Math.round(n * 100) + "px", this.content.style.left = "0px"
            }
        }
        return e.prototype.show = t, e.prototype.hide = n, e.prototype.resize = r, e
    }), define("spriteSequence", [], function () {
        "use strict";

        function e(e, t, n, r, i, s) {
            e.style.backgroundImage = "url(" + t + ")", this.div = e, this.frameData = r, this.totalFrames = r.length, this.imgSize = n, this.startTime = Math.floor(Math.random() * 1e4), this.currFrame = Math.floor(Math.random() * this.totalFrames), this.frameRate = i, this.changeInterval = 1e3 / i, this.size = s
        }

        function t(e) {
            var t = Math.floor((e + this.startTime) / this.changeInterval) % this.totalFrames;
            t != this.currFrame && (this.currFrame = t, this.draw())
        }

        function n() {
            var e = this.div,
                t = this.frameData[this.currFrame],
                n = this.size * this.scale,
                r = t.w * n,
                i = t.h * n;
            e.style.width = r + "px", e.style.height = i + "px", e.style.left = this.x - r / 2 + "px", e.style.top = this.y - i + "px", e.style.backgroundSize = this.imgSize.w * n + "px " + this.imgSize.h * n + "px", e.style.backgroundPosition = -t.x * n + "px " + -t.y * n + "px"
        }

        function r(e, t, n) {
            this.x = e, this.y = t, this.scale = n, this.draw()
        }
        return e.prototype.update = t, e.prototype.draw = n, e.prototype.position = r, e
    }), define("home", ["spriteSequence"], function (e) {
        "use strict";

        function r() {
            this.active = !1, this.container = document.getElementById("home"), this.content = document.getElementById("homeContent"), this.topContent = document.getElementById("homeContentTop"), this.topContentTitle = document.getElementById("homeContentTitle"), this.topContentSubtitle = document.getElementById("homeContentSubtitle"), this.bottomContent = document.getElementById("homeContentBottom"), this.bottomContentIntro = document.getElementById("homeContentIntro"), this.bottomContentEnterBtn = document.getElementById("homeContentEnterBtn"), this.bottomContentAboutBtn = document.getElementById("homeContentAboutBtn"), this.cloudsContainer = document.getElementById("homeClouds"), this.homeBg = document.getElementById("homeBg"), this.homeForeground = document.getElementById("homeForeground"), this.homeForeground.style.visibility = "hidden", this.foreground = s(this.homeForeground, "img", {
                id: "homeBgForeground",
                src: "images/home/test2.png"
            }), this.homeboy = s(this.homeForeground, "img", {
                id: "homeBgHomeboy",
                src: "images/home/homeboy.png"
            }), this.signContainer = s(this.homeForeground, "div", {
                id: "homeBgSignContainer"
            }), this.sign = s(this.signContainer, "img", {
                id: "homeBgSign",
                src: "images/home/placa.png"
            }), this.boatContainer = s(this.homeForeground, "div", {
                id: "boatContainer"
            }), this.boat = s(this.boatContainer, "img", {
                id: "homeBgBoat",
                src: "images/home/boat.png"
            }), this.boatWater = s(this.homeForeground, "img", {
                id: "homeBgBoatWater",
                src: "images/home/water.png"
            }), this.boatSink = 0, this.fire1 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, t, 10, .5), this.fire2 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, t, 12, .15), this.fire3 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, t, 6, .35), this.fire4 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, t, 9, .25), this.smoke1 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, n, 5, 1.2), this.smoke1.div.style.opacity = .15, this.smoke11 = new e(s(this.homeForeground, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, n, 10, .9), this.smoke11.div.style.opacity = .15, this.boatSmoke = s(this.homeForeground, "div", {
                id: "boatSmokeContainer"
            }), this.smoke2 = new e(s(this.boatSmoke, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, n, 6, .8), this.smoke2.div.style.opacity = .2, this.smoke22 = new e(s(this.boatSmoke, "div", {
                "class": "spriteSequence"
            }), "images/home/fx.png", {
                w: 512,
                h: 1024
            }, n, 10, .5), this.smoke22.div.style.opacity = .2, this.filesToLoad = [{
                id: "homeBg",
                path: "images/home/bg-tile.jpg"
            }, {
                id: "homeForeground",
                path: "images/home/foreground.png"
            }, {
                id: "homeCloud1",
                path: "images/home/cloud-lrg.png"
            }, {
                id: "homeCloud2",
                path: "images/home/cloud-med.png"
            }, {
                id: "homeCloud3",
                path: "images/home/cloud-sml.png"
            }, {
                id: "homeboy",
                path: "images/home/homeboy.png"
            }, {
                id: "homesign",
                path: "images/home/placa.png"
            }, {
                id: "homefx",
                path: "images/home/fx.png"
            }], $(this.bottomContentEnterBtn).on("click", f), $(this.bottomContentEnterBtn).on("mouseenter", u), $(this.bottomContentEnterBtn).on("mouseleave", a), $(this.bottomContentAboutBtn).on("click", l), o.call(this);
            var r = [{
                img: "images/home/cloud-lrg.png",
                dimensions: {
                    w: 405,
                    h: 160
                }
            }, {
                img: "images/home/cloud-med.png",
                dimensions: {
                    w: 250,
                    h: 130
                }
            }, {
                img: "images/home/cloud-sml.png",
                dimensions: {
                    w: 254,
                    h: 100
                }
            }];
            this.introDelay = 0, this.w = 0, this.sceneScale = 1, this.cloudSpeed = 55e-5, this.clouds = [];
            var c = 9;
            for (var p = 0; p < c; p++) {
                var d = document.createElement("img"),
                    v = r[p % r.length],
                    m = Math.random() * 100,
                    g = (1 + p) * (100 / (c + 1));
                d.src = v.img, d.style.width = v.dimensions.w / 100 + "em", d.style.height = v.dimensions.h / 100 + "em", d.style.top = g + "%", d.style.left = m + "%", this.clouds.push({
                    el: d,
                    w: v.dimensions.w,
                    x: m,
                    y: g,
                    speed: 2 + Math.random() * 50
                }), this.cloudsContainer.appendChild(d)
            }
            h.call(this);
            var y = [1, 2, 3, 4, 5, 6, 7],
                b = y.length;
            this.randomSounds = {
                order: [],
                curr: 0
            };
            for (var w = 0; w < b; w++) this.randomSounds.order.push(y.splice(Math.floor(Math.random() * y.length), 1)[0]);
            setTimeout(i.bind(this), 2e4)
        }

        function i() {
            this.active && (app.sound.play("home" + this.randomSounds.order[this.randomSounds.curr]), this.randomSounds.curr = (this.randomSounds.curr + 1) % this.randomSounds.order.length), setTimeout(i.bind(this), Math.random() * 1e4 + 1e4)
        }

        function s(e, t, n, r) {
            var i = document.createElement(t);
            for (var s in n) i.setAttribute(s, n[s]);
            return e.appendChild(i), i
        }

        function o() {
            var e = document.getElementById("homeContentEnterLabel"),
                t = String(e.innerHTML),
                n = document.createElement("div"),
                r = document.createElement("div");
            e.innerHTML = "", e.appendChild(n), e.appendChild(r);
            for (var i = 0; i < t.length; i++) {
                var s = document.createElement("span"),
                    o = document.createElement("span");
                s.style.transitionDelay = o.style.transitionDelay = .05 * i + "s", s.className = "homeContentEnterLabelReg", o.className = "homeContentEnterLabelHover", s.innerHTML = o.innerHTML = t.charAt(i), n.appendChild(s), r.appendChild(o)
            }
        }

        function u() {
            app.sound.play("rollover_menuBtn")
        }

        function a() {
            app.sound.play("rollout_menuBtn")
        }

        function f(e) {
            e.preventDefault(), app.sound.play("click"), app.gotoMenu()
        }

        function l(e) {
            e.preventDefault(), app.sound.play("click"), app.about.show()
        }

        function c() {
            this.active = !0, m.call(this), TweenLite.set(this.signContainer, {
                rotation: 0
            });
            var e = new TimelineLite;
            e.pause();
            var t = 2,
                n = this.introDelay,
                r = Power4.easeInOut,
                i;
            e.fromTo("#homeBgIntro", t, {
                top: "0%"
            }, {
                top: "-100%",
                ease: r
            }, n), e.fromTo(this.homeBg, t, {
                top: "100%"
            }, {
                top: "0%",
                ease: r
            }, n), e.fromTo(this.homeForeground, t, {
                top: "140%"
            }, {
                top: "0%",
                ease: r
            }, n), e.call(function () {
                app.sound.play("home_ambient")
            }, null, null, n);
            var s = $("#homeBgIntro img");
            for (i = 0; i < s.length; i++) {
                var o = (1 + i) * (100 / (s.length - 2));
                e.fromTo(s[i], t, {
                    top: o + "%"
                }, {
                    top: Math.min(95, o - Math.random() * 30) + "%",
                    ease: r
                }, n)
            }
            for (i = 0; i < this.clouds.length; i++) e.fromTo(this.clouds[i].el, t, {
                top: this.clouds[i].y + Math.random() * 50 + "%"
            }, {
                top: this.clouds[i].y + "%",
                ease: r
            }, n);
            this.content.style.visibility = "visible", this.homeForeground.style.visibility = "visible";
            var u = .1,
                a = 150,
                f = .75,
                l = Back.easeOut,
                c = t + n,
                h = [this.topContentTitle, this.topContentSubtitle, this.bottomContentIntro, this.bottomContentEnterBtn, this.bottomContentAboutBtn];
            for (i = 0; i < h.length; i++) e.fromTo(h[i], f, {
                visibility: "hidden",
                top: -a * (1 + c)
            }, {
                visibility: "visible",
                top: 0,
                ease: l
            }, c), c += u;
            e.play(), p.call(this), setTimeout(d.bind(this), 7e3)
        }

        function h() {
            var e = new TimelineLite,
                t = 20,
                n = 40,
                r = 114,
                i = r / t;
            e.pause(), this.boatSmoke.style.top = "0px", this.boatSmoke.style.bottom = "0px";
            for (var s = 0; s < t; s++) {
                var o = Math.random() * 20 / 100;
                e.to(this.boatContainer, n / t, {
                    bottom: (s + 1) * -i / 100 + "em",
                    ease: Back.easeOut
                }, s * n / t), e.to(this.boatContainer, n / t, {
                    left: o + "em",
                    ease: Linear.easeInOut
                }, s * n / t), e.to(this.boatSmoke, n / t, {
                    left: o + "em",
                    top: -(s + 1) * -i / 100 + "em",
                    ease: Linear.easeInOut
                }, s * n / t)
            }
            e.to(this.boatSmoke, 1, {
                opacity: 0
            }, n / t * (t - 6)), this.boatSinkTl = e
        }

        function p() {
            this.boatSinkTl.seek(0), this.boatSinkTl.play()
        }

        function d() {
            if (!this.active) return;
            var e = new TimelineLite,
                t = .5,
                n = this.signContainer;
            app.sound.play("home_signDrop"), e.to(n, t, {
                rotation: -100,
                transformOrigin: "0% 100%",
                ease: Circ.easeInOut
            }), e.to(n, t * .7, {
                rotation: -30,
                ease: Circ.easeInOut
            }), e.to(n, t * .5, {
                rotation: -60,
                ease: Circ.easeInOut
            }), e.to(n, t * .3, {
                rotation: -52,
                ease: Circ.easeInOut
            }), e.to(n, t * .2, {
                rotation: -55,
                ease: Circ.easeInOut
            }), e.play()
        }

        function v() {
            this.active = !1, this.boatSinkTl.pause()
        }

        function m() {
            if (!this.active) return;
            var e = this.w / 100,
                t, n, r;
            for (r = 0; r < this.clouds.length; r++) t = this.clouds[r], t.x -= t.speed * this.cloudSpeed, n = t.x * e + t.w * this.sceneScale, n < 0 && (t.x = 100), t.el.style.left = t.x + "%";
            var i = window.performance || Date,
                s = i.now();
            this.fire1.update(s), this.fire2.update(s), this.fire3.update(s), this.fire4.update(s), this.smoke1.update(s), this.smoke11.update(s), this.smoke2.update(s), this.smoke22.update(s), window.requestAnimationFrame(m.bind(this))
        }

        function g(e, t) {
            this.w = e;
            var n = Math.max(.5, e / 1600),
                r = e / 1100;
            n = Math.min(r, n);
            var i = 1600 * n,
                s = Math.round((e - i) / 2);
            this.foreground.style.width = i + "px", this.foreground.style.left = s + "px", this.content.style.fontSize = "1em", this.bottomContentIntro.style.paddingTop = this.bottomContentIntro.style.paddingBottom = "3em";
            var o = 390 * n,
                u = 30,
                a = t - o - u,
                f = this.bottomContent.offsetHeight,
                l = (a - f) / 285,
                c = e / 900,
                h = Math.min(1, Math.min(Math.max(.65, l), c)),
                p = 285 * h + f;
            this.topContent.style.fontSize = h + "em", this.content.style.fontSize = Math.min(c / h, Math.max(1, a / p)) + "em";
            var d = this.content.offsetHeight + u,
                v = d - (t - o);
            if (v > 0) {
                var m = Math.max(0, (105 - v) / 105);
                this.content.style.top = u * m + "px", this.bottomContentIntro.style.paddingTop = this.bottomContentIntro.style.paddingBottom = 3 * m + "em"
            } else {
                this.bottomContentIntro.style.paddingTop = this.bottomContentIntro.style.paddingBottom = "3em";
                var g = Math.round((t - o - d) * .4);
                this.content.style.top = Math.max(u, g) + "px"
            }
            this.homeboy.style.bottom = 71 * n + "px", this.homeboy.style.left = Math.max(0, 200 * n + s) + "px", this.homeboy.style.width = 133 * n + "px", this.homeboy.style.height = 132 * n + "px", this.boatWater.style.bottom = "0px", this.boatWater.style.left = Math.max(0, 1362 * n + s) + "px", this.boatWater.style.width = 190 * n + "px", this.boatWater.style.height = 35 * n + "px", this.boat.style.bottom = 30 * n + "px", this.boat.style.left = Math.max(0, 1382 * n + s) + "px", this.boat.style.width = 134 * n + "px", this.boat.style.height = 114 * n + "px", this.cloudsContainer.style.height = t - o + "px", this.cloudsContainer.style.fontSize = n * 100 + "px", this.sceneScale = n, this.boatContainer.style.fontSize = this.boatSmoke.style.fontSize = 100 * n + "px", this.signContainer.style.height = 40 * n + "px", this.signContainer.style.width = 82 * n + "px", this.signContainer.style.bottom = 162 * n + "px", this.signContainer.style.left = 940 * n + s + "px", this.fire1.position(s + 315 * n, t - 254 * n, n), this.fire2.position(s + 386 * n, t - 271 * n, n), this.fire3.position(s + 421 * n, t - 322 * n, n), this.fire4.position(s + 355 * n, t - 392 * n, n), this.smoke1.position(s + 340 * n, t - 445 * n, n), this.smoke11.position(s + 340 * n, t - 445 * n, n), this.smoke2.position(s + 1482 * n, t - 108 * n, n), this.smoke22.position(s + 1482 * n, t - 108 * n, n)
        }
        var t = [{
            x: 1,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 86,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 171,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 256,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 341,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 426,
            y: 1,
            w: 84,
            h: 95
        }, {
            x: 1,
            y: 97,
            w: 84,
            h: 95
        }, {
            x: 86,
            y: 97,
            w: 84,
            h: 95
        }],
            n = [{
                x: 171,
                y: 97,
                w: 106,
                h: 230
            }, {
                x: 278,
                y: 97,
                w: 106,
                h: 230
            }, {
                x: 385,
                y: 97,
                w: 106,
                h: 230
            }, {
                x: 1,
                y: 328,
                w: 106,
                h: 230
            }, {
                x: 108,
                y: 328,
                w: 106,
                h: 230
            }, {
                x: 215,
                y: 328,
                w: 106,
                h: 230
            }, {
                x: 322,
                y: 328,
                w: 106,
                h: 230
            }, {
                x: 1,
                y: 559,
                w: 106,
                h: 230
            }, {
                x: 108,
                y: 559,
                w: 106,
                h: 230
            }, {
                x: 215,
                y: 559,
                w: 106,
                h: 230
            }, {
                x: 322,
                y: 559,
                w: 106,
                h: 230
            }, {
                x: 1,
                y: 790,
                w: 106,
                h: 230
            }, {
                x: 108,
                y: 790,
                w: 106,
                h: 230
            }, {
                x: 215,
                y: 790,
                w: 106,
                h: 230
            }];
        return r.prototype.show = c, r.prototype.hide = v, r.prototype.resize = g, r
    }),
    function () {
        var e = {},
            t = null,
            n = !0,
            r = !1;
        try {
            typeof AudioContext != "undefined" ? t = new AudioContext : typeof webkitAudioContext != "undefined" ? t = new webkitAudioContext : n = !1
        } catch (i) {
            n = !1
        }
        if (!n)
            if (typeof Audio != "undefined") try {
                new Audio
            } catch (i) {
                r = !0
            } else r = !0;
        if (n) {
            var s = typeof t.createGain == "undefined" ? t.createGainNode() : t.createGain();
            s.gain.value = 1, s.connect(t.destination)
        }
        var o = function (e) {
            this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = t, this.noAudio = r, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0
        };
        o.prototype = {
            volume: function (e) {
                var t = this;
                e = parseFloat(e);
                if (e >= 0 && e <= 1) {
                    t._volume = e, n && (s.gain.value = e);
                    for (var r in t._howls)
                        if (t._howls.hasOwnProperty(r) && t._howls[r]._webAudio === !1)
                            for (var i = 0; i < t._howls[r]._audioNode.length; i++) t._howls[r]._audioNode[i].volume = t._howls[r]._volume * t._volume;
                    return t
                }
                return n ? s.gain.value : t._volume
            },
            mute: function () {
                return this._setMuted(!0), this
            },
            unmute: function () {
                return this._setMuted(!1), this
            },
            _setMuted: function (e) {
                var t = this;
                t._muted = e, n && (s.gain.value = e ? 0 : t._volume);
                for (var r in t._howls)
                    if (t._howls.hasOwnProperty(r) && t._howls[r]._webAudio === !1)
                        for (var i = 0; i < t._howls[r]._audioNode.length; i++) t._howls[r]._audioNode[i].muted = e
                    },
                    codecs: function (e) {
                        return this._codecs[e]
                    },
                    _enableiOSAudio: function () {
                        var e = this;
                        if (t && (e._iOSEnabled || !/iPhone|iPad|iPod/i.test(navigator.userAgent))) return;
                        e._iOSEnabled = !1;
                        var n = function () {
                            var r = t.createBuffer(1, 1, 22050),
                        i = t.createBufferSource();
                            i.buffer = r, i.connect(t.destination), typeof i.start == "undefined" ? i.noteOn(0) : i.start(0), setTimeout(function () {
                                if (i.playbackState === i.PLAYING_STATE || i.playbackState === i.FINISHED_STATE) e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchstart", n, !1)
                            }, 0)
                        };
                        return window.addEventListener("touchstart", n, !1), e
                    }
                };
                var u = null,
            a = {};
                r || (u = new Audio, a = {
                    mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                    aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""),
                    m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
                });
                var f = new o(a),
            l = function (e) {
                var r = this;
                r._autoplay = e.autoplay || !1, r._buffer = e.buffer || !1, r._duration = e.duration || 0, r._format = e.format || null, r._loop = e.loop || !1, r._loaded = !1, r._sprite = e.sprite || {}, r._src = e.src || "", r._pos3d = e.pos3d || [0, 0, -0.5], r._volume = e.volume !== undefined ? e.volume : 1, r._urls = e.urls || [], r._rate = e.rate || 1, r._model = e.model || null, r._onload = [e.onload || function () { } ], r._onloaderror = [e.onloaderror || function () { } ], r._onend = [e.onend || function () { } ], r._onpause = [e.onpause || function () { } ], r._onplay = [e.onplay || function () { } ], r._onendTimer = [], r._webAudio = n && !r._buffer, r._audioNode = [], r._webAudio && r._setupAudioNode(), typeof t != "undefined" && t && f.iOSAutoEnable && f._enableiOSAudio(), f._howls.push(r), r.load()
            };
                l.prototype = {
                    load: function () {
                        var e = this,
                    t = null;
                        if (r) {
                            e.on("loaderror");
                            return
                        }
                        for (var n = 0; n < e._urls.length; n++) {
                            var i, s;
                            if (e._format) i = e._format;
                            else {
                                s = e._urls[n], i = /^data:audio\/([^;,]+);/i.exec(s), i || (i = /\.([^.]+)$/.exec(s.split("?", 1)[0]));
                                if (!i) {
                                    e.on("loaderror");
                                    return
                                }
                                i = i[1].toLowerCase()
                            }
                            if (a[i]) {
                                t = e._urls[n];
                                break
                            }
                        }
                        if (!t) {
                            e.on("loaderror");
                            return
                        }
                        e._src = t;
                        if (e._webAudio) c(e, t);
                        else {
                            var u = new Audio;
                            u.addEventListener("error", function () {
                                u.error && u.error.code === 4 && (o.noAudio = !0), e.on("loaderror", {
                                    type: u.error ? u.error.code : 0
                                })
                            }, !1), e._audioNode.push(u), u.src = t, u._pos = 0, u.preload = "auto", u.volume = f._muted ? 0 : e._volume * f.volume();
                            var l = function () {
                                e._duration = Math.ceil(u.duration * 10) / 10, Object.getOwnPropertyNames(e._sprite).length === 0 && (e._sprite = {
                                    _default: [0, e._duration * 1e3]
                                }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), u.removeEventListener("canplaythrough", l, !1)
                            };
                            u.addEventListener("canplaythrough", l, !1), u.load()
                        }
                        return e
                    },
                    urls: function (e) {
                        var t = this;
                        return e ? (t.stop(), t._urls = typeof e == "string" ? [e] : e, t._loaded = !1, t.load(), t) : t._urls
                    },
                    play: function (e, n) {
                        var r = this;
                        typeof e == "function" && (n = e);
                        if (!e || typeof e == "function") e = "_default";
                        return r._loaded ? r._sprite[e] ? (r._inactiveNode(function (i) {
                            i._sprite = e;
                            var s = i._pos > 0 ? i._pos : r._sprite[e][0] / 1e3,
                        o = 0;
                            r._webAudio ? (o = r._sprite[e][1] / 1e3 - i._pos, i._pos > 0 && (s = r._sprite[e][0] / 1e3 + s)) : o = r._sprite[e][1] / 1e3 - (s - r._sprite[e][0] / 1e3);
                            var u = !!r._loop || !!r._sprite[e][2],
                        a = typeof n == "string" ? n : Math.round(Date.now() * Math.random()) + "",
                        l;
                            (function () {
                                var t = {
                                    id: a,
                                    sprite: e,
                                    loop: u
                                };
                                l = setTimeout(function () {
                                    !r._webAudio && u && r.stop(t.id).play(e, t.id), r._webAudio && !u && (r._nodeById(t.id).paused = !0, r._nodeById(t.id)._pos = 0, r._clearEndTimer(t.id)), !r._webAudio && !u && r.stop(t.id), r.on("end", a)
                                }, o * 1e3), r._onendTimer.push({
                                    timer: l,
                                    id: t.id
                                })
                            })();
                            if (r._webAudio) {
                                var c = r._sprite[e][0] / 1e3,
                            h = r._sprite[e][1] / 1e3;
                                i.id = a, i.paused = !1, d(r, [u, c, h], a), r._playStart = t.currentTime, i.gain.value = r._volume, typeof i.bufferSource.start == "undefined" ? u ? i.bufferSource.noteGrainOn(0, s, 86400) : i.bufferSource.noteGrainOn(0, s, o) : u ? i.bufferSource.start(0, s, 86400) : i.bufferSource.start(0, s, o)
                            } else {
                                if (!(i.readyState === 4 || !i.readyState && navigator.isCocoonJS)) return r._clearEndTimer(a),
                            function () {
                                var t = r,
                                    s = e,
                                    o = n,
                                    u = i,
                                    a = function () {
                                        t.play(s, o), u.removeEventListener("canplaythrough", a, !1)
                                    };
                                u.addEventListener("canplaythrough", a, !1)
                            } (), r;
                                i.readyState = 4, i.id = a, i.currentTime = s, i.muted = f._muted || i.muted, i.volume = r._volume * f.volume(), setTimeout(function () {
                                    i.play()
                                }, 0)
                            }
                            return r.on("play"), typeof n == "function" && n(a), r
                        }), r) : (typeof n == "function" && n(), r) : (r.on("load", function () {
                            r.play(e, n)
                        }), r)
                    },
                    pause: function (e) {
                        var t = this;
                        if (!t._loaded) return t.on("play", function () {
                            t.pause(e)
                        }), t;
                        t._clearEndTimer(e);
                        var n = e ? t._nodeById(e) : t._activeNode();
                        if (n) {
                            n._pos = t.pos(null, e);
                            if (t._webAudio) {
                                if (!n.bufferSource || n.paused) return t;
                                n.paused = !0, typeof n.bufferSource.stop == "undefined" ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                            } else n.pause()
                        }
                        return t.on("pause"), t
                    },
                    stop: function (e) {
                        var t = this;
                        if (!t._loaded) return t.on("play", function () {
                            t.stop(e)
                        }), t;
                        t._clearEndTimer(e);
                        var n = e ? t._nodeById(e) : t._activeNode();
                        if (n) {
                            n._pos = 0;
                            if (t._webAudio) {
                                if (!n.bufferSource || n.paused) return t;
                                n.paused = !0, typeof n.bufferSource.stop == "undefined" ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                            } else isNaN(n.duration) || (n.pause(), n.currentTime = 0)
                        }
                        return t
                    },
                    mute: function (e) {
                        var t = this;
                        if (!t._loaded) return t.on("play", function () {
                            t.mute(e)
                        }), t;
                        var n = e ? t._nodeById(e) : t._activeNode();
                        return n && (t._webAudio ? n.gain.value = 0 : n.muted = !0), t
                    },
                    unmute: function (e) {
                        var t = this;
                        if (!t._loaded) return t.on("play", function () {
                            t.unmute(e)
                        }), t;
                        var n = e ? t._nodeById(e) : t._activeNode();
                        return n && (t._webAudio ? n.gain.value = t._volume : n.muted = !1), t
                    },
                    volume: function (e, t) {
                        var n = this;
                        e = parseFloat(e);
                        if (e >= 0 && e <= 1) {
                            n._volume = e;
                            if (!n._loaded) return n.on("play", function () {
                                n.volume(e, t)
                            }), n;
                            var r = t ? n._nodeById(t) : n._activeNode();
                            return r && (n._webAudio ? r.gain.value = e : r.volume = e * f.volume()), n
                        }
                        return n._volume
                    },
                    loop: function (e) {
                        var t = this;
                        return typeof e == "boolean" ? (t._loop = e, t) : t._loop
                    },
                    sprite: function (e) {
                        var t = this;
                        return typeof e == "object" ? (t._sprite = e, t) : t._sprite
                    },
                    pos: function (e, n) {
                        var r = this;
                        if (!r._loaded) return r.on("load", function () {
                            r.pos(e)
                        }), typeof e == "number" ? r : r._pos || 0;
                        e = parseFloat(e);
                        var i = n ? r._nodeById(n) : r._activeNode();
                        if (i) return e >= 0 ? (r.pause(n), i._pos = e, r.play(i._sprite, n), r) : r._webAudio ? i._pos + (t.currentTime - r._playStart) : i.currentTime;
                        if (e >= 0) return r;
                        for (var s = 0; s < r._audioNode.length; s++)
                            if (r._audioNode[s].paused && r._audioNode[s].readyState === 4) return r._webAudio ? r._audioNode[s]._pos : r._audioNode[s].currentTime
                        },
                        pos3d: function (e, t, n, r) {
                            var i = this;
                            t = typeof t == "undefined" || !t ? 0 : t, n = typeof n == "undefined" || !n ? -0.5 : n;
                            if (!i._loaded) return i.on("play", function () {
                                i.pos3d(e, t, n, r)
                            }), i;
                            if (e >= 0 || e < 0) {
                                if (i._webAudio) {
                                    var s = r ? i._nodeById(r) : i._activeNode();
                                    s && (i._pos3d = [e, t, n], s.panner.setPosition(e, t, n), s.panner.panningModel = i._model || "HRTF")
                                }
                                return i
                            }
                            return i._pos3d
                        },
                        fade: function (e, t, n, r, i) {
                            var s = this,
                    o = Math.abs(e - t),
                    u = e > t ? "down" : "up",
                    a = o / .01,
                    f = n / a;
                            if (!s._loaded) return s.on("load", function () {
                                s.fade(e, t, n, r, i)
                            }), s;
                            s.volume(e, i);
                            for (var l = 1; l <= a; l++) (function () {
                                var e = s._volume + (u === "up" ? .01 : -0.01) * l,
                        n = Math.round(1e3 * e) / 1e3,
                        o = t;
                                setTimeout(function () {
                                    s.volume(n, i), n === o && r && r()
                                }, f * l)
                            })()
                        },
                        fadeIn: function (e, t, n) {
                            return this.volume(0).play().fade(0, e, t, n)
                        },
                        fadeOut: function (e, t, n, r) {
                            var i = this;
                            return i.fade(i._volume, e, t, function () {
                                n && n(), i.pause(r), i.on("end")
                            }, r)
                        },
                        _nodeById: function (e) {
                            var t = this,
                    n = t._audioNode[0];
                            for (var r = 0; r < t._audioNode.length; r++)
                                if (t._audioNode[r].id === e) {
                                    n = t._audioNode[r];
                                    break
                                }
                            return n
                        },
                        _activeNode: function () {
                            var e = this,
                    t = null;
                            for (var n = 0; n < e._audioNode.length; n++)
                                if (!e._audioNode[n].paused) {
                                    t = e._audioNode[n];
                                    break
                                }
                            return e._drainPool(), t
                        },
                        _inactiveNode: function (e) {
                            var t = this,
                    n = null;
                            for (var r = 0; r < t._audioNode.length; r++)
                                if (t._audioNode[r].paused && t._audioNode[r].readyState === 4) {
                                    e(t._audioNode[r]), n = !0;
                                    break
                                }
                            t._drainPool();
                            if (n) return;
                            var i;
                            if (t._webAudio) i = t._setupAudioNode(), e(i);
                            else {
                                t.load(), i = t._audioNode[t._audioNode.length - 1];
                                var s = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
                        o = function () {
                            i.removeEventListener(s, o, !1), e(i)
                        };
                                i.addEventListener(s, o, !1)
                            }
                        },
                        _drainPool: function () {
                            var e = this,
                    t = 0,
                    n;
                            for (n = 0; n < e._audioNode.length; n++) e._audioNode[n].paused && t++;
                            for (n = e._audioNode.length - 1; n >= 0; n--) {
                                if (t <= 5) break;
                                e._audioNode[n].paused && (e._webAudio && e._audioNode[n].disconnect(0), t--, e._audioNode.splice(n, 1))
                            }
                        },
                        _clearEndTimer: function (e) {
                            var t = this,
                    n = 0;
                            for (var r = 0; r < t._onendTimer.length; r++)
                                if (t._onendTimer[r].id === e) {
                                    n = r;
                                    break
                                }
                            var i = t._onendTimer[n];
                            i && (clearTimeout(i.timer), t._onendTimer.splice(n, 1))
                        },
                        _setupAudioNode: function () {
                            var e = this,
                    n = e._audioNode,
                    r = e._audioNode.length;
                            return n[r] = typeof t.createGain == "undefined" ? t.createGainNode() : t.createGain(), n[r].gain.value = e._volume, n[r].paused = !0, n[r]._pos = 0, n[r].readyState = 4, n[r].connect(s), n[r].panner = t.createPanner(), n[r].panner.panningModel = e._model || "equalpower", n[r].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[r].panner.connect(n[r]), n[r]
                        },
                        on: function (e, t) {
                            var n = this,
                    r = n["_on" + e];
                            if (typeof t == "function") r.push(t);
                            else
                                for (var i = 0; i < r.length; i++) t ? r[i].call(n, t) : r[i].call(n);
                            return n
                        },
                        off: function (e, t) {
                            var n = this,
                    r = n["_on" + e],
                    i = t ? t.toString() : null;
                            if (i) {
                                for (var s = 0; s < r.length; s++)
                                    if (i === r[s].toString()) {
                                        r.splice(s, 1);
                                        break
                                    }
                            } else n["_on" + e] = [];
                            return n
                        },
                        unload: function () {
                            var t = this,
                    n = t._audioNode;
                            for (var r = 0; r < t._audioNode.length; r++) n[r].paused || (t.stop(n[r].id), t.on("end", n[r].id)), t._webAudio ? n[r].disconnect(0) : n[r].src = "";
                            for (r = 0; r < t._onendTimer.length; r++) clearTimeout(t._onendTimer[r].timer);
                            var i = f._howls.indexOf(t);
                            i !== null && i >= 0 && f._howls.splice(i, 1), delete e[t._src], t = null
                        }
                    };
                    if (n) var c = function (t, n) {
                        if (n in e) {
                            t._duration = e[n].duration, p(t);
                            return
                        }
                        if (/^data:[^;]+;base64,/.test(n)) {
                            var r = atob(n.split(",")[1]),
                        i = new Uint8Array(r.length);
                            for (var s = 0; s < r.length; ++s) i[s] = r.charCodeAt(s);
                            h(i.buffer, t, n)
                        } else {
                            var o = new XMLHttpRequest;
                            o.open("GET", n, !0), o.responseType = "arraybuffer", o.onload = function () {
                                h(o.response, t, n)
                            }, o.onerror = function () {
                                t._webAudio && (t._buffer = !0, t._webAudio = !1, t._audioNode = [], delete t._gainNode, delete e[n], t.load())
                            };
                            try {
                                o.send()
                            } catch (u) {
                                o.onerror()
                            }
                        }
                    },
            h = function (n, r, i) {
                t.decodeAudioData(n, function (t) {
                    t && (e[i] = t, p(r, t))
                }, function (e) {
                    r.on("loaderror")
                })
            },
            p = function (e, t) {
                e._duration = t ? t.duration : e._duration, Object.getOwnPropertyNames(e._sprite).length === 0 && (e._sprite = {
                    _default: [0, e._duration * 1e3]
                }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
            },
            d = function (n, r, i) {
                var s = n._nodeById(i);
                s.bufferSource = t.createBufferSource(), s.bufferSource.buffer = e[n._src], s.bufferSource.connect(s.panner), s.bufferSource.loop = r[0], r[0] && (s.bufferSource.loopStart = r[1], s.bufferSource.loopEnd = r[1] + r[2]), s.bufferSource.playbackRate.value = n._rate
            };
                    typeof define == "function" && define.amd && define("howler", [], function () {
                        return {
                            Howler: f,
                            Howl: l
                        }
                    }), typeof exports != "undefined" && (exports.Howler = f, exports.Howl = l), typeof window != "undefined" && (window.Howler = f, window.Howl = l)
                } (), define("text", ["module"], function (e) {
                    "use strict";
                    var t, n, r, i, s, o = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            u = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            a = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            f = typeof location != "undefined" && location.href,
            l = f && location.protocol && location.protocol.replace(/\:/, ""),
            c = f && location.hostname,
            h = f && (location.port || undefined),
            p = {},
            d = e.config && e.config() || {};
                    t = {
                        version: "2.0.14",
                        strip: function (e) {
                            if (e) {
                                e = e.replace(u, "");
                                var t = e.match(a);
                                t && (e = t[1])
                            } else e = "";
                            return e
                        },
                        jsEscape: function (e) {
                            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
                        },
                        createXhr: d.createXhr || function () {
                            var e, t, n;
                            if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                            if (typeof ActiveXObject != "undefined")
                                for (t = 0; t < 3; t += 1) {
                                    n = o[t];
                                    try {
                                        e = new ActiveXObject(n)
                                    } catch (r) { }
                                    if (e) {
                                        o = [n];
                                        break
                                    }
                                }
                            return e
                        },
                        parseName: function (e) {
                            var t, n, r, i = !1,
                    s = e.lastIndexOf("."),
                    o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
                            return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {
                                moduleName: t,
                                ext: n,
                                strip: i
                            }
                        },
                        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
                        useXhr: function (e, n, r, i) {
                            var s, o, u, a = t.xdRegExp.exec(e);
                            return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
                        },
                        finishLoad: function (e, n, r, i) {
                            r = n ? t.strip(r) : r, d.isBuild && (p[e] = r), i(r)
                        },
                        load: function (e, n, r, i) {
                            if (i && i.isBuild && !i.inlineText) {
                                r();
                                return
                            }
                            d.isBuild = i && i.isBuild;
                            var s = t.parseName(e),
                    o = s.moduleName + (s.ext ? "." + s.ext : ""),
                    u = n.toUrl(o),
                    a = d.useXhr || t.useXhr;
                            if (u.indexOf("empty:") === 0) {
                                r();
                                return
                            } !f || a(u, l, c, h) ? t.get(u, function (n) {
                                t.finishLoad(e, s.strip, n, r)
                            }, function (e) {
                                r.error && r.error(e)
                            }) : n([o], function (e) {
                                t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
                            })
                        },
                        write: function (e, n, r, i) {
                            if (p.hasOwnProperty(n)) {
                                var s = t.jsEscape(p[n]);
                                r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
                            }
                        },
                        writeFile: function (e, n, r, i, s) {
                            var o = t.parseName(n),
                    u = o.ext ? "." + o.ext : "",
                    a = o.moduleName + u,
                    f = r.toUrl(o.moduleName + u) + ".js";
                            t.load(a, r, function (n) {
                                var r = function (e) {
                                    return i(f, e)
                                };
                                r.asModule = function (e, t) {
                                    return i.asModule(e, f, t)
                                }, t.write(e, a, r, s)
                            }, s)
                        }
                    };
                    if (d.env === "node" || !d.env && typeof process != "undefined" && process.versions && !!process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"]) n = require.nodeRequire("fs"), t.get = function (e, t, r) {
                        try {
                            var i = n.readFileSync(e, "utf8");
                            i[0] === "﻿" && (i = i.substring(1)), t(i)
                        } catch (s) {
                            r && r(s)
                        }
                    };
                    else if (d.env === "xhr" || !d.env && t.createXhr()) t.get = function (e, n, r, i) {
                        var s = t.createXhr(),
                o;
                        s.open("GET", e, !0);
                        if (i)
                            for (o in i) i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
                        d.onXhr && d.onXhr(s, e), s.onreadystatechange = function (t) {
                            var i, o;
                            s.readyState === 4 && (i = s.status || 0, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r && r(o)) : n(s.responseText), d.onXhrComplete && d.onXhrComplete(s, e))
                        }, s.send(null)
                    };
                    else if (d.env === "rhino" || !d.env && typeof Packages != "undefined" && typeof java != "undefined") t.get = function (e, t) {
                        var n, r, i = "utf-8",
                s = new java.io.File(e),
                o = java.lang.System.getProperty("line.separator"),
                u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)),
                a = "";
                        try {
                            n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), r !== null && n.append(r);
                            while ((r = u.readLine()) !== null) n.append(o), n.append(r);
                            a = String(n.toString())
                        } finally {
                            u.close()
                        }
                        t(a)
                    };
                    else if (d.env === "xpconnect" || !d.env && typeof Components != "undefined" && Components.classes && Components.interfaces) r = Components.classes, i = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), s = "@mozilla.org/windows-registry-key;1" in r, t.get = function (e, t) {
                        var n, o, u, a = {};
                        s && (e = e.replace(/\//g, "\\")), u = new FileUtils.File(e);
                        try {
                            n = r["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream), n.init(u, 1, 0, !1), o = r["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream), o.init(n, "utf-8", n.available(), i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), o.readString(n.available(), a), o.close(), n.close(), t(a.value)
                        } catch (f) {
                            throw new Error((u && u.path || "") + ": " + f)
                        }
                    };
                    return t
                }), define("text!../audio/audiosprite.json", [], function () {
                    return '{\n  "resources": [],\n  "spritemap": {\n    "silence": {\n      "start": 97,\n      "end": 97.05224489795918,\n      "loop": false,\n      "priority": 0\n    },\n    "about_close": {\n      "start": 6,\n      "end": 6.6,\n      "loop": false,\n      "priority": 0\n    },\n    "about_open": {\n      "start": 8,\n      "end": 8.757596371882086,\n      "loop": false,\n      "priority": 0\n    },\n    "chime": {\n      "start": 10,\n      "end": 11.047528344671202,\n      "loop": false,\n      "priority": 0\n    },\n    "chimex": {\n      "start": 13,\n      "end": 13.930272108843537,\n      "loop": false,\n      "priority": 0\n    },\n    "click": {\n      "start": 15,\n      "end": 15.5,\n      "loop": false,\n      "priority": 0\n    },\n    "home1": {\n      "start": 17,\n      "end": 18.45108843537415,\n      "loop": false,\n      "priority": 0\n    },\n    "home2": {\n      "start": 20,\n      "end": 22.113560090702947,\n      "loop": false,\n      "priority": 0\n    },\n    "home3": {\n      "start": 24,\n      "end": 25.671927437641724,\n      "loop": false,\n      "priority": 0\n    },\n    "home4": {\n      "start": 27,\n      "end": 27.94637188208617,\n      "loop": false,\n      "priority": 0\n    },\n    "home5": {\n      "start": 29,\n      "end": 31.36591836734694,\n      "loop": false,\n      "priority": 0\n    },\n    "home6": {\n      "start": 33,\n      "end": 35.27126984126984,\n      "loop": false,\n      "priority": 0\n    },\n    "home7": {\n      "start": 37,\n      "end": 40.05990929705215,\n      "loop": false,\n      "priority": 0\n    },\n    "home_ambient": {\n      "start": 42,\n      "end": 62.414036281179136,\n      "loop": false,\n      "priority": 0\n    },\n    "home_signDrop": {\n      "start": 64,\n      "end": 67.9964172335601,\n      "loop": false,\n      "priority": 0\n    },\n    "letterchange": {\n      "start": 69,\n      "end": 69.6,\n      "loop": false,\n      "priority": 0\n    },\n    "rollout_arrow": {\n      "start": 71,\n      "end": 71.01997732426304,\n      "loop": false,\n      "priority": 0\n    },\n    "rollout_grid": {\n      "start": 73,\n      "end": 73.01997732426304,\n      "loop": false,\n      "priority": 0\n    },\n    "rollout_homeshare": {\n      "start": 75,\n      "end": 75.01997732426304,\n      "loop": false,\n      "priority": 0\n    },\n    "rollout_menuBtn": {\n      "start": 77,\n      "end": 77.01997732426304,\n      "loop": false,\n      "priority": 0\n    },\n    "rollover_arrow": {\n      "start": 79,\n      "end": 79.14487528344671,\n      "loop": false,\n      "priority": 0\n    },\n    "rollover_grid": {\n      "start": 81,\n      "end": 81.15390022675737,\n      "loop": false,\n      "priority": 0\n    },\n    "rollover_homeshare": {\n      "start": 83,\n      "end": 83.78698412698412,\n      "loop": false,\n      "priority": 0\n    },\n    "rollover_homesharex": {\n      "start": 85,\n      "end": 85.14487528344671,\n      "loop": false,\n      "priority": 0\n    },\n    "rollover_menuBtn": {\n      "start": 87,\n      "end": 87.78698412698412,\n      "loop": false,\n      "priority": 0\n    },\n    "shelf_close": {\n      "start": 89,\n      "end": 89.16854875283447,\n      "loop": false,\n      "priority": 0\n    },\n    "shelf_open": {\n      "start": 91,\n      "end": 91.16854875283447,\n      "loop": false,\n      "priority": 0\n    },\n    "shelf_openx": {\n      "start": 93,\n      "end": 93.15390022675737,\n      "loop": false,\n      "priority": 0\n    }\n  },\n  "autoplay": "silence"\n}'
                }), define("sound", ["howler", "text!../audio/audiosprite.json"], function (e, t) {
                    "use strict";

                    function n() {
                        this.sounds = {};
                        var e = a(t),
                n = !1;
                        if (n)
                            for (var r in e.sprite) {
                                var i = !1;
                                this.addSound(r, {
                                    urls: ["audiosprite/" + r + ".wav"],
                                    loop: i
                                })
                            } else this.addSprite("audioSprite", e)
                    }

                    function r(e) {
                        var t = this.sounds[e];
                        if (!t) return;
                        typeof t == "string" ? (t = this.sounds[t], t.play(e)) : t.play()
                    }

                    function i(e, t, n) {
                        var r = this.sounds[e];
                        if (!r) return;
                        typeof r == "string" ? (r = this.sounds[r], r.fade(e, t, n)) : r.fade(t, n)
                    }

                    function s(e) {
                        var t = this.sounds[e];
                        typeof t == "string" ? (t = this.sounds[t], t.stop(e)) : t.stop()
                    }

                    function o(e, t) {
                        var n = new Howl(t);
                        this.sounds[e] = n
                    }

                    function u(e, t) {
                        var n = t.urls,
                r = t.sprite,
                i = this.addSound(e, t);
                        for (var s in r) this.sounds[s] = e
                    }

                    function a(e) {
                        var t = JSON.parse(e),
                n = {
                    urls: [],
                    sprite: {}
                };
                        for (var r = 0; r < t.resources.length; r++) n.urls.push(t.resources[r].replace("app/", ""));
                        for (var i in t.spritemap) {
                            var s = t.spritemap[i];
                            n.sprite[i] = [s.start * 1e3, (s.end - s.start) * 1e3, !1]
                        }
                        return n
                    }
                    return n.prototype.play = r, n.prototype.fade = i, n.prototype.stop = s, n.prototype.addSound = o, n.prototype.addSprite = u, n
                });
                                    if (!window && module.exports) var window = module.exports;
                                    (function (e) {
                                        "use strict";
                                        var t = [{
                                            id: "a",
                                            gridColor: "#b2c8d3",
                                            wipeColors: ["#345e86", "#fdc76d", "#f38eae"],
                                            menuColor1: "#37618b",
                                            menuColor2: "#f48eb0",
                                            arrowsColor1: "#37618b",
                                            arrowsColor2: "#f48eb0",
                                            mobileMenuColor1: "#fdc76d",
                                            mobileMenuColor2: "#fffaed",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.27",
                                            contentColor: "#37618b",
                                            accentColor: "#fec870",
                                            title: "Carteira de Créditos",
                                            titleOffset: "0",
                                            subtitle: "37x Cartons",
                                            description: "Na administração de carteiras de crédito a aplicação de regras padrões para tratamento da inadimplência é essencial para preservação do relacionamento com clientes, ao mesmo tempo evitando abusos nos contatos para regularização de atrasos de pagamentos."
                                        }, {
                                            id: "b",
                                            gridColor: "#c95031",
                                            wipeColors: ["#f5b38c", "#65141b", "#fdc76d"],
                                            menuColor1: "#fffaeb",
                                            menuColor2: "#c95031",
                                            arrowsColor1: "#fffaeb",
                                            arrowsColor2: "#c95031",
                                            mobileMenuColor1: "#fdc76d",
                                            mobileMenuColor2: "#fffaed",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.20",
                                            contentColor: "#c95031",
                                            accentColor: "#f5b38c",
                                            title: "Régua de Cobrança",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "O princípio de réguas de cobrança estabelece sequencia de processos padrões para encaminhamento de cobrança administrativa. Nessa fase ainda não estão ativadas as ações judiciais, que oneram os custos e demandam maior tempo de realização de cobranças."
                                        }, {
                                            id: "c",
                                            gridColor: "#00b3ad",
                                            wipeColors: ["#112c3f", "#00b3ad", "#ecb1c5"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#ecb1c5",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#ecb1c5",
                                            mobileMenuColor1: "#ecb1c5",
                                            mobileMenuColor2: "#fff4d6",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.21",
                                            contentColor: "#02b1ac",
                                            accentColor: "#112c3f",
                                            title: "Ações de Cobrança",
                                            titleOffset: "-0.03",
                                            subtitle: "37x Cartons",
                                            description: "Através da definição de ações de cobrança é feita a programação de contatos para regularização de prestações em atraso, na qual pode ser aumentada a severidade processual, que pode desembocar em restrição juntos os serviços de proteção ao crédito(SPC/SERASA)."
                                        }, {
                                            id: "d",
                                            gridColor: "#b2c8d3",
                                            wipeColors: ["#b2c8d3", "#65141b", "#f38eae"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#65141b",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#65141b",
                                            mobileMenuColor1: "#f38eae",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.23",
                                            contentColor: "#65141b",
                                            accentColor: "#b2c8d3",
                                            title: "Trâmite de Ações",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Dentro do trâmite das ações de cobrança é permitido que o próprio agente cobrador possa encaminhar solicitações de acordo ou renegociações dentro dos limites definidos na política de crédito. Todos os contatos e ações executadas ou não fazem parte de dossiê de cliente, que permite avaliar a real situação no foco de Recuperação de Crédito."
                                        }, {
                                            id: "e",
                                            gridColor: "#ff897b",
                                            menuColor1: "#fbfbfb",
                                            menuColor2: "#c6d09e",
                                            arrowsColor1: "#fbfbfb",
                                            arrowsColor2: "#c6d09e",
                                            mobileMenuColor1: "#c6d09e",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.16",
                                            contentColor: "#ab422f",
                                            accentColor: "#c6d09e",
                                            title: "Relatório Gerencial",
                                            titleOffset: "-0.06",
                                            subtitle: "37x Cartons",
                                            description: "Acompanhamento personalizado que permite dar uma visão de performance de recuperação de créditos em atraso."
                                        }, {
                                            id: "f",
                                            gridColor: "#154142",
                                            wipeColors: ["#154142", "#ab422f", "#fff0c7"],
                                            menuColor1: "#8db1b1",
                                            menuColor2: "#ac4232",
                                            arrowsColor1: "#8db1b1",
                                            arrowsColor2: "#ac4232",
                                            mobileMenuColor1: "#8db1b1",
                                            mobileMenuColor2: "#fef2c9",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.15",
                                            contentColor: "#154142",
                                            accentColor: "#8db1b1",
                                            title: "Cobradoras",
                                            titleOffset: "-0.06",
                                            description: "Empresas terceirizadas utilizadas como estratégia de cobrança são gerenciadas para recuperação de crédito para qual é atribuída a responsabilidade de cobrar os contratos em atraso a ela designados."
                                        }, {
                                            id: "g",
                                            gridColor: "#959a9e",
                                            menuColor1: "#d3d5d7",
                                            menuColor2: "#221e1f",
                                            arrowsColor1: "#d3d5d7",
                                            arrowsColor2: "#221e1f",
                                            mobileMenuColor1: "#ff897b",
                                            mobileMenuColor2: "#d3d5d7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.27",
                                            contentColor: "#5b5f63",
                                            accentColor: "#ff897b",
                                            title: "Filiais de Cobrança",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Agências do Banese com todas as informações que servirão de base para execução de outras funcionalidades, como por exemplo, email à pessoa responsável pela Cobrança."
                                        }, {
                                            id: "h",
                                            gridColor: "#6d8746",
                                            wipeColors: ["#6d8746", "#6b3922", "#c95031"],
                                            menuColor1: "#c6d09e",
                                            menuColor2: "#6b3922",
                                            arrowsColor1: "#c6d09e",
                                            arrowsColor2: "#6b3922",
                                            mobileMenuColor1: "#c95031",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.24",
                                            contentColor: "#6b3922",
                                            accentColor: "#c6d09e",
                                            title: "Canal de Cobrança",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "O gerenciamento é feio através de um Canal de Cobrança, onde o usuário com permissão de acesso ao sistema pode ou não possuir alçada para conceder desconto no momento das negociações. Ex: Agência, Call Center, Jurídico, etc."
                                        }, {
                                            id: "i",
                                            gridColor: "#887942",
                                            wipeColors: ["#887942", "#fdc76d", "#ab4230"],
                                            menuColor1: "#fffaeb",
                                            menuColor2: "#f38eae",
                                            arrowsColor1: "#fffaeb",
                                            arrowsColor2: "#f38eae",
                                            mobileMenuColor1: "#fec870",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.07",
                                            contentColor: "#887942",
                                            accentColor: "#fdc76d",
                                            title: "Acompanhamento",
                                            titleOffset: "-0.06",
                                            subtitle: "37x Cartons",
                                            description: "Possibilitamos a geração de informações de acompanhamento das cobranças realizadas canais de cobrança responsáveis. Administra seus processos de Cobrança e Fecha Acordos!"
                                        }, {
                                            id: "j",
                                            gridColor: "#fdc76d",
                                            wipeColors: ["#fdc76d", "#8495af", "#112c3f"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#8495af",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#8495af",
                                            mobileMenuColor1: "#112c3f",
                                            mobileMenuColor2: "#b2c8d3",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.15",
                                            contentColor: "#112c3f",
                                            accentColor: "#fdc76d",
                                            title: "Métodos Usados",
                                            titleOffset: "0.03",
                                            subtitle: "37x Cartons",
                                            description: "Ligação Telefônica, SMS, Empresas Cobradoras Terceirizadas, Compra de Dívidas, Renegociação..."
                                        }, {
                                            id: "k",
                                            gridColor: "#112c3f",
                                            wipeColors: ["#112c3f", "#b2c8d3", "#6d8746"],
                                            menuColor1: "#b2c8d3",
                                            menuColor2: "#6d8746",
                                            arrowsColor1: "#b2c8d3",
                                            arrowsColor2: "#6d8746",
                                            mobileMenuColor1: "#6d8746",
                                            mobileMenuColor2: "#b2c8d3",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.24",
                                            contentColor: "#345e86",
                                            accentColor: "#b2c8d3",
                                            title: "Comunicação Eletrônica",
                                            titleOffset: "-0.06",
                                            subtitle: "37x Cartons",
                                            description: "A negociação de pagamento pode ser feita através dos equipamentos eletrônicos do Banco, para comunicados a clientes inadimplentes de sua dívida."
                                        }, {
                                            id: "l",
                                            gridColor: "#65141b",
                                            menuColor1: "#ffd6bc",
                                            menuColor2: "#00b3ad",
                                            arrowsColor1: "#ffd6bc",
                                            arrowsColor2: "#00b3ad",
                                            mobileMenuColor1: "#00b3ad",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.15",
                                            contentColor: "#ab422f",
                                            accentColor: "#f1955f",
                                            title: "Correspondência",
                                            titleOffset: "-0.06",
                                            subtitle: "37x Cartons",
                                            description: "Documentos padrões a serem endereçados aos clientes na forma de correspondências. Isto é, aviso que descrevem ações já realizadas pelo banco, dando ciência dos custos já assumidos pelo banco, inclusão no SPC/SERASA e Ação Judicial."
                                        }, {
                                            id: "m",
                                            gridColor: "#c95031",
                                            wipeColors: ["#6b3922", "#c95031", "#f2d1cc"],
                                            menuColor1: "#f3d0cc",
                                            menuColor2: "#c95031",
                                            arrowsColor1: "#f3d0cc",
                                            arrowsColor2: "#c95031",
                                            mobileMenuColor1: "#c95031",
                                            mobileMenuColor2: "#f3d0cc",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.33",
                                            contentColor: "#6b3922",
                                            accentColor: "#f3d0cc",
                                            title: "Índice Financeiro",
                                            titleOffset: "-0.02",
                                            subtitle: "37x Cartons",
                                            description: "Permite o cadastro e manutenção de Índice Financeiro. Após a inclusão o sistema automaticamente atualiza a cotação. É possível também a atualização de forma manual da cotação, determinando seu percentual e período de vigência."
                                        }, {
                                            id: "n",
                                            gridColor: "#8db1b1",
                                            wipeColors: ["#154142", "#6d8746", "#c95031"],
                                            menuColor1: "#dfe8e8",
                                            menuColor2: "#c95031",
                                            arrowsColor1: "#dfe8e8",
                                            arrowsColor2: "#c95031",
                                            mobileMenuColor1: "#6d8746",
                                            mobileMenuColor2: "#dfe8e8",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.27",
                                            contentColor: "#154142",
                                            accentColor: "#dfe8e8",
                                            title: "Monitoramento de Metas",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Exibe as metas alcançadas pelas Cobradoras por período de validade da meta, conforme montante de valor dos contratos recuperados pagos."
                                        }, {
                                            id: "o",
                                            gridColor: "#00b3ad",
                                            wipeColors: ["#8db1b1", "#00b3ad", "#eae7be"],
                                            menuColor1: "#eae7be",
                                            menuColor2: "#ecb1c5",
                                            arrowsColor1: "#eae7be",
                                            arrowsColor2: "#ecb1c5",
                                            mobileMenuColor1: "#122d40",
                                            mobileMenuColor2: "#eae7be",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.28",
                                            contentColor: "#00b3ad",
                                            accentColor: "#eae7be",
                                            title: "Instrumento Contratual",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Modelos de contrato para renegociação registrando cláusulas, condições e cronograma de vencimentos do contrato."
                                        }, {
                                            id: "p",
                                            gridColor: "#c6d09e",
                                            menuColor1: "#eae7be",
                                            menuColor2: "#b7a0ba",
                                            arrowsColor1: "#eae7be",
                                            arrowsColor2: "#b7a0ba",
                                            mobileMenuColor1: "#b7a0ba",
                                            mobileMenuColor2: "#fffaeb",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.19",
                                            contentColor: "#6b3922",
                                            accentColor: "#b7a0ba",
                                            title: "Redistribuição de Clientes",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Permite ao gestor realizar a redistribuição de clientes entre as cobradoras ativas no sistema"
                                        }, {
                                            id: "q",
                                            gridColor: "#00b3ad",
                                            wipeColors: ["#00b3ad", "#fdc76d", "#ff897b"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#ff897b",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#ff897b",
                                            mobileMenuColor1: "#ff897b",
                                            mobileMenuColor2: "#fff0c7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.30",
                                            contentColor: "#00b3ad",
                                            accentColor: "#fdc76d",
                                            title: "Soluções à Renegociação",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Processo de Política de Renegociação que permite o vínculo da Linha de Renegociação ao produto de crédito, complementando o conjunto de regras adotadas para uma renegociação."
                                        }, {
                                            id: "r",
                                            gridColor: "#c95031",
                                            wipeColors: ["#b2c8d3", "#fdc76d", "#345e86"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#345e86",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#345e86",
                                            mobileMenuColor1: "#345e86",
                                            mobileMenuColor2: "#fff0c7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.22",
                                            contentColor: "#345e86",
                                            accentColor: "#b2c8d3",
                                            title: "Ocorrência de Títulos",
                                            titleOffset: "-0.06",
                                            subtitle: "37x Cartons",
                                            description: "Permite a emissão de relatório com informações de contratos na fase de retorno de ocorrências no processo de protesto, ou seja, Título aceito no cartório. Conforme retorno de arquivo e com a situação de protesto devolvido, o sistema identifica os títulos que estão na situação de acordo com o filtro de pesquisa selecionado."
                                        }, {
                                            id: "s",
                                            gridColor: "#6b3922",
                                            wipeColors: ["#6b3922", "#f5b591", "#6d8746"],
                                            menuColor1: "#6b3922",
                                            menuColor2: "#fff7d8",
                                            arrowsColor1: "#6b3922",
                                            arrowsColor2: "#fff7d8",
                                            mobileMenuColor1: "#6d8746",
                                            mobileMenuColor2: "#fff7d8",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.19",
                                            contentColor: "#6b3922",
                                            accentColor: "#f5b38c",
                                            title: "Títulos Não-Processados",
                                            titleOffset: "-0.03",
                                            subtitle: "37x Cartons",
                                            description: "Permite a pesquisa e emissão de relatório com informações de contratos enviados via arquivo para execução de protesto. O cartório recebe o arquivo e processa a leitura do mesmo, conforme a identificação de alguma irregularidade de algum registro, este retorna com a informação do código(s) da(s) irregularidade(s)."
                                        }, {
                                            id: "t",
                                            gridColor: "#221e1f",
                                            wipeColors: ["#00b3ad", "#eae7be", "#84898d"],
                                            menuColor1: "#eae7be",
                                            menuColor2: "#595e61",
                                            arrowsColor1: "#eae7be",
                                            arrowsColor2: "#595e61",
                                            mobileMenuColor1: "#5b6063",
                                            mobileMenuColor2: "#eae7be",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.19",
                                            contentColor: "#5b6063",
                                            accentColor: "#eae7be",
                                            title: "Acesso ao Sistema",
                                            titleOffset: "0",
                                            subtitle: "37x Cartons",
                                            description: "O Sistema de Recuperação de Crédito será utilizado pelas áreas gestoras, gerentes das áreas de negócio (agências), usuários comuns da ARCRE, cobradoras de crédito, Call Center e diretoria, conforme suas permissões de acesso, que variam de acordo com suas necessidades e características específicas."
                                        }, {
                                            id: "u",
                                            gridColor: "#f38eae",
                                            wipeColors: ["#ecb1c5", "#00b3ad", "#fff4d6"],
                                            menuColor1: "#fff7d8",
                                            menuColor2: "#00b3ad",
                                            arrowsColor1: "#fff7d8",
                                            arrowsColor2: "#00b3ad",
                                            mobileMenuColor1: "#00b3ad",
                                            mobileMenuColor2: "#fff7d8",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.24",
                                            contentColor: "#221e1f",
                                            accentColor: "#ecb1c5",
                                            title: "Cadastros Básicos",
                                            titleOffset: "-0.05",
                                            subtitle: "37x Cartons",
                                            description: "Para o perfeito funcionamento do sistema parametrizações básicas serão realizadas que permitem a manutenção dos parâmetros globais do sistema."
                                        }, {
                                            id: "v",
                                            gridColor: "#ab422f",
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#ab422f",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#ab422f",
                                            mobileMenuColor1: "#ab422f",
                                            mobileMenuColor2: "#fff0c7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.26",
                                            contentColor: "#345e86",
                                            accentColor: "#8295af",
                                            title: "Política de Cobrança",
                                            titleOffset: "-0.02",
                                            subtitle: "37x Cartons",
                                            description: "São cadastrados alguns parâmetros globais do sistema utilizados para o processo de recuperação do crédito, tornando o processo de recuperação mais eficaz."
                                        }, {
                                            id: "w",
                                            gridColor: "#221e1f",
                                            wipeColors: ["#221e1f", "#b7a0ba", "#fff4d6"],
                                            menuColor1: "#d9be21",
                                            menuColor2: "#b7a0ba",
                                            arrowsColor1: "#d9be21",
                                            arrowsColor2: "#b7a0ba",
                                            mobileMenuColor1: "#d9be21",
                                            mobileMenuColor2: "#814e57",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.37",
                                            contentColor: "#221e1f",
                                            accentColor: "#b7a0ba",
                                            title: "Wiccan spellbook",
                                            titleOffset: "-0.04",
                                            subtitle: "37x Cartons",
                                            description: "It will behoove you to find favor with the goddess. May she bless your fleece with many zippered pockets."
                                        }, {
                                            id: "x",
                                            gridColor: "#ecb1c5",
                                            wipeColors: ["#ecb1c5", "#fff0c7", "#221e1f"],
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#221e1f",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#221e1f",
                                            mobileMenuColor1: "#b2c8d3",
                                            mobileMenuColor2: "#fff0c7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.28",
                                            contentColor: "#221e1f",
                                            accentColor: "#ecb1c5",
                                            title: "Execução",
                                            titleOffset: "0.02",
                                            subtitle: "37x Cartons",
                                            description: "De acordo com os perfis de usuários definido nos PROCEDIMENTOS DE COBRANÇA DE INADIMPLENTES são designadas ações a serem feitas de acordo com as características de saldo e maior tempo de atraso da dívida."
                                        }, {
                                            id: "y",
                                            gridColor: "#b2c8d3",
                                            wipeColors: ["#b2c8d3", "#d78936", "#345e86"],
                                            menuColor1: "#345e86",
                                            menuColor2: "#d78936",
                                            arrowsColor1: "#345e86",
                                            arrowsColor2: "#d78936",
                                            mobileMenuColor1: "#112c3f",
                                            mobileMenuColor2: "#d78936",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.26",
                                            contentColor: "#345e86",
                                            accentColor: "#b2c8d3",
                                            title: "Cobrança",
                                            titleOffset: "0",
                                            subtitle: "37x Cartons",
                                            description: "Visualizando informações do clientes e negociando contratos em atraso."
                                        }, {
                                            id: "z",
                                            gridColor: "#8495af",
                                            menuColor1: "#fff0c7",
                                            menuColor2: "#c64f30",
                                            arrowsColor1: "#fff0c7",
                                            arrowsColor2: "#c64f30",
                                            mobileMenuColor1: "#f1955f",
                                            mobileMenuColor2: "#fff0c7",
                                            imageCenter: "0.5",
                                            underlineWidth: "0.23",
                                            contentColor: "#c64f30",
                                            accentColor: "#f1955f",
                                            title: "Relatório Operacional",
                                            titleOffset: "0",
                                            subtitle: "37x Cartons",
                                            description: "Acompanhamento personalizado que permite dar uma visão operacional do trabalho de COBRANÇA."
                                        }];
                                        e.siteSettings = {
                                            alphabet: t
                                        }
                                    })(window), define("settings", function () { }),
    function (e) {
        "use strict";

        function t() {
            this.currSlide = null, this.currId = null
        }

        function n(e, t) {
            this.slides = [], this.innerEl = e, this.innerEl.className = "slideshowInner";
            var n = this.innerEl.children,
                r;
            for (var i = 0; i < n.length; i++) this.slides[i] = {}, this.slides[i].index = i, r = n[i], this.slides[i].el = r, this.slides[i].id = r.id, r.className = "slide", t && (this.slides[i].classObj = new t(this.slides[i]))
        }

        function r(e, t, n) {
            this.slides = t, this.innerEl = document.createElement("div"), this.innerEl.className = "slideshowInner", e.appendChild(this.innerEl);
            for (var r = 0; r < t.length; r++) this.slides[r].index = r, this.createSection(t[r]), n && (this.slides[r].classObj = new n(this.slides[r]))
        }

        function i(e) {
            if (e == null) return;
            typeof e == "number" && (e = this.slides[e].id);
            var t = this.getSlideById(e);
            if (!t || this.currSlide == t.index) return;
            this.currSlide !== null && this.slides[this.currSlide] && (this.slides[this.currSlide].el.style.display = "none", this.slides[this.currSlide].classObj && this.slides[this.currSlide].classObj.hide && this.slides[this.currSlide].classObj.hide()), t.el.style.display = "block", this.currSlide = t.index, this.currId = t.id, t.classObj && t.classObj.resize && t.classObj.resize(this.w, this.h), t.classObj && t.classObj.show && t.classObj.show();
            var n = -t.index * this.h;
            this.innerEl.style.top = n + "px"
        }

        function s(e) {
            for (var t = 0; t < this.slides.length; t++)
                if (this.slides[t].id == e) return this.slides[t];
            return !1
        }

        function o(e) {
            var t = document.createElement("div");
            t.id = e.id, t.className = "slide", this.innerEl.appendChild(t), e.el = t
        }

        function u(e, t) {
            this.w = e, this.h = t;
            var n = -this.currSlide * this.h;
            this.innerEl.style.top = n + "px";
            for (var r = 0; r < this.slides.length; r++) this.slides[r].el.style.top = this.slides[r].index * t + "px";
            this.slides[this.currSlide] && this.slides[this.currSlide].classObj && this.slides[this.currSlide].classObj.resize && this.slides[this.currSlide].classObj.resize(e, t)
        }
        t.prototype.buildFromDOM = n, t.prototype.buildFromJSON = r, t.prototype.gotoSlide = i, t.prototype.getSlideById = s, t.prototype.createSection = o, t.prototype.resize = u, e.Slideshow = t
    } (window), define("slideshow", function () { });
                                    var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
                                    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
                                        "use strict";
                                        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
                                            var r = function (e) {
                                                var t, n = [],
                            r = e.length;
                                                for (t = 0; t !== r; n.push(e[t++]));
                                                return n
                                            },
                    i = function (e, t, r) {
                        n.call(this, e, t, r), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = i.prototype.render
                    },
                    s = 1e-10,
                    o = n._internals,
                    u = o.isSelector,
                    a = o.isArray,
                    f = i.prototype = n.to({}, .1, {}),
                    l = [];
                                            i.version = "1.17.0", f.constructor = i, f.kill()._gc = !1, i.killTweensOf = i.killDelayedCallsTo = n.killTweensOf, i.getTweensOf = n.getTweensOf, i.lagSmoothing = n.lagSmoothing, i.ticker = n.ticker, i.render = n.render, f.invalidate = function () {
                                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), n.prototype.invalidate.call(this)
                                            }, f.updateTo = function (e, t) {
                                                var r, i = this.ratio,
                        s = this.vars.immediateRender || e.immediateRender;
                                                t && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                                                for (r in e) this.vars[r] = e[r];
                                                if (this._initted || s)
                                                    if (t) this._initted = !1, s && this.render(0, !0, !0);
                                                    else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && n._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                                                        var o = this._time;
                                                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                                                    } else if (this._time > 0 || s) {
                                                        this._initted = !1, this._init();
                                                        for (var u, a = 1 / (1 - i), f = this._firstPT; f; ) u = f.s + f.c, f.c *= a, f.s = u - f.c, f = f._next
                                                    }
                                                return this
                                            }, f.render = function (e, t, n) {
                                                this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                                                var r, i, u, a, f, l, c, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        v = this._totalTime,
                        m = this._cycle,
                        g = this._duration,
                        y = this._rawPrevTime;
                                                if (e >= p ? (this._totalTime = p, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = g, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === g && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > y || y === s) && y !== e && (n = !0, y > s && (i = "onReverseComplete")), this._rawPrevTime = h = !t || e || y === e ? e : s)) : 1e-7 > e ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== v || 0 === g && y > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === g && (this._initted || !this.vars.lazy || n) && (y >= 0 && (n = !0), this._rawPrevTime = h = !t || e || y === e ? e : s)), this._initted || (n = !0)) : (this._totalTime = this._time = e, 0 !== this._repeat && (a = g + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && this._cycle--, this._time = this._totalTime - this._cycle * a, this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time), this._time > g ? this._time = g : 0 > this._time && (this._time = 0)), this._easeType ? (f = this._time / g, l = this._easeType, c = this._easePower, (1 === l || 3 === l && f >= .5) && (f = 1 - f), 3 === l && (f *= 2), 1 === c ? f *= f : 2 === c ? f *= f * f : 3 === c ? f *= f * f * f : 4 === c && (f *= f * f * f * f), this.ratio = 1 === l ? 1 - f : 2 === l ? f : .5 > this._time / g ? f / 2 : 1 - f / 2) : this.ratio = this._ease.getRatio(this._time / g)), d === this._time && !n && m === this._cycle) return v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")), void 0;
                                                if (!this._initted) {
                                                    if (this._init(), !this._initted || this._gc) return;
                                                    if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = d, this._totalTime = v, this._rawPrevTime = y, this._cycle = m, o.lazyTweens.push(this), this._lazy = [e, t], void 0;
                                                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / g) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                                }
                                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== d && e >= 0 && (this._active = !0), 0 === v && (2 === this._initted && e > 0 && this._init(), this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === g) && (t || this._callback("onStart"))), u = this._firstPT; u; ) u.f ? u.t[u.p](u.c * this.ratio + u.s) : u.t[u.p] = u.c * this.ratio + u.s, u = u._next;
                                                this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._totalTime !== v || r) && this._callback("onUpdate")), this._cycle !== m && (t || this._gc || this.vars.onRepeat && this._callback("onRepeat")), i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this._callback(i), 0 === g && this._rawPrevTime === s && h !== s && (this._rawPrevTime = 0))
                                            }, i.to = function (e, t, n) {
                                                return new i(e, t, n)
                                            }, i.from = function (e, t, n) {
                                                return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new i(e, t, n)
                                            }, i.fromTo = function (e, t, n, r) {
                                                return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new i(e, t, r)
                                            }, i.staggerTo = i.allTo = function (e, t, s, o, f, c, h) {
                                                o = o || 0;
                                                var p, d, v, m, g = s.delay || 0,
                        y = [],
                        b = function () {
                            s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), f.apply(h || s.callbackScope || this, c || l)
                        };
                                                for (a(e) || ("string" == typeof e && (e = n.selector(e) || e), u(e) && (e = r(e))), e = e || [], 0 > o && (e = r(e), e.reverse(), o *= -1), p = e.length - 1, v = 0; p >= v; v++) {
                                                    d = {};
                                                    for (m in s) d[m] = s[m];
                                                    d.delay = g, v === p && f && (d.onComplete = b), y[v] = new i(e[v], t, d), g += o
                                                }
                                                return y
                                            }, i.staggerFrom = i.allFrom = function (e, t, n, r, s, o, u) {
                                                return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, i.staggerTo(e, t, n, r, s, o, u)
                                            }, i.staggerFromTo = i.allFromTo = function (e, t, n, r, s, o, u, a) {
                                                return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, i.staggerTo(e, t, r, s, o, u, a)
                                            }, i.delayedCall = function (e, t, n, r, s) {
                                                return new i(t, 0, {
                                                    delay: e,
                                                    onComplete: t,
                                                    onCompleteParams: n,
                                                    callbackScope: r,
                                                    onReverseComplete: t,
                                                    onReverseCompleteParams: n,
                                                    immediateRender: !1,
                                                    useFrames: s,
                                                    overwrite: 0
                                                })
                                            }, i.set = function (e, t) {
                                                return new i(e, 0, t)
                                            }, i.isTweening = function (e) {
                                                return n.getTweensOf(e, !0).length > 0
                                            };
                                            var c = function (e, t) {
                                                for (var r = [], i = 0, s = e._first; s; ) s instanceof n ? r[i++] = s : (t && (r[i++] = s), r = r.concat(c(s, t)), i = r.length), s = s._next;
                                                return r
                                            },
                    h = i.getAllTweens = function (t) {
                        return c(e._rootTimeline, t).concat(c(e._rootFramesTimeline, t))
                    };
                                            i.killAll = function (e, n, r, i) {
                                                null == n && (n = !0), null == r && (r = !0);
                                                var s, o, u, a = h(0 != i),
                        f = a.length,
                        l = n && r && i;
                                                for (u = 0; f > u; u++) o = a[u], (l || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && (e ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                                            }, i.killChildTweensOf = function (e, t) {
                                                if (null != e) {
                                                    var s, f, l, c, h, p = o.tweenLookup;
                                                    if ("string" == typeof e && (e = n.selector(e) || e), u(e) && (e = r(e)), a(e))
                                                        for (c = e.length; --c > -1; ) i.killChildTweensOf(e[c], t);
                                                    else {
                                                        s = [];
                                                        for (l in p)
                                                            for (f = p[l].target.parentNode; f; ) f === e && (s = s.concat(p[l].tweens)), f = f.parentNode;
                                                        for (h = s.length, c = 0; h > c; c++) t && s[c].totalTime(s[c].totalDuration()), s[c]._enabled(!1, !1)
                                                    }
                                                }
                                            };
                                            var p = function (e, n, r, i) {
                                                n = n !== !1, r = r !== !1, i = i !== !1;
                                                for (var s, o, u = h(i), a = n && r && i, f = u.length; --f > -1; ) o = u[f], (a || o instanceof t || (s = o.target === o.vars.onComplete) && r || n && !s) && o.paused(e)
                                            };
                                            return i.pauseAll = function (e, t, n) {
                                                p(!0, e, t, n)
                                            }, i.resumeAll = function (e, t, n) {
                                                p(!1, e, t, n)
                                            }, i.globalTimeScale = function (t) {
                                                var r = e._rootTimeline,
                        i = n.ticker.time;
                                                return arguments.length ? (t = t || s, r._startTime = i - (i - r._startTime) * r._timeScale / t, r = e._rootFramesTimeline, i = n.ticker.frame, r._startTime = i - (i - r._startTime) * r._timeScale / t, r._timeScale = e._rootTimeline._timeScale = t, t) : r._timeScale
                                            }, f.progress = function (e) {
                                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                                            }, f.totalProgress = function (e) {
                                                return arguments.length ? this.totalTime(this.totalDuration() * e, !1) : this._totalTime / this.totalDuration()
                                            }, f.time = function (e, t) {
                                                return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                                            }, f.duration = function (t) {
                                                return arguments.length ? e.prototype.duration.call(this, t) : this._duration
                                            }, f.totalDuration = function (e) {
                                                return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                                            }, f.repeat = function (e) {
                                                return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                                            }, f.repeatDelay = function (e) {
                                                return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                                            }, f.yoyo = function (e) {
                                                return arguments.length ? (this._yoyo = e, this) : this._yoyo
                                            }, i
                                        }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
                                            var r = function (e) {
                                                t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                                                var n, r, i = this.vars;
                                                for (r in i) n = i[r], a(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
                                                a(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
                                            },
                    i = 1e-10,
                    s = n._internals,
                    o = r._internals = {},
                    u = s.isSelector,
                    a = s.isArray,
                    f = s.lazyTweens,
                    l = s.lazyRender,
                    c = [],
                    h = _gsScope._gsDefine.globals,
                    p = function (e) {
                        var t, n = {};
                        for (t in e) n[t] = e[t];
                        return n
                    },
                    d = o.pauseCallback = function (e, t, n, r) {
                        var s, o = e._timeline,
                            u = o._totalTime,
                            a = e._startTime,
                            f = 0 > e._rawPrevTime || 0 === e._rawPrevTime && o._reversed,
                            l = f ? 0 : i,
                            h = f ? i : 0;
                        if (t || !this._forcingPlayhead) {
                            for (o.pause(a), s = e._prev; s && s._startTime === a; ) s._rawPrevTime = h, s = s._prev;
                            for (s = e._next; s && s._startTime === a; ) s._rawPrevTime = l, s = s._next;
                            t && t.apply(r || o.vars.callbackScope || o, n || c), (this._forcingPlayhead || !o._paused) && o.seek(u)
                        }
                    },
                    v = function (e) {
                        var t, n = [],
                            r = e.length;
                        for (t = 0; t !== r; n.push(e[t++]));
                        return n
                    },
                    m = r.prototype = new t;
                                            return r.version = "1.17.0", m.constructor = r, m.kill()._gc = m._forcingPlayhead = !1, m.to = function (e, t, r, i) {
                                                var s = r.repeat && h.TweenMax || n;
                                                return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
                                            }, m.from = function (e, t, r, i) {
                                                return this.add((r.repeat && h.TweenMax || n).from(e, t, r), i)
                                            }, m.fromTo = function (e, t, r, i, s) {
                                                var o = i.repeat && h.TweenMax || n;
                                                return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
                                            }, m.staggerTo = function (e, t, i, s, o, a, f, l) {
                                                var c, h = new r({
                                                    onComplete: a,
                                                    onCompleteParams: f,
                                                    callbackScope: l,
                                                    smoothChildTiming: this.smoothChildTiming
                                                });
                                                for ("string" == typeof e && (e = n.selector(e) || e), e = e || [], u(e) && (e = v(e)), s = s || 0, 0 > s && (e = v(e), e.reverse(), s *= -1), c = 0; e.length > c; c++) i.startAt && (i.startAt = p(i.startAt)), h.to(e[c], t, p(i), c * s);
                                                return this.add(h, o)
                                            }, m.staggerFrom = function (e, t, n, r, i, s, o, u) {
                                                return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
                                            }, m.staggerFromTo = function (e, t, n, r, i, s, o, u, a) {
                                                return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(e, t, r, i, s, o, u, a)
                                            }, m.call = function (e, t, r, i) {
                                                return this.add(n.delayedCall(0, e, t, r), i)
                                            }, m.set = function (e, t, r) {
                                                return r = this._parseTimeOrLabel(r, 0, !0), null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
                                            }, r.exportRoot = function (e, t) {
                                                e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                                                var i, s, o = new r(e),
                        u = o._timeline;
                                                for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i; ) s = i._next, t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
                                                return u.add(o, 0), o
                                            }, m.add = function (i, s, o, u) {
                                                var f, l, c, h, p, d;
                                                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
                                                    if (i instanceof Array || i && i.push && a(i)) {
                                                        for (o = o || "normal", u = u || 0, f = s, l = i.length, c = 0; l > c; c++) a(h = i[c]) && (h = new r({
                                                            tweens: h
                                                        })), this.add(h, f), "string" != typeof h && "function" != typeof h && ("sequence" === o ? f = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), f += u;
                                                        return this._uncache(!0)
                                                    }
                                                    if ("string" == typeof i) return this.addLabel(i, s);
                                                    if ("function" != typeof i) throw "Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                                                    i = n.delayedCall(0, i)
                                                }
                                                if (t.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                                                    for (p = this, d = p.rawTime() > i._startTime; p._timeline; ) d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                                                return this
                                            }, m.remove = function (t) {
                                                if (t instanceof e) return this._remove(t, !1);
                                                if (t instanceof Array || t && t.push && a(t)) {
                                                    for (var n = t.length; --n > -1; ) this.remove(t[n]);
                                                    return this
                                                }
                                                return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
                                            }, m._remove = function (e, n) {
                                                t.prototype._remove.call(this, e, n);
                                                var r = this._last;
                                                return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                                            }, m.append = function (e, t) {
                                                return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
                                            }, m.insert = m.insertMultiple = function (e, t, n, r) {
                                                return this.add(e, t || 0, n, r)
                                            }, m.appendMultiple = function (e, t, n, r) {
                                                return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
                                            }, m.addLabel = function (e, t) {
                                                return this._labels[e] = this._parseTimeOrLabel(t), this
                                            }, m.addPause = function (e, t, r, i) {
                                                var s = n.delayedCall(0, d, ["{self}", t, r, i], this);
                                                return s.data = "isPause", this.add(s, e)
                                            }, m.removeLabel = function (e) {
                                                return delete this._labels[e], this
                                            }, m.getLabelTime = function (e) {
                                                return null != this._labels[e] ? this._labels[e] : -1
                                            }, m._parseTimeOrLabel = function (t, n, r, i) {
                                                var s;
                                                if (i instanceof e && i.timeline === this) this.remove(i);
                                                else if (i && (i instanceof Array || i.push && a(i)))
                                                    for (s = i.length; --s > -1; ) i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
                                                if ("string" == typeof n) return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
                                                if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
                                                else {
                                                    if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                                                    n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
                                                }
                                                return Number(t) + n
                                            }, m.seek = function (e, t) {
                                                return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
                                            }, m.stop = function () {
                                                return this.paused(!0)
                                            }, m.gotoAndPlay = function (e, t) {
                                                return this.play(e, t)
                                            }, m.gotoAndStop = function (e, t) {
                                                return this.pause(e, t)
                                            }, m.render = function (e, t, n) {
                                                this._gc && this._enabled(!0, !1);
                                                var r, s, o, u, a, c = this._dirty ? this.totalDuration() : this._totalDuration,
                        h = this._time,
                        p = this._startTime,
                        d = this._timeScale,
                        v = this._paused;
                                                if (e >= c) this._totalTime = this._time = c, this._reversed || this._hasPausedChild() || (s = !0, u = "onComplete", a = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (a = !0, this._rawPrevTime > i && (u = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = c + 1e-4;
                                                else if (1e-7 > e)
                                                    if (this._totalTime = this._time = 0, (0 !== h || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (u = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (a = s = !0, u = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (a = !0), this._rawPrevTime = e;
                                                    else {
                                                        if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, 0 === e && s)
                                                            for (r = this._first; r && 0 === r._startTime; ) r._duration || (s = !1), r = r._next;
                                                        e = 0, this._initted || (a = !0)
                                                    }
                                                else this._totalTime = this._time = this._rawPrevTime = e;
                                                if (this._time !== h && this._first || n || a) {
                                                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== h && e > 0 && (this._active = !0), 0 === h && this.vars.onStart && 0 !== this._time && (t || this._callback("onStart")), this._time >= h)
                                                        for (r = this._first; r && (o = r._next, !this._paused || v); ) (r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
                                                    else
                                                        for (r = this._last; r && (o = r._prev, !this._paused || v); ) (r._active || h >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
                                                    this._onUpdate && (t || (f.length && l(), this._callback("onUpdate"))), u && (this._gc || (p === this._startTime || d !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (s && (f.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[u] && this._callback(u)))
                                                }
                                            }, m._hasPausedChild = function () {
                                                for (var e = this._first; e; ) {
                                                    if (e._paused || e instanceof r && e._hasPausedChild()) return !0;
                                                    e = e._next
                                                }
                                                return !1
                                            }, m.getChildren = function (e, t, r, i) {
                                                i = i || -9999999999;
                                                for (var s = [], o = this._first, u = 0; o; ) i > o._startTime || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
                                                return s
                                            }, m.getTweensOf = function (e, t) {
                                                var r, i, s = this._gc,
                        o = [],
                        u = 0;
                                                for (s && this._enabled(!0, !0), r = n.getTweensOf(e), i = r.length; --i > -1; ) (r[i].timeline === this || t && this._contains(r[i])) && (o[u++] = r[i]);
                                                return s && this._enabled(!1, !0), o
                                            }, m.recent = function () {
                                                return this._recent
                                            }, m._contains = function (e) {
                                                for (var t = e.timeline; t; ) {
                                                    if (t === this) return !0;
                                                    t = t.timeline
                                                }
                                                return !1
                                            }, m.shiftChildren = function (e, t, n) {
                                                n = n || 0;
                                                for (var r, i = this._first, s = this._labels; i; ) i._startTime >= n && (i._startTime += e), i = i._next;
                                                if (t)
                                                    for (r in s) s[r] >= n && (s[r] += e);
                                                return this._uncache(!0)
                                            }, m._kill = function (e, t) {
                                                if (!e && !t) return this._enabled(!1, !1);
                                                for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length, i = !1; --r > -1; ) n[r]._kill(e, t) && (i = !0);
                                                return i
                                            }, m.clear = function (e) {
                                                var t = this.getChildren(!1, !0, !0),
                        n = t.length;
                                                for (this._time = this._totalTime = 0; --n > -1; ) t[n]._enabled(!1, !1);
                                                return e !== !1 && (this._labels = {}), this._uncache(!0)
                                            }, m.invalidate = function () {
                                                for (var t = this._first; t; ) t.invalidate(), t = t._next;
                                                return e.prototype.invalidate.call(this)
                                            }, m._enabled = function (e, n) {
                                                if (e === this._gc)
                                                    for (var r = this._first; r; ) r._enabled(e, !0), r = r._next;
                                                return t.prototype._enabled.call(this, e, n)
                                            }, m.totalTime = function () {
                                                this._forcingPlayhead = !0;
                                                var t = e.prototype.totalTime.apply(this, arguments);
                                                return this._forcingPlayhead = !1, t
                                            }, m.duration = function (e) {
                                                return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
                                            }, m.totalDuration = function (e) {
                                                if (!arguments.length) {
                                                    if (this._dirty) {
                                                        for (var t, n, r = 0, i = this._last, s = 999999999999; i; ) t = i._prev, i._dirty && i.totalDuration(), i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime, 0 > i._startTime && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = t;
                                                        this._duration = this._totalDuration = r, this._dirty = !1
                                                    }
                                                    return this._totalDuration
                                                }
                                                return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
                                            }, m.paused = function (t) {
                                                if (!t)
                                                    for (var n = this._first, r = this._time; n; ) n._startTime === r && "isPause" === n.data && (n._rawPrevTime = 0), n = n._next;
                                                return e.prototype.paused.apply(this, arguments)
                                            }, m.usesFrames = function () {
                                                for (var t = this._timeline; t._timeline; ) t = t._timeline;
                                                return t === e._rootFramesTimeline
                                            }, m.rawTime = function () {
                                                return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                                            }, r
                                        }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (e, t, n) {
                                            var r = function (t) {
                                                e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                                            },
                    i = 1e-10,
                    s = t._internals,
                    o = s.lazyTweens,
                    u = s.lazyRender,
                    a = new n(null, null, 1, 0),
                    f = r.prototype = new e;
                                            return f.constructor = r, f.kill()._gc = !1, r.version = "1.17.0", f.invalidate = function () {
                                                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
                                            }, f.addCallback = function (e, n, r, i) {
                                                return this.add(t.delayedCall(0, e, r, i), n)
                                            }, f.removeCallback = function (e, t) {
                                                if (e)
                                                    if (null == t) this._kill(null, e);
                                                    else
                                                        for (var n = this.getTweensOf(e, !1), r = n.length, i = this._parseTimeOrLabel(t); --r > -1; ) n[r]._startTime === i && n[r]._enabled(!1, !1);
                                                return this
                                            }, f.removePause = function (t) {
                                                return this.removeCallback(e._internals.pauseCallback, t)
                                            }, f.tweenTo = function (e, n) {
                                                n = n || {};
                                                var r, i, s, o = {
                                                    ease: a,
                                                    useFrames: this.usesFrames(),
                                                    immediateRender: !1
                                                };
                                                for (i in n) o[i] = n[i];
                                                return o.time = this._parseTimeOrLabel(e), r = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new t(this, r, o), o.onStart = function () {
                                                    s.target.paused(!0), s.vars.time !== s.target.time() && r === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), n.onStart && s._callback("onStart")
                                                }, s
                                            }, f.tweenFromTo = function (e, t, n) {
                                                n = n || {}, e = this._parseTimeOrLabel(e), n.startAt = {
                                                    onComplete: this.seek,
                                                    onCompleteParams: [e],
                                                    callbackScope: this
                                                }, n.immediateRender = n.immediateRender !== !1;
                                                var r = this.tweenTo(t, n);
                                                return r.duration(Math.abs(r.vars.time - e) / this._timeScale || .001)
                                            }, f.render = function (e, t, n) {
                                                this._gc && this._enabled(!0, !1);
                                                var r, s, a, f, l, c, h = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._duration,
                        d = this._time,
                        v = this._totalTime,
                        m = this._startTime,
                        g = this._timeScale,
                        y = this._rawPrevTime,
                        b = this._paused,
                        w = this._cycle;
                                                if (e >= h) this._locked || (this._totalTime = h, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, f = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === e || 0 > y || y === i) && y !== e && this._first && (l = !0, y > i && (f = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = p, e = p + 1e-4);
                                                else if (1e-7 > e)
                                                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== d || 0 === p && y !== i && (y > 0 || 0 > e && y >= 0) && !this._locked) && (f = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, f = "onReverseComplete") : y >= 0 && this._first && (l = !0), this._rawPrevTime = e;
                                                    else {
                                                        if (this._rawPrevTime = p || !t || e || this._rawPrevTime === e ? e : i, 0 === e && s)
                                                            for (r = this._first; r && 0 === r._startTime; ) r._duration || (s = !1), r = r._next;
                                                        e = 0, this._initted || (l = !0)
                                                    }
                                                else 0 === p && 0 > y && (l = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (c = p + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = p - this._time), this._time > p ? (this._time = p, e = p + 1e-4) : 0 > this._time ? this._time = e = 0 : e = this._time));
                                                if (this._cycle !== w && !this._locked) {
                                                    var E = this._yoyo && 0 !== (1 & w),
                            S = E === (this._yoyo && 0 !== (1 & this._cycle)),
                            x = this._totalTime,
                            T = this._cycle,
                            N = this._rawPrevTime,
                            C = this._time;
                                                    if (this._totalTime = w * p, w > this._cycle ? E = !E : this._totalTime += p, this._time = d, this._rawPrevTime = 0 === p ? y - 1e-4 : y, this._cycle = w, this._locked = !0, d = E ? 0 : p, this.render(d, t, 0 === p), t || this._gc || this.vars.onRepeat && this._callback("onRepeat"), S && (d = E ? p + 1e-4 : -0.0001, this.render(d, !0, !1)), this._locked = !1, this._paused && !b) return;
                                                    this._time = C, this._totalTime = x, this._cycle = T, this._rawPrevTime = N
                                                }
                                                if (!(this._time !== d && this._first || n || l)) return v !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")), void 0;
                                                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== v && e > 0 && (this._active = !0), 0 === v && this.vars.onStart && 0 !== this._totalTime && (t || this._callback("onStart")), this._time >= d)
                                                    for (r = this._first; r && (a = r._next, !this._paused || b); ) (r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = a;
                                                else
                                                    for (r = this._last; r && (a = r._prev, !this._paused || b); ) (r._active || d >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = a;
                                                this._onUpdate && (t || (o.length && u(), this._callback("onUpdate"))), f && (this._locked || this._gc || (m === this._startTime || g !== this._timeScale) && (0 === this._time || h >= this.totalDuration()) && (s && (o.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[f] && this._callback(f)))
                                            }, f.getActive = function (e, t, n) {
                                                null == e && (e = !0), null == t && (t = !0), null == n && (n = !1);
                                                var r, i, s = [],
                        o = this.getChildren(e, t, n),
                        u = 0,
                        a = o.length;
                                                for (r = 0; a > r; r++) i = o[r], i.isActive() && (s[u++] = i);
                                                return s
                                            }, f.getLabelAfter = function (e) {
                                                e || 0 !== e && (e = this._time);
                                                var t, n = this.getLabelsArray(),
                        r = n.length;
                                                for (t = 0; r > t; t++)
                                                    if (n[t].time > e) return n[t].name;
                                                return null
                                            }, f.getLabelBefore = function (e) {
                                                null == e && (e = this._time);
                                                for (var t = this.getLabelsArray(), n = t.length; --n > -1; )
                                                    if (e > t[n].time) return t[n].name;
                                                return null
                                            }, f.getLabelsArray = function () {
                                                var e, t = [],
                        n = 0;
                                                for (e in this._labels) t[n++] = {
                                                    time: this._labels[e],
                                                    name: e
                                                };
                                                return t.sort(function (e, t) {
                                                    return e.time - t.time
                                                }), t
                                            }, f.progress = function (e, t) {
                                                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
                                            }, f.totalProgress = function (e, t) {
                                                return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
                                            }, f.totalDuration = function (t) {
                                                return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                                            }, f.time = function (e, t) {
                                                return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
                                            }, f.repeat = function (e) {
                                                return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
                                            }, f.repeatDelay = function (e) {
                                                return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
                                            }, f.yoyo = function (e) {
                                                return arguments.length ? (this._yoyo = e, this) : this._yoyo
                                            }, f.currentLabel = function (e) {
                                                return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
                                            }, r
                                        }, !0),
            function () {
                var e = 180 / Math.PI,
                    t = [],
                    n = [],
                    r = [],
                    i = {},
                    s = _gsScope._gsDefine.globals,
                    o = function (e, t, n, r) {
                        this.a = e, this.b = t, this.c = n, this.d = r, this.da = r - e, this.ca = n - e, this.ba = t - e
                    },
                    u = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    a = function (e, t, n, r) {
                        var i = {
                            a: e
                        },
                            s = {},
                            o = {},
                            u = {
                                c: r
                            },
                            a = (e + t) / 2,
                            f = (t + n) / 2,
                            l = (n + r) / 2,
                            c = (a + f) / 2,
                            h = (f + l) / 2,
                            p = (h - c) / 8;
                        return i.b = a + (e - a) / 4, s.b = c + p, i.c = s.a = (i.b + s.b) / 2, s.c = o.a = (c + h) / 2, o.b = h - p, u.b = l + (r - l) / 4, o.c = u.a = (o.b + u.b) / 2, [i, s, o, u]
                    },
                    f = function (e, i, s, o, u) {
                        var f, l, c, h, p, d, v, m, g, y, b, w, E, S = e.length - 1,
                            x = 0,
                            T = e[0].a;
                        for (f = 0; S > f; f++) p = e[x], l = p.a, c = p.d, h = e[x + 1].d, u ? (b = t[f], w = n[f], E = .25 * (w + b) * i / (o ? .5 : r[f] || .5), d = c - (c - l) * (o ? .5 * i : 0 !== b ? E / b : 0), v = c + (h - c) * (o ? .5 * i : 0 !== w ? E / w : 0), m = c - (d + ((v - d) * (3 * b / (b + w) + .5) / 4 || 0))) : (d = c - .5 * (c - l) * i, v = c + .5 * (h - c) * i, m = c - (d + v) / 2), d += m, v += m, p.c = g = d, p.b = 0 !== f ? T : T = p.a + .6 * (p.c - p.a), p.da = c - l, p.ca = g - l, p.ba = T - l, s ? (y = a(l, T, g, c), e.splice(x, 1, y[0], y[1], y[2], y[3]), x += 4) : x++, T = v;
                        p = e[x], p.b = T, p.c = T + .4 * (p.d - T), p.da = p.d - p.a, p.ca = p.c - p.a, p.ba = T - p.a, s && (y = a(p.a, T, p.c, p.d), e.splice(x, 1, y[0], y[1], y[2], y[3]))
                    },
                    l = function (e, r, i, s) {
                        var u, a, f, l, c, h, p = [];
                        if (s)
                            for (e = [s].concat(e), a = e.length; --a > -1; ) "string" == typeof (h = e[a][r]) && "=" === h.charAt(1) && (e[a][r] = s[r] + Number(h.charAt(0) + h.substr(2)));
                        if (u = e.length - 2, 0 > u) return p[0] = new o(e[0][r], 0, 0, e[-1 > u ? 0 : 1][r]), p;
                        for (a = 0; u > a; a++) f = e[a][r], l = e[a + 1][r], p[a] = new o(f, 0, 0, l), i && (c = e[a + 2][r], t[a] = (t[a] || 0) + (l - f) * (l - f), n[a] = (n[a] || 0) + (c - l) * (c - l));
                        return p[a] = new o(e[a][r], 0, 0, e[a + 1][r]), p
                    },
                    c = function (e, s, o, a, c, h) {
                        var p, d, v, m, g, y, b, w, E = {},
                            S = [],
                            x = h || e[0];
                        c = "string" == typeof c ? "," + c + "," : u, null == s && (s = 1);
                        for (d in e[0]) S.push(d);
                        if (e.length > 1) {
                            for (w = e[e.length - 1], b = !0, p = S.length; --p > -1; )
                                if (d = S[p], Math.abs(x[d] - w[d]) > .05) {
                                    b = !1;
                                    break
                                }
                            b && (e = e.concat(), h && e.unshift(h), e.push(e[1]), h = e[e.length - 3])
                        }
                        for (t.length = n.length = r.length = 0, p = S.length; --p > -1; ) d = S[p], i[d] = -1 !== c.indexOf("," + d + ","), E[d] = l(e, d, i[d], h);
                        for (p = t.length; --p > -1; ) t[p] = Math.sqrt(t[p]), n[p] = Math.sqrt(n[p]);
                        if (!a) {
                            for (p = S.length; --p > -1; )
                                if (i[d])
                                    for (v = E[S[p]], y = v.length - 1, m = 0; y > m; m++) g = v[m + 1].da / n[m] + v[m].da / t[m], r[m] = (r[m] || 0) + g * g;
                            for (p = r.length; --p > -1; ) r[p] = Math.sqrt(r[p])
                        }
                        for (p = S.length, m = o ? 4 : 1; --p > -1; ) d = S[p], v = E[d], f(v, s, o, a, i[d]), b && (v.splice(0, m), v.splice(v.length - m, m));
                        return E
                    },
                    h = function (e, t, n) {
                        t = t || "soft";
                        var r, i, s, u, a, f, l, c, h, p, d, v = {},
                            m = "cubic" === t ? 3 : 2,
                            g = "soft" === t,
                            y = [];
                        if (g && n && (e = [n].concat(e)), null == e || m + 1 > e.length) throw "invalid Bezier data";
                        for (h in e[0]) y.push(h);
                        for (f = y.length; --f > -1; ) {
                            for (h = y[f], v[h] = a = [], p = 0, c = e.length, l = 0; c > l; l++) r = null == n ? e[l][h] : "string" == typeof (d = e[l][h]) && "=" === d.charAt(1) ? n[h] + Number(d.charAt(0) + d.substr(2)) : Number(d), g && l > 1 && c - 1 > l && (a[p++] = (r + a[p - 2]) / 2), a[p++] = r;
                            for (c = p - m + 1, p = 0, l = 0; c > l; l += m) r = a[l], i = a[l + 1], s = a[l + 2], u = 2 === m ? 0 : a[l + 3], a[p++] = d = 3 === m ? new o(r, i, s, u) : new o(r, (2 * i + r) / 3, (2 * i + s) / 3, s);
                            a.length = p
                        }
                        return v
                    },
                    p = function (e, t, n) {
                        for (var r, i, s, o, u, a, f, l, c, h, p, d = 1 / n, v = e.length; --v > -1; )
                            for (h = e[v], s = h.a, o = h.d - s, u = h.c - s, a = h.b - s, r = i = 0, l = 1; n >= l; l++) f = d * l, c = 1 - f, r = i - (i = (f * f * o + 3 * c * (f * u + c * a)) * f), p = v * n + l - 1, t[p] = (t[p] || 0) + r * r
                        },
                    d = function (e, t) {
                        t = t >> 0 || 6;
                        var n, r, i, s, o = [],
                            u = [],
                            a = 0,
                            f = 0,
                            l = t - 1,
                            c = [],
                            h = [];
                        for (n in e) p(e[n], o, t);
                        for (i = o.length, r = 0; i > r; r++) a += Math.sqrt(o[r]), s = r % t, h[s] = a, s === l && (f += a, s = r / t >> 0, c[s] = h, u[s] = f, a = 0, h = []);
                        return {
                            length: f,
                            lengths: u,
                            segments: c
                        }
                    },
                    v = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.4",
                        API: 2,
                        global: !0,
                        init: function (e, t, n) {
                            this._target = e, t instanceof Array && (t = {
                                values: t
                            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == t.timeResolution ? 6 : parseInt(t.timeResolution, 10);
                            var r, i, s, o, u, a = t.values || [],
                                f = {},
                                l = a[0],
                                p = t.autoRotate || n.vars.orientToBezier;
                            this._autoRotate = p ? p instanceof Array ? p : [
                                ["x", "y", "rotation", p === !0 ? 0 : Number(p) || 0]
                            ] : null;
                            for (r in l) this._props.push(r);
                            for (s = this._props.length; --s > -1; ) r = this._props[s], this._overwriteProps.push(r), i = this._func[r] = "function" == typeof e[r], f[r] = i ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), u || f[r] !== a[0][r] && (u = f);
                            if (this._beziers = "cubic" !== t.type && "quadratic" !== t.type && "soft" !== t.type ? c(a, isNaN(t.curviness) ? 1 : t.curviness, !1, "thruBasic" === t.type, t.correlate, u) : h(a, t.type, f), this._segCount = this._beziers[r].length, this._timeRes) {
                                var v = d(this._beziers, this._timeRes);
                                this._length = v.length, this._lengths = v.lengths, this._segments = v.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (p = this._autoRotate)
                                for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1; ) {
                                    for (o = 0; 3 > o; o++) r = p[s][o], this._func[r] = "function" == typeof e[r] ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)] : !1;
                                    r = p[s][2], this._initialRotations[s] = this._func[r] ? this._func[r].call(this._target) : this._target[r]
                                }
                            return this._startRatio = n.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function (t) {
                            var n, r, i, s, o, u, a, f, l, c, h = this._segCount,
                                p = this._func,
                                d = this._target,
                                v = t !== this._startRatio;
                            if (this._timeRes) {
                                if (l = this._lengths, c = this._curSeg, t *= this._length, i = this._li, t > this._l2 && h - 1 > i) {
                                    for (f = h - 1; f > i && t >= (this._l2 = l[++i]); );
                                    this._l1 = l[i - 1], this._li = i, this._curSeg = c = this._segments[i], this._s2 = c[this._s1 = this._si = 0]
                                } else if (this._l1 > t && i > 0) {
                                    for (; i > 0 && (this._l1 = l[--i]) >= t; );
                                    0 === i && this._l1 > t ? this._l1 = 0 : i++, this._l2 = l[i], this._li = i, this._curSeg = c = this._segments[i], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                                }
                                if (n = i, t -= this._l1, i = this._si, t > this._s2 && c.length - 1 > i) {
                                    for (f = c.length - 1; f > i && t >= (this._s2 = c[++i]); );
                                    this._s1 = c[i - 1], this._si = i
                                } else if (this._s1 > t && i > 0) {
                                    for (; i > 0 && (this._s1 = c[--i]) >= t; );
                                    0 === i && this._s1 > t ? this._s1 = 0 : i++, this._s2 = c[i], this._si = i
                                }
                                u = (i + (t - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else n = 0 > t ? 0 : t >= 1 ? h - 1 : h * t >> 0, u = (t - n * (1 / h)) * h;
                            for (r = 1 - u, i = this._props.length; --i > -1; ) s = this._props[i], o = this._beziers[s][n], a = (u * u * o.da + 3 * r * (u * o.ca + r * o.ba)) * u + o.a, this._round[s] && (a = Math.round(a)), p[s] ? d[s](a) : d[s] = a;
                            if (this._autoRotate) {
                                var m, g, y, b, w, E, S, x = this._autoRotate;
                                for (i = x.length; --i > -1; ) s = x[i][2], E = x[i][3] || 0, S = x[i][4] === !0 ? 1 : e, o = this._beziers[x[i][0]], m = this._beziers[x[i][1]], o && m && (o = o[n], m = m[n], g = o.a + (o.b - o.a) * u, b = o.b + (o.c - o.b) * u, g += (b - g) * u, b += (o.c + (o.d - o.c) * u - b) * u, y = m.a + (m.b - m.a) * u, w = m.b + (m.c - m.b) * u, y += (w - y) * u, w += (m.c + (m.d - m.c) * u - w) * u, a = v ? Math.atan2(w - y, b - g) * S + E : this._initialRotations[i], p[s] ? d[s](a) : d[s] = a)
                            }
                        }
                    }),
                    m = v.prototype;
                v.bezierThrough = c, v.cubicToQuadratic = a, v._autoCSS = !0, v.quadraticToCubic = function (e, t, n) {
                    return new o(e, (2 * t + e) / 3, (2 * t + n) / 3, n)
                }, v._cssRegister = function () {
                    var e = s.CSSPlugin;
                    if (e) {
                        var t = e._internals,
                            n = t._parseToProxy,
                            r = t._setPluginRatio,
                            i = t.CSSPropTween;
                        t._registerComplexSpecialProp("bezier", {
                            parser: function (e, t, s, o, u, a) {
                                t instanceof Array && (t = {
                                    values: t
                                }), a = new v;
                                var f, l, c, h = t.values,
                                    p = h.length - 1,
                                    d = [],
                                    m = {};
                                if (0 > p) return u;
                                for (f = 0; p >= f; f++) c = n(e, h[f], o, u, a, p !== f), d[f] = c.end;
                                for (l in t) m[l] = t[l];
                                return m.values = d, u = new i(e, "bezier", 0, 0, c.pt, 2), u.data = c, u.plugin = a, u.setRatio = r, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (f = m.autoRotate === !0 ? 0 : Number(m.autoRotate), m.autoRotate = null != c.end.left ? [
                                    ["left", "top", "rotation", f, !1]
                                ] : null != c.end.x ? [
                                    ["x", "y", "rotation", f, !1]
                                ] : !1), m.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform), a._onInitTween(c.proxy, m, o._tween), u
                            }
                        })
                    }
                }, m._roundProps = function (e, t) {
                    for (var n = this._overwriteProps, r = n.length; --r > -1; ) (e[n[r]] || e.bezier || e.bezierThrough) && (this._round[n[r]] = t)
                }, m._kill = function (e) {
                    var t, n, r = this._props;
                    for (t in this._beziers)
                        if (t in e)
                            for (delete this._beziers[t], delete this._func[t], n = r.length; --n > -1; ) r[n] === t && r.splice(n, 1);
                    return this._super._kill.call(this, e)
                }
            } (), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (e, t) {
                var n, r, i, s, o = function () {
                    e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                },
                    u = _gsScope._gsDefine.globals,
                    a = {},
                    f = o.prototype = new e("css");
                f.constructor = o, o.version = "1.17.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, f = "px", o.suffixMap = {
                    top: f,
                    right: f,
                    bottom: f,
                    left: f,
                    width: f,
                    height: f,
                    fontSize: f,
                    padding: f,
                    margin: f,
                    perspective: f,
                    lineHeight: ""
                };
                var l, c, h, p, d, v, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    w = /(?:\d|\-|\+|=|#|\.)*/g,
                    E = /opacity *= *([^)]*)/i,
                    S = /opacity:([^;]*)/i,
                    x = /alpha\(opacity *=.+?\)/i,
                    T = /^(rgb|hsl)/,
                    N = /([A-Z])/g,
                    C = /-([a-z])/gi,
                    k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    L = function (e, t) {
                        return t.toUpperCase()
                    },
                    A = /(?:Left|Right|Width)/i,
                    O = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    _ = /,(?=[^\)]*(?:\(|$))/gi,
                    D = Math.PI / 180,
                    P = 180 / Math.PI,
                    H = {},
                    B = document,
                    j = function (e) {
                        return B.createElementNS ? B.createElementNS("http://www.w3.org/1999/xhtml", e) : B.createElement(e)
                    },
                    F = j("div"),
                    I = j("img"),
                    q = o._internals = {
                        _specialProps: a
                    },
                    R = navigator.userAgent,
                    U = function () {
                        var e = R.indexOf("Android"),
                            t = j("a");
                        return h = -1 !== R.indexOf("Safari") && -1 === R.indexOf("Chrome") && (-1 === e || Number(R.substr(e + 8, 1)) > 3), d = h && 6 > Number(R.substr(R.indexOf("Version/") + 8, 1)), p = -1 !== R.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(R) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(R)) && (v = parseFloat(RegExp.$1)), t ? (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity)) : !1
                    } (),
                    z = function (e) {
                        return E.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    W = function (e) {
                        window.console && console.log(e)
                    },
                    X = "",
                    V = "",
                    $ = function (e, t) {
                        t = t || F;
                        var n, r, i = t.style;
                        if (void 0 !== i[e]) return e;
                        for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e]; );
                        return r >= 0 ? (V = 3 === r ? "ms" : n[r], X = "-" + V.toLowerCase() + "-", V + e) : null
                    },
                    J = B.defaultView ? B.defaultView.getComputedStyle : function () { },
                    K = o.getStyle = function (e, t, n, r, i) {
                        var s;
                        return U || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || J(e)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(N, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : z(e)
                    },
                    Q = q.convertToPixels = function (e, n, r, i, s) {
                        if ("px" === i || !i) return r;
                        if ("auto" === i || !r) return 0;
                        var u, a, f, l = A.test(n),
                            c = e,
                            h = F.style,
                            p = 0 > r;
                        if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) u = r / 100 * (l ? e.clientWidth : e.clientHeight);
                        else {
                            if (h.cssText = "border:0 solid red;position:" + K(e, "position") + ";line-height:0;", "%" !== i && c.appendChild) h[l ? "borderLeftWidth" : "borderTopWidth"] = r + i;
                            else {
                                if (c = e.parentNode || B.body, a = c._gsCache, f = t.ticker.frame, a && l && a.time === f) return a.width * r / 100;
                                h[l ? "width" : "height"] = r + i
                            }
                            c.appendChild(F), u = parseFloat(F[l ? "offsetWidth" : "offsetHeight"]), c.removeChild(F), l && "%" === i && o.cacheWidths !== !1 && (a = c._gsCache = c._gsCache || {}, a.time = f, a.width = 100 * (u / r)), 0 !== u || s || (u = Q(e, n, r, i, !0))
                        }
                        return p ? -u : u
                    },
                    G = q.calculateOffset = function (e, t, n) {
                        if ("absolute" !== K(e, "position", n)) return 0;
                        var r = "left" === t ? "Left" : "Top",
                            i = K(e, "margin" + r, n);
                        return e["offset" + r] - (Q(e, t, parseFloat(i), i.replace(w, "")) || 0)
                    },
                    Y = function (e, t) {
                        var n, r, i, s = {};
                        if (t = t || J(e, null))
                            if (n = t.length)
                                for (; --n > -1; ) i = t[n], (-1 === i.indexOf("-transform") || Tt === i) && (s[i.replace(C, L)] = t.getPropertyValue(i));
                            else
                                for (n in t) (-1 === n.indexOf("Transform") || xt === n) && (s[n] = t[n]);
                        else if (t = e.currentStyle || e.style)
                            for (n in t) "string" == typeof n && void 0 === s[n] && (s[n.replace(C, L)] = t[n]);
                        return U || (s.opacity = z(e)), r = Bt(e, t, !1), s.rotation = r.rotation, s.skewX = r.skewX, s.scaleX = r.scaleX, s.scaleY = r.scaleY, s.x = r.x, s.y = r.y, Ct && (s.z = r.z, s.rotationX = r.rotationX, s.rotationY = r.rotationY, s.scaleZ = r.scaleZ), s.filters && delete s.filters, s
                    },
                    Z = function (e, t, n, r, i) {
                        var s, o, u, a = {},
                            f = e.style;
                        for (o in n) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : G(e, o), void 0 !== f[o] && (u = new pt(f, o, f[o], u)));
                        if (r)
                            for (o in r) "className" !== o && (a[o] = r[o]);
                        return {
                            difs: a,
                            firstMPT: u
                        }
                    },
                    et = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    tt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    nt = function (e, t, n) {
                        var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                            i = et[t],
                            s = i.length;
                        for (n = n || J(e, null); --s > -1; ) r -= parseFloat(K(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat(K(e, "border" + i[s] + "Width", n, !0)) || 0;
                        return r
                    },
                    rt = function (e, t) {
                        (null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
                        var n = e.split(" "),
                            r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                            i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                        return null == i ? i = "center" === r ? "50%" : "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), e = r + " " + i + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(b, "")), t.oy = parseFloat(i.replace(b, "")), t.v = e), t || e
                    },
                    it = function (e, t) {
                        return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
                    },
                    st = function (e, t) {
                        return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e)
                    },
                    ot = function (e, t, n, r) {
                        var i, s, o, u, a, f = 1e-6;
                        return null == e ? u = t : "number" == typeof e ? u = e : (i = 360, s = e.split("_"), a = "=" === e.charAt(1), o = (a ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : P) - (a ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (0 | o / i) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (0 | o / i) * i)), u = t + o), f > u && u > -f && (u = 0), u
                    },
                    ut = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    at = function (e, t, n) {
                        return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
                    },
                    ft = o.parseColor = function (e) {
                        var t, n, r, i, s, o;
                        return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ut[e] ? ut[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(m), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = .5 >= o ? o * (s + 1) : o + s - o * s, t = 2 * o - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = at(i + 1 / 3, t, n), e[1] = at(i, t, n), e[2] = at(i - 1 / 3, t, n), e) : (e = e.match(m) || ut.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : ut.black
                    },
                    lt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (f in ut) lt += "|" + f + "\\b";
                lt = RegExp(lt + ")", "gi");
                var ct = function (e, t, n, r) {
                    if (null == e) return function (e) {
                        return e
                    };
                    var i, s = t ? (e.match(lt) || [""])[0] : "",
                            o = e.split(s).join("").match(y) || [],
                            u = e.substr(0, e.indexOf(o[0])),
                            a = ")" === e.charAt(e.length - 1) ? ")" : "",
                            f = -1 !== e.indexOf(" ") ? " " : ",",
                            l = o.length,
                            c = l > 0 ? o[0].replace(m, "") : "";
                    return l ? i = t ? function (e) {
                        var t, h, p, d;
                        if ("number" == typeof e) e += c;
                        else if (r && _.test(e)) {
                            for (d = e.replace(_, "|").split("|"), p = 0; d.length > p; p++) d[p] = i(d[p]);
                            return d.join(",")
                        }
                        if (t = (e.match(lt) || [s])[0], h = e.split(t).join("").match(y) || [], p = h.length, l > p--)
                            for (; l > ++p; ) h[p] = n ? h[0 | (p - 1) / 2] : o[p];
                        return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
                    } : function (e) {
                        var t, s, h;
                        if ("number" == typeof e) e += c;
                        else if (r && _.test(e)) {
                            for (s = e.replace(_, "|").split("|"), h = 0; s.length > h; h++) s[h] = i(s[h]);
                            return s.join(",")
                        }
                        if (t = e.match(y) || [], h = t.length, l > h--)
                            for (; l > ++h; ) t[h] = n ? t[0 | (h - 1) / 2] : o[h];
                        return u + t.join(f) + a
                    } : function (e) {
                        return e
                    }
                },
                    ht = function (e) {
                        return e = e.split(","),
                            function (t, n, r, i, s, o, u) {
                                var a, f = (n + "").split(" ");
                                for (u = {}, a = 0; 4 > a; a++) u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
                                return i.parse(t, u, s, o)
                            }
                    },
                    pt = (q._setPluginRatio = function (e) {
                        this.plugin.setRatio(e);
                        for (var t, n, r, i, s = this.data, o = s.proxy, u = s.firstMPT, a = 1e-6; u; ) t = o[u.v], u.r ? t = Math.round(t) : a > t && t > -a && (t = 0), u.t[u.p] = t, u = u._next;
                        if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === e)
                            for (u = s.firstMPT; u; ) {
                                if (n = u.t, n.type) {
                                    if (1 === n.type) {
                                        for (i = n.xs0 + n.s + n.xs1, r = 1; n.l > r; r++) i += n["xn" + r] + n["xs" + (r + 1)];
                                        n.e = i
                                    }
                                } else n.e = n.s + n.xs0;
                                u = u._next
                            }
                    }, function (e, t, n, r, i) {
                        this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
                    }),
                    dt = (q._parseToProxy = function (e, t, n, r, i, s) {
                        var o, u, a, f, l, c = r,
                            h = {},
                            p = {},
                            d = n._transform,
                            v = H;
                        for (n._transform = null, H = t, r = l = n.parse(e, t, r, i), H = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c; ) {
                            if (1 >= r.type && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new pt(r, "s", u, f, r.r), r.c = 0), 1 === r.type))
                                for (o = r.l; --o > 0; ) a = "xn" + o, u = r.p + "_" + a, p[u] = r.data[a], h[u] = r[a], s || (f = new pt(r, a, u, f, r.rxp[a]));
                            r = r._next
                        }
                        return {
                            proxy: h,
                            end: p,
                            firstMPT: f,
                            pt: l
                        }
                    }, q.CSSPropTween = function (e, t, r, i, o, u, a, f, l, c, h) {
                        this.t = e, this.p = t, this.s = r, this.c = i, this.n = a || t, e instanceof dt || s.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, n = !0), this.b = void 0 === c ? r : c, this.e = void 0 === h ? r + i : h, o && (this._next = o, o._prev = this)
                    }),
                    vt = function (e, t, n, r, i, s) {
                        var o = new dt(e, t, n, r - n, i, -1, s);
                        return o.b = n, o.e = o.xs0 = r, o
                    },
                    mt = o.parseComplex = function (e, t, n, r, i, s, o, u, a, f) {
                        n = n || s || "", o = new dt(e, t, 0, 0, o, f ? 2 : 1, null, !1, u, n, r), r += "";
                        var c, h, p, d, v, y, b, w, E, S, x, N, C = n.split(", ").join(",").split(" "),
                            k = r.split(", ").join(",").split(" "),
                            L = C.length,
                            A = l !== !1;
                        for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(_, ", ").split(" "), k = k.join(" ").replace(_, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = f, c = 0; L > c; c++)
                            if (d = C[c], v = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, it(v, w), v.replace(g, ""), A && -1 !== v.indexOf("px"), !0);
                            else if (i && ("#" === d.charAt(0) || ut[d] || T.test(d))) N = "," === v.charAt(v.length - 1) ? ")," : ")", d = ft(d), v = ft(v), E = d.length + v.length > 6, E && !U && 0 === v[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (U || (E = !1), o.appendXtra(E ? "rgba(" : "rgb(", d[0], v[0] - d[0], ",", !0, !0).appendXtra("", d[1], v[1] - d[1], ",", !0).appendXtra("", d[2], v[2] - d[2], E ? "," : N, !0), E && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > v.length ? 1 : v[3]) - d, N, !1)));
                            else if (y = d.match(m)) {
                                if (b = v.match(g), !b || b.length !== y.length) return o;
                                for (p = 0, h = 0; y.length > h; h++) x = y[h], S = d.indexOf(x, p), o.appendXtra(d.substr(p, S - p), Number(x), it(b[h], x), "", A && "px" === d.substr(S + x.length, 2), 0 === h), p = S + x.length;
                                o["xs" + o.l] += d.substr(p)
                            } else o["xs" + o.l] += o.l ? " " + d : d;
                        if (-1 !== r.indexOf("=") && o.data) {
                            for (N = o.xs0 + o.data.s, c = 1; o.l > c; c++) N += o["xs" + c] + o.data["xn" + c];
                            o.e = N + o["xs" + c]
                        }
                        return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                    },
                    gt = 9;
                for (f = dt.prototype, f.l = f.pr = 0; --gt > 0; ) f["xn" + gt] = 0, f["xs" + gt] = "";
                f.xs0 = "", f._next = f._prev = f.xfirst = f.data = f.plugin = f.setRatio = f.rxp = null, f.appendXtra = function (e, t, n, r, i, s) {
                    var o = this,
                        u = o.l;
                    return o["xs" + u] += s && u ? " " + e : e || "", n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new dt(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                        s: t + n
                    }, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
                };
                var yt = function (e, t) {
                    t = t || {}, this.p = t.prefix ? $(e) || e : e, a[e] = a[this.p] = this, this.format = t.formatter || ct(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                },
                    bt = q._registerComplexSpecialProp = function (e, t, n) {
                        "object" != typeof t && (t = {
                            parser: n
                        });
                        var r, i, s = e.split(","),
                            o = t.defaultValue;
                        for (n = n || [o], r = 0; s.length > r; r++) t.prefix = 0 === r && t.prefix, t.defaultValue = n[r] || o, i = new yt(s[r], t)
                    },
                    wt = function (e) {
                        if (!a[e]) {
                            var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                            bt(e, {
                                parser: function (e, n, r, i, s, o, f) {
                                    var l = u.com.greensock.plugins[t];
                                    return l ? (l._cssRegister(), a[r].parse(e, n, r, i, s, o, f)) : (W("Error: " + t + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                f = yt.prototype, f.parseComplex = function (e, t, n, r, i, s) {
                    var o, u, a, f, l, c, h = this.keyword;
                    if (this.multi && (_.test(n) || _.test(t) ? (u = t.replace(_, "|").split("|"), a = n.replace(_, "|").split("|")) : h && (u = [t], a = [n])), a) {
                        for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++) t = u[o] = u[o] || this.dflt, n = a[o] = a[o] || this.dflt, h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (-1 === c ? u[o] = u[o].split(h).join("") : -1 === l && (u[o] += " " + h)));
                        t = u.join(", "), n = a.join(", ")
                    }
                    return mt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
                }, f.parse = function (e, t, n, r, s, o) {
                    return this.parseComplex(e.style, this.format(K(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
                }, o.registerSpecialProp = function (e, t, n) {
                    bt(e, {
                        parser: function (e, r, i, s, o, u) {
                            var a = new dt(e, i, 0, 0, o, 2, i, !1, n);
                            return a.plugin = u, a.setRatio = t(e, r, s._tween, i), a
                        },
                        priority: n
                    })
                }, o.useSVGTransformAttr = h || p;
                var Et, St = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    xt = $("transform"),
                    Tt = X + "transform",
                    Nt = $("transformOrigin"),
                    Ct = null !== $("perspective"),
                    kt = q.Transform = function () {
                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Ct ? o.defaultForce3D || "auto" : !1
                    },
                    Lt = window.SVGElement,
                    At = function (e, t, n) {
                        var r, i = B.createElementNS("http://www.w3.org/2000/svg", e),
                            s = /([a-z])([A-Z])/g;
                        for (r in n) i.setAttributeNS(null, r.replace(s, "$1-$2").toLowerCase(), n[r]);
                        return t.appendChild(i), i
                    },
                    Ot = B.documentElement,
                    Mt = function () {
                        var e, t, n, r = v || /Android/i.test(R) && !window.chrome;
                        return B.createElementNS && !r && (e = At("svg", Ot), t = At("rect", e, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), n = t.getBoundingClientRect().width, t.style[Nt] = "50% 50%", t.style[xt] = "scaleX(0.5)", r = n === t.getBoundingClientRect().width && (!p || !Ct), Ot.removeChild(e)), r
                    } (),
                    _t = function (e, t, n, r, i) {
                        var s, u, a, f, l, c, h, p, d, v, m, g, y, b, w = e._gsTransform,
                            E = Ht(e, !0);
                        w && (y = w.xOrigin, b = w.yOrigin), (!r || 2 > (s = r.split(" ")).length) && (h = e.getBBox(), t = rt(t).split(" "), s = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * h.width : parseFloat(t[0])) + h.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * h.height : parseFloat(t[1])) + h.y]), n.xOrigin = f = parseFloat(s[0]), n.yOrigin = l = parseFloat(s[1]), r && E !== Pt && (c = E[0], h = E[1], p = E[2], d = E[3], v = E[4], m = E[5], g = c * d - h * p, u = f * (d / g) + l * (-p / g) + (p * m - d * v) / g, a = f * (-h / g) + l * (c / g) - (c * m - h * v) / g, f = n.xOrigin = s[0] = u, l = n.yOrigin = s[1] = a), w && (i || i !== !1 && o.defaultSmoothOrigin !== !1 ? (u = f - y, a = l - b, w.xOffset += u * E[0] + a * E[2] - u, w.yOffset += u * E[1] + a * E[3] - a) : w.xOffset = w.yOffset = 0), e.setAttribute("data-svg-origin", s.join(" "))
                    },
                    Dt = function (e) {
                        return !!(Lt && "function" == typeof e.getBBox && e.getCTM && (!e.parentNode || e.parentNode.getBBox && e.parentNode.getCTM))
                    },
                    Pt = [1, 0, 0, 1, 0, 0],
                    Ht = function (e, t) {
                        var n, r, i, s, o, u = e._gsTransform || new kt,
                            a = 1e5;
                        if (xt ? r = K(e, Tt, null, !0) : e.currentStyle && (r = e.currentStyle.filter.match(O), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), u.x || 0, u.y || 0].join(",") : ""), n = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (u.svg || e.getBBox && Dt(e)) && (n && -1 !== (e.style[xt] + "").indexOf("matrix") && (r = e.style[xt], n = 0), i = e.getAttribute("transform"), n && i && (-1 !== i.indexOf("matrix") ? (r = i, n = 0) : -1 !== i.indexOf("translate") && (r = "matrix(1,0,0,1," + i.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", n = 0))), n) return Pt;
                        for (i = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], gt = i.length; --gt > -1; ) s = Number(i[gt]), i[gt] = (o = s - (s |= 0)) ? (0 | o * a + (0 > o ? -0.5 : .5)) / a + s : s;
                        return t && i.length > 6 ? [i[0], i[1], i[4], i[5], i[12], i[13]] : i
                    },
                    Bt = q.getTransform = function (e, n, r, s) {
                        if (e._gsTransform && r && !s) return e._gsTransform;
                        var u, a, f, l, c, h, p = r ? e._gsTransform || new kt : new kt,
                            d = 0 > p.scaleX,
                            v = 2e-5,
                            m = 1e5,
                            g = Ct ? parseFloat(K(e, Nt, n, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                            y = parseFloat(o.defaultTransformPerspective) || 0;
                        if (p.svg = !!e.getBBox && !!Dt(e), p.svg && (_t(e, K(e, Nt, i, !1, "50% 50%") + "", p, e.getAttribute("data-svg-origin")), Et = o.useSVGTransformAttr || Mt), u = Ht(e), u !== Pt) {
                            if (16 === u.length) {
                                var b, w, E, S, x, T = u[0],
                                    N = u[1],
                                    C = u[2],
                                    k = u[3],
                                    L = u[4],
                                    A = u[5],
                                    O = u[6],
                                    M = u[7],
                                    _ = u[8],
                                    D = u[9],
                                    H = u[10],
                                    B = u[12],
                                    j = u[13],
                                    F = u[14],
                                    I = u[11],
                                    q = Math.atan2(O, H);
                                p.zOrigin && (F = -p.zOrigin, B = _ * F - u[12], j = D * F - u[13], F = H * F + p.zOrigin - u[14]), p.rotationX = q * P, q && (S = Math.cos(-q), x = Math.sin(-q), b = L * S + _ * x, w = A * S + D * x, E = O * S + H * x, _ = L * -x + _ * S, D = A * -x + D * S, H = O * -x + H * S, I = M * -x + I * S, L = b, A = w, O = E), q = Math.atan2(_, H), p.rotationY = q * P, q && (S = Math.cos(-q), x = Math.sin(-q), b = T * S - _ * x, w = N * S - D * x, E = C * S - H * x, D = N * x + D * S, H = C * x + H * S, I = k * x + I * S, T = b, N = w, C = E), q = Math.atan2(N, T), p.rotation = q * P, q && (S = Math.cos(-q), x = Math.sin(-q), T = T * S + L * x, w = N * S + A * x, A = N * -x + A * S, O = C * -x + O * S, N = w), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY += 180), p.scaleX = (0 | Math.sqrt(T * T + N * N) * m + .5) / m, p.scaleY = (0 | Math.sqrt(A * A + D * D) * m + .5) / m, p.scaleZ = (0 | Math.sqrt(O * O + H * H) * m + .5) / m, p.skewX = 0, p.perspective = I ? 1 / (0 > I ? -I : I) : 0, p.x = B, p.y = j, p.z = F, p.svg && (p.x -= p.xOrigin - (p.xOrigin * T - p.yOrigin * L), p.y -= p.yOrigin - (p.yOrigin * N - p.xOrigin * A))
                            } else if (!(Ct && !s && u.length && p.x === u[4] && p.y === u[5] && (p.rotationX || p.rotationY) || void 0 !== p.x && "none" === K(e, "display", n))) {
                                var R = u.length >= 6,
                                    U = R ? u[0] : 1,
                                    z = u[1] || 0,
                                    W = u[2] || 0,
                                    X = R ? u[3] : 1;
                                p.x = u[4] || 0, p.y = u[5] || 0, f = Math.sqrt(U * U + z * z), l = Math.sqrt(X * X + W * W), c = U || z ? Math.atan2(z, U) * P : p.rotation || 0, h = W || X ? Math.atan2(W, X) * P + c : p.skewX || 0, Math.abs(h) > 90 && 270 > Math.abs(h) && (d ? (f *= -1, h += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (l *= -1, h += 0 >= h ? 180 : -180)), p.scaleX = f, p.scaleY = l, p.rotation = c, p.skewX = h, Ct && (p.rotationX = p.rotationY = p.z = 0, p.perspective = y, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * U + p.yOrigin * W), p.y -= p.yOrigin - (p.xOrigin * z + p.yOrigin * X))
                            }
                            p.zOrigin = g;
                            for (a in p) v > p[a] && p[a] > -v && (p[a] = 0)
                        }
                        return r && (e._gsTransform = p, p.svg && (Et && e.style[xt] ? t.delayedCall(.001, function () {
                            qt(e.style, xt)
                        }) : !Et && e.getAttribute("transform") && t.delayedCall(.001, function () {
                            e.removeAttribute("transform")
                        }))), p
                    },
                    jt = function (e) {
                        var t, n, r = this.data,
                            i = -r.rotation * D,
                            s = i + r.skewX * D,
                            o = 1e5,
                            u = (0 | Math.cos(i) * r.scaleX * o) / o,
                            a = (0 | Math.sin(i) * r.scaleX * o) / o,
                            f = (0 | Math.sin(s) * -r.scaleY * o) / o,
                            l = (0 | Math.cos(s) * r.scaleY * o) / o,
                            c = this.t.style,
                            h = this.t.currentStyle;
                        if (h) {
                            n = a, a = -f, f = -n, t = h.filter, c.filter = "";
                            var p, d, m = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                y = "absolute" !== h.position,
                                b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
                                S = r.x + m * r.xPercent / 100,
                                x = r.y + g * r.yPercent / 100;
                            if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, d = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, S += p - (p * u + d * a), x += d - (p * f + d * l)), y ? (p = m / 2, d = g / 2, b += ", Dx=" + (p - (p * u + d * a) + S) + ", Dy=" + (d - (p * f + d * l) + x) + ")") : b += ", sizingMethod='auto expand')", c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(M, b) : b + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === b.indexOf("Dx=0, Dy=0") || E.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
                                var T, N, C, k = 8 > v ? 1 : -1;
                                for (p = r.ieOffsetX || 0, d = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), gt = 0; 4 > gt; gt++) N = tt[gt], T = h[N], n = -1 !== T.indexOf("px") ? parseFloat(T) : Q(this.t, N, parseFloat(T), T.replace(w, "")) || 0, C = n !== r[N] ? 2 > gt ? -r.ieOffsetX : -r.ieOffsetY : 2 > gt ? p - r.ieOffsetX : d - r.ieOffsetY, c[N] = (r[N] = Math.round(n - C * (0 === gt || 2 === gt ? 1 : k))) + "px"
                            }
                        }
                    },
                    Ft = q.set3DTransformRatio = q.setTransformRatio = function (e) {
                        var t, n, r, i, s, o, u, a, f, l, c, h, d, v, m, g, y, b, w, E, S, x, T, N = this.data,
                            C = this.t.style,
                            k = N.rotation,
                            L = N.rotationX,
                            A = N.rotationY,
                            O = N.scaleX,
                            M = N.scaleY,
                            _ = N.scaleZ,
                            P = N.x,
                            H = N.y,
                            B = N.z,
                            j = N.svg,
                            F = N.perspective,
                            I = N.force3D;
                        if (!((1 !== e && 0 !== e || "auto" !== I || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && I || B || F || A || L) || !!Et && !!j || !Ct) return k || N.skewX || j ? (k *= D, x = N.skewX * D, T = 1e5, t = Math.cos(k) * O, i = Math.sin(k) * O, n = Math.sin(k - x) * -M, s = Math.cos(k - x) * M, x && "simple" === N.skewType && (y = Math.tan(x), y = Math.sqrt(1 + y * y), n *= y, s *= y, N.skewY && (t *= y, i *= y)), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n) + N.xOffset, H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s) + N.yOffset, Et && (N.xPercent || N.yPercent) && (v = this.t.getBBox(), P += .01 * N.xPercent * v.width, H += .01 * N.yPercent * v.height), v = 1e-6, v > P && P > -v && (P = 0), v > H && H > -v && (H = 0)), w = (0 | t * T) / T + "," + (0 | i * T) / T + "," + (0 | n * T) / T + "," + (0 | s * T) / T + "," + P + "," + H + ")", j && Et ? this.t.setAttribute("transform", "matrix(" + w) : C[xt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + w) : C[xt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + M + "," + P + "," + H + ")", void 0;
                        if (p && (v = 1e-4, v > O && O > -v && (O = _ = 2e-5), v > M && M > -v && (M = _ = 2e-5), !F || N.z || N.rotationX || N.rotationY || (F = 0)), k || N.skewX) k *= D, m = t = Math.cos(k), g = i = Math.sin(k), N.skewX && (k -= N.skewX * D, m = Math.cos(k), g = Math.sin(k), "simple" === N.skewType && (y = Math.tan(N.skewX * D), y = Math.sqrt(1 + y * y), m *= y, g *= y, N.skewY && (t *= y, i *= y))), n = -g, s = m;
                        else {
                            if (!(A || L || 1 !== _ || F || j)) return C[xt] = (N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) translate3d(" : "translate3d(") + P + "px," + H + "px," + B + "px)" + (1 !== O || 1 !== M ? " scale(" + O + "," + M + ")" : ""), void 0;
                            t = s = 1, n = i = 0
                        }
                        f = 1, r = o = u = a = l = c = 0, h = F ? -1 / F : 0, d = N.zOrigin, v = 1e-6, E = ",", S = "0", k = A * D, k && (m = Math.cos(k), g = Math.sin(k), u = -g, l = h * -g, r = t * g, o = i * g, f = m, h *= m, t *= m, i *= m), k = L * D, k && (m = Math.cos(k), g = Math.sin(k), y = n * m + r * g, b = s * m + o * g, a = f * g, c = h * g, r = n * -g + r * m, o = s * -g + o * m, f *= m, h *= m, n = y, s = b), 1 !== _ && (r *= _, o *= _, f *= _, h *= _), 1 !== M && (n *= M, s *= M, a *= M, c *= M), 1 !== O && (t *= O, i *= O, u *= O, l *= O), (d || j) && (d && (P += r * -d, H += o * -d, B += f * -d + d), j && (P += N.xOrigin - (N.xOrigin * t + N.yOrigin * n) + N.xOffset, H += N.yOrigin - (N.xOrigin * i + N.yOrigin * s) + N.yOffset), v > P && P > -v && (P = S), v > H && H > -v && (H = S), v > B && B > -v && (B = 0)), w = N.xPercent || N.yPercent ? "translate(" + N.xPercent + "%," + N.yPercent + "%) matrix3d(" : "matrix3d(", w += (v > t && t > -v ? S : t) + E + (v > i && i > -v ? S : i) + E + (v > u && u > -v ? S : u), w += E + (v > l && l > -v ? S : l) + E + (v > n && n > -v ? S : n) + E + (v > s && s > -v ? S : s), L || A ? (w += E + (v > a && a > -v ? S : a) + E + (v > c && c > -v ? S : c) + E + (v > r && r > -v ? S : r), w += E + (v > o && o > -v ? S : o) + E + (v > f && f > -v ? S : f) + E + (v > h && h > -v ? S : h) + E) : w += ",0,0,0,0,1,0,", w += P + E + H + E + B + E + (F ? 1 + -B / F : 1) + ")", C[xt] = w
                    };
                f = kt.prototype, f.x = f.y = f.z = f.skewX = f.skewY = f.rotation = f.rotationX = f.rotationY = f.zOrigin = f.xPercent = f.yPercent = f.xOffset = f.yOffset = 0, f.scaleX = f.scaleY = f.scaleZ = 1, bt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function (e, t, n, r, s, u, a) {
                        if (r._lastParsedTransform === a) return s;
                        r._lastParsedTransform = a;
                        var f, l, c, h, p, d, v, m, g, y = e._gsTransform,
                            b = r._transform = Bt(e, i, !0, a.parseTransform),
                            w = e.style,
                            E = 1e-6,
                            S = St.length,
                            x = a,
                            T = {},
                            N = "transformOrigin";
                        if ("string" == typeof x.transform && xt) c = F.style, c[xt] = x.transform, c.display = "block", c.position = "absolute", B.body.appendChild(F), f = Bt(F, null, !1), B.body.removeChild(F), null != x.xPercent && (f.xPercent = st(x.xPercent, b.xPercent)), null != x.yPercent && (f.yPercent = st(x.yPercent, b.yPercent));
                        else if ("object" == typeof x) {
                            if (f = {
                                scaleX: st(null != x.scaleX ? x.scaleX : x.scale, b.scaleX),
                                scaleY: st(null != x.scaleY ? x.scaleY : x.scale, b.scaleY),
                                scaleZ: st(x.scaleZ, b.scaleZ),
                                x: st(x.x, b.x),
                                y: st(x.y, b.y),
                                z: st(x.z, b.z),
                                xPercent: st(x.xPercent, b.xPercent),
                                yPercent: st(x.yPercent, b.yPercent),
                                perspective: st(x.transformPerspective, b.perspective)
                            }, v = x.directionalRotation, null != v)
                                if ("object" == typeof v)
                                    for (c in v) x[c] = v[c];
                                else x.rotation = v;
                            "string" == typeof x.x && -1 !== x.x.indexOf("%") && (f.x = 0, f.xPercent = st(x.x, b.xPercent)), "string" == typeof x.y && -1 !== x.y.indexOf("%") && (f.y = 0, f.yPercent = st(x.y, b.yPercent)), f.rotation = ot("rotation" in x ? x.rotation : "shortRotation" in x ? x.shortRotation + "_short" : "rotationZ" in x ? x.rotationZ : b.rotation, b.rotation, "rotation", T), Ct && (f.rotationX = ot("rotationX" in x ? x.rotationX : "shortRotationX" in x ? x.shortRotationX + "_short" : b.rotationX || 0, b.rotationX, "rotationX", T), f.rotationY = ot("rotationY" in x ? x.rotationY : "shortRotationY" in x ? x.shortRotationY + "_short" : b.rotationY || 0, b.rotationY, "rotationY", T)), f.skewX = null == x.skewX ? b.skewX : ot(x.skewX, b.skewX), f.skewY = null == x.skewY ? b.skewY : ot(x.skewY, b.skewY), (l = f.skewY - b.skewY) && (f.skewX += l, f.rotation += l)
                        }
                        for (Ct && null != x.force3D && (b.force3D = x.force3D, d = !0), b.skewType = x.skewType || b.skewType || o.defaultSkewType, p = b.force3D || b.z || b.rotationX || b.rotationY || f.z || f.rotationX || f.rotationY || f.perspective, p || null == x.scale || (f.scaleZ = 1); --S > -1; ) n = St[S], h = f[n] - b[n], (h > E || -E > h || null != x[n] || null != H[n]) && (d = !0, s = new dt(b, n, b[n], h, s), n in T && (s.e = T[n]), s.xs0 = 0, s.plugin = u, r._overwriteProps.push(s.n));
                        return h = x.transformOrigin, b.svg && (h || x.svgOrigin) && (m = b.xOffset, g = b.yOffset, _t(e, rt(h), f, x.svgOrigin, x.smoothOrigin), s = vt(b, "xOrigin", (y ? b : f).xOrigin, f.xOrigin, s, N), s = vt(b, "yOrigin", (y ? b : f).yOrigin, f.yOrigin, s, N), (m !== b.xOffset || g !== b.yOffset) && (s = vt(b, "xOffset", y ? m : b.xOffset, b.xOffset, s, N), s = vt(b, "yOffset", y ? g : b.yOffset, b.yOffset, s, N)), h = Et ? null : "0px 0px"), (h || Ct && p && b.zOrigin) && (xt ? (d = !0, n = Nt, h = (h || K(e, n, i, !1, "50% 50%")) + "", s = new dt(w, n, 0, 0, s, -1, N), s.b = w[n], s.plugin = u, Ct ? (c = b.zOrigin, h = h.split(" "), b.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, s.xs0 = s.e = h[0] + " " + (h[1] || "50%") + " 0px", s = new dt(b, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = b.zOrigin) : s.xs0 = s.e = h) : rt(h + "", b)), d && (r._transformType = b.svg && Et || !p && 3 !== this._transformType ? 2 : 3), s
                    },
                    prefix: !0
                }), bt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), bt("borderRadius", {
                    defaultValue: "0px",
                    parser: function (e, t, n, s, o) {
                        t = this.format(t);
                        var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            T = e.style;
                        for (v = parseFloat(e.offsetWidth), m = parseFloat(e.offsetHeight), u = t.split(" "), a = 0; x.length > a; a++) this.p.indexOf("border") && (x[a] = $(x[a])), c = l = K(e, x[a], i, !1, "0px"), -1 !== c.indexOf(" ") && (l = c.split(" "), c = l[0], l = l[1]), h = f = u[a], p = parseFloat(c), y = c.substr((p + "").length), b = "=" === h.charAt(1), b ? (d = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), d *= parseFloat(h), g = h.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(h), g = h.substr((d + "").length)), "" === g && (g = r[n] || y), g !== y && (w = Q(e, "borderLeft", p, y), E = Q(e, "borderTop", p, y), "%" === g ? (c = 100 * (w / v) + "%", l = 100 * (E / m) + "%") : "em" === g ? (S = Q(e, "borderLeft", 1, "em"), c = w / S + "em", l = E / S + "em") : (c = w + "px", l = E + "px"), b && (h = parseFloat(c) + d + g, f = parseFloat(l) + d + g)), o = mt(T, x[a], c + " " + l, h + " " + f, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: ct("0px 0px 0px 0px", !1, !0)
                }), bt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function (e, t, n, r, s, o) {
                        var u, a, f, l, c, h, p = "background-position",
                            d = i || J(e, null),
                            m = this.format((d ? v ? d.getPropertyValue(p + "-x") + " " + d.getPropertyValue(p + "-y") : d.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(t);
                        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = K(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
                            for (u = m.split(" "), a = g.split(" "), I.setAttribute("src", h), f = 2; --f > -1; ) m = u[f], l = -1 !== m.indexOf("%"), l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - I.width : e.offsetHeight - I.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
                            m = u.join(" ")
                        }
                        return this.parseComplex(e.style, m, g, s, o)
                    },
                    formatter: rt
                }), bt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: rt
                }), bt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), bt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), bt("transformStyle", {
                    prefix: !0
                }), bt("backfaceVisibility", {
                    prefix: !0
                }), bt("userSelect", {
                    prefix: !0
                }), bt("margin", {
                    parser: ht("marginTop,marginRight,marginBottom,marginLeft")
                }), bt("padding", {
                    parser: ht("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), bt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function (e, t, n, r, s, o) {
                        var u, a, f;
                        return 9 > v ? (a = e.currentStyle, f = 8 > v ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format(K(e, this.p, i, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, s, o)
                    }
                }), bt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), bt("autoRound,strictUnits", {
                    parser: function (e, t, n, r, i) {
                        return i
                    }
                }), bt("border", {
                    defaultValue: "0px solid #000",
                    parser: function (e, t, n, r, s, o) {
                        return this.parseComplex(e.style, this.format(K(e, "borderTopWidth", i, !1, "0px") + " " + K(e, "borderTopStyle", i, !1, "solid") + " " + K(e, "borderTopColor", i, !1, "#000")), this.format(t), s, o)
                    },
                    color: !0,
                    formatter: function (e) {
                        var t = e.split(" ");
                        return t[0] + " " + (t[1] || "solid") + " " + (e.match(lt) || ["#000"])[0]
                    }
                }), bt("borderWidth", {
                    parser: ht("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), bt("float,cssFloat,styleFloat", {
                    parser: function (e, t, n, r, i) {
                        var s = e.style,
                            o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                        return new dt(s, o, 0, 0, i, -1, n, !1, 0, s[o], t)
                    }
                });
                var It = function (e) {
                    var t, n = this.t,
                        r = n.filter || K(this.data, "filter") || "",
                        i = 0 | this.s + this.c * e;
                    100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), t = !K(this.data, "filter")) : (n.filter = r.replace(x, ""), t = !0)), t || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("pacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(E, "opacity=" + i))
                };
                bt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function (e, t, n, r, s, o) {
                        var u = parseFloat(K(e, "opacity", i, !1, "1")),
                            a = e.style,
                            f = "autoAlpha" === n;
                        return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + u), f && 1 === u && "hidden" === K(e, "visibility", i) && 0 !== t && (u = 0), U ? s = new dt(a, "opacity", u, t - u, s) : (s = new dt(a, "opacity", 100 * u, 100 * (t - u), s), s.xn1 = f ? 1 : 0, a.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = It), f && (s = new dt(a, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== u ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)), s
                    }
                });
                var qt = function (e, t) {
                    t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(N, "-$1").toLowerCase())) : e.removeAttribute(t))
                },
                    Rt = function (e) {
                        if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                            this.t.setAttribute("class", 0 === e ? this.b : this.e);
                            for (var t = this.data, n = this.t.style; t; ) t.v ? n[t.p] = t.v : qt(n, t.p), t = t._next;
                            1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                bt("className", {
                    parser: function (e, t, r, s, o, u, a) {
                        var f, l, c, h, p, d = e.getAttribute("class") || "",
                            v = e.style.cssText;
                        if (o = s._classNamePT = new dt(e, r, 0, 0, o, 2), o.setRatio = Rt, o.pr = -11, n = !0, o.b = d, l = Y(e, i), c = e._gsClassPT) {
                            for (h = {}, p = c.data; p; ) h[p.p] = 1, p = p._next;
                            c.setRatio(1)
                        }
                        return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : d.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), f = Z(e, l, Y(e), a, h), e.setAttribute("class", d), o.data = f.firstMPT, e.style.cssText = v, o = o.xfirst = s.parse(e, f.difs, o, u)
                    }
                });
                var Ut = function (e) {
                    if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var t, n, r, i, s, o = this.t.style,
                            u = a.transform.parse;
                        if ("all" === this.e) o.cssText = "", i = !0;
                        else
                            for (t = this.e.split(" ").join("").split(","), r = t.length; --r > -1; ) n = t[r], a[n] && (a[n].parse === u ? i = !0 : n = "transformOrigin" === n ? Nt : a[n].p), qt(o, n);
                        i && (qt(o, xt), s = this.t._gsTransform, s && (s.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
                    }
                };
                for (bt("clearProps", {
                    parser: function (e, t, r, i, s) {
                        return s = new dt(e, r, 0, 0, s, 2), s.setRatio = Ut, s.e = t, s.pr = -10, s.data = i._tween, n = !0, s
                    }
                }), f = "bezier,throwProps,physicsProps,physics2D".split(","), gt = f.length; gt--; ) wt(f[gt]);
                f = o.prototype, f._firstPT = f._lastParsedTransform = f._transform = null, f._onInitTween = function (e, t, u) {
                    if (!e.nodeType) return !1;
                    this._target = e, this._tween = u, this._vars = t, l = t.autoRound, n = !1, r = t.suffixMap || o.suffixMap, i = J(e, ""), s = this._overwriteProps;
                    var f, p, v, m, g, y, b, w, E, x = e.style;
                    if (c && "" === x.zIndex && (f = K(e, "zIndex", i), ("auto" === f || "" === f) && this._addLazySet(x, "zIndex", 0)), "string" == typeof t && (m = x.cssText, f = Y(e, i), x.cssText = m + ";" + t, f = Z(e, f, Y(e)).difs, !U && S.test(t) && (f.opacity = parseFloat(RegExp.$1)), t = f, x.cssText = m), this._firstPT = p = t.className ? a.className.parse(e, t.className, "className", this, null, null, t) : this.parse(e, t, null), this._transformType) {
                        for (E = 3 === this._transformType, xt ? h && (c = !0, "" === x.zIndex && (b = K(e, "zIndex", i), ("auto" === b || "" === b) && this._addLazySet(x, "zIndex", 0)), d && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (E ? "visible" : "hidden"))) : x.zoom = 1, v = p; v && v._next; ) v = v._next;
                        w = new dt(e, "transform", 0, 0, null, 2), this._linkCSSP(w, null, v), w.setRatio = xt ? Ft : jt, w.data = this._transform || Bt(e, i, !0), w.tween = u, w.pr = -1, s.pop()
                    }
                    if (n) {
                        for (; p; ) {
                            for (y = p._next, v = m; v && v.pr > p.pr; ) v = v._next;
                            (p._prev = v ? v._prev : g) ? p._prev._next = p : m = p, (p._next = v) ? v._prev = p : g = p, p = y
                        }
                        this._firstPT = m
                    }
                    return !0
                }, f.parse = function (e, t, n, s) {
                    var o, u, f, c, h, p, d, v, m, g, y = e.style;
                    for (o in t) p = t[o], u = a[o], u ? n = u.parse(e, p, o, this, n, s, t) : (h = K(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && T.test(p) ? (m || (p = ft(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = mt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (f = parseFloat(h), d = f || 0 === f ? h.substr((f + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (f = nt(e, o, i), d = "px") : "left" === o || "top" === o ? (f = G(e, o, i), d = "px") : (f = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(w, "")) : (c = parseFloat(p), v = m ? p.replace(w, "") : ""), "" === v && (v = o in r ? r[o] : d), p = c || 0 === c ? (g ? c + f : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && f && (f = Q(e, o, f, d), "%" === v ? (f /= Q(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = f + "%")) : "em" === v ? f /= Q(e, o, 1, "em") : "px" !== v && (c = Q(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + f + v)), g && (c += f), !f && 0 !== f || !c && 0 !== c ? void 0 !== y[o] && (p || "NaN" != p + "" && null != p) ? (n = new dt(y, o, c || f || 0, 0, n, -1, o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : W("invalid " + o + " tween value: " + t[o]) : (n = new dt(y, o, f, c - f, n, 0, o, l !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = mt(y, o, h, p, !0, null, n, 0, s)), s && n && !n.plugin && (n.plugin = s);
                    return n
                }, f.setRatio = function (e) {
                    var t, n, r, i = this._firstPT,
                        s = 1e-6;
                    if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001)
                            for (; i; ) {
                                if (t = i.c * e + i.s, i.r ? t = Math.round(t) : s > t && t > -s && (t = 0), i.type)
                                    if (1 === i.type)
                                        if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2;
                                        else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3;
                                        else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4;
                                        else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5;
                                        else {
                                            for (n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                            i.t[i.p] = n
                                        } else-1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e);
                                else i.t[i.p] = t + i.xs0;
                                i = i._next
                            } else
                            for (; i; ) 2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e), i = i._next;
                    else
                        for (; i; ) {
                            if (2 !== i.type)
                                if (i.r && -1 !== i.type)
                                    if (t = Math.round(i.s + i.c), i.type) {
                                        if (1 === i.type) {
                                            for (r = i.l, n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++) n += i["xn" + r] + i["xs" + (r + 1)];
                                            i.t[i.p] = n
                                        }
                                    } else i.t[i.p] = t + i.xs0;
                                else i.t[i.p] = i.e;
                            else i.setRatio(e);
                            i = i._next
                        }
                }, f._enableTransforms = function (e) {
                    this._transform = this._transform || Bt(this._target, i, !0), this._transformType = this._transform.svg && Et || !e && 3 !== this._transformType ? 2 : 3
                };
                var zt = function () {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                f._addLazySet = function (e, t, n) {
                    var r = this._firstPT = new dt(e, t, 0, 0, this._firstPT, 2);
                    r.e = n, r.setRatio = zt, r.data = this
                }, f._linkCSSP = function (e, t, n, r) {
                    return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = n), e
                }, f._kill = function (t) {
                    var n, r, i, s = t;
                    if (t.autoAlpha || t.alpha) {
                        s = {};
                        for (r in t) s[r] = t[r];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    return t.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
                };
                var Wt = function (e, t, n) {
                    var r, i, s, o;
                    if (e.slice)
                        for (i = e.length; --i > -1; ) Wt(e[i], t, n);
                    else
                        for (r = e.childNodes, i = r.length; --i > -1; ) s = r[i], o = s.type, s.style && (t.push(Y(s)), n && n.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Wt(s, t, n)
                };
                return o.cascadeTo = function (e, n, r) {
                    var i, s, o, u, a = t.to(e, n, r),
                        f = [a],
                        l = [],
                        c = [],
                        h = [],
                        p = t._internals.reservedProps;
                    for (e = a._targets || a.target, Wt(e, l, h), a.render(n, !0, !0), Wt(e, c), a.render(0, !0, !0), a._enabled(!0), i = h.length; --i > -1; )
                        if (s = Z(h[i], l[i], c[i]), s.firstMPT) {
                            s = s.difs;
                            for (o in r) p[o] && (s[o] = r[o]);
                            u = {};
                            for (o in s) u[o] = l[i][o];
                            f.push(t.fromTo(h[i], n, u, s))
                        }
                    return f
                }, e.activate([o]), o
            }, !0),
            function () {
                var e = _gsScope._gsDefine.plugin({
                    propName: "roundProps",
                    priority: -1,
                    API: 2,
                    init: function (e, t, n) {
                        return this._tween = n, !0
                    }
                }),
                    t = e.prototype;
                t._onInitAllProps = function () {
                    for (var e, t, n, r = this._tween, i = r.vars.roundProps instanceof Array ? r.vars.roundProps : r.vars.roundProps.split(","), s = i.length, o = {}, u = r._propLookup.roundProps; --s > -1; ) o[i[s]] = 1;
                    for (s = i.length; --s > -1; )
                        for (e = i[s], t = r._firstPT; t; ) n = t._next, t.pg ? t.t._roundProps(o, !0) : t.n === e && (this._add(t.t, e, t.s, t.c), n && (n._prev = t._prev), t._prev ? t._prev._next = n : r._firstPT === t && (r._firstPT = n), t._next = t._prev = null, r._propLookup[e] = u), t = n;
                    return !1
                }, t._add = function (e, t, n, r) {
                    this._addTween(e, t, n, n + r, t, !0), this._overwriteProps.push(t)
                }
            } (),
            function () {
                var e = /(?:\d|\-|\+|=|#|\.)*/g,
                    t = /[A-Za-z%]/g;
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.4.0",
                    init: function (n, r) {
                        var i, s, o, u, a;
                        if ("function" != typeof n.setAttribute) return !1;
                        this._target = n, this._proxy = {}, this._start = {}, this._end = {}, this._suffix = {};
                        for (i in r) this._start[i] = this._proxy[i] = s = n.getAttribute(i) + "", this._end[i] = o = r[i] + "", this._suffix[i] = u = t.test(o) ? o.replace(e, "") : t.test(s) ? s.replace(e, "") : "", u && (a = o.indexOf(u), -1 !== a && (o = o.substr(0, a))), this._addTween(this._proxy, i, parseFloat(s), o, i) || (this._suffix[i] = ""), "=" === o.charAt(1) && (this._end[i] = this._firstPT.s + this._firstPT.c + u), this._overwriteProps.push(i);
                        return !0
                    },
                    set: function (e) {
                        this._super.setRatio.call(this, e);
                        for (var t, n = this._overwriteProps, r = n.length, i = 1 === e ? this._end : e ? this._proxy : this._start, s = i === this._proxy; --r > -1; ) t = n[r], this._target.setAttribute(t, i[t] + (s ? this._suffix[t] : ""))
                    }
                })
            } (), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function (e, t) {
                    "object" != typeof t && (t = {
                        rotation: t
                    }), this.finals = {};
                    var n, r, i, s, o, u, a = t.useRadians === !0 ? 2 * Math.PI : 360,
                        f = 1e-6;
                    for (n in t) "useRadians" !== n && (u = (t[n] + "").split("_"), r = u[0], i = parseFloat("function" != typeof e[n] ? e[n] : e[n.indexOf("set") || "function" != typeof e["get" + n.substr(3)] ? n : "get" + n.substr(3)]()), s = this.finals[n] = "string" == typeof r && "=" === r.charAt(1) ? i + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0, o = s - i, u.length && (r = u.join("_"), -1 !== r.indexOf("short") && (o %= a, o !== o % (a / 2) && (o = 0 > o ? o + a : o - a)), -1 !== r.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * a) % a - (0 | o / a) * a : -1 !== r.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * a) % a - (0 | o / a) * a)), (o > f || -f > o) && (this._addTween(e, n, i, i + o, n), this._overwriteProps.push(n)));
                    return !0
                },
                set: function (e) {
                    var t;
                    if (1 !== e) this._super.setRatio.call(this, e);
                    else
                        for (t = this._firstPT; t; ) t.f ? t.t[t.p](this.finals[t.p]) : t.t[t.p] = this.finals[t.p], t = t._next
                    }
                })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (e) {
                    var t, n, r, i = _gsScope.GreenSockGlobals || _gsScope,
                    s = i.com.greensock,
                    o = 2 * Math.PI,
                    u = Math.PI / 2,
                    a = s._class,
                    f = function (t, n) {
                        var r = a("easing." + t, function () { }, !0),
                            i = r.prototype = new e;
                        return i.constructor = r, i.getRatio = n, r
                    },
                    l = e.register || function () { },
                    c = function (e, t, n, r) {
                        var i = a("easing." + e, {
                            easeOut: new t,
                            easeIn: new n,
                            easeInOut: new r
                        }, !0);
                        return l(i, e), i
                    },
                    h = function (e, t, n) {
                        this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
                    },
                    p = function (t, n) {
                        var r = a("easing." + t, function (e) {
                            this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                            i = r.prototype = new e;
                        return i.constructor = r, i.getRatio = n, i.config = function (e) {
                            return new r(e)
                        }, r
                    },
                    d = c("Back", p("BackOut", function (e) {
                        return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                    }), p("BackIn", function (e) {
                        return e * e * ((this._p1 + 1) * e - this._p1)
                    }), p("BackInOut", function (e) {
                        return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                    })),
                    v = a("easing.SlowMo", function (e, t, n) {
                        t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
                    }, !0),
                    m = v.prototype = new e;
                    return m.constructor = v, m.getRatio = function (e) {
                        var t = e + (.5 - e) * this._p;
                        return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
                    }, v.ease = new v(.7, .7), m.config = v.config = function (e, t, n) {
                        return new v(e, t, n)
                    }, t = a("easing.SteppedEase", function (e) {
                        e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
                    }, !0), m = t.prototype = new e, m.constructor = t, m.getRatio = function (e) {
                        return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
                    }, m.config = t.config = function (e) {
                        return new t(e)
                    }, n = a("easing.RoughEase", function (t) {
                        t = t || {};
                        for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c, d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null, g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1; ) n = d ? Math.random() : 1 / c * p, r = m ? m.getRatio(n) : n, "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = .5 * s * s * g) : (s = 2 * (1 - n), i = .5 * s * s * g), d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i, v && (r > 1 ? r = 1 : 0 > r && (r = 0)), f[l++] = {
                            x: n,
                            y: r
                        };
                        for (f.sort(function (e, t) {
                            return e.x - t.x
                        }), u = new h(1, 1, null), p = c; --p > -1; ) o = f[p], u = new h(o.x, o.y, u);
                        this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
                    }, !0), m = n.prototype = new e, m.constructor = n, m.getRatio = function (e) {
                        var t = this._prev;
                        if (e > t.t) {
                            for (; t.next && e >= t.t; ) t = t.next;
                            t = t.prev
                        } else
                            for (; t.prev && t.t >= e; ) t = t.prev;
                        return this._prev = t, t.v + (e - t.t) / t.gap * t.c
                    }, m.config = function (e) {
                        return new n(e)
                    }, n.ease = new n, c("Bounce", f("BounceOut", function (e) {
                        return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                    }), f("BounceIn", function (e) {
                        return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
                    }), f("BounceInOut", function (e) {
                        var t = .5 > e;
                        return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
                    })), c("Circ", f("CircOut", function (e) {
                        return Math.sqrt(1 - (e -= 1) * e)
                    }), f("CircIn", function (e) {
                        return -(Math.sqrt(1 - e * e) - 1)
                    }), f("CircInOut", function (e) {
                        return 1 > (e *= 2) ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
                    })), r = function (t, n, r) {
                        var i = a("easing." + t, function (e, t) {
                            this._p1 = e >= 1 ? e : 1, this._p2 = (t || r) / (1 > e ? e : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                        }, !0),
                        s = i.prototype = new e;
                        return s.constructor = i, s.getRatio = n, s.config = function (e, t) {
                            return new i(e, t)
                        }, i
                    }, c("Elastic", r("ElasticOut", function (e) {
                        return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
                    }, .3), r("ElasticIn", function (e) {
                        return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
                    }, .3), r("ElasticInOut", function (e) {
                        return 1 > (e *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) + 1
                    }, .45)), c("Expo", f("ExpoOut", function (e) {
                        return 1 - Math.pow(2, -10 * e)
                    }), f("ExpoIn", function (e) {
                        return Math.pow(2, 10 * (e - 1)) - .001
                    }), f("ExpoInOut", function (e) {
                        return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
                    })), c("Sine", f("SineOut", function (e) {
                        return Math.sin(e * u)
                    }), f("SineIn", function (e) {
                        return -Math.cos(e * u) + 1
                    }), f("SineInOut", function (e) {
                        return -0.5 * (Math.cos(Math.PI * e) - 1)
                    })), a("easing.EaseLookup", {
                        find: function (t) {
                            return e.map[t]
                        }
                    }, !0), l(i.SlowMo, "SlowMo", "ease,"), l(n, "RoughEase", "ease,"), l(t, "SteppedEase", "ease,"), d
                }, !0)
                                    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (e, t) {
        "use strict";
        var n = e.GreenSockGlobals = e.GreenSockGlobals || e;
        if (!n.TweenLite) {
            var r, i, s, o, u, a = function (e) {
                var t, r = e.split("."),
                        i = n;
                for (t = 0; r.length > t; t++) i[r[t]] = i = i[r[t]] || {};
                return i
            },
                f = a("com.greensock"),
                l = 1e-10,
                c = function (e) {
                    var t, n = [],
                        r = e.length;
                    for (t = 0; t !== r; n.push(e[t++]));
                    return n
                },
                h = function () { },
                p = function () {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function (n) {
                        return null != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
                    }
                } (),
                d = {},
                v = function (r, i, s, o) {
                    this.sc = d[r] ? d[r].sc : [], d[r] = this, this.gsClass = null, this.func = s;
                    var u = [];
                    this.check = function (f) {
                        for (var l, c, h, p, m = i.length, g = m; --m > -1; ) (l = d[i[m]] || new v(i[m], [])).gsClass ? (u[m] = l.gsClass, g--) : f && l.sc.push(this);
                        if (0 === g && s)
                            for (c = ("com.greensock." + r).split("."), h = c.pop(), p = a(c.join("."))[h] = this.gsClass = s.apply(s, u), o && (n[h] = p, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + r.split(".").pop(), [], function () {
                                return p
                            }) : r === t && "undefined" != typeof module && module.exports && (module.exports = p)), m = 0; this.sc.length > m; m++) this.sc[m].check()
                    }, this.check(!0)
                },
                m = e._gsDefine = function (e, t, n, r) {
                    return new v(e, t, n, r)
                },
                g = f._class = function (e, t, n) {
                    return t = t || function () { }, m(e, [], function () {
                        return t
                    }, n), t
                };
            m.globals = n;
            var y = [0, 0, 1, 1],
                b = [],
                w = g("easing.Ease", function (e, t, n, r) {
                    this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? y.concat(t) : y
                }, !0),
                E = w.map = {},
                S = w.register = function (e, t, n, r) {
                    for (var i, s, o, u, a = t.split(","), l = a.length, c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1; )
                        for (s = a[l], i = r ? g("easing." + s, null, !0) : f.easing[s] || {}, o = c.length; --o > -1; ) u = c[o], E[s + "." + u] = E[u + s] = i[u] = e.getRatio ? e : e[u] || new e
                    };
            for (s = w.prototype, s._calcEnd = !1, s.getRatio = function (e) {
                if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
                var t = this._type,
                        n = this._power,
                        r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
                return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
            }, r = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], i = r.length; --i > -1; ) s = r[i] + ",Power" + i, S(new w(null, null, 1, i), s, "easeOut", !0), S(new w(null, null, 2, i), s, "easeIn" + (0 === i ? ",easeNone" : "")), S(new w(null, null, 3, i), s, "easeInOut");
            E.linear = f.easing.Linear.easeIn, E.swing = f.easing.Quad.easeInOut;
            var x = g("events.EventDispatcher", function (e) {
                this._listeners = {}, this._eventTarget = e || this
            });
            s = x.prototype, s.addEventListener = function (e, t, n, r, i) {
                i = i || 0;
                var s, a, f = this._listeners[e],
                    l = 0;
                for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1; ) s = f[a], s.c === t && s.s === n ? f.splice(a, 1) : 0 === l && i > s.pr && (l = a + 1);
                f.splice(l, 0, {
                    c: t,
                    s: n,
                    up: r,
                    pr: i
                }), this !== o || u || o.wake()
            }, s.removeEventListener = function (e, t) {
                var n, r = this._listeners[e];
                if (r)
                    for (n = r.length; --n > -1; )
                        if (r[n].c === t) return r.splice(n, 1), void 0
                    }, s.dispatchEvent = function (e) {
                        var t, n, r, i = this._listeners[e];
                        if (i)
                            for (t = i.length, n = this._eventTarget; --t > -1; ) r = i[t], r && (r.up ? r.c.call(r.s || n, {
                                type: e,
                                target: n
                            }) : r.c.call(r.s || n))
                    };
                    var T = e.requestAnimationFrame,
                N = e.cancelAnimationFrame,
                C = Date.now || function () {
                    return (new Date).getTime()
                },
                k = C();
                    for (r = ["ms", "moz", "webkit", "o"], i = r.length; --i > -1 && !T; ) T = e[r[i] + "RequestAnimationFrame"], N = e[r[i] + "CancelAnimationFrame"] || e[r[i] + "CancelRequestAnimationFrame"];
                    g("Ticker", function (e, t) {
                        var n, r, i, s, a, f = this,
                    c = C(),
                    p = t !== !1 && T,
                    d = 500,
                    v = 33,
                    m = "tick",
                    g = function (e) {
                        var t, o, u = C() - k;
                        u > d && (c += u - v), k += u, f.time = (k - c) / 1e3, t = f.time - a, (!n || t > 0 || e === !0) && (f.frame++, a += t + (t >= s ? .004 : s - t), o = !0), e !== !0 && (i = r(g)), o && f.dispatchEvent(m)
                    };
                        x.call(f), f.time = f.frame = 0, f.tick = function () {
                            g(!0)
                        }, f.lagSmoothing = function (e, t) {
                            d = e || 1 / l, v = Math.min(t, d, 0)
                        }, f.sleep = function () {
                            null != i && (p && N ? N(i) : clearTimeout(i), r = h, i = null, f === o && (u = !1))
                        }, f.wake = function () {
                            null !== i ? f.sleep() : f.frame > 10 && (k = C() - d + 5), r = 0 === n ? h : p && T ? T : function (e) {
                                return setTimeout(e, 0 | 1e3 * (a - f.time) + 1)
                            }, f === o && (u = !0), g(2)
                        }, f.fps = function (e) {
                            return arguments.length ? (n = e, s = 1 / (n || 60), a = this.time + s, f.wake(), void 0) : n
                        }, f.useRAF = function (e) {
                            return arguments.length ? (f.sleep(), p = e, f.fps(n), void 0) : p
                        }, f.fps(e), setTimeout(function () {
                            p && 5 > f.frame && f.useRAF(!1)
                        }, 1500)
                    }), s = f.Ticker.prototype = new f.events.EventDispatcher, s.constructor = f.Ticker;
                    var L = g("core.Animation", function (e, t) {
                        if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, z) {
                            u || o.wake();
                            var n = this.vars.useFrames ? U : z;
                            n.add(this, n._time), this.vars.paused && this.paused(!0)
                        }
                    });
                    o = L.ticker = new f.Ticker, s = L.prototype, s._dirty = s._gc = s._initted = s._paused = !1, s._totalTime = s._time = 0, s._rawPrevTime = -1, s._next = s._last = s._onUpdate = s._timeline = s.timeline = null, s._paused = !1;
                    var A = function () {
                        u && C() - k > 2e3 && o.wake(), setTimeout(A, 2e3)
                    };
                    A(), s.play = function (e, t) {
                        return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
                    }, s.pause = function (e, t) {
                        return null != e && this.seek(e, t), this.paused(!0)
                    }, s.resume = function (e, t) {
                        return null != e && this.seek(e, t), this.paused(!1)
                    }, s.seek = function (e, t) {
                        return this.totalTime(Number(e), t !== !1)
                    }, s.restart = function (e, t) {
                        return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
                    }, s.reverse = function (e, t) {
                        return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
                    }, s.render = function () { }, s.invalidate = function () {
                        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
                    }, s.isActive = function () {
                        var e, t = this._timeline,
                    n = this._startTime;
                        return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && n + this.totalDuration() / this._timeScale > e
                    }, s._enabled = function (e, t) {
                        return u || o.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
                    }, s._kill = function () {
                        return this._enabled(!1, !1)
                    }, s.kill = function (e, t) {
                        return this._kill(e, t), this
                    }, s._uncache = function (e) {
                        for (var t = e ? this : this.timeline; t; ) t._dirty = !0, t = t.timeline;
                        return this
                    }, s._swapSelfInParams = function (e) {
                        for (var t = e.length, n = e.concat(); --t > -1; ) "{self}" === e[t] && (n[t] = this);
                        return n
                    }, s._callback = function (e) {
                        var t = this.vars;
                        t[e].apply(t[e + "Scope"] || t.callbackScope || this, t[e + "Params"] || b)
                    }, s.eventCallback = function (e, t, n, r) {
                        if ("on" === (e || "").substr(0, 2)) {
                            var i = this.vars;
                            if (1 === arguments.length) return i[e];
                            null == t ? delete i[e] : (i[e] = t, i[e + "Params"] = p(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r), "onUpdate" === e && (this._onUpdate = t)
                        }
                        return this
                    }, s.delay = function (e) {
                        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
                    }, s.duration = function (e) {
                        return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
                    }, s.totalDuration = function (e) {
                        return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
                    }, s.time = function (e, t) {
                        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
                    }, s.totalTime = function (e, t, n) {
                        if (u || o.wake(), !arguments.length) return this._totalTime;
                        if (this._timeline) {
                            if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                                this._dirty && this.totalDuration();
                                var r = this._totalDuration,
                            i = this._timeline;
                                if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1), i._timeline)
                                    for (; i._timeline; ) i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
                                }
                                this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (this.render(e, t, !1), P.length && X())
                            }
                            return this
                        }, s.progress = s.totalProgress = function (e, t) {
                            return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
                        }, s.startTime = function (e) {
                            return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
                        }, s.endTime = function (e) {
                            return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
                        }, s.timeScale = function (e) {
                            if (!arguments.length) return this._timeScale;
                            if (e = e || l, this._timeline && this._timeline.smoothChildTiming) {
                                var t = this._pauseTime,
                        n = t || 0 === t ? t : this._timeline.totalTime();
                                this._startTime = n - (n - this._startTime) * this._timeScale / e
                            }
                            return this._timeScale = e, this._uncache(!1)
                        }, s.reversed = function (e) {
                            return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                        }, s.paused = function (e) {
                            if (!arguments.length) return this._paused;
                            var t, n, r = this._timeline;
                            return e != this._paused && r && (u || e || o.wake(), t = r.rawTime(), n = t - this._pauseTime, !e && r.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== n && this._initted && this.duration() && this.render(r.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, !0, !0)), this._gc && !e && this._enabled(!0, !1), this
                        };
                        var O = g("core.SimpleTimeline", function (e) {
                            L.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
                        });
                        s = O.prototype = new L, s.constructor = O, s.kill()._gc = !1, s._first = s._last = s._recent = null, s._sortChildren = !1, s.add = s.insert = function (e, t) {
                            var n, r;
                            if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren)
                                for (r = e._startTime; n && n._startTime > r; ) n = n._prev;
                            return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = n, this._recent = e, this._timeline && this._uncache(!0), this
                        }, s._remove = function (e, t) {
                            return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                        }, s.render = function (e, t, n) {
                            var r, i = this._first;
                            for (this._totalTime = this._time = this._rawPrevTime = e; i; ) r = i._next, (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)), i = r
                        }, s.rawTime = function () {
                            return u || o.wake(), this._totalTime
                        };
                        var M = g("TweenLite", function (t, n, r) {
                            if (L.call(this, n, r), this.render = M.prototype.render, null == t) throw "Cannot tween a null target.";
                            this.target = t = "string" != typeof t ? t : M.selector(t) || t;
                            var i, s, o, u = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                        a = this.vars.overwrite;
                            if (this._overwrite = a = null == a ? R[M.defaultOverwrite] : "number" == typeof a ? a >> 0 : R[a], (u || t instanceof Array || t.push && p(t)) && "number" != typeof t[0])
                                for (this._targets = o = c(t), this._propLookup = [], this._siblings = [], i = 0; o.length > i; i++) s = o[i], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(i--, 1), this._targets = o = o.concat(c(s))) : (this._siblings[i] = V(s, this, !1), 1 === a && this._siblings[i].length > 1 && J(s, this, null, 1, this._siblings[i])) : (s = o[i--] = M.selector(s), "string" == typeof s && o.splice(i + 1, 1)) : o.splice(i--, 1);
                            else this._propLookup = {}, this._siblings = V(t, this, !1), 1 === a && this._siblings.length > 1 && J(t, this, null, 1, this._siblings);
                            (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(-this._delay))
                        }, !0),
                _ = function (t) {
                    return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
                },
                D = function (e, t) {
                    var n, r = {};
                    for (n in e) q[n] || n in t && "transform" !== n && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!j[n] || j[n] && j[n]._autoCSS) || (r[n] = e[n], delete e[n]);
                    e.css = r
                };
                        s = M.prototype = new L, s.constructor = M, s.kill()._gc = !1, s.ratio = 0, s._firstPT = s._targets = s._overwrittenProps = s._startAt = null, s._notifyPluginsOfEnabled = s._lazy = !1, M.version = "1.17.0", M.defaultEase = s._ease = new w(null, null, 1, 1), M.defaultOverwrite = "auto", M.ticker = o, M.autoSleep = 120, M.lagSmoothing = function (e, t) {
                            o.lagSmoothing(e, t)
                        }, M.selector = e.$ || e.jQuery || function (t) {
                            var n = e.$ || e.jQuery;
                            return n ? (M.selector = n, n(t)) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
                        };
                        var P = [],
                H = {},
                B = M._internals = {
                    isArray: p,
                    isSelector: _,
                    lazyTweens: P
                },
                j = M._plugins = {},
                F = B.tweenLookup = {},
                I = 0,
                q = B.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1
                },
                R = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                U = L._rootFramesTimeline = new O,
                z = L._rootTimeline = new O,
                W = 30,
                X = B.lazyRender = function () {
                    var e, t = P.length;
                    for (H = {}; --t > -1; ) e = P[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                    P.length = 0
                };
                        z._startTime = o.time, U._startTime = o.frame, z._active = U._active = !0, setTimeout(X, 1), L._updateRoot = M.render = function () {
                            var e, t, n;
                            if (P.length && X(), z.render((o.time - z._startTime) * z._timeScale, !1, !1), U.render((o.frame - U._startTime) * U._timeScale, !1, !1), P.length && X(), o.frame >= W) {
                                W = o.frame + (parseInt(M.autoSleep, 10) || 120);
                                for (n in F) {
                                    for (t = F[n].tweens, e = t.length; --e > -1; ) t[e]._gc && t.splice(e, 1);
                                    0 === t.length && delete F[n]
                                }
                                if (n = z._first, (!n || n._paused) && M.autoSleep && !U._first && 1 === o._listeners.tick.length) {
                                    for (; n && n._paused; ) n = n._next;
                                    n || o.sleep()
                                }
                            }
                        }, o.addEventListener("tick", L._updateRoot);
                        var V = function (e, t, n) {
                            var r, i, s = e._gsTweenID;
                            if (F[s || (e._gsTweenID = s = "t" + I++)] || (F[s] = {
                                target: e,
                                tweens: []
                            }), t && (r = F[s].tweens, r[i = r.length] = t, n))
                                for (; --i > -1; ) r[i] === t && r.splice(i, 1);
                            return F[s].tweens
                        },
                $ = function (e, t, n, r) {
                    var i, s, o = e.vars.onOverwrite;
                    return o && (i = o(e, t, n, r)), o = M.onOverwrite, o && (s = o(e, t, n, r)), i !== !1 && s !== !1
                },
                J = function (e, t, n, r, i) {
                    var s, o, u, a;
                    if (1 === r || r >= 4) {
                        for (a = i.length, s = 0; a > s; s++)
                            if ((u = i[s]) !== t) u._gc || u._kill(null, e, t) && (o = !0);
                            else if (5 === r) break;
                        return o
                    }
                    var f, c = t._startTime + l,
                        h = [],
                        p = 0,
                        d = 0 === t._duration;
                    for (s = i.length; --s > -1; ) (u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (f = f || K(t, 0, d), 0 === K(u, f, d) && (h[p++] = u)) : c >= u._startTime && u._startTime + u.totalDuration() / u._timeScale > c && ((d || !u._initted) && 2e-10 >= c - u._startTime || (h[p++] = u)));
                    for (s = p; --s > -1; )
                        if (u = h[s], 2 === r && u._kill(n, e, t) && (o = !0), 2 !== r || !u._firstPT && u._initted) {
                            if (2 !== r && !$(u, t)) continue;
                            u._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                K = function (e, t, n) {
                    for (var r = e._timeline, i = r._timeScale, s = e._startTime; r._timeline; ) {
                        if (s += r._startTime, i *= r._timeScale, r._paused) return -100;
                        r = r._timeline
                    }
                    return s /= i, s > t ? s - t : n && s === t || !e._initted && 2 * l > s - t ? l : (s += e.totalDuration() / e._timeScale / i) > t + l ? 0 : s - t - l
                };
                        s._init = function () {
                            var e, t, n, r, i, s = this.vars,
                    o = this._overwrittenProps,
                    u = this._duration,
                    a = !!s.immediateRender,
                    f = s.ease;
                            if (s.startAt) {
                                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), i = {};
                                for (r in s.startAt) i[r] = s.startAt[r];
                                if (i.overwrite = !1, i.immediateRender = !0, i.lazy = a && s.lazy !== !1, i.startAt = i.delay = null, this._startAt = M.to(this.target, 0, i), a)
                                    if (this._time > 0) this._startAt = null;
                                    else if (0 !== u) return
                            } else if (s.runBackwards && 0 !== u)
                                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                                else {
                                    0 !== this._time && (a = !1), n = {};
                                    for (r in s) q[r] && "autoCSS" !== r || (n[r] = s[r]);
                                    if (n.overwrite = 0, n.data = "isFromStart", n.lazy = a && s.lazy !== !1, n.immediateRender = a, this._startAt = M.to(this.target, 0, n), a) {
                                        if (0 === this._time) return
                                    } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                                }
                            if (this._ease = f = f ? f instanceof w ? f : "function" == typeof f ? new w(f, s.easeParams) : E[f] || M.defaultEase : M.defaultEase, s.easeParams instanceof Array && f.config && (this._ease = f.config.apply(f, s.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                                for (e = this._targets.length; --e > -1; ) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], o ? o[e] : null) && (t = !0);
                            else t = this._initProps(this.target, this._propLookup, this._siblings, o);
                            if (t && M._onPluginEvent("_onInitAllProps", this), o && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), s.runBackwards)
                                for (n = this._firstPT; n; ) n.s += n.c, n.c = -n.c, n = n._next;
                            this._onUpdate = s.onUpdate, this._initted = !0
                        }, s._initProps = function (t, n, r, i) {
                            var s, o, u, a, f, l;
                            if (null == t) return !1;
                            H[t._gsTweenID] && X(), this.vars.css || t.style && t !== e && t.nodeType && j.css && this.vars.autoCSS !== !1 && D(this.vars, t);
                            for (s in this.vars) {
                                if (l = this.vars[s], q[s]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[s] = l = this._swapSelfInParams(l, this));
                                else if (j[s] && (a = new j[s])._onInitTween(t, this.vars[s], this)) {
                                    for (this._firstPT = f = {
                                        _next: this._firstPT,
                                        t: a,
                                        p: "setRatio",
                                        s: 0,
                                        c: 1,
                                        f: !0,
                                        n: s,
                                        pg: !0,
                                        pr: a._priority
                                    }, o = a._overwriteProps.length; --o > -1; ) n[a._overwriteProps[o]] = this._firstPT;
                                    (a._priority || a._onInitAllProps) && (u = !0), (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
                                } else this._firstPT = n[s] = f = {
                                    _next: this._firstPT,
                                    t: t,
                                    p: s,
                                    f: "function" == typeof t[s],
                                    n: s,
                                    pg: !1,
                                    pr: 0
                                }, f.s = f.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), f.c = "string" == typeof l && "=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0;
                                f && f._next && (f._next._prev = f)
                            }
                            return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && J(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (H[t._gsTweenID] = !0), u)
                        }, s.render = function (e, t, n) {
                            var r, i, s, o, u = this._time,
                    a = this._duration,
                    f = this._rawPrevTime;
                            if (e >= a) this._totalTime = this._time = a, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === a && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > f || f === l && "isPause" !== this.data) && f !== e && (n = !0, f > l && (i = "onReverseComplete")), this._rawPrevTime = o = !t || e || f === e ? e : l);
                            else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== u || 0 === a && f > 0) && (i = "onReverseComplete", r = this._reversed), 0 > e && (this._active = !1, 0 === a && (this._initted || !this.vars.lazy || n) && (f >= 0 && (f !== l || "isPause" !== this.data) && (n = !0), this._rawPrevTime = o = !t || e || f === e ? e : l)), this._initted || (n = !0);
                            else if (this._totalTime = this._time = e, this._easeType) {
                                var c = e / a,
                        h = this._easeType,
                        p = this._easePower;
                                (1 === h || 3 === h && c >= .5) && (c = 1 - c), 3 === h && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), this.ratio = 1 === h ? 1 - c : 2 === h ? c : .5 > e / a ? c / 2 : 1 - c / 2
                            } else this.ratio = this._ease.getRatio(e / a);
                            if (this._time !== u || n) {
                                if (!this._initted) {
                                    if (this._init(), !this._initted || this._gc) return;
                                    if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = u, this._rawPrevTime = f, P.push(this), this._lazy = [e, t], void 0;
                                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / a) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                                }
                                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== u && e >= 0 && (this._active = !0), 0 === u && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === a) && (t || this._callback("onStart"))), s = this._firstPT; s; ) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                                this._onUpdate && (0 > e && this._startAt && e !== -0.0001 && this._startAt.render(e, t, n), t || (this._time !== u || r) && this._callback("onUpdate")), i && (!this._gc || n) && (0 > e && this._startAt && !this._onUpdate && e !== -0.0001 && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this._callback(i), 0 === a && this._rawPrevTime === l && o !== l && (this._rawPrevTime = 0))
                            }
                        }, s._kill = function (e, t, n) {
                            if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
                                t = "string" != typeof t ? t || this._targets || this.target : M.selector(t) || t;
                                var r, i, s, o, u, a, f, l, c, h = n && this._time && n._startTime === this._startTime && this._timeline === n._timeline;
                                if ((p(t) || _(t)) && "number" != typeof t[0])
                                    for (r = t.length; --r > -1; ) this._kill(e, t[r], n) && (a = !0);
                                else {
                                    if (this._targets) {
                                        for (r = this._targets.length; --r > -1; )
                                            if (t === this._targets[r]) {
                                                u = this._propLookup[r] || {}, this._overwrittenProps = this._overwrittenProps || [], i = this._overwrittenProps[r] = e ? this._overwrittenProps[r] || {} : "all";
                                                break
                                            }
                                    } else {
                                        if (t !== this.target) return !1;
                                        u = this._propLookup, i = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                                    }
                                    if (u) {
                                        if (f = e || u, l = e !== i && "all" !== i && e !== u && ("object" != typeof e || !e._tempKill), n && (M.onOverwrite || this.vars.onOverwrite)) {
                                            for (s in f) u[s] && (c || (c = []), c.push(s));
                                            if ((c || !e) && !$(this, n, t, c)) return !1
                                        }
                                        for (s in f) (o = u[s]) && (h && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, a = !0), o.pg && o.t._kill(f) && (a = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete u[s]), l && (i[s] = 1);
                                        !this._firstPT && this._initted && this._enabled(!1, !1)
                                    }
                                }
                                return a
                            }
                            return this._lazy = !1, this._enabled(!1, !1)
                        }, s.invalidate = function () {
                            return this._notifyPluginsOfEnabled && M._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], L.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -l, this.render(-this._delay)), this
                        }, s._enabled = function (e, t) {
                            if (u || o.wake(), e && this._gc) {
                                var n, r = this._targets;
                                if (r)
                                    for (n = r.length; --n > -1; ) this._siblings[n] = V(r[n], this, !0);
                                else this._siblings = V(this.target, this, !0)
                            }
                            return L.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? M._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
                        }, M.to = function (e, t, n) {
                            return new M(e, t, n)
                        }, M.from = function (e, t, n) {
                            return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new M(e, t, n)
                        }, M.fromTo = function (e, t, n, r) {
                            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new M(e, t, r)
                        }, M.delayedCall = function (e, t, n, r, i) {
                            return new M(t, 0, {
                                delay: e,
                                onComplete: t,
                                onCompleteParams: n,
                                callbackScope: r,
                                onReverseComplete: t,
                                onReverseCompleteParams: n,
                                immediateRender: !1,
                                lazy: !1,
                                useFrames: i,
                                overwrite: 0
                            })
                        }, M.set = function (e, t) {
                            return new M(e, 0, t)
                        }, M.getTweensOf = function (e, t) {
                            if (null == e) return [];
                            e = "string" != typeof e ? e : M.selector(e) || e;
                            var n, r, i, s;
                            if ((p(e) || _(e)) && "number" != typeof e[0]) {
                                for (n = e.length, r = []; --n > -1; ) r = r.concat(M.getTweensOf(e[n], t));
                                for (n = r.length; --n > -1; )
                                    for (s = r[n], i = n; --i > -1; ) s === r[i] && r.splice(n, 1)
                            } else
                                for (r = V(e).concat(), n = r.length; --n > -1; ) (r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1);
                            return r
                        }, M.killTweensOf = M.killDelayedCallsTo = function (e, t, n) {
                            "object" == typeof t && (n = t, t = !1);
                            for (var r = M.getTweensOf(e, t), i = r.length; --i > -1; ) r[i]._kill(n, e)
                        };
                        var Q = g("plugins.TweenPlugin", function (e, t) {
                            this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = Q.prototype
                        }, !0);
                        if (s = Q.prototype, Q.version = "1.10.1", Q.API = 2, s._firstPT = null, s._addTween = function (e, t, n, r, i, s) {
                            var o, u;
                            return null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - Number(n) : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = u = {
                                _next: this._firstPT,
                                t: e,
                                p: t,
                                s: n,
                                c: o,
                                f: "function" == typeof e[t],
                                n: i || t,
                                r: s
                            }, u._next && (u._next._prev = u), u) : void 0
                        }, s.setRatio = function (e) {
                            for (var t, n = this._firstPT, r = 1e-6; n; ) t = n.c * e + n.s, n.r ? t = Math.round(t) : r > t && t > -r && (t = 0), n.f ? n.t[n.p](t) : n.t[n.p] = t, n = n._next
                        }, s._kill = function (e) {
                            var t, n = this._overwriteProps,
                        r = this._firstPT;
                            if (null != e[this._propName]) this._overwriteProps = [];
                            else
                                for (t = n.length; --t > -1; ) null != e[n[t]] && n.splice(t, 1);
                            for (; r; ) null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
                            return !1
                        }, s._roundProps = function (e, t) {
                            for (var n = this._firstPT; n; ) (e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t), n = n._next
                        }, M._onPluginEvent = function (e, t) {
                            var n, r, i, s, o, u = t._firstPT;
                            if ("_onInitAllProps" === e) {
                                for (; u; ) {
                                    for (o = u._next, r = i; r && r.pr > u.pr; ) r = r._next;
                                    (u._prev = r ? r._prev : s) ? u._prev._next = u : i = u, (u._next = r) ? r._prev = u : s = u, u = o
                                }
                                u = t._firstPT = i
                            }
                            for (; u; ) u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0), u = u._next;
                            return n
                        }, Q.activate = function (e) {
                            for (var t = e.length; --t > -1; ) e[t].API === Q.API && (j[(new e[t])._propName] = e[t]);
                            return !0
                        }, m.plugin = function (e) {
                            if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                            var t, n = e.propName,
                        r = e.priority || 0,
                        i = e.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_roundProps",
                            initAll: "_onInitAllProps"
                        },
                        o = g("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function () {
                            Q.call(this, n, r), this._overwriteProps = i || []
                        }, e.global === !0),
                        u = o.prototype = new Q(n);
                            u.constructor = o, o.API = e.API;
                            for (t in s) "function" == typeof e[t] && (u[s[t]] = e[t]);
                            return o.version = e.version, Q.activate([o]), o
                        }, r = e._gsQueue) {
                            for (i = 0; r.length > i; i++) r[i]();
                            for (s in d) d[s].func || e.console.log("GSAP encountered missing dependency: com.greensock." + s)
                        }
                        u = !1
                    }
                } ("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), define("greensock/TweenMax.min", function () { }),
    function (e) {
        function n(e) {
            for (var t in e) e.hasOwnProperty(t) && (e[t] = null);
            e = null
        }
        var t = function (e, t) {
            this.task_arr = [], this.defaultScope = e || this, this.id = t || "", this.verbose = !1
        };
        t.prototype = {
            execute: function (e) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | execute"), this.addNext(e), this.runStep("")
            },
            addNext: function (e) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | addNext");
                if (typeof e == "function") this.task_arr.unshift({
                    fn: e,
                    vars: null
                });
                else {
                    e.reverse();
                    for (var t = 0; t < e.length; t++) e[t] && this.task_arr.unshift(e[t])
                }
            },
            tackOn: function (e) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | tackOn");
                for (var t = 0; t < e.length; t++) this.task_arr.push(e[t]);
                this.runStep("")
            },
            runFunctionInScope: function (e) {
                var t = e[0],
                    n = e[1],
                    r = e.length > 2 ? e[2] : null;
                e.length > 2 ? t[n](e[2]) : t[n]()
            },
            runStep: function (e) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | runStep");
                if (this.task_arr.length == 0) return;
                var t = this.task_arr.shift(),
                    r = t.fn;
                t.scope = t.scope || this.defaultScope, t.vars = t.vars || [], typeof t.vars == "string" && (t.vars = [t.vars]), t.vars.push(this.stepComplete.bind(this)), r.apply(t.scope, t.vars), n(t)
            },
            stepComplete: function (t) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | stepComplete"), this.task_arr.length > 0 && e.requestAnimationFrame(this.runStep.bind(this))
            },
            stepComplete_instant: function (e) {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | stepComplete_instant"), this.task_arr.length > 0 && this.runStep()
            },
            clearArrayExecuter: function () {
                this.verbose && console.log("ArrayExecuter | " + this.id + " | clearArrayExecuter"), this.task_arr = []
            },
            destroy: function () {
                for (var e = 0; e < this.task_arr.length; e++) n(this.task_arr[e]);
                this.task_arr = [], this.defaultScope = null
            }
        }, e.utils = e.utils || {}, e.utils.ArrayExecuter = t
    } (window), define("utils/ArrayExecuter", function () { }), requirejs.config({
        paths: {
            root: "../",
            jquery: "../bower_components/jquery/dist/jquery",
            gsap: "../bower_components/greensock/src/minified/",
            greensock: "../bower_components/greensock/src/minified",
            mustache: "../bower_components/mustache/mustache",
            howler: "../bower_components/howler/howler",
            text: "../bower_components/text/text"
        },
        map: {
            "*": {
                TweenLite: "greensock/TweenMax.min",
                TweenMax: "greensock/TweenMax.min",
                "greensock/TweenLite.min": "greensock/TweenMax.min",
                "greensock/TimelineLite.min": "greensock/TweenMax.min",
                "greensock/easing/EasePack.min": "greensock/TweenMax.min",
                "greensock/plugins/CSSPlugin.min": "greensock/TweenMax.min"
            }
        }
    }), require(["jquery", "utils/loadTracker", "utils/history", "grid", "colorWipe", "colorDrag", "letter", "about", "home", "sound", "settings", "slideshow", "TweenLite", "utils/ArrayExecuter"], function (e, t, n, r, i, s, o, u, a, f) {
        function l() {
            window.changeLetter = v.bind(this);
            var e = document.getElementById("wrapper");
            this.sound = new f, this.colorWipe = new i, this.colorDrag = new s, this.sections = new Slideshow, this.sections.buildFromDOM(document.getElementById("sectionSlider")), this.alphabet = new Slideshow, this.alphabet.buildFromJSON(document.getElementById("alphabet"), siteSettings.alphabet, o), this.grid = new r, this.about = new u, this.home = new a, this.sections.getSlideById("alphabet").classObj = this.alphabet, this.sections.getSlideById("home").classObj = this.home, this.sections.getSlideById("grid").classObj = this.grid, this.arrayExecuter = new utils.ArrayExecuter(this), this.loadTracker = new t, this.history = new n, this.history.checkDeeplink();
            var l = [{
                fn: c
            }, {
                fn: hideLoader,
                scope: window
            }, {
                fn: h
            }];
            this.arrayExecuter.execute(l), window.onresize = E.bind(this), E.call(this)
        }

        function c(e) {
            var t = [],
                n, r = [],
                i = this.history.deeplink.alphabet ? this.history.deeplink.alphabet : "a";
            for (var s = 0; s < this.alphabet.slides.length; s++) n = this.alphabet.slides[s].classObj, n.filesToLoad && (t = t.concat(n.filesToLoad));
            t = t.concat(this.home.filesToLoad), t = t.concat(this.grid.filesToLoad);
            if (Howler && Howler._howls && Howler._howls[0] && Howler._howls[0]._src && Howler._howls[0]._src !== "") {
                var o = {
                    id: "audio",
                    path: Howler._howls[0]._src
                };
                r.push(o), t.push(o)
            }
            this.loadTracker.addFiles(t), r = r.concat(this.alphabet.getSlideById(i).classObj.filesToLoad), r = r.concat(this.home.filesToLoad), r = r.concat(this.grid.filesToLoad), this.loadTracker.loadFiles(r, e)
        }

        function h(e) {
            E.call(this);
            var t = function () {
                document.body.addEventListener("keydown", m.bind(this)), e && e()
            } .bind(this);
            if (this.history.deeplink && this.history.deeplink.sections !== "home") {
                var n = null;
                if (this.history.deeplink && this.history.deeplink.sections == "alphabet") {
                    var r = this.alphabet.getSlideById(this.history.deeplink.alphabet);
                    n = r.wipeColors ? r.wipeColors : [r.gridColor, r.contentColor, r.accentColor]
                }
                this.colorWipe.show(n, 1, null, function () {
                    this.sections.gotoSlide(this.history.deeplink.sections), this.history.deeplink.alphabet ? this.alphabet.getSlideById(this.history.deeplink.alphabet).classObj.init(function () {
                        this.alphabet.gotoSlide(this.history.deeplink.alphabet), this.colorWipe.hide(), t();
                        var e = (this.alphabet.currSlide - 1 + this.alphabet.slides.length) % this.alphabet.slides.length,
                            n = (this.alphabet.currSlide + 1 + this.alphabet.slides.length) % this.alphabet.slides.length;
                        this.loadTracker.loadFiles(this.alphabet.slides[e].classObj.filesToLoad), this.loadTracker.loadFiles(this.alphabet.slides[n].classObj.filesToLoad)
                    } .bind(this)) : (this.colorWipe.hide(), t())
                } .bind(this))
            } else this.sections.gotoSlide("home"), t()
        }

        function p(e) { }

        function d() { }

        function v(e) {
            function u() {
                var e = r.wipeColors ? r.wipeColors : [r.gridColor, r.contentColor, r.accentColor],
                    n = this.alphabet.slides[this.alphabet.currSlide];
                n && n.classObj && (n = n.classObj), this.colorDrag.flipped && (this.colorDrag.flipped = !1, this.colorDrag.hide(), this.colorWipe.instant = !0), this.colorWipe.show(e, t, n ? n.transition.bind(n) : null, o)
            }
            var t = 1;
            if (typeof e == "number") {
                e < 0 && (t = 0);
                var n = (this.alphabet.currSlide + e + this.alphabet.slides.length) % this.alphabet.slides.length;
                e = this.alphabet.slides[n].id
            }
            var r = this.alphabet.getSlideById(e),
                i = r.classObj.filesToLoad,
                s = 0;
            this.loadTracker.loadFiles(i);
            var o = function () {
                var t = this.loadTracker.checkFiles(i);
                if (!t) {
                    window.requestAnimationFrame(o), s++;
                    return
                }
                this.sections.currId != "alphabet" && this.sections.gotoSlide("alphabet"), this.alphabet.gotoSlide(e), s > 10, this.history.change(e), this.colorWipe.hide(r.classObj.transition.bind(r.classObj));
                var n = (this.alphabet.currSlide - 1 + this.alphabet.slides.length) % this.alphabet.slides.length,
                    u = (this.alphabet.currSlide + 1 + this.alphabet.slides.length) % this.alphabet.slides.length;
                this.loadTracker.loadFiles(this.alphabet.slides[n].classObj.filesToLoad), this.loadTracker.loadFiles(this.alphabet.slides[u].classObj.filesToLoad)
            } .bind(this);
            r.classObj.initialized ? u.call(this) : r.classObj.init(u.bind(this))
        }

        function m(e) {
            if (this.colorWipe.moving) return;
            var t = e.keyCode;
            t == 12 || t == 13 && this.sections.currId == "alphabet" ? v.call(this, -1) : (t == 13 || t == 14 && this.sections.currId == "alphabet") && v.call(this, 1)
        }

        function g(e, t) {
            var n = y(e),
                r = y(t);
            return "rgb(" + Math.round((n[0] + r[0]) / 2) + ", " + Math.round((n[1] + r[1]) / 2) + ", " + Math.round((n[2] + r[2]) / 2) + ")"
        }

        function y(e) {
            return e = e.replace("#", ""), [Number("0x" + e.substr(0, 2)), Number("0x" + e.substr(2, 2)), Number("0x" + e.substr(4, 2))]
        }

        function b() {
            var e = this.sections.currId == "home" ? 1 : 0;
            this.colorWipe.show(null, e, null, function () {
                this.grid.reset(), this.sections.gotoSlide("grid"), this.history.change("grid"), this.colorWipe.hide()
            } .bind(this))
        }

        function w() {
            this.colorWipe.show(null, 0, null, function () {
                this.sections.gotoSlide("home"), this.history.change(""), this.colorWipe.hide()
            } .bind(this))
        }

        function E() {
            var e = window.innerWidth,
                t = window.innerHeight;
            this.sections.resize(e, t), this.alphabet.resize(e, t), this.grid.resize(e, t), this.about.resize(e, t), this.home.resize(e, t), this.colorDrag.resize(e, t)
        }
        l.prototype.resize = E, l.prototype.gotoMenu = b, l.prototype.gotoHome = w, l.prototype.changeLetter = v, e(function () {
            window.app = new l
        })
    }), define("main", function () { }), require(["main"]);