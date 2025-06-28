import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatejobforarchive1751087969179 implements MigrationInterface {
    name = 'Updatejobforarchive1751087969179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ADD "archived" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP COLUMN "archived"`);
    }

}
