import { query } from "express";
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationCars1645485712105 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: "specification_cars",
					columns:[
						{
							name: "car_id",
							type: "varchar",
						},
						{
							name: "specification_id",
							type: "varchar"
						},
						{
							name: "created_at",
							type: "timestamp",
							default: "now()"
						}
					]
				})
			)

			await queryRunner.createForeignKey(
				"specification_cars",
				new TableForeignKey({
					name: "FKSpecificationCar",
					referencedTableName: "specifications",
					referencedColumnNames: ["id"],
					columnNames:["specification_id"]
				})
			);
			await queryRunner.createForeignKey(
				"specification_cars",
				new TableForeignKey({
					name: "FKCarSpecification",
					referencedTableName: "cars",
					referencedColumnNames: ["id"],
					columnNames:["car_id"]
				})
			);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropForeignKey("specification_cars", "FKCarSpecification")
			await queryRunner.dropForeignKey("specification_cars", "FKSpecificationCar")
			await queryRunner.dropTable("specification_cars")
    }

}
