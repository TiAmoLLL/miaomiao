function sendAjax(obj){
    //创建ajax对象
    var xhr = new XMLHttpRequest();
    // 处理是否传入了想要的数据类型
    if(!obj.dataType){
        obj.dataType = "json"
    }
    // 如果传入了，需要判断类型
    if(obj.dataType!="json" && obj.dataType!="string"){
        throw new Error("想要的数据类型参数不正确，只接受json或string");
    }
    //判断url
    if(obj.url === undefined){
        throw new Error('请求地址不能为空');
    }
    if(Object.prototype.toString.call(obj.url) != '[object String]'){
        throw new Error('url参数错误');
    }
    //判断请求方式
    if(obj.type === undefined){
        obj.type = 'get'
    }
    if(obj.type != 'get' && obj.type != 'post'){
        throw new Error('请求方式错误');
    }
    if(obj.data != undefined){
        if(Object.prototype.toString.call(obj.data) === '[object String]' && obj.data.indexOf("=")!=-1){
            obj.data += '?'+obj.data;
        }
        if(Object.prototype.toString.call(obj.data) === '[object Object]'){
            let data = '?';
            let f = '';
            for (const key in obj.data) {
                data +=f + key + '=' +obj.data[key];
                f='&';
            }
            obj.data += data;
        }else{
            throw new Error("传入的数据类型不正确，只接受字符串或对象");
        }
    }
        if(obj.type === 'get'){
            obj.url += obj.data;
        }

    
    //是否异步的参数
    if(obj.async === undefined){
            obj.async = true;
    }else if(Object.prototype.toString.call(obj.async) != '[object Boolean]'){
        throw new Error('是否异步的参数错误');
    }
    var res;
    //配置ajax对象
    xhr.open(obj.type,obj.url,obj.async);
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
            //有两种结果 - 请求成功/失败、
            if(xhr.status>=200 && xhr.status<300){
                //成功
                res = xhr.responseText;
                if(obj.dataType==="json"){
                    // 将json字符串转成json对象
                    res = JSON.parse(res);
                }
                obj.success(res);
            }else{
                //失败
                //console.log("请求失败!");
                obj.error();
            }				
        }
    }
    //post设置请求头
    if(obj.type === 'post'){
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        if(obj.data!=undefined){
            xhr.send(obj.data);
            return ;
        }
    }
    //发送请求
    xhr.send();
    return res;
}