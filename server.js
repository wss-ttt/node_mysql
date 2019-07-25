const express = require('express');
const app = express();
const mysql = require("mysql");
// 1 引入body-parser包
const bodyParser = require('body-parser');

// 2 配置
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));
// parse application/json
app.use(bodyParser.json());


var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

const connection = mysql.createConnection({
	host: 'localhost',
	database: 'test',
	user: 'root',
	password: 'root'
});
connection.connect(function(err) {
	if (err) {
		console.log('数据库连接失败');
		console.log('err:', err);
		return;
	}
	console.log('连接成功')
});

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

// 查询所有的数据
app.get('/students/list', function(req, res) {
	let sql = 'select * from students';
	connection.query(sql, function(err, results) {
		if (err) {
			return res.json({
				code: 1,
				message: 'error',
			});
		}
		res.json({
			code: 0,
			message: 'success',
			data: results
		});
	});

})

// 根据主键查询单条数据
app.get('/students/details', function(req, res) {
	let id = req.query.id;
	let sql = 'select * from students where id =?';
	connection.query(sql, id, function(err, results) {
		if (err) {
			return res.json({
				code: 1,
				message: 'error'
			});
		}
		res.json({
			code: 0,
			message: 'success',
			// data: results    // 这样返回的是一个数组
			// 因为查询出来就只有一条数据 我们就直接返回一个对象
			data: results[0] // results是一个数组
		});
	});
});

// 根据姓名查询数据
app.get('/students/getListByName', function(req, res) {
	let name = req.query.name;
	let sql = 'select * from students where name = ?'
	connection.query(sql, name, function(err, results) {
		if (err) {
			return res.json({
				code: 1,
				message: 'error'
			});
		}
		res.json({
			code: 0,
			messagea: 'success',
			data: results
		});
	});
});


// 删除操作 post请求
app.get('/students/delete', function(req, res) {
	let parms = req.query;
	let ids = parms.id;
	console.log('parms:', parms);
	console.log('id', ids);
	let sql = 'delete from students where id in ('+ids+')';
	connection.query(sql, function(err, results) {
		if (err) {
			return res.json({
				code: 1,
				message: 'error'
			});
		}
		res.json({
			code: 0,
			message: 'success',
		});
	});
});
// 新增
app.post('/students/add', function(req, res) {
	var name = req.body.name;
	var age = req.body.age;
	var sql = 'insert into students(name,age) values(?,?)';
	var params = [name, age];
	connection.query(sql, params, function(err, results) {
		if (err) {
			return res.json({
				code: 1,
				message: 'error'
			});
		}
		res.json({
			code: 0,
			message: 'success',
			data: results
		});
	});
});


// 修改
app.post('/students/update', function(req, res) {
	var id = req.body.id;
	var name = req.body.name;
	var age = req.body.age;
	var sql = 'update students set name = ?,age=? where id =?';
	var params = [name,age,id];
	connection.query(sql,params,function(err,results){
		console.log(results);
		if(err){
			return res.json({
				code:1,
				message:'error'
			});
		}
		return res.json({
			code:0,
			message:'success',
			data:results
		});
	});
});


app.post("/", function(req, res) {
	var id = req.body.id;
	var name = req.body.name;
	console.log('id:',id);
	console.log('name',name);
	res.send({
		hello: 'world'
	});
})

app.post("/test", function(req, res) {
	var parms = req.body;
	var id = parms.id;
	var name = parms.name;
	console.log('id', id);
	console.log('name', name);
	res.send({
		id: id,
		name: name,
		msg: 'success'
	});
})




app.listen(3000, function() {
	console.log('服务启动成功');
});
