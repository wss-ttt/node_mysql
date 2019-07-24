// 1. 导入mysql包
const mysql = require("mysql");

// 2. 创建数据库连接对象
const connection = mysql.createConnection({
    host     : 'localhost',
    database : 'ruoyi',
    user     : 'root',
    password : 'root'
});

// 3. 链接数据库
connection.connect();

// 4. 执行sql语句
let sql = "select * from sys_post";
connection.query(sql,function (error, results, fields) {
    // 5. 判断错误, 处理结果
    if (error) {
        throw error;
        return;
    }
    
    // 6. 处理结果
    console.log(results);
});

