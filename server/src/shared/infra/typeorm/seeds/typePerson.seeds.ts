import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { v4 } from "uuid";

import { TypePerson } from "../../../../modules/customers/infra/typeorm/entities/TypePerson";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TypePerson)
      .values([
        {
          id: v4(),
          description: "Pessoa Física",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: v4(),
          description: "Pessoa Jurídica",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .execute();
  }
}
