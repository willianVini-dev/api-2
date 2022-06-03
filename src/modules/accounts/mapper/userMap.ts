import { Users } from "../infra/typeorm/entities/User";
import { instanceToInstance } from 'class-transformer';


interface IUserResponseDTO{
  email:string;
  id:string;
  name:string;
  avatar:string;
  getAvatarUrl():string;
}

class UserMap{
  static toDTO({email,id,name,avatar,getAvatarUrl}:Users):IUserResponseDTO{
    const user = instanceToInstance({
      email,
      id,
      name,
      avatar,
      getAvatarUrl
    })

    return user;

  }
}

export{UserMap,IUserResponseDTO}