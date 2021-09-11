module.exports = {
    getHome: async function  (req,res) {
        res.render('',{title: 'Home', msg: 'hello world'});
    }
}