import { MigrationInterface, QueryRunner } from "typeorm";

export class Applicationpage1751048003953 implements MigrationInterface {
    name = 'Applicationpage1751048003953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applications" ("application_id" SERIAL NOT NULL, "job_id" integer NOT NULL, "candidate_user_id" integer NOT NULL, "cover_letter_text" text NOT NULL, "application_status" character varying NOT NULL, "applied_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_418038704e50c663590feb7f511" PRIMARY KEY ("application_id"))`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_8aba14d7f098c23ba06d8693235" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_8e2e875c54688e44d91a4b538ab" FOREIGN KEY ("candidate_user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_8e2e875c54688e44d91a4b538ab"`);
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_8aba14d7f098c23ba06d8693235"`);
        await queryRunner.query(`DROP TABLE "applications"`);
    }

}
