import { Column, Entity, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "./User";
import {v4 as uuidV4} from "uuid"

@Entity("userToken")
class UserToken{

  @PrimaryColumn()
  id:string;

  @Column()
  refresh_token:string;

  @Column()
  user_id:string;

  @ManyToOne(()=> Users)
  @JoinColumn({name:"user_id"})
  user:string;

  @Column()
  expires_date:Date;

  @CreateDateColumn()
  created_at:Date

  constructor(){
    if(!this.id){
      this.id = uuidV4()
    }
  }
}

export {UserToken}