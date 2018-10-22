var color = "-999";
var size = "X";
var quanlity = "1";
var username = getCookie("user");
var goodid = getCookie("goodid");
var bigimg = null;
var title = null;
var price = null;
creatHTML();

//点击选择 尺码 和 颜色 数量
$("#deti-cont ").on("click",".colorul li",function(){
    $(this).addClass("deact").siblings().removeClass("deact");
    color = $(this).text();
});
$("#deti-cont ").on("click",".sizeul li",function(){
    $(this).addClass("deact").siblings().removeClass("deact");
    size = $(this).text();
});
//点击加减
$("#deti-cont .jup").on("click",function(){
    $(this).addClass("deact").siblings().removeClass("deact");
    var num =$("#deti-cont .input1").val();
    var limi = $(".cacuul .story").text()
    if(num<limi){
        num++;
        $("#deti-cont .input1").val(num);  
    }else{
        alert("超出库存");
    }
    
});
$("#deti-cont .jdown").on("click",function(){
    $(this).addClass("deact").siblings().removeClass("deact");
    var num =$("#deti-cont .input1").val();
    num--;
    if(num<1){
        num=1;
    }
    $("#deti-cont .input1").val(num)
});


// 初始化数据
function creatHTML(){
    $.ajax({
        type: "GET",
        url: "../api/searchDetail.php",
        data: {
            "goodid": goodid,
        },
        success: function (msg) {
            msg = JSON.parse(msg)[0];
            // console.log(msg);
            goodid = msg.goodid;
            bigimg = msg.bigimg1;
            title = msg.title;
            price = msg.nowprice;
            // var color = msg.colro;
            // color=color.split("&");
            var size = msg.size;
            size = size.split("&");
            //放大镜。。。。。。。。。。。
            var html1 = `

                            <li class="active">
                                <img src="../images/${msg.bigimg1}" alt="">
                            </li>
                            <li>
                                <img src="../images/${msg.bigimg2}" alt="">
                            </li>
                            <li>
                                <img src="../images/${msg.bigimg3}" alt="">
                            </li>
                            <li>
                                <img src="../images/${msg.bigimg4}" alt="">
                            </li>


                    `;
            $(".imglist ul").html(html1); //放大镜
            var html2 = "../images/" + msg.bigimg1;
            $(".picxx").prop("src", html2);
            $(".bigpicxx").prop("src", html2);

            // 详情内容...............
            var html3 = `
                        <span></span>
                        <span>${msg.title}</span>
                    `;

            $(".pt-data .title").html(html3);


            var html4 = `
                        <span>奥 莱 价：</span>
                        <span>¥${msg.nowprice}</span>
                        <span>¥${msg.beforeprice}</span>
                    `;
            
            $(".pt-data .price").html(html4);
            var html5=``;
            for(var i=0;i<size.length;i++){
                html5 += `
                            <li>${size[i]}</li>
                        `
            }
            $(".pt-data .sizeul").html(html5);
            $(".pt-data .story").html(msg.iventory);
            

        }
        
    })
}


//点击添加购物车按钮
$("#deti-cont .add").on("click",function(){
    quanlity = $(".pt-data .input1").val();
    var img = document.createElement("img");
    img.src="../images/"+bigimg;
    $(img).css({"width":"35px","height":"35px","position":"absolute","right":"450px","top":"550px","z-index":"9999"})
    $(document.body).append(img);
    var x = img.offsetLeft;
    var y = img.offsetTop;
    var tartgetX = aside.offsetLeft+344;
    var tartgetY = aside.offsetTop+25;
    var tartgetY = document.documentElement.scrollTop+100 || document.body.scrollTop+100;
    pao(img,tartgetX,tartgetY,function(){
        document.body.removeChild(img);
        var nu1 = $("#cart").text();
        
        var nu2 = $(".input1").val()*1+nu1*1;
        $("#gwl").text(nu2);
        $("#cart").text(nu2);
    });
    $.ajax({
        type:"POST",
        url: "../api/insertOrders.php",
        data: {
            "username": username,
            "color": color,
            "quanlity": quanlity,
            "size": size,
            "goodid": goodid,
        },
        success:function(msg){
            msg = JSON.parse(msg);
            var html='';
            if(msg){
                html += `
                        <li>
                            <input type="checkbox">
                            <a href="#"><img src="../images/${bigimg}" alt=""></a>
                            <div class="fr goodcont">
                                <a href="#"><span></span>${title}</a>
                                <div class="size">颜色：${color} 尺码：${size}</div>
                                <div class="detail">
                                    <span>¥</span> <span class="price">${price}</span>
                                    <span>*</span> <span class="quanlity">${quanlity}</span>
                                    <span>可优惠¥</span><span class="disc">22.10</span>
                                </div>
                            </div>
                            <div class="foot"></div>
                        </li>
                        `;
                        $("#aside .cartul").append(html);
                        caculation();
                
            }else{
                alert("未成功加入购物车！");
            }
        }
    })
    
    
});