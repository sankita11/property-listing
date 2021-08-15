import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddPropertyTypes1628881545972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    
    await queryRunner.query(`INSERT INTO property_type("propertyType") values('Flat')`);
    await queryRunner.query(`INSERT INTO property_type("propertyType") values('House')`);
    await queryRunner.query(`INSERT INTO property_type("propertyType") values('Studio')`);
    await queryRunner.query(`INSERT INTO property_type("propertyType") values('Bunglow')`);
    await queryRunner.query(`INSERT INTO property_type("propertyType") values('House Boat')`);
    
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE "property_type"`);
  }
}