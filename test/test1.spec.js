const request = require("supertest");
const { deleteOne } = require("../models/user");
const app = require("../routes/userroute")
const apps = require("../routes/sellerroute")

describe("user registration", () => {


    it("returns 200 Ok when signup request is valid", () =>{

        request(app).post('/signup').send({
    
            fullname: "Roy",
            email: "roy@email.com",
            phonenumber: "9821841218",
            password: "Passworded",
        })
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
    } )
})



describe("Seller Registration" ,() =>{

    it("returns 200 Ok when signup request is valid", () =>{

        request(app).post('/seller/signup').send({
    
            firstname: "ROy",
            lastname: "Rolls",
            email: "roy@email.com",
            phonenumber: "9821841218",
            password: "Passworded",
        })
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
    } )

})