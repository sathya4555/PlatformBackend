import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1629812571484 implements MigrationInterface {
    name = 'Init1629812571484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "rolename" character varying, "adminname" character varying, "methodname" text array, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying, "adminname" character varying, "roleid" character varying, "adminId" integer, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "name" character varying, "password" character varying, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crud" ("id" SERIAL NOT NULL, "methodname" character varying, "methodnumber" integer, CONSTRAINT "PK_42c8cba058c20f7c3f588cb900c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_classes_role" ("clientId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_7d4f4b179b6ef2b9bee96f3a6d0" PRIMARY KEY ("clientId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3aa0a2fe179535a3167cfa0096" ON "client_classes_role" ("clientId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e083f8421a8c821ab501047aa8" ON "client_classes_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_bf9b79f6915a34b44b7988db574" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client_classes_role" ADD CONSTRAINT "FK_3aa0a2fe179535a3167cfa0096d" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_classes_role" ADD CONSTRAINT "FK_e083f8421a8c821ab501047aa83" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_classes_role" DROP CONSTRAINT "FK_e083f8421a8c821ab501047aa83"`);
        await queryRunner.query(`ALTER TABLE "client_classes_role" DROP CONSTRAINT "FK_3aa0a2fe179535a3167cfa0096d"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_bf9b79f6915a34b44b7988db574"`);
        await queryRunner.query(`DROP INDEX "IDX_e083f8421a8c821ab501047aa8"`);
        await queryRunner.query(`DROP INDEX "IDX_3aa0a2fe179535a3167cfa0096"`);
        await queryRunner.query(`DROP TABLE "client_classes_role"`);
        await queryRunner.query(`DROP TABLE "crud"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
