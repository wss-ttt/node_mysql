const mysql = require('mysql');

const connectdb=()=>{
  let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'test'     // 要连接的数据库
  })
  return connection;
}


module.exports=connectdb;