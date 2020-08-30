const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const UniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name: String,
    passwordHash: {
        type:String,
        required:true}
})

UserSchema.plugin(UniqueValidator);

UserSchema.set("toJSON",{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash
      }
});


module.exports = mongoose.model("User", UserSchema);