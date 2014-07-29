/*textchange属性**/
(function(b) {
    b.event.special.textchange = {
        setup: function(d, a) {
            b(this).data("ime", false);
            b(this).data("lastValue", this.contentEditable === "true" ? b(this).html() : b(this).val());
            b(this).bind("compositionstart", b.event.special.textchange.imeStartHandler);
            b(this).bind("compositionend", b.event.special.textchange.imeEndHandler);
            b(this).bind("keyup.textchange", b.event.special.textchange.handler);
            b(this).bind("cut.textchange paste.textchange input.textchange", b.event.special.textchange.delayedHandler)
        },
        teardown: function(a) {
            b(this).unbind(".textchange")
        },
        handler: function(a) {
            b.event.special.textchange.triggerIfChanged(b(this))
        },
        imeStartHandler: function(a) {
            b(this).data("ime", true)
        },
        imeEndHandler: function(a) {
            b(this).data("ime", false)
        },
        delayedHandler: function(d) {
            var a = b(this);
            setTimeout(function() {
                b.event.special.textchange.triggerIfChanged(a)
            },
            25)
        },
        triggerIfChanged: function(a) {
            if (!a.data("ime")) {
                var d = a[0].contentEditable === "true" ? a.html() : a.val();
                if (d !== a.data("lastValue")) {
                    a.trigger("textchange", [a.data("lastValue")]);
                    a.data("lastValue", d)
                }
            }
        }
    };
    b.event.special.hastext = {
        setup: function(d, a) {
            b(this).bind("textchange", b.event.special.hastext.handler)
        },
        teardown: function(a) {
            b(this).unbind("textchange", b.event.special.hastext.handler)
        },
        handler: function(d, a) {
            if ((a === "") && a !== b(this).val()) {
                b(this).trigger("hastext")
            }
        }
    };
    b.event.special.notext = {
        setup: function(d, a) {
            b(this).bind("textchange", b.event.special.notext.handler)
        },
        teardown: function(a) {
            b(this).unbind("textchange", b.event.special.notext.handler)
        },
        handler: function(d, a) {
            if (b(this).val() === "" && b(this).val() !== a) {
                b(this).trigger("notext")
            }
        }
    }
})(jQuery);
