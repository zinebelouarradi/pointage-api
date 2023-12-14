const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Make sure to adjust the path accordingly

chai.use(chaiHttp);
const expect = chai.expect;

describe('App', () => {
  it('should return "APP IS RUNNING!!" on GET /', (done) => {
    chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('APP IS RUNNING!!');
        done();
      })
    });


  it('should respond with 404 on invalid route', (done) => {
    chai.request(app)
      .get('/random')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

