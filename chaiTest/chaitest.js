const chai = require('chai');
const except = chai.expect;


describe('chai test', () => {
    it('should compare the value', () => {
        except(1).to.equal(1);
    });

    it('should check the name', () => {
        except({ name: 'Kush' }).to.deep.equal({ name: 'Kush' });
        except({name:'Kush'}).to.have.property('name').to.equal('Kush');
        except(2>6).to.be.false;
        except({}).to.be.a('object');
        except('Kush').to.be.a('string');
        except(3).to.be.a('number');
        except('Pratian').to.be.a('string').to.lengthOf(7);
        except([1,2,3]).to.be.a('array');
        except([1,2,3,4].length).to.equal(4);
        except(null).to.be.null;
        except(undefined).to.not.exist;
        except(1).to.exist;
    });
})