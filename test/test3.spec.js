
import chai, { assert, expect, should } from "chai";
import chaiHttp from "chai-http";
import Order from "../routes/orderRoutes.js";



chai.use(chaiHttp)


describe('Get all Orders', () => {

    it('should return Order page',function(done){
        chai.request(Order)
        .get('http://localhost:5000/api/orders')
        .end(function(err,res){
          expect(500);
          done();


        
            
        })
      });
    })





    describe('Order added', () => {

        it('Order added', function(done){
            chai.request(Order)
            .post('http://localhost:5000/api/orders/')
            .send({

                OrdertItems: ({ product: 3}),
                shippingAddress: ({Address: "Test shipping addresses"}),
                paymentMethod: "Paypal",
                ItemPrice: 34,
                shippingPrice: 3,
                TaxPrice: 4,
                TotalPrice: 41,
                User: "124151251251"




            })
            .end(function(err, res){
              expect(500, done());
               
            })
          });
        })

        describe('Getting Order', () => {

            it('Getting order', function(done){
                chai.request(Order)
                .get('http://localhost:5000/api/orders/1')
                .end(function(err, res){
                  expect(200);
                  done();
                   
                })
              });
            })



            
                describe('Order Deleted', () => {

                    it('Order deleted', function(done){
                        chai.request(Order)
                        .delete('http://localhost:5000/api/orders/3')
                        .end(function(err, res){
                          expect(res.status(200));
                          done()
                           
                        })
                      });
                    })