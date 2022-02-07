import {Request, Response} from 'express'
import { ListCategoryUseCase } from './ListCategoryUseCase'

class ListCategoryController{
  constructor(private listCategoryUsecase:ListCategoryUseCase){}

  handle(request:Request,response:Response):Response{
    const categories = this.listCategoryUsecase.execute();
    return response.json(categories);
  }

}
export{ListCategoryController}