//= require shows

describe('ShowWidget', function(){
  describe('#outsideOfCanvas', function(){
    it('is outside of canvas when x < 0', function(){
      ShowWidget.outsideOfCanvas(-1, 0, 10).should.equal(true);
    });
    it('is outside of canvas when y < 0', function(){
      ShowWidget.outsideOfCanvas(0, -1, 10).should.equal(true);
    });
    it('is outside of canvas when x > size', function(){
      ShowWidget.outsideOfCanvas(10, 0, 10).should.equal(true);
    });
    it('is outside of canvas when y > size', function(){
      ShowWidget.outsideOfCanvas(0, 10, 10).should.equal(true);
    });
    it('is inside of canvas', function(){
      ShowWidget.outsideOfCanvas(0, 0, 10).should.equal(false);
    });
  });

  describe("#pointSiblings", function(){
    it("return four siblings of point", function(){
      expect(ShowWidget.pointSiblings(0, 0)).to.eql([{x:-1, y:0} ,{x:0, y:-1}, {x:1, y:0}, {x: 0, y:1}]);
    });
  });
});
