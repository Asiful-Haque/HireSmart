import { MigrationInterface, QueryRunner } from 'typeorm';

export class YourMigrationName1750952154492 implements MigrationInterface {
  name = 'YourMigrationName1750952154492';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email_address" character varying NOT NULL, "password_hash" character varying NOT NULL, "user_role" character varying NOT NULL DEFAULT 'candidate', "is_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d1a16364b1f276e14e8e4cfc47e" UNIQUE ("email_address"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
