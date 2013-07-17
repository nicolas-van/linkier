
(function() {
    var app = {};
    window.app = app;

    app.writer = function() {
        $("button").click(function() {
            var val = $("textarea").val();
            val = JSON.stringify({body:val})
            var url = "" + new URI("http://nicolas-van.github.io/linkier/display.html").hash(val);
            $("a").attr("href", url);
        });
    };

    app.display = function() {
        var hash = new URI().fragment() || "{}";
        state = JSON.parse(hash);
        _.defaults(state, {
            body: "",
        });
        $("body").html(state.body);
    };

})();
