import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTypePerson1626728184678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO TYPE_PERSON " +
        "(id, description, created_at, updated_at) " +
        "VALUES " +
        "('5e76a76d-0ea1-400c-992b-f48166c237ab', 'Pessoa Física', '2021-07-18 22:47:15.478', '2021-07-18 22:47:15.478')," +
        "('50787795-04dd-483c-9037-edaafca05cf8', 'Pessoa Jurídica', '2021-07-18 22:47:15.478', '2021-07-18 22:47:15.478')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM TYPE_PERSON");
  }
}
