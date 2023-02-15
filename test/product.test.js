const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index.js')


const expect = chai.expect;
const should = chai.should()


chai.use(chaiHttp);


describe('testing API Endpoint',() => {


    it('test default API welcome route...',(done) => {
        chai.request(server)
        .get('/api/welcome')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const actualVal = res.body.message;
            expect(actualVal).to.be.equal('welcome to the mocha and chai test API')
            done();
        });
    });

    /*-----Testing Get All Blogs-----*/

    describe('GET /blogs/gettall', () => {
        it('it should GET all blogs in the DB',(done) => {
           chai.request(server)
           .get('/blogs/getall')
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
            //    res.body.length.should.be.eql(6);
               done();
           });
        });

        it('it should not GET all blogs in the DB',(done) => {
            chai.request(server)
            .get('/blogs/getal')
            .end((err,res) => {
                res.should.have.status(404);
                done();
            });
         });
    })


    /*-----Testing Get Blog by Id-----*/

    describe('GET /blogs/get/:id', () => {
        it('it should GET a blog by id',(done) => {
           chai.request(server)
           .get('/blogs/get/63de2f4c53ce980bdc0c3691')
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('_id');
               res.body.should.have.property('title');
               res.body.should.have.property('desc');
               res.body.should.have.property('img');
               res.body.should.have.property('likes');
               res.body.should.have.property('_id').eql('63de2f4c53ce980bdc0c3691')
               done();
           });

           
        });

        it('it should not GET a blog by id',(done) => {
            chai.request(server)
            .get('/blogs/get/123123123123123')
            .end((err,res) => {
                res.should.have.status(404);
                const actualValue = res.body.message
                expect(actualValue).to.be.equal("There is no blog with such id" )
                done();
            });
 
            
         });
    })


    /*-----Testing POST Blog-----*/

    describe('POST /blogs/add', () => {
        it('it should POST a blog',(done) => {
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
            const blog = {
                title:"testing",
                desc:"this is the testing mocha and chai",
                img:"fgh2345678dfghj"
            }

           chai.request(server)
           .post('/blogs/add')
           .set({ "Authorization": `Bearer ${token}`})
           .send(blog)
           .end((err,res) => {
               res.should.have.status(201);
               res.body.should.be.a('object');
               res.body.should.have.property('_id');
               res.body.should.have.property('title').eql('testing');
               res.body.should.have.property('desc').eql('this is the testing mocha and chai');
               res.body.should.have.property('img').eql('fgh2345678dfghj');
               res.body.should.have.property('likes');
               done();
           });

           
        });


        it('it should not POST a blog',(done) => {
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
            const blog = {
                title:"testing",
                desc:"this is the testing mocha and chai",
                img:"fgh2345678dfghj"
            }

           chai.request(server)
           .post('/blogs/adds')
           .set({ "Authorization": `Bearer ${token}`})
           .send(blog)
           .end((err,res) => {
               res.should.have.status(404);
               done();
           });

           
        });

    })


    /*-----Testing ADD like to the Blog-----*/

    describe('POST /blogs/like/:id', () => {
        it('it should POST like to the blog',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ2xhc3RAZ21haWwuY29tIiwiaWQiOiI2M2ViZGIzNzU4MTE5MTE3MmFhODEwNzgiLCJpYXQiOjE2NzY0MDE1MDMsImV4cCI6MTY3NjQwODcwM30.WyZ3NHFXPq49ywnxjU7WXO6pymcAcB0jnx5kSpT-984'
           chai.request(server)
           .post('/blogs/like/63e9389b2636aabe666eabeb')
           .set({ "Authorization": `Bearer ${token}`})
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               const actualValue = res.body.message
               expect(actualValue).to.be.equal("Blog has been liked!" )
               done();
           });

           
        });

    })



    /*-----Testing UPDATE a Blog of specified Id-----*/

    describe('PATCH /blogs/update/:id', () => {
        it('it should PATCH a blog',(done) => {
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
            const blog = {
                title:"Development Agency33",
                desc:"this is the testing mocha and chai",
                img:"fgh2345678dfghj3333333333333"
            }

           chai.request(server)
           .patch('/blogs/update/63e9389b2636aabe666eabeb')
           .set({ "Authorization": `Bearer ${token}`})
           .send(blog)
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('_id').eql('63e9389b2636aabe666eabeb');
               res.body.should.have.property('title').eql('Development Agency33');
               res.body.should.have.property('desc').eql('this is the testing mocha and chai');
               res.body.should.have.property('img').eql('fgh2345678dfghj3333333333333');
               done();
           });

           
        });

    })





    /*-----Testing DELETE Blog by Id-----*/



    describe('DELETE /blogs/delete/:id', () => {
        it('it should DELETE a blog',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
           chai.request(server)
           .delete('/blogs/delete/63e94e5e3f1b2c2f2649c9ae')
           .set({ "Authorization": `Bearer ${token}`})
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               const actualValue = res.body.message
               expect(actualValue).to.be.equal("blog deleted successfully" )
               done();
           });

           
        });

    })



    /*-----Testing POST comment in mongoDB-----*/


    describe('POST /comment/add/:id', () => {
        it('it should POST a comment in mongoDB',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ2xhc3RAZ21haWwuY29tIiwiaWQiOiI2M2ViZGIzNzU4MTE5MTE3MmFhODEwNzgiLCJpYXQiOjE2NzY0MDE1MDMsImV4cCI6MTY3NjQwODcwM30.WyZ3NHFXPq49ywnxjU7WXO6pymcAcB0jnx5kSpT-984'
           const blog = {
               commentValue:"Test comment on Development Agency33",
            }
           chai.request(server)
           .post('/comment/add/63e9389b2636aabe666eabeb')
           .set({ "Authorization": `Bearer ${token}`})
           .send(blog)
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               done();
           });

           
        });

    })



    /*-----Testing Get comment of specific Blog-----*/


    describe('GET /comment/get/:id', () => {
        it('it should GET a comment of specific blog',(done) => {
           chai.request(server)
           .get('/comment/get/63e8bef28c12b54d8a8d91f8')
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           });

           
        });

    })


     /*-----Testing Get all comment-----*/


    describe('GET /comment/getall', () => {
        it('it should GET all comments',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
           chai.request(server)
           .get('/comment/getall')
           .set({ "Authorization": `Bearer ${token}`})
           .end((err,res) => {
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           });

           
        });

    })




      /*-----Testing Delete a comment-----*/


    describe('DELETE /comment/delete/:id', () => {
        it('it should DELETE a comment',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
           chai.request(server)
           .delete('/comment/delete/63e94e603f1b2c2f2649c9b3')
           .set({ "Authorization": `Bearer ${token}`})
           .end((err,res) => {
            const actualValue = res.body.message
            expect(actualValue).to.be.equal("comment deleted successfully" )
            done();
           });

           
        });

    })


       /*-----Testing Admin Signup-----*/


    // describe('POST /admin/signup', () => {
    //     it('it should POST an admin',(done) => {
    //         const admin = {
    //             fullname:"jules Niyomwungeri",
    //             email:"julesniyomwungeri144@gmail.com",
    //             password:"jules",
    //             comfirmPassword:"jules"
    //         }
    //        chai.request(server)
    //        .post('/admin/signup')
    //        .send(admin)
    //        .end((err,res) => {
    //         res.should.have.status(200);
    //         done();
    //        });

           
    //     });

    // })


    /*-----Testing Admin Signin-----*/


    describe('POST /admin/signin', () => {
        it('it should POST an admin and signin',(done) => {
            const admin = {
                email:"string@gmail.com",
                password:"string"
             }
             chai.request(server)
             .post('/admin/signin')
            .send(admin)
            .end((err,res) => {
             res.should.have.status(200);
             done();
            });
    
               
        });
    
    })



    /*-----Testing Admin UPDATE-----*/


    describe('PUT /admin/update/:id', () => {
        it('it should PUT an admin',(done) => {
            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
            const admin = {
                img:"asdfghjkzxcvnm.jpg"
             }
             chai.request(server)
            .put('/admin/update/63e94f7500a5c43198ba0dfc')
            .set({ "Authorization": `Bearer ${token}`})
            .send(admin)
            .end((err,res) => {
             res.should.have.status(200);
             done();
            });
    
               
        });
    
    })








          /*-----Testing visitor Signup-----*/


          describe('POST /visitor/signup', () => {
            it('it should POST a visitor',(done) => {
                const visitor = {
                    fullname:"test jack",
                    email:"jack088888@gmail.com",
                    password:"jules",
                    comfirmPassword:"jules"
                }
               chai.request(server)
               .post('/visitor/signup')
               .send(visitor)
               .end((err,res) => {
                res.should.have.status(200);
                done();
               });
    
               
            });
    
        })
    
    
        /*-----Testing visitor Signin-----*/
    
    
        describe('POST /visitor/signin', () => {
            it('it should POST a visitor and signin',(done) => {
                const visitor = {
                    email:"julesniyomwungeri1445@gmail.com",
                    password:"jules"
                 }
                 chai.request(server)
                 .post('/visitor/signin')
                .send(visitor)
                .end((err,res) => {
                 res.should.have.status(200);
                 done();
                });
        
                   
            });
        
        })


        /*-----Testing Delete a visitor-----*/


    describe('DELETE /visitor/delete/:id', () => {
        it('it should DELETE a visitor',(done) => {
           let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJpZCI6IjYzZWI4YTZhNzhhMTYwZTc4N2NmMjEyMiIsImlhdCI6MTY3NjQwMTY1NywiZXhwIjoxNjc2NDA4ODU3fQ.Vti7GbZhKKkSZjHsry2yPr97-dKKlYqpPZoqTL5eGDw'
           chai.request(server)
           .delete('/visitor/delete/63e951f491d81bbdb72a11e6')
           .set({ "Authorization": `Bearer ${token}`})
           .end((err,res) => {
            const actualValue = res.body.message
            expect(actualValue).to.be.equal("visitor deleted successfully" )
            done();
           });

           
        });

    })
    


    
})