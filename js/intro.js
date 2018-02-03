"use strict";

function init() {
    androidFix.call(this), window.siteLoaded = !1, document.getElementById("wrapper").style.display = "block", prepIntroAnimation(), createClouds(), update(), addMainScript()
}

function androidFix() {
    if (-1 != navigator.userAgent.indexOf("Android") && Math.max(window.innerWidth, window.innerHeight) > 800) {
        var a = document.getElementById("viewportTag");
        a.setAttribute("content", "user-scalable=no,initial-scale=1.5,maximum-scale=1.5")
    }
}

function hideLoader(a) {
    introElements.showOutro = !0, introElements.outroDone ? (document.getElementById("initialLoader").style.display = "none", a()) : window.requestAnimationFrame(function () {
        hideLoader(a)
    })
}

function update() {
    introElements.outroDone || (updateAnimation(), updateClouds.call(introElements), window.requestAnimationFrame(update.bind(this)))
}

function prepIntroAnimation() {
    var a = document.getElementById("loadDiamondStatic"),
        b = document.getElementById("loadDiamondStaticPath"),
        c = document.getElementById("loadDiamondShadow"),
        d = document.getElementById("loadDiamondShadowPath"),
        e = document.getElementById("loadTree"),
        f = document.getElementById("loadTreeBorderPath"),
        g = f.getTotalLength();
    f.style.strokeDasharray = g + " " + g, f.style.strokeDashoffset = g + "px", c.style.left = ".035em";
    var h = [{
        time: 800,
        dur: 1500,
        tweens: [{
            obj: a,
            type: "style",
            val: "top",
            unit: "em",
            from: 2.9,
            to: 0,
            ease: easeOutElastic
        }]
    }, {
        time: 800,
        dur: 200,
        tweens: [{
            obj: b,
            type: "fill-opacity",
            from: 0,
            to: 1,
            ease: easeLinear
        }]
    }, {
        time: 900,
        dur: 1500,
        tweens: [{
            obj: c,
            type: "style",
            val: "top",
            unit: "em",
            from: 2.9,
            to: .035,
            ease: easeOutElastic
        }]
    }, {
        time: 900,
        dur: 1500,
        tweens: [{
            obj: d,
            type: "fill-opacity",
            from: 0,
            to: .2,
            ease: easeLinear
        }]
    }],
        i = [{
            time: 0,
            dur: 2e3,
            tweens: [{
                obj: f,
                type: "style",
                val: "strokeDashoffset",
                unit: "px",
                from: g,
                to: -g,
                ease: easeInOutQuart
            }]
        }],
        j = [{
            time: 0,
            dur: 600,
            tweens: [{
                obj: f,
                type: "style",
                val: "strokeDashoffset",
                unit: "px",
                from: g,
                to: 0,
                ease: easeInOutQuart
            }]
        }, {
            time: 800,
            dur: 50,
            tweens: [{
                obj: f,
                type: "fill-opacity",
                from: 0,
                to: 1,
                ease: easeLinear
            }]
        }, {
            time: 1350,
            dur: 300,
            tweens: [{
                obj: e,
                type: "style",
                val: "top",
                unit: "em",
                from: 0,
                to: -3.9,
                ease: easeInQuint
            }, {
                obj: a,
                type: "style",
                val: "top",
                unit: "em",
                from: 0,
                to: -3.9,
                ease: easeInQuint
            }, {
                obj: c,
                type: "style",
                val: "top",
                unit: "em",
                from: .035,
                to: -3.9,
                ease: easeInQuint
            }, {
                obj: b,
                type: "fill-opacity",
                from: 1,
                to: 0,
                ease: easeInQuint
            }, {
                obj: d,
                type: "fill-opacity",
                from: .2,
                to: 0,
                ease: easeInQuint
            }, {
                obj: f,
                type: "fill-opacity",
                from: 1,
                to: 0,
                ease: easeLinear
            }, {
                obj: f,
                type: "stroke-opacity",
                from: 1,
                to: 0,
                ease: easeLinear
            }]
        }];
    introElements.loopAnimation = i, introElements.outroAnimation = j, introElements.currAnimation = h;
    for (var k = 0, l = 0; l < introElements.currAnimation.length; l++) k = Math.max(k, introElements.currAnimation[l].time + introElements.currAnimation[l].dur);
    introElements.currAnimationStart = Date.now(), introElements.currAnimationLength = k, introElements.outroDone = !1
}

function prepLoopAnimation() {
    introElements.currAnimation = introElements.loopAnimation;
    for (var a = 0, b = 0; b < introElements.currAnimation.length; b++) a = Math.max(a, introElements.currAnimation[b].time + introElements.currAnimation[b].dur);
    introElements.currAnimationStart = Date.now(), introElements.currAnimationLength = a
}

