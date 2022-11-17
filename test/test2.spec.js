const request = require("supertest");
const app = require("../routes/userroute")
const apps = require("../routes/sellerroute")

describe("user signin", () => {


    it("returns 200 Ok when signin request is valid", () =>{

        request(app).post('/signin').send({
    
            email: "roy@email.com",
       
            password: "Passworded"
        })
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
    } )
})



describe("Seller signin" ,() =>{

    it("returns 200 Ok when signin request is valid", () =>{

        request(apps).post('/seller/signin').send({
    
            email: "roy@email.com",
      
            password: "Passworded"
        })
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
    } )

})