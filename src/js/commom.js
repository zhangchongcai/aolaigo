//获取元素
var btn = document.querySelectorAll("#drap .btn");
var box = document.querySelectorAll("#drap .drapbox");
var casebtn = $("#caseul li");
var drapli = $("#drapli");
var drap = $("#drap");
var brandList = $("#caseList");
var _pages = $("#pages");
var powercase='A';


/** ------------------cookie登陆处理---------------------------*/

// var id = getCookie("user");
// if(id){
//     var str = "欢迎,"+id;
//     $("#login").text(str);
    // $.ajax({
    //     type:"POST",
    //     url:searchUserDetail,
    //     data:{

    //     }
    // })
// }


/** 侧边栏事件 */
$("#aside .asideul li").hover(function(){
    var em = $(this).find("em");
    $(this).css({"borderLeft":"none","borderRadius":0});
    $(em).css("display","block");
    $(em).animate({width:80,left:-70},350);
    // console.log($(this).child()
},function(){
    var em = $(this).find("em");
    $(em).animate({width:50,left:0},350);
    $(em).css("display","none");
    $(this).css({"borderLeft":"","borderRadius":""})
})
$("#aside .asideul .flexbox").click(function(){
    $("#aside").css("transform","translateX(0)");
})
$("#close").click(function(){
    $("#aside").css("transform","translateX(334px)");
})


//chebox按钮事件
var inp =  $("#aside .cartul input"); //li的所有集合

$("#aside .cartul").on("click","input",function(){  //每一个数据的单选
    caculation()
    var arr = getrows();
    len = inp.length;
    if(arr.length == len ){
        $("#aside #checkall").prop("checked","checked");
    }else{
        $("#aside #checkall").prop("checked","")
    }
})

//全选
$("#aside #checkall").click(function(){
    console.log(this.checked)
    if(this.checked){
        for(var i=0;i<inp.length;i++){
            inp[i].checked=true;
        }
        caculation();
    }else{
        for(var i=0;i<inp.length;i++){
            inp[i].checked=false;
        }
        caculation();
    }
})


//计算函数，计算价钱，优惠等
function caculation(){
    var arr=getrows();
    var quanlity=0;
    var price=0;
    var disc=0;
    for(var i=0;i<arr.length;i++){
        var li =$("#aside .cartul li").eq(arr[i]);
        price += $(li).find(".price").text()*1;
        quanlity +=$(li).find(".quanlity").text()*1;
        disc += $(li).find(".disc").text()*1;
    }
    $("#aside .caculation .quanlity").text(quanlity);
    $("#aside .caculation .disc").text(disc);
    $("#aside .caculation .totall").text(price);

}


//如果购物车为空的情况下
var wk = inp.length;
if(wk.length==0){
    $("#aside .caculate").remove();
    $("#aside .checkbox").remove();
}else{
    $("#aside #zxcvb").remove();
}

//获取所有被选中的行
function getrows(){
    arr=[];
    for(var i=0;i<inp.length;i++){
            if(inp[i].checked){
                arr.push(i)
            }
    }
    return arr;
}






//点击回到顶部函数
$("#returntop").click(function(){
  var duration = 500, interval = 10, target = document.documentElement.scrollTop || document.body.scrollTop,
    step = (target / duration) * interval;
  var timer = setInterval(function () {
    var curTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (curTop === 0) {
      window.clearInterval(timer);
      return;
    }
    curTop -= step;
    document.documentElement.scrollTop = curTop;
    document.body.scrollTop = curTop;
  }, interval);

})




/*-----------------------分类品牌事件处理--------------------------- */
//菜单hover事件
$(drapli).hover(function(){
    $(drap).css("display","block");
},function(){
    $(drap).css("display","none");
});
$(drap).hover(function(){
    $(drap).css("display","block");
},function(){
    $(drap).css("display","none");
});

//title选项卡
$(box).eq(0).css("display","block").siblings().css("display","none");
$(btn).eq(0).css({"color":"#C81417","border-color":"#C81417"})
$(btn).on("click",function(){
    var ind = $(this).index();
    $(box).eq(ind).css("display","block").siblings().css("display","none");
    $(btn).eq(ind).css({"color":"#C81417","border-color":"#C81417"}).siblings().css({"border-color":"","color":""});
});

//点击全部品牌按钮事件  自动加载当前A数据
$("#allbrand").click(function(){
    creatBrand("A",true,1);
})

//字母选项卡
$(casebtn).eq(0).css({"color":"#C81417","border-color":"#C81417"})    
$(casebtn).on("click",function(){
    var ind = $(this).index();
    $(casebtn).eq(ind).css({"color":"#C81417","border-color":"#C81417"}).siblings().css({"color":"","border-color":""});
    var cases = $(this).html();
    powercase = cases;
    creatBrand(cases,true);
    
})
//点击页数时 刷新数据
$("#pages").on("click","span",function(){
    var pg = $(this).text();
    console.log(pg);
    console.log(powercase)
    $(this).attr("id","active").siblings().attr("id","unactive");
    creatBrand(powercase,false,pg);
})


//公共调用ajax刷新品牌
function creatBrand(ce,bool,pg){
    $.ajax({
        type:"GET",
        url:"./api/searchBrand.php",
        data:{
            "case":ce,
            "page":pg,
            "date":new Date(),
        },
        success:function(msg){
            var data = JSON.parse(msg);
            console.log(data);
            var len = data.page;
            var datas = data.quanlity;
            console.log(datas);
            var html ="";
            if(bool){
                var page = '';
            }
            if(datas){
                for(var i=0;i<datas.length;i++){
                html+=`
                <li><a href="#">${datas[i].brand}</a></li>
                `
                }
            }else{
                console.log("没有")
            }
            if(bool){
                for(var j=1;j<=len;j++){
                page += `
                    <span>${j}</span>
                `
            }}
            
            $(brandList).html(html);
            $(_pages).html(page);
        }
    })
}