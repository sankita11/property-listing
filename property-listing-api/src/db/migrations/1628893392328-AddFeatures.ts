import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

export class AddFeatures1628893392328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    
    await queryRunner.query(`INSERT INTO feature("feature") values('Swimming Pool')`);
    await queryRunner.query(`INSERT INTO feature("feature") values('Parking')`);
    await queryRunner.query(`INSERT INTO feature("feature") values('Gym')`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`TRUNCATE TABLE "feature"`);
  }
}