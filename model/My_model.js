/**
 * Created by Huy Tiep on 3/30/2017.
 */
var connection  = require('../config/database')

function my_model(table,key,order,select) {
    this.table = table;
    this.key = key;
    this.order = order;
    this.select = select
}


/**
 * Them du lieu vao mot bang
 * @param data_new {key:value}
 * @param callback function
 */
my_model.prototype.create = function (data_new,callback) {
    if (!data_new){
        callback(false)
    }else {
        var query = 'INSERT INTO '+this.table+' SET ?';
        var set_auto="ALTER TABLE "+this.table+" AUTO_INCREMENT = 1";
        connection.query(set_auto,function (error,result) {
            if (error){
                callback(error)
            }else {
                connection.query(query,data_new,function (error,result) {
                    if (error){
                        callback(error)
                    }else {
                        callback(error,result)
                    }
                })
            }
        })
    }
}

/**
 * update theo id
 * @param data_update   {key:value}
 * @param id            number
 * @param callback
 */
my_model.prototype.update = function (data_update,id,callback) {
    if (!data_update || !id){
        callback(false)
    }else {
        var sql = "UPDATE "+this.table+" SET ? WHERE id = ?";
        connection.query(sql,[data_update,id],function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * update theo dieu kien where
 * @param data_update   {key:value}
 * @param where         'where'
 * @param callback
 */
my_model.prototype.update_rule = function (data_update,where,callback) {
    if (!data_update || !where){
        callback(false)
    }else {
        var sql = "UPDATE "+this.table+" SET ? WHERE " + where;
        connection.query(sql,data_update,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * delete theo id
 * @param id            number
 * @param callback
 */
my_model.prototype.delete = function (id,callback) {
    if(!id){
        callback(false)
    }else {
        var sql = "DELETE FROM "+this.table+" WHERE id=?;"
        connection.query(sql,id,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * delete theo dieu kien where
 * @param where         'where'
 * @param callback
 */
my_model.prototype.delete_rule = function (where,callback) {
    if (!where){
        callback(false)
    }else {
        var sql = "DELETE FROM "+this.table+" WHERE "+ where;
        connection.query(sql,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * get theo id
 * @param id            number
 * @param callback
 */
my_model.prototype.get = function (id,callback) {
    if(!id){
        callback(false)
    }else {
        var sql = "SELECT * FROM "+this.table+" WHERE id=?;"
        connection.query(sql,id,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * get All
 * @param callback
 */

my_model.prototype.getAll = function (callback) {
        var sql = "SELECT * FROM "+this.table
        connection.query(sql,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
}


/**
 * get theo dieu kien where
 * @param where         'where'
 * @param callback
 */
my_model.prototype.get_rule = function (where,callback) {
    if (!where){
        callback(false)
    }else {
        var sql = "SELECT * FROM "+this.table+" WHERE "+ where;
        connection.query(sql,function (error,result) {
            if (error){
                callback(error)
            }else {
                callback(error,result)
            }
        })
    }
}

/**
 * tong row
 * @param callback
 */
my_model.prototype.tong = function (callback) {
    var query="SELECT COUNT(*) AS tong FROM "+this.table;

    connection.query(query,function (error,result) {
        if (error){
            callback(error)
        }else {
            callback(error,result)
        }
    })
}

module.exports.my_model = my_model;

