/**
 * Created by Huy Tiep on 4/9/2017.
 */
var express = require('express');
var helper = require('../helper/helper')
var feedback = require('../model/admin/feedback')
var detail = require('../model/admin/detail')
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
    var fullUrl = helper.fullUrl(req);
    var data  = {};
    detail.getAll(function (error,result) {
        if (!error){
            data = result
            if(!error){
                res.render('site/home/index', {
                    fullUrl: fullUrl,
                    data: data
                });
            }
        }else {
            res.render('error', {
                fullUrl: fullUrl,
            });
        }

    })
});

function isEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
        return true
    }else {
        return false;
    }
}

router.post('/home',function (req,res,next) {
    var fullUrl = helper.fullUrl(req);
    var data  = req.body;
    if(data){
        if (isEmail(data.email)){
            feedback.create(data,function (error,result) {
                if(result){
                    res.json(1)
                }else {
                    res.json(2);
                }
            })
        }else {
            res.json(3)
        }
    }
})
module.exports = router;
