
(function() {
    var app = {};
    window.app = app;

    var state = null;

    app.main = function() {
        $(window).bind("hashchange", init);
        init();
    };

    var init = function() {
        var hash = Base64.decode(URI.decode(new URI().fragment())) || "{}";
        state = JSON.parse(hash);
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
            var val = Base64.encode(JSON.stringify({body:state.body}));
            var url = "" + new URI().fragment(URI.encode(val));
            $(".js_link").attr("href", url).text(url).css("visibility", "visible");
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
