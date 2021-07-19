import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedVehicles1626727816471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO vehicles " +
        "(id, description, created_at, updated_at) " +
        "VALUES " +
        "('12df96fa-9e0e-45b4-affd-c0a108de8f4e', 'Carro', '2021-07-18 22:47:15.478', '2021-07-18 22:47:15.478')," +
        "('cad71b0e-67e9-4a39-bb05-03373ac3d787', 'Caminhão', '2021-07-18 22:47:15.478', '2021-07-18 22:47:15.478')," +
        "('cd3035df-7a16-4556-9744-da74f39c3fcf', 'Moto', '2021-07-18 22:47:15.478', '2021-07-18 22:47:15.478')"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DELETE FROM VEHICLES");
  }
}
