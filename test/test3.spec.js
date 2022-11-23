
const request = require("supertest");
const app = require("../routes/userroute")
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




