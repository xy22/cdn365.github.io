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

	try {
		if ("/" !== window.location.pathname) {
			var t = i(".site-header h1").first().text();
			i(".site-header").geopattern(t)
		}
	} catch(t) {
		console.log(t)
	}	
	i(".btn-group .btn").click(function() {

		console.log("Protocal ", t, " was selected"),
		"relative" === t ? i(".library-url").each(function() {
			var t = i(this).text();
			i(this).text(t.replace(/^https?:/i, "")),
			i(this).parent().removeClass("js-https")
		}) : "http" === t ? i(".library-url").each(function() {
			var t = i(this).text();
			i(this).text("http:" + t.replace(/^https?:/i, "")),
			i(this).parent().removeClass("js-https")
		}) : "https" === t && i(".library-url").each(function() {
			var t = i(this).text();
			i(this).text("https:" + t.replace(/^https?:/i, "")),
			i(this).parent().addClass("js-https")
		}),
		localforage.setItem("protocal", t,
		function(t, e) {
			if (t) return console.log(t);
			console.log("saved protocal: ", e)
		})
	})
} (jQuery),
$(function() {
	$(".library-url").each(function() {
		var t = $(this).text();
		/\.css$/.test(t) ? $(this).before('<div class="zero-clipboard"><span class="btn-clipboard btn-clipboard-code" title="复制到剪贴板"><i class="fa fa-code"></i> 复制 &lt;link&gt; 标签</span><span class="btn-clipboard btn-clipboard-link" title="复制到剪贴板"><i class="fa fa-link"></i> 复制链接</span></div>') : /\.js$/.test(t) ? $(this).before('<div class="zero-clipboard"><span class="btn-clipboard btn-clipboard-code" title="复制到剪贴板"><i class="fa fa-code"></i> 复制 &lt;script&gt; 标签</span><span class="btn-clipboard btn-clipboard-link" title="复制到剪贴板"><i class="fa fa-link"></i> 复制链接</span></div>') : $(this).before('<div class="zero-clipboard"><span class="btn-clipboard btn-clipboard-link" title="复制到剪贴板"><i class="fa fa-link"></i> 复制链接</span></div>')
	}),
	$(".btn-clipboard").tooltip({
		container: "body"
	});
	var t = new Clipboard(".btn-clipboard", {
		text: function(t) {
			var e = $(t),
			a = $(t.parentNode.nextElementSibling),
			s = url = a.text();
			return e.hasClass("btn-clipboard-code") && (/\.css$/.test(url) ? s = '<link href="' + url + '" rel="stylesheet">': /\.js$/.test(url) && (s = '<script src="' + url + '"><\/script>')),
			s
		}
	});
	t.on("success",
	function(t) {
		$(t.trigger).attr("title", "已复制！").tooltip("fixTitle").tooltip("show").attr("title", "复制到剪贴板").tooltip("fixTitle"),
		t.clearSelection()
	}),
	t.on("error",
	function(t) {
		var e = "Press " + (/Mac/i.test(navigator.userAgent) ? "⌘": "Ctrl-") + "C to copy";
		$(t.trigger).attr("title", e).tooltip("fixTitle").tooltip("show").attr("title", "复制到剪贴板").tooltip("fixTitle")
	})
});