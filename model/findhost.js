var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var findhost_schema = new Schema({
    esm_name: {type : String , required : true},
    data:Schema.Types.Mixed,
    cost:{type : String, default :"NC"},
    account:{type: String},
    accounted_by:{type : String}
},{collection:"findhost"});

var Findhost = mongoose.model('Findhost', findhost_schema);
module.exports = Findhost;