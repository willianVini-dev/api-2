import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

@Entity("cars")
class Cars {
  @PrimaryColumn()
  id:string;

  @Column()
  name :string;

  @Column()
  description:string;

  @Column()
  daily_rate:number;

  @Column()
  license_plate: string;

  @Column()
  fine_amount:number;

  @Column()
  brand: string;

  @ManyToOne( ()=> Category)
  @JoinColumn({name:"category_id"})
  category:Category;

  @Column()
  category_id:string;

  @Column()
  available:boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(()=>Specification)
  @JoinTable({
    name: "specification_cars",
    joinColumns:[{name: "car_id"}],
    inverseJoinColumns:[{name: "specification_id"}]
  })
  specification:Specification[];

  constructor(){
    if(!this.id){
      this.id = uuidV4();
      this.available = true;
    }
  }
}
export{Cars}