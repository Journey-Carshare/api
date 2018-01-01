var assert = require("chai").assert;
var controller = require("../api/controllers/controller");

describe("First", function (){
    it('first should return hello world', function() {
        assert.equal(controller.testing(), "hello world");
    });
});
