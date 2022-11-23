
const request = require("supertest");
const app = require("../routes/userroute")
const apps = require("../routes/sellerroute");
const { expect } = require("chai");
describe("updating user", () => {

    it("returns updated", () =>{
        const updateduser = {fullname: "Fullnames"}
        const expectedresponse ={...app, ...updateduser}
        request(app).put('/1').send(updateduser)
        .end((err, res)=>{
            expect(res.body).toEqual(expectedresponse)
            done()

        })
    } )
  

})


describe("updating seller", () => {

    it("returns updated", () =>{
        const updateduser = {firstname: "firstname", lastname : "lastnames"}
        const expectedresponse ={...apps, ...updateduser}
        request(apps).put('/seller/1').send(updateduser)
        .end((err, res)=>{
            expect(res.body).toEqual(expectedresponse)
            done()

        })
    } )
  

})



describe("get user", () => {

    it("returns updated", () =>{
        const expectedresponse ={...apps}
        request(apps).get("/1")
        .expect(200)
        .end((err, res) =>{
            expect(res.body).toEqual(expectedresponse)
            done()
        })

    } )
  

})




describe("update seller", () => {

    it("getting seller", () =>{
        const expectedresponse ={...app}
        request(app).get("/seller/1")
        .expect(200)
        .end((err, res) =>{
            expect(res.body).toEqual(expectedresponse)
            done()
        })

    } )
  

})








