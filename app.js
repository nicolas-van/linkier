
(function() {
    "use strict";
    var app = {};
    window.app = app;

    var state = null;

    var methods = {
        "z": {
            encode: function(obj) {
                return URI.encode(LZString.compressToBase64(JSON.stringify(obj)));
            },
            decode: function(str) {
                return JSON.parse(LZString.decompressFromBase64(URI.decode(str)));
            },
        },
    };

    app.main = function() {
        $(window).bind("hashchange", init);
        init();
    };

    var init = function() {
        state = {};
        var fragment = new URI().fragment() || "";
        if (fragment) {
            var type = fragment[0];
            fragment = fragment.slice(1);
            state = methods[type].decode(fragment);
        }
        _.defaults(state, {
            body: ""
        });
        if (state.body) {
            writeContent();
        } else {
            editor();
        }
    };

    var editor = function() {
        $("body").html(_.template($("#editor").html(), {content: state.body}));
        $(".js_content").attr("id", _.uniqueId());
        var editor = ace.edit($(".js_content").attr("id"));
        editor.setValue(state.body);
        editor.getSession().setMode("ace/mode/html");
        editor.clearSelection();
        $(".js_publish_content").click(function() {
            state.body = editor.getValue();
            var url = "" + new URI().fragment("z" + methods.z.encode(state));
            $(".js_link").attr("href", url).text(url).css("visibility", "visible");
        });
        $(".js_link").click(function() {
            if ("" + new URI() === $(".js_link").attr("href")) {
                window.location.reload();
            }
        });
    };

    var writeContent = function() {
        $("body").html("");
        $("body").append(_.template($("#edit_button").html()));
        $(".js_edit_button").click(function() {
            editor();
        });
        $("body").append(state.body);
    };

})();
