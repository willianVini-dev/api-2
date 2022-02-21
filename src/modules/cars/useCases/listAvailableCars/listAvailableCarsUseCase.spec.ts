import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let listCarsUseCase:ListAvailableCarsUseCase;
let inMemorycarsRepository:InMemoryCarsRepository
describe("List cars", ()=>{

  beforeEach(()=>{
    inMemorycarsRepository = new InMemoryCarsRepository()
    listCarsUseCase = new ListAvailableCarsUseCase(inMemorycarsRepository);
  });

  it("should be able to list all available cars", async ()=>{

    const car = await inMemorycarsRepository.create({
      name: "gol g6",
      description: "gol g6 2015 prata",
      daily_rate:170.00,
      license_plate:"adf-4999",
      fine_amount: 140,
      brand: "hatch",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it("should be able to list all avaliable cars by brand", async ()=>{

    const car = await inMemorycarsRepository.create({
      name: "gol g6",
      description: "gol g6 2015 prata",
      daily_rate:170.00,
      license_plate:"adf-4999",
      fine_amount: 140,
      brand: "teste_teste",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({
      brand: "teste_teste"
    })
    
    expect(cars).toEqual([car])

  })
  it("should be able to list all avaliable cars by name", async ()=>{

    const car = await inMemorycarsRepository.create({
      name: "carro1",
      description: "gol g6 2015 prata",
      daily_rate:170.00,
      license_plate:"adf-4999",
      fine_amount: 140,
      brand: "teste_teste",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({
      name: "carro1"
    })
    
    expect(cars).toEqual([car])

  })
  it("should be able to list all avaliable cars by category_id", async ()=>{

    const car = await inMemorycarsRepository.create({
      name: "gol g6",
      description: "gol g6 2015 prata",
      daily_rate:170.00,
      license_plate:"adf-4999",
      fine_amount: 140,
      brand: "teste_teste",
      category_id: "category_id"
    })

    const cars = await listCarsUseCase.execute({
      category_id: "category_id"
    })
    
    expect(cars).toEqual([car])

  })
});