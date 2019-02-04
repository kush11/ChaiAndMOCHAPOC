const chai = require('chai');
const expect = chai.expect;
const chaiAsPromise = require('chai-as-promised');
chai.use(chaiAsPromise);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const rewire = require('rewire');
var demo = rewire('../src/file');


context('stub', () => {
    it('should stub createFile', async () => {
        let createStub = sinon.stub(demo, 'createFile').resolves('create_stub');
        let callStub = sinon.stub().resolves('calldb_stub');
        
        demo.__set__('callDB', callStub);
        
        let result = await demo.bar('test.txt');
        
        expect(result).to.equal('calldb_stub');
        expect(createStub).to.have.been.calledOnce;
        expect(createStub).to.have.been.calledWith('test.txt');
        expect(callStub).to.have.been.calledOnce;

        //note about callstub restore not needed since it doesn't directly replace, we rewire instead
        createStub.restore();
        demo = rewire('./demo');
    });
});