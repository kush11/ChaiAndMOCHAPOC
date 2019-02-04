const chai = require('chai');
const expect = chai.expect;
const chaiAsPromise=require('chai-as-promised');
chai.use(chaiAsPromise);
const sinon=require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);


var data = require('../src/spy');

describe('test the add function', () => {
    context('Syp function', () => {
        it('should spy on log', () => {
            let spy=sinon.spy(console,'warn');// first parameter is the liberary  second paramrnter is the actual function
            data.spy();
            expect(spy.calledOnce).to.be.true;
            expect(spy).to.have.been.calledOnce;
            spy.restore();
        })
    });

})