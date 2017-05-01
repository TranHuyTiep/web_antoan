/**
 * Created by Huy Tiep on 4/3/2017.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var helper = require('../../helper/helper')
var admin = require('../../model/admin/admin')
var catalog = require('../../model/catalog')
var detail = require('../../model/admin/detail')
var multipart  = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs')

function ghiFile(file) {
        // Tên file
        var originalFilename = file.name;

        // File type
        var fileType         = file.type.split('/')[1];

        // File size
        var fileSize         = file.size;

        // Đường dẫn lưu ảnh
        var pathUpload       =  '../public/assets/img/about/' + originalFilename;
        // Đọc nội dung file tmp
        // nếu không có lỗi thì ghi file vào ổ cứng
        fs.readFile(file.path, function(err, data) {
            if(!err) {
                fs.writeFile(pathUpload,data, function(err,da) {
                    // Return anh vua upload

                });

            }
        });
}
// Thư mục chứa ảnh upload trên server
/**
 * danh sach cach cac muc
 */
router.get('/catalog/add',helper.isLoggedIn, function(req, res) {
    var fullUrl = helper.fullUrl(req);
    res.render('admin/main',{fullUrl : fullUrl,fileName:'catalog/add'});
});

/**
 * them cac muc
 */
router.post('/catalog/add',multipartMiddleware, function(req, res) {
    var file = req.files.file;
    var req_detail = req.body;
    var catalog_data = {
        name:req.body.name,
        img:file.name
    };
    catalog.create(catalog_data,function (error,data) {
        if(!error){
            ghiFile(file)
            res.redirect('/admin/home');
        }
    })
});

/**
 * xoa mot muc
 */
router.get('/catalog/delete/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    var sql = 'id = '+id;
    catalog.delete(id,function (error,result) {
            if(!error){
                res.redirect('/admin/home');
            }
        })
});

/**
 * sua cac muc
 */
router.get('/catalog/edit/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    var sql = 'id = '+id;
    catalog.get_rule(sql,function (error,result) {
        res.render('admin/main',{fullUrl : fullUrl,fileName:'catalog/edit',data:result[0],id:id});
    })
});

router.post('/catalog/edit/:id',multipartMiddleware, function(req, res) {
    var id = req.params.id
    var file = req.files.file;
    var req_detail = req.body;
    var catalog_data = {
        name:req.body.name,
    };
    if(file.name){
        catalog_data.img = file.name
    }
    var sql = 'id = '+id;
    catalog.update_rule(catalog_data,sql,function (error,data) {
        if(!error){
            ghiFile(file)
            res.redirect('/admin/home');
        }
        console.log(error)
    })
});


/**
 * danh sach cac muc trong muc cha
 */
router.get('/catalog/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    var sql = 'catalog_id = '+id;
    detail.get_rule(sql,function (error,result) {
        console.log(error)
        res.render('admin/main',{fullUrl : fullUrl,fileName:'catalog/detail',data:result,id:id});
    })
});

/**
 * them muc cho muc cha
 */
router.get('/catalog/detail/add/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    res.render('admin/main',{fullUrl : fullUrl,fileName:'catalog/add_detail',id:id});

});

router.post('/catalog/detail/add',helper.isLoggedIn, function(req, res) {
    var data = req.body;
    if(data){
        detail.getAll(function (error,result) {
            var check = 0;
            for (var i=0;i<result.length;i++){
                if (result[i].name == data.name && result[i].catalog_id == data.catalog_id){
                    check++
                }
            }
            if (check==0){
                detail.create(data,function (error,result) {
                    if(!error){
                        res.json(1)
                    }
                })
            }else {
                res.json(2)
            }
        })

    }
});

/**
 * sua muc cho muc cha
 */
router.get('/catalog/detail/edit/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    var sql = 'id = '+id;
    detail.get_rule(sql,function (error,result) {
        res.render('admin/main',{fullUrl : fullUrl,fileName:'catalog/edit_detail',data:result[0],id:id});
    })
});

router.post('/catalog/detail/edit',helper.isLoggedIn, function(req, res) {
    var data = req.body;
    if(data){
        var sql = 'id = '+data.id;
        var update = {name:data.name}
        detail.update_rule(update,sql,function (error,result) {
            if (error){
                res.json(2)
            }
        })

    }
});

/**
 * xoa muc cho muc cha
 */
router.get('/catalog/detail/delete/:id',helper.isLoggedIn, function(req, res) {
    var id = req.params.id;
    var fullUrl = helper.fullUrl(req);
    var sql = 'id = '+id;
    detail.get_rule(sql,function (error,result) {
        var catalog_id = result[0].catalog_id;
        detail.delete(id,function (error,result) {
            if(!error){
                res.redirect('/admin/catalog/'+catalog_id);
            }
        })
    })
});

module.exports = router;