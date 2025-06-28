import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeRequiredSkillsNotNull1751126594092 implements MigrationInterface {
    name = 'MakeRequiredSkillsNotNull1751126594092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "required_skills" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "required_skills" DROP NOT NULL`);
    }

}
