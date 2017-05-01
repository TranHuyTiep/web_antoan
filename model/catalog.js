/**
 * Created by Huy Tiep on 4/8/2017.
 */
var catalog = require('./My_model')
var bcrypt   = require('bcrypt-nodejs');
var connection  = require('../config/database')
catalog = new catalog.my_model('catalog','id','','')
module.exports = catalog;