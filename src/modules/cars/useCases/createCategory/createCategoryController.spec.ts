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

  it("should be able to create a new category", async()=>{

    // logando no sistema
    const responseToken = await request(app).post("/sessions")
                          .send({
                            email: "admin@hotmail.com",
                            password: "admin"
                          })
    const {refresh_token} = responseToken.body
    
    const response = await request(app).post("/categories")
                     .send({
                       name: "Categorie supertest",
                       description: "Categorie supertest"
                     })
                     .set({
                       Authorization: `Bearer ${refresh_token}`
                     });

    expect(response.status).toBe(201)
  })
  it("should not be able to create a new category with name exists", async()=>{

    // logando no sistema
    const responseToken = await request(app).post("/sessions")
                          .send({
                            email: "admin@hotmail.com",
                            password: "admin"
                          })
    const {refresh_token} = responseToken.body

    const response = await request(app).post("/categories")
                     .send({
                       name: "Categorie supertest",
                       description: "Categorie supertest"
                     })
                     .set({
                       Authorization: `Bearer ${refresh_token}`
                     });
    expect(response.status).toBe(400)
  })

});