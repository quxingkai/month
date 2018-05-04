require(['jquery','render','BScroll','Swiper'],function($,render,BScroll,Swiper){
    var query = window.location.search.split('?')[1];
    var arr = query.split('&');
    var obj = {};
    for(var i=0;i<arr.length;i++){
        obj[arr[i].split('=')[0]]=arr[i].split('=')[1];
    }
    console.log(obj);
    // 点击跳回上一步
    $('.zuo').on('click',function(){
        history.go(-1);
    })
    
    var type = 'product';
    // 详情页点击切换视图风格
    $('.product').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        type = $(this).data('type');
        $('.style').show();
        getAjax()
    });
    // 详情页点击切换视图风格
    $('.btnDetaile').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        type = $(this).data('type');
        $('.style').hide();
        getAjax()
    })

    // ajax请求数据
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
    // 根据产品的type 类型渲染不同的数据风格
    function getData(data){
        render('#product-tpl',data,'.detaile');
        new Swiper('.banner',{
            autoplay:1000,
            loop:true
        });
    }
    // 根据产品的type 类型渲染不同的数据风格
    function getDetaile(data){
        render('#detaile-tpl',data,'.detaile')
    }
})