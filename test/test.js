const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index')


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
})