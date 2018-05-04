define(['jquery','Handlebars'],function($,Handlebars){
    var fun = function(idTpl,data,classTpl){
        var source = $(idTpl).html();
        var template = Handlebars.compile(source);
        var html = template(data);
        $(classTpl).html(html);
    }
    return fun;
})