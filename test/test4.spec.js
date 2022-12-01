
const request = require("supertest");
const app = require("../routes/ProductRoute")
const { expect } = require("chai");

describe("product add ", () => {


    it("adds product", () =>{

        request(app).post('/addproduct').send({
    
            name: "PRoduct1",
            img: "new.jpg",
            price: 3,
            brand: "new",
            countInStock: 4,
            desc: "products"
        })
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
    } )
})



describe("updating product", () => {

    it("returns product", () =>{
        const updatedproduct = {name: "firstname", desc : "lastnames"}
        const expectedresponse ={...app, ...updatedproduct}
        request(app).put('/seller/1').send(updatedproduct)
        .end((err, res)=>{
            expect(res.body).toEqual(expectedresponse)
            done()

        })
    } )
  

})



describe("get product", () => {

    it("returns product", () =>{
        const expectedresponse ={...app}
        request(app).get("/")
        .expect(200)
        .end((err, res) =>{
            expect(res.body).toEqual(expectedresponse)
            done()
        })

    } )
  

})







describe("get through id", () => {

    it("returns updated", () =>{
        const expectedresponse ={...app}
        request(app).get("/find/1")
        .expect(200)
        .end((err, res) =>{
            expect(res.body).toEqual(expectedresponse)
            done()
        })

    } )
})






describe("get through id deletes", () => {

    it("delets product", () =>{
        const expectedresponse ={...app}
        request(app).delete("/find/1")
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








