import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";
import { AppError } from '../../../../shared/errors/appError';
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { InMemorySpecification } from "../../repositories/in-memory/inMemorySpecification";

let createCarSpecificationUseCase:CreateCarSpecificationUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationRepository: ISpecificationRepository;

describe("Create car specification", ()=>{

  beforeEach(()=>{
    inMemorySpecificationRepository = new InMemorySpecification()
    inMemoryCarsRepository = new InMemoryCarsRepository()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(inMemoryCarsRepository,inMemorySpecificationRepository)
  });

  it("should be able to add a new specification to a now-existent car", async ()=>{
    const car_id =  "1234";
    const specification_id = ["54321"];
    await expect(createCarSpecificationUseCase.execute({car_id,specification_id})
    ).rejects.toEqual(new AppError("car does not exists"));
  });

  it("should be able to add a new specification to the car", async ()=>{

    const car = await inMemoryCarsRepository.create({
      name :"name car ",
      description:"description car",
      daily_rate:100,
      license_plate: "adb-1234",
      fine_amount:60,
      brand: "brand",
      category_id:"category"
    })
    const specification = await inMemorySpecificationRepository.create({
     name:"test",
     description:"test"
    })


    const specification_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({car_id:car.id,specification_id});
    expect(specificationCars).toHaveProperty("specification");
    expect(specificationCars.specification.length).toBe(1)
  });
});