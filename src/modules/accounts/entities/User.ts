import {v4 as uuidV4} from "uuid"
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  PrimaryColumn } 
  from "typeorm"

@Entity("users")
class Users{

  @PrimaryColumn()
  id: string;

  @Column()
  name:string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  drive_license:string;

  @Column()
  admin:boolean = false;

  @CreateDateColumn()
  created_at:Date;

  @Column()
  avatar:string;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}

export {Users}