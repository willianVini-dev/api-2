import { Column, CreateDateColumn, Entity, ManyToOne, NamingStrategyInterface, PrimaryColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Users } from '../../../../accounts/infra/typeorm/entities/User';
import { Cars } from '../../../../cars/infra/typeorm/entities/Cars';

@Entity("rentals")
class Rental{

  @PrimaryColumn()
  id:string;

  @ManyToOne(()=> Cars)
  @JoinColumn({name: "car_id"})
  car:Cars

  @Column()
  car_id:string;

  @ManyToOne(()=> Users)
  @JoinColumn({name: "user_id"})
  user:Users

  @Column()
  user_id:string;

  @Column()
  start_date:Date;

  @Column()
  end_date:Date;

  @Column()
  expected_return_date:Date;

  @Column()
  total:number;

  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;

  constructor(){
    if(!this.id){ this.id = uuidV4(); }
  }
}

export {Rental}