module.exports = {
    getHome: async function  (req,res) {
        res.render('client-index',{title: 'Home', msg: 'hello world'});
    }
}