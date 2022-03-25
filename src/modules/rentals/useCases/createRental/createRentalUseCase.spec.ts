import { InMemoryRentalsRepository } from "../../repositories/in-memory/InMemoryRentalsRepository";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./createRentalUseCase";
import { AppError } from '../../../../shared/errors/appError';
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/dayjsDateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { CarsRepository } from "../../../cars/infra/typeorm/repositories/CarsRepository";
import { InMemoryCarsRepository } from "../../../cars/repositories/in-memory/InMemoryCarsRepository";

let createRentalUseCase:CreateRentalUseCase;
let inMemoryRentalsRepository:InMemoryRentalsRepository
let inMemoryCarsRepository:InMemoryCarsRepository;
let dayjsProvider:DayjsDateProvider

describe("Create Rental", ()=>{
  const dayAdd24Hours = dayjs().add(1, "day").toDate()
  beforeEach(()=>{
    inMemoryRentalsRepository = new InMemoryRentalsRepository()
    dayjsProvider = new DayjsDateProvider();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository,dayjsProvider,inMemoryCarsRepository)
  });

  it("should be able to create a new Rental", async ()=>{

    const car = await inMemoryCarsRepository.create({
      name: "teste",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 49,
      category_id: "1234567",
      brand: "brand"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it("should not be able to create a new rental for car is exists", async()=>{

    const car = await inMemoryCarsRepository.create({
      name: "teste",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 49,
      category_id: "1234567",
      brand: "brand"
    })

    const renta1 = await createRentalUseCase.execute({
      user_id: "11111",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    await expect( createRentalUseCase.execute({
        user_id: "22222",
        car_id: car.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual( new AppError("Car is unavailable"));

  })

  it("should not be able to create a new rental for user is exists", async()=>{

    const car = await inMemoryCarsRepository.create({
      name: "teste",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 49,
      category_id: "1234567",
      brand: "brand"
    })

    const car1 = await inMemoryCarsRepository.create({
      name: "teste",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 49,
      category_id: "1234567",
      brand: "brand"
    })

    const renta1 = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });

    await expect(createRentalUseCase.execute({
        user_id: "12345",
        car_id: car1.id,
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError("User is unavailable"));

  })

  it("should not be able to create a new rental invalid return time", async()=>{

    await expect( createRentalUseCase.execute({
        user_id: "12345",
        car_id: "1111",
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError("Minimum duration time, 24 hours"));

  })
});