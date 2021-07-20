import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { v4 } from "uuid";

import { Vehicle } from "../../../../modules/customers/infra/typeorm/entities/Vehicle";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Vehicle)
      .values([
        {
          id: v4(),
          description: "Caminhão",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          description: "Carro",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          description: "Moto",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }
}
