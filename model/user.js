const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    fullname: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    matric_no: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String, 
        required: true    
    },
    level: {
        type: Number, 
        required: true
    },
    gender: {
        type: String, 
        required: true
    },   
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});
    
    

    userSchema.pre('save', async function(next) {
        try {

            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch(err) {
            console.log(err);
        }

    })

    userSchema.statics.login = async function(matric_no, password){
        const loginUser = await this.findOne({matric_no});

        if(loginUser) {
            const authUser = await bcrypt.compare(password, loginUser.password);
            if(authUser) {                 
                  return loginUser;
            } throw Error("Incorrect password");
        }
        throw Error("Incorrect matric no")    
    }




    const user = mongoose.model('user', userSchema);
    module.exports = user;

    