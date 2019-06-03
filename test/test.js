global.fetch = require("node-fetch");
var assert = require("assert");

const { default: fetchez } = require("../build/index");

console.log(fetchez);

const getUrl = page => `https://reqres.in/api/users?page=${page || 1}`;

/*
Like : 
{
  "page": 2,
  "per_page": 3,
  "total": 12,
  "total_pages": 4,
  "data": [
      {
          "id": 4,
          "first_name": "Eve",
          "last_name": "Holt",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      },
      {
          "id": 5,
          "first_name": "Charles",
          "last_name": "Morris",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
      },
      {
          "id": 6,
          "first_name": "Tracey",
          "last_name": "Ramos",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      }
  ]
}
*/

describe("Requests", () => {
  describe("Unique request", () => {
    it("Retrieve todos", done => {
      fetchez(getUrl())
        .then(data => {
          assert.ok(data.data);
          assert.ok(data.data.length);
          done();
        })
        .catch(done);
    });
  });
  describe("Multipage request", () => {
    it("Trying load all withoud initial configuration", done => {
      fetchez(getUrl(), { loadAll: true })
        .then(() => done("Function executed without configuration"))
        .catch(() => done());
    });
    it("Load multipage request", done => {
      fetchez.configure({
        getNext: res => {
          const page = parseInt(res.page);
          const totalPages = parseInt(res.total_pages);

          if (page >= totalPages) return null;

          return getUrl(page + 1);
        },
        mergeResults: (data, element) => [...(data || []), ...element.data]
      });

      fetchez(getUrl(), { loadAll: true })
        .then(data => {
          assert.equal(data.length, 12);
          done();
        })
        .catch(done);
    });
  });
});
