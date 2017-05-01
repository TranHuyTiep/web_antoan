/**
 * Created by Huy Tiep on 4/3/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var helper = require('../../helper/helper')
var catalog = require('../../model/catalog')
var feedback = require('../../model/admin/feedback')
router.get('/home',helper.isLoggedIn, function(req, res) {
    var fullUrl = helper.fullUrl(req);
    catalog.getAll(function (err,data) {
        if(!err){
            catalog.tong(function (err,tong) {
                if(!err){
                    feedback.getAll(function (err,result) {
                        array = {data:data,tong:tong[0].tong,feedback:result}
                        res.render('admin/main',{fullUrl : fullUrl,data:array,fileName:'home/index'}); // load the index.ejs file
                    })

                }
            })
        }
    })
});




module.exports = router;