function prepOutroAnimation() {
    setTimeout(function () {
        app.sound.play("chime")
    }, 800), introElements.currAnimation = introElements.outroAnimation;
    for (var a = 0, b = 0; b < introElements.currAnimation.length; b++) a = Math.max(a, introElements.currAnimation[b].time + introElements.currAnimation[b].dur);
    introElements.currAnimationStart = Date.now(), introElements.currAnimationLength = a
}

function updateAnimation() {
    var a, b, c, d, e, f, g, h, i = Date.now() - introElements.currAnimationStart;
    for (d = 0; d < introElements.currAnimation.length; d++)
        if (a = i, b = introElements.currAnimation[d], !(i < b.time)) {
            if (i > b.time + b.dur) {
                if (i > b.time + b.dur + 60) continue;
                a = b.time + b.dur
            }
            for (e = 0; e < b.tweens.length; e++) c = b.tweens[e], h = "", "style" == c.type ? (f = c.ease(a - b.time, c.from, c.to - c.from, b.dur), c.obj.style[c.val] = f + c.unit) : "translate" == c.type ? (f = c.ease(a - b.time, c.from[0], c.to[0] - c.from[0], b.dur), g = c.ease(a - b.time, c.from[1], c.to[1] - c.from[1], b.dur), c.obj.setAttribute("transform", "translate(" + f + " " + g + ")")) : "fill-opacity" == c.type ? (f = c.ease(a - b.time, c.from, c.to - c.from, b.dur), c.obj.setAttribute("fill-opacity", f)) : "stroke-opacity" == c.type ? (f = c.ease(a - b.time, c.from, c.to - c.from, b.dur), c.obj.setAttribute("stroke-opacity", f)) : "scale" == c.type && (f = c.ease(a - b.time, c.from, c.to - c.from, b.dur), c.obj.setAttribute("transform", "scale(" + f + ")"))
        }
    i > introElements.currAnimationLength + 60 && (introElements.outroStarted ? introElements.outroDone = !0 : introElements.showOutro ? (introElements.outroStarted = !0, prepOutroAnimation()) : prepLoopAnimation())
}

function easeInQuint(a, b, c, d) {
    return c * (a /= d) * a * a * a * a + b
}

function easeInOutQuart(a, b, c, d) {
    return (a /= d / 2) < 1 ? c / 2 * a * a * a * a + b : -c / 2 * ((a -= 2) * a * a * a - 2) + b
}

function easeLinear(a, b, c, d) {
    return 0 == a ? b : a == d ? b + c : b + c * (a / d)
}

function easeOutElastic(a, b, c, d) {
    var e = 1.70158,
        f = 0,
        g = c;
    return 0 == a ? b : 1 == (a /= d) ? b + c : (f || (f = .7 * d), g < Math.abs(c) ? (g = c, e = f / 4) : e = f / (2 * Math.PI) * Math.asin(c / g), g * Math.pow(2, -10 * a) * Math.sin((a * d - e) * (2 * Math.PI) / f) + c + b)
}

function createClouds() {
    for (var a = document.getElementById("homeBgIntro"), b = [{
        img: "images/home/cloud-lrg.png",
        dimensions: {
            w: 405,
            h: 16
        }
    }, {
        img: "images/home/cloud-med.png",
        dimensions: {
            w: 250,
            h: 16
        }
    }, {
        img: "images/home/cloud-sml.png",
        dimensions: {
            w: 154,
            h: 16
        }
    }], c = [], d = 11, e = 0; d > e; e++) {
        var f = document.createElement("img"),
            g = b[e % b.length],
            h = 100 * Math.random();
        f.src = g.img, f.style.width = g.dimensions.w / 100 + "em", f.style.height = g.dimensions.h / 100 + "em", f.style.top = (1 + e) * (100 / (d - 2)) + "%", f.style.left = h + "%", c.push({
            el: f,
            w: g.dimensions.w,
            x: h,
            speed: 2 + 50 * Math.random()
        }), a.appendChild(f)
    }
    var i = Math.max(.5, window.innerWidth / 1600);
    a.style.fontSize = 100 * i + "px", introElements.clouds = c, introElements.w = window.innerWidth, introElements.cloudScale = i
}

function updateClouds() {
    var a, b, c, d = this.w / 100;
    for (c = 0; c < this.clouds.length; c++) a = this.clouds[c], a.x -= 55e-5 * a.speed, b = a.x * d + a.w * this.cloudScale, 0 > b && (a.x = 100), a.el.style.left = a.x + "%"
}

function addMainScript() {
    var a = document.createElement("script");
    document.body.className.match("prod") ? a.src = "js/main.js" : (a.src = "bower_components/requirejs/require.js", a.setAttribute("data-main", "js/main")), document.body.appendChild(a)
}
var introElements = {};
! function () {
    for (var a = 0, b = ["webkit", "moz"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (b, c) {
        var d = (new Date).getTime(),
            e = Math.max(0, 16 - (d - a)),
            f = window.setTimeout(function () {
                b(d + e)
            }, e);
        return a = d + e, f
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
        clearTimeout(a)
    })
}(), init();