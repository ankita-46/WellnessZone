const mongoose = require('mongoose');
let dblink = 'mongodb+srv://admin:KlpfSNQUI0FOd9EM@mentalhealthproject.yfnfgdr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dblink)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
})
