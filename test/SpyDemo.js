var sinon = require('sinon');
var assert = require('chai').assert;

describe("should demostrate of define function", ()=>{
    
    it('should spy the function of Object', ()=>{
        var Sample = {foo: (a,b)=>a+b};
        
        var fooSpy = sinon.spy(Sample, 'foo');

        assert.equal(Sample.foo(1,2), 3);
        
        // Spy of object will replace the method
        assert.isTrue(fooSpy.calledOnce);
        assert.isTrue(Sample.foo.calledOnce);
        
        assert.isTrue(Sample.foo.calledWith(1,2));
        assert.isFalse(Sample.foo.calledWith(2,3));
        
        // should restore the original foo function
        
        Sample.foo.restore();
        
        assert.equal(typeof Sample.foo.calledOnce, "undefined");
    });
    
    it('should stub the function of Object', ()=>{
        var Sample = {foo: (a,b)=>a+b};
        
        var fooStub = sinon.stub(Sample, 'foo', (a,b)=>a*b);
        
        assert.equal(Sample.foo(2,3), 6);
        
        Sample.foo.restore();
        
        assert.equal(Sample.foo(2,3), 5);
    });
    
    it('should mock the function of object', ()=>{
        var Sample = {foo: (a,b)=>a+b, bar:a=>a*3};
        
        var mockSample = sinon.mock(Sample);
        
        mockSample.expects('foo').withArgs(2,3).once();
        
        assert.equal(typeof Sample.foo(2,3), "undefined");
        assert.equal(Sample.bar(3), 9);
        
        mockSample.verify();
        
        assert.equal(Sample.foo(2,3), 5);
    })
})


