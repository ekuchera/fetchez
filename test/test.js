global.fetch = require("node-fetch");
var assert = require("assert");

const fetchez = require("../index");

const getTodosUrl = start =>
  `https://jsonplaceholder.typicode.com/todos?_limit=10&_start=${start || 0}`;

describe("Requests", function() {
  describe("Unique request", function() {
    it("Retrieve todos", done => {
      fetchez(getTodosUrl())
        .then(data => {
          assert.ok(data.length);
          assert.ok(data[0].title);
          done();
        })
        .catch(done);
    });
  });
});
