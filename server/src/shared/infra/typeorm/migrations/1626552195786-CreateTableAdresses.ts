import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableAdresses1626552195786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adresses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "zip_code",
            type: "varchar",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adresses");
  }
}
