import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarsUseCase } from "./createCarsUseCase"
import { AppError } from '../../../../shared/errors/appError';

let createCarsUseCase:CreateCarsUseCase;
let inMemorycarsRepository:InMemoryCarsRepository;

describe("Create cars", ()=>{

  beforeEach(()=>{
    inMemorycarsRepository = new InMemoryCarsRepository()
    createCarsUseCase = new CreateCarsUseCase(inMemorycarsRepository);
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
    await createCarsUseCase.execute({
      name :"name car 1",
      description:"description car",
      daily_rate:100,
      license_plate: "adb-1234",
      fine_amount:60,
      brand: "brand",
      category_id:"category"
    });
    await expect( createCarsUseCase.execute({
        name :"name car 2 ",
        description:"description car",
        daily_rate:100,
        license_plate: "adb-1234",
        fine_amount:60,
        brand: "brand",
        category_id:"category"
      })
    ).rejects.toEqual(new AppError("Car already exists"))
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