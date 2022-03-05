import { InMemoryRentalsRepository } from "../../repositories/in-memory/InMemoryRentalsRepository";
import { IRentalsRepository } from "../../repositories/IRentalsRepositorys";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from '../../../../shared/errors/appError';

let createRentalUseCase:CreateRentalUseCase;
let inMemoryRentalsRepository:InMemoryRentalsRepository

describe("Create Rental", ()=>{

  beforeEach(()=>{
    inMemoryRentalsRepository = new InMemoryRentalsRepository()
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository)
  });

  it("shoul be able to create a new Rental", async ()=>{

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: new Date()
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");


  })

  it("should not be able to create a new rental for car is exists", async()=>{

    expect(async ()=>{

      const renta1 = await createRentalUseCase.execute({
        user_id: "11111",
        car_id: "54321",
        expected_return_date: new Date()
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "22222",
        car_id: "54321",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental for user is exists", async()=>{

    expect(async ()=>{

      const renta1 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1111",
        expected_return_date: new Date()
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);

  })
});