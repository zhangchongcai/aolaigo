


var username = getCookie("user");
$.ajax({
    type:"POST",
    url:"../api/searchMyCart.php",
    data:{
        "username":username
    },
    success:function(msg){
        msg=JSON.parse(msg);
        var html =``;
        for(var i=0;i<msg.length;i++){
            html+=`
                    <ul class="order_lists">
                                    <li class="list_chk">
                                        <input type="checkbox" id="checkbox_2${msg[i].goodid}" class="son_check">
                                        <label for="checkbox_2${msg[i].goodid}"></label>
                                    </li>
                                    <li class="list_con">
                                        <div class="list_img"><a href="javascript:;"><img src="../images/${msg[i].bigimg1}" alt=""></a></div>
                                        <div class="list_text"><a href="javascript:;">${msg[i].title}</a></div>
                                    </li>
                                    <li class="list_info">
                                        <p>颜色：${msg[i].color}</p>
                                        <p>尺寸：${msg[i].size}</p>
                                    </li>
                                    <li class="list_price">
                                        <p class="price">￥${msg[i].nowprice}</p>
                                    </li>
                                    <li class="list_amount">
                                        <div class="amount_box">
                                            <a href="javascript:;" class="reduce">-</a>
                                            <input type="text" value="${msg[i].quanlity}" class="sum">
                                            <a href="javascript:;" class="plus">+</a>
                                        </div>
                                    </li>
                                    <li class="list_sum">
                                        <p class="sum_price">￥${msg[i].nowprice}</p>
                                    </li>
                                    <li class="list_op">
                                        <p class="del"><a href="javascript:;" class="delBtn" data-goodid=${msg[i].goodid}>移除商品</a></p>
                                    </li>
                                </ul>
                `
        }
        $(".order_content").html(html);
        cart();
    }
})