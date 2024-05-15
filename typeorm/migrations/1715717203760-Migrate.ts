import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrate1715717203760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "activeStatus" AS ENUM (
        'active',
        'inactive'
      );

      CREATE TYPE "userRole" AS ENUM (
        'admin',
        'user',
        'volunteer'
      );

      CREATE TYPE "petStatus" AS ENUM (
        'missing',
        'found'
      );

      CREATE TYPE "petColorsType" AS ENUM (
        'main',
        'secondary'
      );

      CREATE TABLE "shelters" (
        "id" integer PRIMARY KEY,
        "name" varchar,
        "status" activeStatus,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "shelterAddresses" (
        "id" integer PRIMARY KEY,
        "idShelter" integer,
        "idAddress" integer
      );

      CREATE TABLE "shelterUsers" (
        "id" integer PRIMARY KEY,
        "idShelter" integer,
        "idUser" integer,
        "role" userRole,
        "index" integer
      );

      CREATE TABLE "shelterContacts" (
        "id" integer PRIMARY KEY,
        "idShelter" integer,
        "type" integer,
        "value" varchar
      );

      CREATE TABLE "contactTypes" (
        "id" integer PRIMARY KEY,
        "description" varchar,
        "mask" varchar
      );

      CREATE TABLE "addresses" (
        "id" integer PRIMARY KEY,
        "name" varchar,
        "number" varchar,
        "street" varchar,
        "neighborhood" varchar,
        "city" varchar,
        "state" varchar,
        "country" varchar,
        "zip" varchar,
        "description" varchar,
        "complement" varchar,
        "latitude" float,
        "longitude" float,
        "index" integer,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "users" (
        "id" integer PRIMARY KEY,
        "name" varchar,
        "photo" varchar,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "userFavoriteShelters" (
        "id" integer PRIMARY KEY,
        "idUser" integer,
        "idShelter" integer
      );

      CREATE TABLE "userAddresses" (
        "id" integer PRIMARY KEY,
        "idUser" integer,
        "idAddress" integer
      );

      CREATE TABLE "userContacts" (
        "id" integer PRIMARY KEY,
        "idUser" integer,
        "type" integer,
        "value" varchar
      );

      CREATE TABLE "userPets" (
        "id" integer PRIMARY KEY,
        "idUser" integer,
        "idPet" integer
      );

      CREATE TABLE "pets" (
        "id" integer PRIMARY KEY,
        "idSpecimen" integer,
        "idBreed" integer,
        "idSize" integer,
        "description" varchar,
        "lastSeenLocation" varchar,
        "status" petStatus,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "petImages" (
        "id" integer PRIMARY KEY,
        "idPet" integer,
        "url" varchar
      );

      CREATE TABLE "petColors" (
        "id" integer PRIMARY KEY,
        "idPet" integer,
        "idColor" integer,
        "type" petColorsType
      );

      CREATE TABLE "specimens" (
        "id" integer PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "breeds" (
        "id" integer PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "colors" (
        "id" integer PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "sizes" (
        "id" integer PRIMARY KEY,
        "description" varchar
      );

      COMMENT ON COLUMN "users"."photo" IS 'Uses a default image if null';

      ALTER TABLE "shelterAddresses" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelterAddresses" ADD FOREIGN KEY ("idAddress") REFERENCES "addresses" ("id");

      ALTER TABLE "shelterUsers" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelterUsers" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "shelterContacts" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelterContacts" ADD FOREIGN KEY ("type") REFERENCES "contactTypes" ("id");

      ALTER TABLE "userFavoriteShelters" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "userFavoriteShelters" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "userAddresses" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "userAddresses" ADD FOREIGN KEY ("idAddress") REFERENCES "addresses" ("id");

      ALTER TABLE "userContacts" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "userContacts" ADD FOREIGN KEY ("type") REFERENCES "contactTypes" ("id");

      ALTER TABLE "userPets" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "userPets" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "petImages" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "petColors" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "petColors" ADD FOREIGN KEY ("idColor") REFERENCES "colors" ("id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "petColors" DROP CONSTRAINT IF EXISTS "petColors_idColor_fkey";
      ALTER TABLE "petColors" DROP CONSTRAINT IF EXISTS "petColors_idPet_fkey";
      ALTER TABLE "petImages" DROP CONSTRAINT IF EXISTS "petImages_idPet_fkey";
      ALTER TABLE "userPets" DROP CONSTRAINT IF EXISTS "userPets_idPet_fkey";
      ALTER TABLE "userPets" DROP CONSTRAINT IF EXISTS "userPets_idUser_fkey";
      ALTER TABLE "userContacts" DROP CONSTRAINT IF EXISTS "userContacts_type_fkey";
      ALTER TABLE "userContacts" DROP CONSTRAINT IF EXISTS "userContacts_idUser_fkey";
      ALTER TABLE "userAddresses" DROP CONSTRAINT IF EXISTS "userAddresses_idAddress_fkey";
      ALTER TABLE "userAddresses" DROP CONSTRAINT IF EXISTS "userAddresses_idUser_fkey";
      ALTER TABLE "userFavoriteShelters" DROP CONSTRAINT IF EXISTS "userFavoriteShelters_idShelter_fkey";
      ALTER TABLE "userFavoriteShelters" DROP CONSTRAINT IF EXISTS "userFavoriteShelters_idUser_fkey";
      ALTER TABLE "shelterContacts" DROP CONSTRAINT IF EXISTS "shelterContacts_type_fkey";
      ALTER TABLE "shelterContacts" DROP CONSTRAINT IF EXISTS "shelterContacts_idShelter_fkey";
      ALTER TABLE "shelterUsers" DROP CONSTRAINT IF EXISTS "shelterUsers_idUser_fkey";
      ALTER TABLE "shelterUsers" DROP CONSTRAINT IF EXISTS "shelterUsers_idShelter_fkey";
      ALTER TABLE "shelterAddresses" DROP CONSTRAINT IF EXISTS "shelterAddresses_idAddress_fkey";
      ALTER TABLE "shelterAddresses" DROP CONSTRAINT IF EXISTS "shelterAddresses_idShelter_fkey";

      DROP TABLE IF EXISTS "sizes";
      DROP TABLE IF EXISTS "colors";
      DROP TABLE IF EXISTS "breeds";
      DROP TABLE IF EXISTS "specimens";
      DROP TABLE IF EXISTS "petColors";
      DROP TABLE IF EXISTS "petImages";
      DROP TABLE IF EXISTS "pets";
      DROP TABLE IF EXISTS "userPets";
      DROP TABLE IF EXISTS "userContacts";
      DROP TABLE IF EXISTS "userAddresses";
      DROP TABLE IF EXISTS "userFavoriteShelters";
      DROP TABLE IF EXISTS "users";
      DROP TABLE IF EXISTS "addresses";
      DROP TABLE IF EXISTS "contactTypes";
      DROP TABLE IF EXISTS "shelterContacts";
      DROP TABLE IF EXISTS "shelterUsers";
      DROP TABLE IF EXISTS "shelterAddresses";
      DROP TABLE IF EXISTS "shelters";

      DROP TYPE IF EXISTS "petColorsType";
      DROP TYPE IF EXISTS "petStatus";
      DROP TYPE IF EXISTS "userRole";
      DROP TYPE IF EXISTS "activeStatus";
    `)
  }
}
