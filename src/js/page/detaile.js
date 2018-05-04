require(['jquery','render','BScroll'],function($,render,BScroll){
    var query = window.location.search.split('?')[1];
    var arr = query.split('&');
    var obj = {};
    for(var i=0;i<arr.length;i++){
        obj[arr[i].split('=')[0]]=arr[i].split('=')[1];
    }
    console.log(obj);
    
    $('.zuo').on('click',function(){
        history.go(-1);
    })
    
    var type = 'product';
    
    $('.product').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        type = $(this).data('type');
        $('.style').show();
        getAjax()
    });
    $('.btnDetaile').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        type = $(this).data('type');
        $('.style').hide();
        getAjax()
    })
    getAjax();
    function getAjax(){
        $.ajax({
            url:'/api/detaile?type='+obj.type+'&favicon_id='+obj.favicon_id,
            dataType:'json',
            success:function(res){
                console.log(res);
                if(type=='product'){
                    getData(res)
                }else if(type=='detaile'){
                    getDetaile(res)
                }
                var scroll = new BScroll('.section',{
                    scrollX:false,
                    scrollY:true,
                    click:true
                })
                
            }
        });
    }

    function getData(data){
        render('#product-tpl',data,'.detaile')
    }
    function getDetaile(data){
        render('#detaile-tpl',data,'.detaile')
    }
})