/**
 * Created by Huy Tiep on 4/2/2017.
 */
var mysql =  require('mysql');
var connection =  mysql.createPool({
    connectionLimit : 10,
    user:'b5ab7f6bd40958',
    host:'us-cdbr-iron-east-03.cleardb.net',
    password:'f0df253f',
    database:'heroku_672101368c931b9',
})
module.exports = connection;
