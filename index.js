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

// 4. 执行sql语句
let sql = "select * from students";
connection.query(sql, function(error, results, fields) {
	// 5. 判断错误, 处理结果
	if (error) {
		throw error;
		return;
	}

	// 6. 处理结果
	console.log(results);
});

// 关闭数据库
connection.end(function(err) {
	if (err) {
		console.log('数据库关闭失败');
		return;
	}
	console.log('数据库关闭成功');
});
