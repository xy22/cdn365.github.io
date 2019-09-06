function getQueryString(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
var appInfo = new Vue({
    el: '#cdn',
    data: {
        allInfo: '',
        pkgVersion: '',
        url: ''
    },
    created: function() {
        var name = getQueryString("name");
        var request = new XMLHttpRequest();
        request.open("GET", "https://api.cdnjs.net/libraries/" + name + "");
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                appInfo.allInfo = JSON.parse(request.responseText);
                appInfo.pkgVersion = JSON.parse(request.responseText).assets;
                appInfo.url = JSON.parse(request.responseText).repository.url;
            } else {
                console.log('statusText:' + request.statusText);
            }
        }
    }
});

!function(i) {

        i(window).scroll(function() {
                100 < i(this).scrollTop() ? i("#back-to-top").fadeIn() : i("#back-to-top").fadeOut()
        }),
        i("#back-to-top").on("click",
        function(t) {
                return t.preventDefault(),
                i("html, body").animate({
                        scrollTop: 0
                },
                100),
                !1
        });


} (jQuery),
$(function() {$(".btn-clipboard").tooltip({container:"body"});var t=new Clipboard(".btn-clipboard",{text:function(t){var e=$(t),a=$(t.parentNode.nextElementSibling),s=url=a.text();return e.hasClass("btn-clipboard-code") && (/\.css$/.test(url) ? s = '<link href="' + url + '" rel="stylesheet">': /\.(js|map)$/.test(url) && (s = '<script src="' + url + '"><\/script>')),s}});t.on("success",function(t){$(t.trigger).attr("title","已复制！").tooltip("fixTitle").tooltip("show").attr("title","复制到剪贴板").tooltip("fixTitle"),t.clearSelection()}),t.on("error",function(t){var e="Press "+(/Mac/i.test(navigator.userAgent)?"⌘":"Ctrl-")+"C to copy";$(t.trigger).attr("title",e).tooltip("fixTitle").tooltip("show").attr("title","复制到剪贴板").tooltip("fixTitle")})});