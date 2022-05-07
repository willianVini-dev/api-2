import request from "supertest";
import { app } from "../../../../shared/infra/http/app";
import  createConnection  from "../../../../shared/infra/typeorm/index";
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

let connection:Connection
describe("Create category Controller",()=>{

  beforeAll(async ()=>{
    connection = await createConnection()
    await connection.runMigrations()

    const password = await hash("admin",8)
    const id = uuidV4()
    await connection.query(`
      INSERT INTO USERS(id,name,email,password,admin,drive_license)
      values('${id}', 'admin', 'admin@hotmail.com', '${password}', true, 'xxxxxx')
    `)

  })

  afterAll(async ()=>{
    await connection.dropDatabase()
    await connection.close()
  });

  it("should be able to list all category", async()=>{

    // logando no sistema
    const responseToken = await request(app)
      .post("/sessions")
      .send({ email: "admin@hotmail.com", password: "admin" })

    const {refresh_token} = responseToken.body
    
    await request(app)
      .post("/categories")
      .send({ name: "Categorie supertest", description: "Categorie supertest" })
      .set({ Authorization: `Bearer ${refresh_token}` });
    
    const response = await request(app).get("/categories");
    
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty("id")
    expect(response.body[0].name).toEqual("Categorie supertest")
  })

});