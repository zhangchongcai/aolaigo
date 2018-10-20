
//刷新页面调用ajax
var sort=1;
var way = "asc"; 
callAjax(sort,way);

//排序按钮事件处理
var btnbool =[true,true,true,true,true,true]; // 第一个true作废
$("#main-body .fore").on("click",".btn",function(){
    var ind = $(this).index();
    if(btnbool[ind]){
        $("#main-body .fore .btn .ac").removeClass("act jt-up jt-down");
        $(this).children().addClass("act jt-up");
        btnbool[ind]=false;
         sort = ind;
         way = "asc";
        callAjax(ind,way);
    }else{
        console.log(btnbool[ind]);
        $("#main-body .fore .btn .ac").removeClass("act jt-down jt-up");
        $(this).children().addClass("act jt-down");
        btnbool[ind]=true;
         sort = ind;
         way = "DESC";
        callAjax(ind,way);
    }
    
})
//ajax 封装函数
function callAjax(sort,way){
    $.ajax({
        type:"GET",
        url:"../api/goods.php",
        data:{
            "sort":sort,
            "way":way,
        },
        success:function(msg){
            msg = JSON.parse(msg);
            creatHTML(msg);
        }
    })
}



//creatHTML函数
function creatHTML(msg){
    data = msg.quanlity;
    var len = data.length;
    var html ="";
    if(data.length==0){alert("木有数据了！")}
    for(var i=0;i<len;i++){
        html += `
                    <li>
                    <div class="icon"><img src="../images/${data[i].bigimg}" alt=""></div>
                    <div class="icon-box">
                        <a class="bt-left"></a>
                        <div class="list-box">
                            <dl class="icon-list">
                                <dd><img src="../images/${data[i].img1}" alt=""></dd>
                                <dd><img src="../images/${data[i].img2}" alt=""></dd>
                                <dd><img src="../images/${data[i].img3}" alt=""></dd>
                                <dd><img src="../images/${data[i].img4}" alt=""></dd>
                                <dd><img src="../images/${data[i].img5}" alt=""></dd>
                            </dl>
                        </div>
                            
                        <a class="bt-right"></a>
                    </div>
                    <p class="price"><span class="nowprice">￥${data[i].nowprice}</span><span class="beforeprice">￥${data[i].beforeprice}</span></p>
                    <p class="title"><a href="detail.html" data-id='${data[i].goodid}'>${data[i].title}</a></p>
                </li>
            `
    }
    var before_html = $(".good-list .list").html();
    before_html+=html;
    $(".good-list .list").html(before_html);
}



    // hover事件处理 数据处理 
    var ind_li = null;
    //小图片的父元素li的hover事件求当前是第几个li
    // $("#main-body .list").on("mouseover","li",function(event){
    //     ind_li = $(this).index()*1+1;
    //     console.log($(this).index())
    // })
    //小图片的hover事件
    $("#main-body").on("mouseout mouseover","dd",function(event){
        
        if(event.type == "mouseover"){
            var ind = $(this).index();
            $(this).css("borderColor","red").siblings().css("borderColor","");
            var bigimg = $(this).parent().parent().parent().prev().children();
            var url = "../images/yifu1/bigimg"+(ind*1+1)+"-"+(ind*1+1)+".jpg";
            $(bigimg).attr("src",url);

        }
    });

    //放大镜左右按钮 
    $("#main-body .icon-box").on("click",".bt-left",function(){
        var dl = $(this).next().find(".icon-list");        
        var x = dl.attr("left");
        dl.animate({"left":"0px"},500);
        console.log(x)
    })
    $("#main-body .icon-box").on("click",".bt-right",function(){
        var dl = $(this).prev().find(".icon-list"); 
        var x = dl.attr("left");
        dl.animate({"left":"-43px"},500);       
    })
//如果小图片小于4张，则隐藏按钮
    var li = $("#main-body .list li");
    for(var i=0;i<li.length;i++){
        var len = $(li).eq(i).find(".icon-list dd");
        if(len.length<5){
            $(li).eq(i).find(".icon-box a").remove();
        }
    }

//点击加载更多
$("#main-body .pages-box .addmore").on("click",function(){
    var num = $(this).attr("data-num");
    num++;
    $(this).attr("data-num",num);
    $.ajax({
        type:"GET",
        url:"../api/goods.php",
        data:{
            "sort":sort,
            "way":way,
            "page":num,
        },
        success:function(msg){
            msg = JSON.parse(msg);
            creatHTML(msg);
        }
    })
    
})



    //点击a标签存取cookie 跳转页面
    $("#main-body .list").on("click",".title a",function(){
        var gid = $(this).attr("data-id");
        setCookie("goodid",gid,7,"/");
    })