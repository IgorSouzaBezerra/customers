import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

import { Address } from "./Address";
import { TypePerson } from "./TypePerson";
import { Vehicle } from "./Vehicle";

@Entity("customers")
class Customer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  active: boolean;

  @Column("time")
  end_time: Date;

  @Column("date")
  day_service: Date;

  @ManyToOne(() => TypePerson, {
    eager: true,
  })
  @JoinColumn({ name: "type_id" })
  type: TypePerson;

  @OneToOne(() => Address, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: "address_id" })
  address: Address;

  @ManyToMany(() => Vehicle, { eager: true })
  @JoinTable({
    name: "customers_vehicles",
    joinColumns: [{ name: "customer_id" }],
    inverseJoinColumns: [{ name: "vehicles_id" }],
  })
  vehicles: Vehicle[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.active = true;
    }
  }
}

export { Customer };
