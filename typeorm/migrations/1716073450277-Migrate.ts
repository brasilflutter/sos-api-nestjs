import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrate1716073450277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION haversine(lat1 numeric, lon1 numeric, lat2 numeric, lon2 numeric)
      RETURNS numeric AS $$
      DECLARE
        r numeric := 6371; -- Earth's radius in kilometers
        dLat numeric := radians(lat2 - lat1);
        dLon numeric := radians(lon2 - lon1);
        a numeric := sin(dLat / 2) * sin(dLat / 2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dLon / 2) * sin(dLon / 2);
        c numeric := 2 * atan2(sqrt(a), sqrt(1 - a));
      BEGIN
        RETURN r * c;
      END;
      $$ LANGUAGE plpgsql;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION IF EXISTS haversine`)
  }
}
