const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var sandbox = sinon.sandbox.create();

var mongoose = require('mongoose');
var user = require('../src/user');

describe('User', () => {
    let findStub;
    let sampleArgs;
    let deleteStubs;
    let sampleUser;

    beforeEach(() => {
        sampleuser = {
            id: 123,
            name: 'Kush',
            email: 'kushkumar636@gmail.com'
        }
        findStub = sandbox.stub(mongoose.Model, 'findById').resolves(sampleuser);
        deleteStubs = sandbox.stub(mongoose.Model, 'remove').resolves('fake_remove_result');
    })
    afterEach(() => {
        sandbox.restore();
    });

    context('get', () => {
        it('should check for an id', (done) => {
            user.get(null, (err, result) => {
                expect(err).to.exist;
                expect(err.message).to.equal('Invalid user id');
                done();
            })
        })

        it('should call findById with the id and return result ', (done) => {
            sandbox.restore();
            //null is the error {name:'Kush'} actual result from the function
            let stub = sandbox.stub(mongoose.Model, 'findById').yields(null, { name: 'Kush' });

            user.get(123, (err, result) => {
                expect(err).to.be.null;
                expect(stub).to.have.been.calledOnce;
                expect(stub).to.have.been.calledWith(123);
                expect(result).to.be.a('object');
                expect(result).to.have.property('name').to.equal('Kush');

                done();
            })
        })

        it('should catch the error', (done) => {
            sandbox.restore();
            let stub = sandbox.stub(mongoose.Model, 'findById').yields(new Error('Fake Error'));

            user.get(123, (err, result) => {
                expect(result).to.not.exist;
                expect(err).to.exist;
                expect(err).to.be.instanceOf(Error);
                expect(stub).to.have.been.calledOnceWith(123);
                expect(err.message).to.equal('Fake Error');

                done();
            })
        })
    })
    context('delete user', () => {
        it('should check for an id using return', () => {
            return user.delete().then((result) => {
                expect(result).to.be.exist;
                throw new Error('Unexpected Error occured')
            }).catch((err) => {
                expect(err).to.be.instanceOf(Error);
                expect(err.message).to.equal('Invalid id');
            })
        })

        it('should remove the user', async () => {
            let result = await user.delete(123);

            expect(result).to.equal('fake_remove_result')
            expect(deleteStubs).to.have.been.calledWith({ _id: 123 });
        })
    })
})