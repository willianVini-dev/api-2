import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCars1645025948167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(
				new Table({
					name: "cars",
					columns:[
							{
								name: "id",
								type: "varchar",
								isPrimary: true	
							},
							{
								name: "name",
								type: "varchar"
							},
							{
								name: "description",
								type: "varchar"
							},
							{
								name: "daily_rate",
								type: "numeric"
							},
							{
								name: "available",
								type: "boolean",
								default: true
							},
							{
								name: "license_plate",
								type: "varchar"
							},
							{
								name: "fine_amount",
								type: "numeric"
							},
							{
								name: "branch",
								type: "varchar"
							},
							{
								name: "category_id",
								type: "varchar",
								isNullable: true
							},
							{
								name: "created_at",
								type: "timestamp",
								default: "now()"
							}
					],
					foreignKeys:[
						{
							name: "FKCategoryCar",
							referencedTableName:"categories",
							referencedColumnNames:["id"],
							columnNames:["category_id"],
							onDelete: "SET NULL",
							onUpdate: "SET NULL"
						}
					]

				})
			);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable("cars")
    }

}
