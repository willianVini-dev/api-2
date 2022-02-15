import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterUserDeleteUsername1644286541015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
