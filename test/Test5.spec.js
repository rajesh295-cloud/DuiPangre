
import chai, { assert, expect, should } from "chai";
import chaiHttp from "chai-http";
import Booking from "../routes/businessRoute.js";



chai.use(chaiHttp)


describe('Get all Bookings', () => {

    it('should return Booking page',function(done){
        chai.request(Booking)
        .get('http://localhost:5000/api/booking/')
        .end(function(err,res){
          expect(200);
        


        
            
        })
      });
    })





    describe('Booking added', () => {

        it('Booking added', function(done){
            chai.request(Booking)
            .post('http://localhost:5000/api/booking/')
            .send({
                mobile: "31241241234",
                address: "Sample Address",
                Date: Date.now(),
                Time: "5:30pm"
            

            })
            .end(function(err, res){
              expect(200, done());
               
            })
          });
        })

        describe('Getting  Booking', () => {

            it('Getting  Booking', function(done){
                chai.request(Booking)
                .get('http://localhost:5000/api/booking/me')
                .end(function(err, res){
                  expect(200);
                   
                })
              });
            })


            
                describe('Booking Deleted', () => {

                    it('Booking deleted', function(done){
                        chai.request(Booking)
                        .delete('http://localhost:5000/api/booking/5')
                        .end(function(err, res){
                          expect(500);
                          done()
                           
                        })
                      });
                    })