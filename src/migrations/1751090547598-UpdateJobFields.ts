import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateJobFields1751090547598 implements MigrationInterface {
  name = 'UpdateJobFields1751090547598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "required_skills" text`);
    await queryRunner.query(
      `UPDATE "jobs" SET "required_skills" = 'Not specified' WHERE "required_skills" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ALTER COLUMN "required_skills" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "salary_min" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD "salary_max" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_max"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "salary_min"`);
    await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "required_skills"`);
    await queryRunner.query(`ALTER TABLE "jobs" ADD "salary" integer NOT NULL`);
  }
}
