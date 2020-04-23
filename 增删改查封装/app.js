const express = require('express')
const app = express()

const db = require('./db/db.js')

app.get('/', function(req, res) {
	db.selectAll('select * from students', (e, r) => {
		console.log(2);
		if (e) {
			res.status(200).json({
				"code": 1,
				"msg": e,
				"data": []
			});
		}
		res.status(200).json({
			"code": 0,
			"msg": "success",
			"data": r
		});
	})
});


app.listen(3001, function() {
	console.log('服务启动成功');
});