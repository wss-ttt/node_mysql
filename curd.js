// 1. 导入mysql包
const mysql = require("mysql");

// 2. 创建数据库连接对象
const connection = mysql.createConnection({
	host: 'localhost',
	database: 'test',
	user: 'root',
	password: 'root'
});

// 3. 链接数据库
connection.connect(function(err) {
	if (err) {
		console.log('数据库连接失败');
		console.log('err:', err);
		return;
	}
	console.log('连接成功')
});

// 4. 添加
let insertSql = 'insert into students(name,age) values(?,?)';
let insertParms = ['关羽',27];
connection.query(insertSql,insertParms,function(err,res){
	if(err){
		console.log('数据添加失败');
		return;
	}
	console.log('数据添加成功',res);
});


// 5. 删除
let deleteSql = 'delete from students where id = 2';
connection.query(deleteSql,function(err,res){
	if(err){
		console.log('数据删除失败');
		return;
	}
	console.log('数据删除成功',res);
});

// 6. 修改
let updateSql = `update students set name ='哈哈' where id = 3`;
connection.query(updateSql,function(err,res){
	if(err){
		console.log('数据修改失败');
		return;
	}
	console.log('数据修改成功',res);
});


// 7. 查询
let sql = "select * from students";
connection.query(sql, function(error, results, fields) {
	if (error) {
		throw error;
		return;
	}
	console.log('查询结果:',results);
});


// last:关闭数据库
connection.end(function(err) {
	if (err) {
		console.log('数据库关闭失败');
		return;
	}
	console.log('数据库关闭成功');
});