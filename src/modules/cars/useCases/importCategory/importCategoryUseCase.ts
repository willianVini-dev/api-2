import {parse} from "csv-parse"
import fs from "fs";
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";
import { inject, injectable } from 'tsyringe';

interface IImportCategory{
  name:string;
  description:string;
}

@injectable()
class ImportCategoryUseCase{

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository:CategoriesRepository){}
  loadCategories(file:Express.Multer.File):Promise<IImportCategory[]>{
    return new Promise((resolve, reject)=>{
      const categories:IImportCategory[] = [];
      // realizando a leitura do arquivo em partes
      const stream = fs.createReadStream(file.path)
      const parseFile = parse();
  
      stream.pipe(parseFile)
  
      parseFile.on("data", async (line)=>{
        const [name, description] = line; 
        categories.push({name, description})
      })
      .on("end",()=>{
        fs.promises.unlink(file.path)
        resolve(categories);
      })
      .on("error", (err)=>{
        reject(err);
      })
    });
   
  }

  async execute(file:Express.Multer.File):Promise<void>{
    const categories = await this.loadCategories(file);

    categories.map(async (category) =>{
      const {name, description} = category;

      const categoryExist = await this.categoryRepository.findByName(name);
      if(!categoryExist){
        await this.categoryRepository.create({name, description})
      }
    })
  }
}

export{ImportCategoryUseCase}