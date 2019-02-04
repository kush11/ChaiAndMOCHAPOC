const assert = require('assert');

describe('file to be tested', () => {
    context('function to be tested', () => {

        before(() => {
            console.log('==========Before===========');
        });

        after(() => {
            console.log('==========After============');
        });

        beforeEach(() => {
            console.log('==========before Each========');
        });

        afterEach(() => {
            console.log('==========after Each========');
        });

        it('should do testing 1', () => {
            assert.equal(1, 1);
        });

        it('should do testing 2', () => {
            assert.deepEqual({ name: 'kush' }, { name: 'kush' });
        });

        it('should do testing 3', () => {
            console.log("Env:",process.env.NODE_ENV);
            if(process.env.NODE_ENV==='development'){
                console.log("Development Mode")
            }
        })

        it('something');
    });

    context('another Function', () => {
        it('It should to Something');
    });

});