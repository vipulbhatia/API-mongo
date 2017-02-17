var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var users_schema = new Schema({
    email: {type : String , required : true},
    username: {type : String , required : true},
    password: {type : String , required : true},
    nsp: {type : String , required : true},
    role: {type: String, required: true},
    status: {type: String, required: true}
},{collection:"users"});

var users = mongoose.model('users', users_schema);
module.exports = users;
