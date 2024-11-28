let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema({
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:"Display Name is Required"
    },

    password:
    {
        type:String,
        default:"",
        trim:true,
        required:"Password is required"
    },

    created:{
        type:Date,
        default: Date.now
    },
    update:{
        type:Date,
        default: Date.now
    }


},
{
    collection:"user"
}

)

let options = ({MissingPasswordError:"Wrong Password!"});
User.plugin(passportLocalMongoose,option);
module.exports.User = mongoose.model('User', User);