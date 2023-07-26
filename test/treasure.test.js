const request = require("supertest");
const app = require("../src/app");
const knex = require("../src/db/connection");

describe("Random Treasure", () => {
  beforeAll(() => {
    return knex.migrate
      .forceFreeMigrationsLock()
      .then(() => knex.migrate.rollback(null, true))
      .then(() => knex.migrate.latest());
  });

  beforeEach(() => {
    return knex.seed.run();
  })

  afterAll(async () => {
    return await knex.migrate.rollback(null, true).then(() => knex.destroy());
  })

  describe("GET /treasure", () => {
    describe("BOTH", () => {
      it("should return 8 entiries when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=both");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(8);
      });
      it("should return 4 1's and 4 2's when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=both");

        const ones = [];
        const twos = [];
        response.body.randomData.forEach(element => {
          if(element.level === "1") { ones.push(element)}
          if(element.level === "2") { twos.push(element)}
        })
        expect(ones.length).toEqual(4);
        expect(twos.length).toEqual(4);
      });
      it("should return 20 entiries when character level is 5", async () => {
        const response = await request(app).get("/treasure?sett=20&char=5&sele=both");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(20);
      });
      it("should return 4 6's, 5's, 4's, 3's, and 2's when character level is 5", async () => {
        const response = await request(app).get("/treasure?sett=20&char=5&sele=both");

        const sixes = [];
        const fives = [];
        const fours = [];
        const threes = [];
        const twos = [];
        response.body.randomData.forEach(element => {
          if(element.level === "6") { sixes.push(element)}
          if(element.level === "5") { fives.push(element)}
          if(element.level === "4") { fours.push(element)}
          if(element.level === "3") { threes.push(element)}
          if(element.level === "2") { twos.push(element)}
        })
        expect(sixes.length).toEqual(4);
        expect(fives.length).toEqual(4);
        expect(fours.length).toEqual(4);
        expect(threes.length).toEqual(4);
        expect(twos.length).toEqual(4);
      });
      it("should return 16 entiries when character level is 20", async () => {
        const response = await request(app).get("/treasure?sett=20&char=20&sele=both");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(16);
      });
      it("should return 4 20's, 19's, 18's, and 17's when character level is 20", async () => {
        const response = await request(app).get("/treasure?sett=20&char=20&sele=both");

        const twenties = [];
        const nineteens = [];
        const eighteens = [];
        const seventeens = [];
        response.body.randomData.forEach(element => {
          if(element.level === "20") { twenties.push(element)}
          if(element.level === "19") { nineteens.push(element)}
          if(element.level === "18") { eighteens.push(element)}
          if(element.level === "17") { seventeens.push(element)}
        })
        expect(twenties.length).toEqual(4);
        expect(nineteens.length).toEqual(4);
        expect(eighteens.length).toEqual(4);
        expect(seventeens.length).toEqual(4);
      });
      it("should return 4 entiries when character level is 20 but settlement level is 10", async () => {
        const response = await request(app).get("/treasure?sett=10&char=20&sele=both");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(4);
      });
      it("should return 4 10's when character level is 20 but settlement level is 10", async () => {
        const response = await request(app).get("/treasure?sett=10&char=20&sele=both");

        const tens = [];
        response.body.randomData.forEach(element => {
          if(element.level === "10") { tens.push(element)}
        })
        expect(tens.length).toEqual(4);
      });
      it("should return a mix of consumable and permament item when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=both");

        const consume = [];
        const perm = [];
        response.body.randomData.forEach(element => {
          if(element.is_consumable === false) { perm.push(element)}
          if(element.is_consumable === true) { consume.push(element)}
        })
        expect(perm.length).toBeGreaterThanOrEqual(0);
        expect(consume.length).toBeGreaterThanOrEqual(0);
        expect(perm.length + consume.length).toEqual(8);
      });
    });
    describe("PERM", () => {
      it("should return 4 1's and 4 2's when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=perm");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(8);
      });
      it("should return a only permament item when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=perm");

        const consume = [];
        const perm = [];
        response.body.randomData.forEach(element => {
          if(element.is_consumable === false) { perm.push(element)}
          if(element.is_consumable === true) { consume.push(element)}
        })
        expect(perm.length).toEqual(8);
        expect(consume.length).toEqual(0);
      });
    });
    describe("CONSUME", () => {
      it("should return 4 1's and 4 2's when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=consume");

        expect(response.body.error).toBeUndefined();
        expect(response.statusCode).toBe(200);
        expect(response.body.randomData.length).toEqual(8);
      });
      it("should return a only consume item when character level is 1", async () => {
        const response = await request(app).get("/treasure?sett=20&char=1&sele=consume");

        const consume = [];
        const perm = [];
        response.body.randomData.forEach(element => {
          if(element.is_consumable === false) { perm.push(element)}
          if(element.is_consumable === true) { consume.push(element)}
        })
        expect(perm.length).toEqual(0);
        expect(consume.length).toEqual(8);
      });
    });
  });
})