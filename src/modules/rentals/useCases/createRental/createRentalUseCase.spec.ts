import { InMemoryRentalsRepository } from "../../repositories/in-memory/InMemoryRentalsRepository";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from '../../../../shared/errors/appError';
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";

let createRentalUseCase:CreateRentalUseCase;
let inMemoryRentalsRepository:InMemoryRentalsRepository
let dayjsProvider:DayjsDateProvider

describe("Create Rental", ()=>{
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(()=>{
    inMemoryRentalsRepository = new InMemoryRentalsRepository()
    dayjsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository,dayjsProvider)
  });

  it("shoul be able to create a new Rental", async ()=>{

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "54321",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");


  })

  it("should not be able to create a new rental for car is exists", async()=>{

    expect(async ()=>{

      const renta1 = await createRentalUseCase.execute({
        user_id: "11111",
        car_id: "54321",
        expected_return_date: dayAdd24Hours
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "22222",
        car_id: "54321",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental for user is exists", async()=>{

    expect(async ()=>{

      const renta1 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1111",
        expected_return_date: dayAdd24Hours
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "54321",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);

  })

  it("should not be able to create a new rental invalid return time", async()=>{

    expect(async ()=>{

      const renta1 = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1111",
        expected_return_date: dayjs().toDate()
      });

    }).rejects.toBeInstanceOf(AppError);

  })
});