import { inMemoryCarsRepository } from "../../repositories/in-memory/inMemoryCarsRepository";
import { CreateCarsUseCase } from "./createCarsUseCase"
import { AppError } from '../../../../shared/errors/appError';

let createCarsUseCase:CreateCarsUseCase;
let InMemorycarsRepository:inMemoryCarsRepository;

describe("Create cars", ()=>{

  beforeEach(()=>{
    InMemorycarsRepository = new inMemoryCarsRepository()
    createCarsUseCase = new CreateCarsUseCase(InMemorycarsRepository);
  });

  it("Should be able to create a new car", async ()=>{
    const car = await createCarsUseCase.execute({
      name :"name car ",
      description:"description car",
      daily_rate:100,
      license_plate: "adb-1234",
      fine_amount:60,
      brand: "brand",
      category_id:"category"
    });

    expect(car).toHaveProperty("id")
  })

  it("should not able to create car with license plate exists", async ()=>{
    expect( async ()=>{

      await createCarsUseCase.execute({
        name :"name car 1",
        description:"description car",
        daily_rate:100,
        license_plate: "adb-1234",
        fine_amount:60,
        brand: "brand",
        category_id:"category"
      });

      await createCarsUseCase.execute({
        name :"name car 2 ",
        description:"description car",
        daily_rate:100,
        license_plate: "adb-1234",
        fine_amount:60,
        brand: "brand",
        category_id:"category"
      });

    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not able to new create car with available true by default ", async()=>{

    const car = await createCarsUseCase.execute({
      name :"name car 1",
      description:"description car",
      daily_rate:100,
      license_plate: "adb-1004",
      fine_amount:60,
      brand: "brand",
      category_id:"category"
    });

    expect(car.available).toBe(true)

  })
})