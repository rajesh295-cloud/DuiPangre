const jwt = require("jsonwebtoken")


const token = (user) =>{
    return jwt.sign({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phonenumber:user.phonenumber
    },
    "secrets",
    {
        expiresIn: "1d",

    }
    
    
    )
};


module.exports = token;