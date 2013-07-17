
(function() {
    var app = {};
    window.app = app;

    var state = null;
    var content = "";

    app.main = function() {
        $(window).bind("hashchange", init);
        init();
    };

    var init = function() {
        var hash = URI.decode(new URI().fragment()) || "null";
        state = JSON.parse(hash);
        if (state) {    
            _.defaults(state, {
                body: "",
            });
            writeContent();
        } else {
            editor();
        }
    };

    var editor = function() {
        $("body").html(_.template($("#editor").html(), {content: content}));
        $("button").click(function() {
            content = $("textarea").val();
            var val = JSON.stringify({body:content})
            var url = "" + new URI().fragment(URI.encode(val));
            $("a").attr("href", url).text(url);
        });
    };

    var writeContent = function() {
        $("body").html(state.body);
    };

})();
