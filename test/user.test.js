const app = require("../app.js");
const supertest = require("supertest");
const {response} = require("express");
const request = supertest(app);

describe("create user", () => {
  test("it should create an user", () => {
    const nowTime = Date.now();
    const email = `${nowTime}@email.com.br`;
    const testUser = {name: "Jon Doe", email: email, password: "123456"};

    return request.post("/user").send(testUser).then(res => {
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(email);
    }).catch(err => {
      fail(err);
    })
  });

  test(" it should not be empty" , () => {
    const testUser = {name: "", email: "", password: ""};

    return request.post("/user").send(testUser).then(res => {
      expect(res.statusCode).toEqual(400);
    }).catch(err => {
      fail(err);
    })
  });

  test(" it should not have the same email" , () => {
    const testUserA = {name: "Jon Doe", email: "ABC@email.com", password: "123456"};

    request.post("/user").send(testUserA).then(res => {
    }).catch(err => {
      fail(err);
    });

    request.post("/user").send(testUserA).then( res => {
      expect(res.statusCode).toEqual(400);
      expect(res.error).toEqual(testUserA.email);
      expect(res.errorMessage).toEqual(`${testUserA.email} already is in use`);
    })
  });

})
