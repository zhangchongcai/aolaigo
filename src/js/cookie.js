
//  cookie函数
function setCookie(cookieName,cookieValue,date,path){
    var str="";
    //封装数据
    var data = {
         "val":cookieValue
    }
    str += cookieName+ "=" + JSON.stringify(data)
    //日期
    if(date){
        var dates = new Date();
        dates.setDate(dates.getDate()+date);
        str +=";expires="+dates.toGMTString();
    }
    //path属性
    if(path){
        str +=";path=" +path;
    }
    document.cookie = str;
}
//获取cookie
function getCookie(cookieName,callback){
    var types = typeof(cookieName)
    var arrs = document.cookie;
    var arr = arrs.split("; ");     // 拆分数组
    for(i in arr){                  //循坏数组
        var str = arr[i];           //取值
        var ind = str.indexOf("=");     
        var str_name = str.substring(0,ind);
        var str_value = str.substring(ind+1);
        //转换成对象
        str_value = JSON.parse(str_value).val;
        if(types == "string"){
            if(cookieName == str_name ){
                return str_value;
            } 
        }
        else if(types == "object" ){
            if(cookieName.test(str_name) && callback){
            callback(str_name,str_value)
            }
        }
    } 
}