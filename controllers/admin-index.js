module.exports = {
    getHome: async function  (req,res) {
        res.render('admin-index',{title: 'Management', msg: 'hello world'});
    }
}