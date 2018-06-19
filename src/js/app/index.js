require(['jquery', 'handlebars'], function($, handlebars) {
    $.ajax({
        url: '/api',
        dataType: 'json',
        success: function(res) {
            var tpl = $('#wrap').html();
            var template = handlebars.compile(tpl);
            console.log(res);
            var html = template(res);
            $('#ul').html(html);
        },
        error: function(error) {
            console.warn(error);
        }
    })
})