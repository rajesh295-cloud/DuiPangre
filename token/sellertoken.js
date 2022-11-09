const jwt = require("jsonwebtoken")


const sellertoken =(seller) =>{
    return jwt.sign({
        _id: seller._id,
        firstname: seller.firstname,
        lastname: seller.lastname,
        email: seller.email,
        phonenumber: seller.phonenumber,

    },
    "anysecrets",
    {
        expiresIn:"1d"
    }
    )

}


module.exports = sellertoken;