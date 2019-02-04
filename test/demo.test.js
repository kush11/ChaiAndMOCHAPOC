const chai = require('chai');
const expect = chai.expect;

var demo = require('./demo');

describe('demo', () => {
    context('add', () => {
        expect(demo.add(1, 2)).to.equal(3);
    });
});