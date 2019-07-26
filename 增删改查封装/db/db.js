const conn = require('./../config');
const connection = conn();


// 查询所有的数据
let selectAll = (sql,callback)=>{
	connection.query(sql,(err,results)=>{
		if(err){
			console.log('错误信息:',err.sqlMessage);
			let errNews = err.sqlMessage;
			callback(errNews,'');
			return;
		}
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		var data = JSON.parse(string);
		
		console.log(data);
		callback('',data);
		
		console.log(1);
	});
}

// 插入一条数据

exports.selectAll = selectAll;