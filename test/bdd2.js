const BASE_URL = "http://127.0.0.1:3000"

const server = require("../app")


const chai = require("chai"),
    expect = require("chai").expect,
    should = require("chai").should(),
    chaiHttp = require("chai-http");
let items;


describe("Server is working or not", ()=>{
    before((done) =>{
        chai.use(chaiHttp)
        server.on("server_started_up", done())
    })
   
    
})