/**
 * Created by Huy Tiep on 4/2/2017.
 */
var mysql =  require('mysql');
var connection =  mysql.createConnection({
    user:'sql10172121',
    host:'sql10.freemysqlhosting.net',
    password:'9uihiZrCms',
    database:'sql10172121',
})
connection.connect();
module.exports = connection;