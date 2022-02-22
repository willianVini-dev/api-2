import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";
import { AppError } from '../../../../shared/errors/appError';

let createCarSpecificationUseCase:CreateCarSpecificationUseCase;
let inmemoryCarsRepository: InMemoryCarsRepository;

describe("Create car specification", ()=>{

  beforeEach(()=>{
    inmemoryCarsRepository = new InMemoryCarsRepository()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(inmemoryCarsRepository)
  });

  it("should be able to add a new specification to a now-existent car", async ()=>{
    expect(async ()=>{
      const car_id =  "1234";
      const specification_id = ["54321"];
      await createCarSpecificationUseCase.execute({car_id,specification_id});
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async ()=>{

    const car = await inmemoryCarsRepository.create({
      name :"name car ",
      description:"description car",
      daily_rate:100,
      license_plate: "adb-1234",
      fine_amount:60,
      brand: "brand",
      category_id:"category"
    })
    
    const specification_id = ["54321"];
    await createCarSpecificationUseCase.execute({car_id:car.id,specification_id});
  });
});