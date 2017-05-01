/**
 * Created by Huy Tiep on 4/3/2017.
 */
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/admin/');
}

function check_login(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        res.redirect('/admin/home');


    // if they aren't redirect them to the home page
    return next();
}

function fullUrl(req,url) {
    if(!url){
        return (req.protocol+'://'+req.get('host'))
    }else {
        return (req.protocol+'://'+req.get('host')+'/'+url)
    }
}
module.exports.fullUrl = fullUrl;
module.exports.isLoggedIn = isLoggedIn;
module.exports.check_login = check_login;