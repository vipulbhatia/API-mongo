var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var netiq_schema = new Schema({
    tool: {type : String , required : true},
    source: {type : String , required : true},
    account: {type : String , required : true},
    esm_name: {type : String , required : true},
    config:[Schema.Types.Mixed]
},{collection:'netiq'});

var Netiq = mongoose.model('Netiq', netiq_schema);

module.exports = Netiq;