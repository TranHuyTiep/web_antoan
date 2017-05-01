/**
 * Created by Huy Tiep on 30/04/2017.
 */
var detail = require('../My_model')
var bcrypt   = require('bcrypt-nodejs');
var connection  = require('../../config/database')
detail = new detail.my_model('detail','id','','')

module.exports = detail;