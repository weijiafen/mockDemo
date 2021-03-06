var fs=require('fs');
var mockConfig=[
	{
		//  url:  /users/user/:id
		//example: get   /users/user/1
		//  fileUrl:  mock/users/get_user1.json 
		path:"users",
		api:"user",
		params:["id"]
	},
	{
		//example get   /manager/test
		//读取mock/manager下的get_test.json文件
		path:"manager",
		api:"test",
		params:[]
	}
]
module.exports=function(app){
	for(let mockItem of mockConfig){
		let url=`/${mockItem.path}/${mockItem.api}`;
		if(mockItem.params&&mockItem.params.length>0){
			for(param of mockItem.params)
			url+=`/:${param}`
		}
		console.log("url",url)
		app.all(url, function (req, res) {
			var method=req.method.toLowerCase()
			let fileUrl=`mock/${mockItem.path}/${method}_${mockItem.api}`;
			if(mockItem.params&&mockItem.params.length>0){
				for(param of mockItem.params){
					var reqParam=req.params[param]
					fileUrl+=`${reqParam}`
				}
			}
			fileUrl+='.json'
			console.log("url",url)
			console.log("fileUrl",fileUrl)
			res.setHeader('content-type', 'text/html;charset=utf-8');
			fs.readFile(fileUrl,function(err,data){
				if(err){
					var obj={
						status:1,
						msg:"未知接口"
					}
					res.end(JSON.stringify(obj));
				}
				else{
					setTimeout(function(){
						res.end(data.toString());
					},900)
					
				}
			})
		})
	}
	
}