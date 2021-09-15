const app = require("../app.js");
const supertest = require("supertest");
const request = supertest(app);

test("it should run on 3000", () => {
  return request.get("/").then(res => {
    const status = res.statusCode;
    expect(status).toEqual(200);
  }).catch(err => fail(err));
});
