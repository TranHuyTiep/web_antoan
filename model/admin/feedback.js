/**
 * Created by Huy Tiep on 4/8/2017.
 */
var feedback = require('../My_model')
var bcrypt   = require('bcrypt-nodejs');
var connection  = require('../../config/database')
feedback = new feedback.my_model('feedback','id','','')
module.exports = feedback;