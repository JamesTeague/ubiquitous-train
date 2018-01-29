module.exports = function(app) {
   app.get('/', function(req, res) {
      var cwd = process.cwd();
      res.sendFile(cwd + "/public/login.html");
   })
};