const chai = require('chai');
const expect = chai.expect;
const chaiAsPromise=require('chai-as-promised');

chai.use(chaiAsPromise);

var addData = require('../src/add');

describe('test the add function', () => {
    context('add function', () => {
        it('should add two number', () => {
            expect(addData.add(1, 3)).to.equal(4);
        })
    });

    context('call back function', () => {
        it('should add two number with a call back function', (done) => {
            addData.addCallback(1, 6, (err, result) => {
                expect(err).to.not.exist;
                expect(result).to.equal(7);
                done();
            })
        })
    });

    context('Promise function', () => {
        it('should add two number with the promise', (done) => {
            addData.addPromise(1, 3).then((result) => {
                expect(result).to.equal(4);
                done();
            }).catch((err) => {
                console.log('Error caught', err);
                done(err)
            })
        });
        it('should test the promise with return', () => {
            return addData.addPromise(1, 2).then((result) => {
                expect(result).to.equal(3);

            });
        });

        it('should test the promise with the asyns and await', async () => {
            let result = await addData.addPromise(1, 2)
            expect(result).to.equal(3)
        })

        it('should test the chai as promise',async()=>{
            await expect(addData.addPromise(1,2)).to.eventually.equal(3)
        })
    });

})