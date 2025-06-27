import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationToApplications1751049013665 implements MigrationInterface {
    name = 'AddLocationToApplications1751049013665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" ADD "location" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP COLUMN "location"`);
    }

}
