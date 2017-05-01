/**
 * Created by Huy Tiep on 3/30/2017.
 */
var admin = require('../My_model')
var bcrypt   = require('bcrypt-nodejs');
admin.my_model.table = 'admin'

admin.my_model.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
admin.my_model.validPassword = function(password,hash) {
    return bcrypt.compareSync(password, hash);
};
module.exports = admin.my_model;
