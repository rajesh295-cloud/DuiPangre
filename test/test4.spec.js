
import chai, { assert, expect, should } from "chai";
import chaiHttp from "chai-http";
import Business from "../routes/businessRoute.js";



chai.use(chaiHttp)


describe('Get all business', () => {

    it('should return Business page',function(done){
        chai.request(Business)
        .get('http://localhost:5000/api/businesses/')
        .end(function(err,res){
          expect(200);
          done();


        
            
        })
      });
    })





    describe('Business added', () => {

        it('Business added', function(done){
            chai.request(Business)
            .post('http://localhost:5000/api/businesses/')
            .send({



                name : "Test Business",
                slug: "Test Business",
                image: "/image/pd.jpg",
              
                countInstock: 1,
                address: "Sample address",
                description: "Sample description"

            })
            .end(function(err, res){
              expect(200, done());
               
            })
          });
        })

        describe('Getting One Business', () => {

            it('Getting One business', function(done){
                chai.request(Business)
                .get('http://localhost:5000/api/businesses/3')
                .end(function(err, res){
                  expect(200);
                  done();
                   
                })
              });
            })


            
                describe('Business Deleted', () => {

                    it('Business deleted', function(done){
                        chai.request(Business)
                        .delete('http://localhost:5000/api/businesses/4')
                        .end(function(err, res){
                          expect(500);
                          done()
                           
                        })
                      });
                    })