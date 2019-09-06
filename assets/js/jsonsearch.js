$(document).ready(function() {
    $('#search').keyup(function() {
        $('#common-packages').html('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");
        $.getJSON('/data521.json',
        function(data) {
            $.each(data,
            function(key, value) {
                if (value.name.search(expression) != -1) {
                    $('#common-packages').append('<a href="/ajax/libs/' + value.name + '/" class="package list-group-item" target="_blank"><div class="row"><div class="col-md-3"><h4 class="package-name">' + value.name + '</h4></div><div class="col-md-9 hidden-xs"><p class="package-description">' + value.description + '</p></div><div class="package-extra-info col-md-9 col-md-offset-3 col-xs-12"><span><i class="fa fa-star"></i> ' + value.star + '</span></div></div></a>');
                }
            });
        });
    });
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


} (jQuery)