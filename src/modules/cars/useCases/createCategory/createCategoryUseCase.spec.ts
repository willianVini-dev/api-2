import { InMemoryCategoriesRepository } from "../../repositories/in-memory/InMemoryCategoriesRepository";
import {CreateCategoryUseCase} from "./createCategoryUseCase"
import { AppError } from '../../../../shared/errors/appError';

let createCategoryUseCase:CreateCategoryUseCase;
let categoriesRepository:InMemoryCategoriesRepository;

beforeEach(()=>{
  categoriesRepository  = new InMemoryCategoriesRepository();
  createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
});

describe("Create Category", ()=>{

  it("should be able to create a new category", async ()=>{

    const category = {
      name: "Category test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    const userExist = await categoriesRepository.findByName(category.name)

    expect(userExist).toHaveProperty("id")

  });

  it("should not be able to create a new category with name exists", async ()=>{

    const category = {
      name: "Category test",
      description: "Category description test"
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    });

    await expect(createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    ).rejects.toEqual(new AppError("category exists"))
    
  });
})