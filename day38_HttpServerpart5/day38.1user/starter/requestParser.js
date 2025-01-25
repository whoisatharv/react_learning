exports.parseRequest=function(data){
    var request={};
    var str=data.toString();
    var splits=str.splits('\n');
    var firstLine=splits[0];
    var w=firstLine.split("");
    request.method=w[0]; //request me dynamically ek propertyadd krdi method naam ki
    if(w[1]=='/')
    {
        request.resource="index.html";
    }
    else{
        request.resource=w[1].substring(1);
    }
    request.isClientSideTechnologyResource=true;
    return request;
    //right now we are  not even considering the server side resource 
}