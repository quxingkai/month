require(['jquery','BScroll','render'],function($,BScroll,render){
    new BScroll('.nav',{
        scrollX:true,
        scrollY:false,
        click:true
    });

    var type = 'home';

    $('.nav').on('click','li',function(){
        type = $(this).data('type');
        $(this).addClass('bg').siblings().removeClass('bg');
        $('.list').attr('data-type',type);
        getAjax(type)
    });

    var scroll = new BScroll('.section',{
        scrollX:false,
        scrollY:true,
        click:true
    })
    getAjax(type)
    function getAjax(type){
        $.ajax({
            url:'/api/index?type='+type,
            dataType:'json',
            success:function(res){
              console.log(res[type]);
              getData(res[type]);
              scroll.refresh();
            }
        })
    }

    function getData(data){
        console.log(data);
        render('#list-tpl',data,'.list')
    }

    $('.list').on('click','dl',function(){
        var favicon_id = $(this).data('id');
        location.href = 'page/detaile.html?type='+type+'&favicon_id='+favicon_id;
    })
})