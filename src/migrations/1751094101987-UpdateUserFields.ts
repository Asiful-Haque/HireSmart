import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserFields1751094101987 implements MigrationInterface {
    name = 'UpdateUserFields1751094101987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "skills" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "location" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "expected_salary" integer`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary_min" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary_max" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary_max" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "salary_min" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "expected_salary"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "skills"`);
    }

}
