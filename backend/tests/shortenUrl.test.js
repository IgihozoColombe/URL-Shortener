const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // assuming your app is exported from app.js
const User = require('../models/User');
const ShortUrl = require('../models/shortUrl');
const jwt = require('jsonwebtoken');
// let chai;
// before(() => {
//   return import('chai').then(chaiLib => {
//     chai = chaiLib;
//   });
// });

chai.use(chaiHttp);
const expect = chai.expect;

describe('URL Shortening Controller', () => {
    let token;
    let userId;

    before((done) => {
        // Create a user and generate JWT token
        const user = new User({
            // provide necessary user data for testing
        });

        user.save()
            .then((savedUser) => {
                userId = savedUser._id;
                token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY);
                done();
            })
            .catch((error) => done(error));
    });

    after((done) => {
        // Cleanup: delete the user and associated short URLs
        User.findByIdAndDelete(userId)
            .then(() => ShortUrl.deleteMany({ user_id: userId }))
            .then(() => done())
            .catch((error) => done(error));
    });

    describe('POST /shortUrls', () => {
        it('should generate a shortened URL', (done) => {
            chai.request(app)
                .post('/shortUrls')
                .send({ token: token, fullUrl: 'https://www.wattpad.com/796204813-once-a-dare-leads-to-love-book-1-01-begining' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('url');
                    expect(res.body.url).to.be.a('string');
                    done();
                });
        });

        it('should return an error if no authentication token is provided', (done) => {
            chai.request(app)
                .post('/shortUrls')
                .send({ fullUrl: 'https://www.wattpad.com/796204813-once-a-dare-leads-to-love-book-1-01-begining' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });
});
