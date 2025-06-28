import { MigrationInterface, QueryRunner } from "typeorm";

export class Fixingbackjobstable1751126293978 implements MigrationInterface {
    name = 'Fixingbackjobstable1751126293978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "required_skills" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "required_skills"`);
    }

}
