var K = {
        Gt: function (e) {
            return (new DOMParser).parseFromString(e, "text/xml")
        },
        Ex: function (e, d) {
            return d.evaluate(e, d.documentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        },
        Ti: function () {
            return window.hasOwnProperty("ActiveXObject") ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest
        },
        lw: function (e, d) {
            var a = K.Ti();
            a ? (a.open("GET", e, !0), a.withCredentials = !0, a.onreadystatechange = function () {
                4 == a.readyState && d(a.status, K.Gt(a.responseText))
            }, a.send()) : alert("Could not find suitable ajax control")
        },
        mw: function (e, d) {
            var a = K.Ti();
            a ? (a.open("GET", e, !0), a.withCredentials = !0, a.onreadystatechange = function () {
                4 == a.readyState && d(a.status, a.responseText)
            }, a.send()) : alert("Could not find suitable ajax control")
        }
    },
    qa = function () {
        function e() {}

        var d = e.prototype;
        d.Jn = function (a, b) {
            return this.tag.apply(this, ["div"].concat([].slice.call(arguments)))
        };
        d.il = function (a, b) {
            return this.tag.apply(this, ["img"].concat([].slice.call(arguments)))
        };
        d.p = function (a, b) {
            return this.tag.apply(this, ["p"].concat([].slice.call(arguments)))
        };
        d.xc = function (a, b) {
            return this.tag.apply(this, ["h1"].concat([].slice.call(arguments)))
        };
        d.Fe = function (a, b) {
            return this.tag.apply(this, ["h2"].concat([].slice.call(arguments)))
        };
        d.Cf = function (a, b) {
            return this.tag.apply(this, ["h3"].concat([].slice.call(arguments)))
        };
        d.button = function (a, b) {
            return this.tag.apply(this, ["button"].concat([].slice.call(arguments)))
        };
        d.Pm = function (a, b) {
            return this.tag.apply(this, ["ul"].concat([].slice.call(arguments)))
        };
        d.Kh = function (a, b) {
            return this.tag.apply(this, ["li"].concat([].slice.call(arguments)))
        };
        d.Ga = function (a, b) {
            return this.tag.apply(this, ["table"].concat([].slice.call(arguments)))
        };
        d.Kj = function (a, b) {
            return this.tag.apply(this, ["tbody"].concat([].slice.call(arguments)))
        };
        d.Gb = function (a, b) {
            return this.tag.apply(this, ["tr"].concat([].slice.call(arguments)))
        };
        d.Lj = function (a, b) {
            return this.tag.apply(this, ["td"].concat([].slice.call(arguments)))
        };
        d.Om = function (a, b) {
            return this.tag.apply(this, ["th"].concat([].slice.call(arguments)))
        };
        d.input = function (a, b) {
            return this.tag.apply(this, ["input"].concat([].slice.call(arguments)))
        };
        d.Nj = function (a, b) {
            return this.tag.apply(this, ["textarea"].concat([].slice.call(arguments)))
        };
        d.X = function (a, b) {
            return this.tag.apply(this, ["span"].concat([].slice.call(arguments)))
        };
        d.canvas = function (a, b) {
            return this.tag.apply(this, ["canvas"].concat([].slice.call(arguments)))
        };
        d.tag = function (a, b, h) {
            var f = document.createElement(a),
                d;
            for (d in b)
                if ("classes" == d)
                    f.className = b[d];
                else if ("style" == d) {
                var e = b[d];
                if ("string" == typeof e)
                    for (var l = e.split(";").map(function (b) {
                            return b.split(":")
                        }), e = {}, q = 0; q <
                        l.length; q++)
                        e[l[q][0]] = l[q][1];
                for (var u in e)
                    f.style[u] = e[u]
            } else
                f.setAttribute(d, b[d]);
            if (2 < arguments.length)
                for (q = 2; q < arguments.length; q++)
                    d = arguments[q], "string" == typeof d ? f.appendChild(document.createTextNode(d)) : f.appendChild(d);
            return f
        };
        return e
    }();

var sd = !1;
document.addEventListener("touchmove", function (e) {
    sd || e.preventDefault()
}, !1);
var pd = function (e) {
    function d(swiperRoot, image) {
        //this.ar = a;
        a = new qa;
        this.eb = a = a.Jn({
            id: "swiper",
            style: "background-color:black;opacity:0.5;top:0px;left:0px;position:absolute;width:100%;height:100%;display:none;z-index:99999;"
        }, a.Jn({
            style: "top:0px;margin: 0 auto;width:200px;"
        }, a.il({
            src: image,
            style: "width:260px;height:340px;"
        })));
        var d = swiperRoot || document.getElementById("swiper-root");
        d && (d.appendChild(this.eb), document.addEventListener("touchmove", function (a) {
                sd || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
            }, !1), this.wj(),
            this.timeStamp = Date.now(), a.addEventListener("touchend", function () {
                window.scrollTo(0, 0)
            }))
    }

    var a = d.prototype;
    a.wj = function () {
        var a = this;
        setInterval(function () {
            a.check()
        }, 300)
    };
    a.X = function () {
        var a = document.createEvent("HTMLEvents");
        a.initEvent("resize", !1, !1);
        window.dispatchEvent(a)
    };
    a.check = function () {
        var a = window.screen.width,
            d = window.screen.height,
            e = Math.min(a, d),
            a = Math.max(a, d),
            d = !1;
        var str = Math.abs(e - Math.min(window.screen.availHeight, window.innerHeight * 0.5)) + '';
        // console.log("first" + Math.abs(window.orientation));
        // console.log("second" + Math.abs(e - Math.min(window.screen.availHeight, window.innerHeight * 0.5)));
        90 == Math.abs(window.orientation) && 25 < Math.abs(e - Math.min(window.screen.availHeight, window.innerHeight * 0.5)) && (d = !0, this.eb.style.width =
            y("%dpx", window.innerWidth), this.eb.style.height = y("%dpx", window.innerHeight + 100));
        d ? (this.eb.style.display = "block", sd = !0) : (function () {
            window.scrollTo(0, 1);
        }, this.eb.style.display = "none", sd = !1)
    };
    return d
}();

exports.swiper = pd;

function y(e, d) {
    for (var a = arguments[0].split(/(%[sdf])/), b = "", h = 1, f = 0; f < a.length; ++f)
        b = a[f].match(/(%[sdf])/) ? b + arguments[h++] : b + a[f];
    return b
}