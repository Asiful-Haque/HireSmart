import { MigrationInterface, QueryRunner } from "typeorm";

export class Jobspage1751038070750 implements MigrationInterface {
    name = 'Jobspage1751038070750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("job_id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying NOT NULL, "salary" integer NOT NULL, "employer_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75f2e130e4b1372fea0b6248a17" PRIMARY KEY ("job_id"))`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_c5aba92c72d96d22a75ed1f9622" FOREIGN KEY ("employer_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_c5aba92c72d96d22a75ed1f9622"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
