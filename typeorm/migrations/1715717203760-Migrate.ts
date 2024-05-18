import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migrate1715717203760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "active_status" AS ENUM (
        'active',
        'inactive'
      );

      CREATE TYPE "user_role" AS ENUM (
        'admin',
        'user',
        'volunteer'
      );

      CREATE TYPE "pet_status" AS ENUM (
        'missing',
        'found'
      );

      CREATE TYPE "pet_colors_type" AS ENUM (
        'main',
        'secondary'
      );

      CREATE TABLE "shelters" (
        "id" serial PRIMARY KEY,
        "name" varchar,
        "status" active_status,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "shelter_addresses" (
        "id" serial PRIMARY KEY,
        "idShelter" integer,
        "idAddress" integer
      );

      CREATE TABLE "shelter_users" (
        "id" serial PRIMARY KEY,
        "idShelter" integer,
        "idUser" integer,
        "role" user_role,
        "index" integer
      );

      CREATE TABLE "shelter_contacts" (
        "id" serial PRIMARY KEY,
        "idShelter" integer,
        "type" integer,
        "value" varchar
      );

      CREATE TABLE "contact_types" (
        "id" serial PRIMARY KEY,
        "description" varchar,
        "mask" varchar
      );

      CREATE TABLE "addresses" (
        "id" serial PRIMARY KEY,
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
        "id" serial PRIMARY KEY,
        "name" varchar,
        "photo" varchar,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "user_favorite_shelters" (
        "id" serial PRIMARY KEY,
        "idUser" integer,
        "idShelter" integer
      );

      CREATE TABLE "user_addresses" (
        "id" serial PRIMARY KEY,
        "idUser" integer,
        "idAddress" integer
      );

      CREATE TABLE "user_contacts" (
        "id" serial PRIMARY KEY,
        "idUser" integer,
        "type" integer,
        "value" varchar
      );

      CREATE TABLE "user_pets" (
        "id" serial PRIMARY KEY,
        "idUser" integer,
        "idPet" integer
      );

      CREATE TABLE "pets" (
        "id" serial PRIMARY KEY,
        "idSpecimen" integer,
        "idBreed" integer,
        "idSize" integer,
        "description" varchar,
        "lastSeenLocation" varchar,
        "status" pet_status,
        "createdAt" timestamp DEFAULT (now()),
        "updatedAt" timestamp DEFAULT (now()),
        "deletedAt" timestamp
      );

      CREATE TABLE "pet_images" (
        "id" serial PRIMARY KEY,
        "idPet" integer,
        "url" varchar
      );

      CREATE TABLE "pet_colors" (
        "id" serial PRIMARY KEY,
        "idPet" integer,
        "idColor" integer,
        "type" pet_colors_type
      );

      CREATE TABLE "specimens" (
        "id" serial PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "breeds" (
        "id" serial PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "colors" (
        "id" serial PRIMARY KEY,
        "description" varchar
      );

      CREATE TABLE "sizes" (
        "id" serial PRIMARY KEY,
        "description" varchar
      );

      COMMENT ON COLUMN "users"."photo" IS 'Uses a default image if null';

      ALTER TABLE "shelter_addresses" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelter_addresses" ADD FOREIGN KEY ("idAddress") REFERENCES "addresses" ("id");

      ALTER TABLE "shelter_users" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelter_users" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "shelter_contacts" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "shelter_contacts" ADD FOREIGN KEY ("type") REFERENCES "contact_types" ("id");

      ALTER TABLE "user_favorite_shelters" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "user_favorite_shelters" ADD FOREIGN KEY ("idShelter") REFERENCES "shelters" ("id");

      ALTER TABLE "user_addresses" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "user_addresses" ADD FOREIGN KEY ("idAddress") REFERENCES "addresses" ("id");

      ALTER TABLE "user_contacts" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "user_contacts" ADD FOREIGN KEY ("type") REFERENCES "contact_types" ("id");

      ALTER TABLE "user_pets" ADD FOREIGN KEY ("idUser") REFERENCES "users" ("id");

      ALTER TABLE "user_pets" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "pet_images" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "pet_colors" ADD FOREIGN KEY ("idPet") REFERENCES "pets" ("id");

      ALTER TABLE "pet_colors" ADD FOREIGN KEY ("idColor") REFERENCES "colors" ("id");
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pet_colors" DROP CONSTRAINT IF EXISTS "pet_colors_idColor_fkey";
      ALTER TABLE "pet_colors" DROP CONSTRAINT IF EXISTS "pet_colors_idPet_fkey";
      ALTER TABLE "pet_images" DROP CONSTRAINT IF EXISTS "pet_images_idPet_fkey";
      ALTER TABLE "user_pets" DROP CONSTRAINT IF EXISTS "user_pets_idPet_fkey";
      ALTER TABLE "user_pets" DROP CONSTRAINT IF EXISTS "user_pets_idUser_fkey";
      ALTER TABLE "user_contacts" DROP CONSTRAINT IF EXISTS "user_contacts_type_fkey";
      ALTER TABLE "user_contacts" DROP CONSTRAINT IF EXISTS "user_contacts_idUser_fkey";
      ALTER TABLE "user_addresses" DROP CONSTRAINT IF EXISTS "user_addresses_idAddress_fkey";
      ALTER TABLE "user_addresses" DROP CONSTRAINT IF EXISTS "user_addresses_idUser_fkey";
      ALTER TABLE "user_favorite_shelters" DROP CONSTRAINT IF EXISTS "user_favorite_shelters_idShelter_fkey";
      ALTER TABLE "user_favorite_shelters" DROP CONSTRAINT IF EXISTS "user_favorite_shelters_idUser_fkey";
      ALTER TABLE "shelter_contacts" DROP CONSTRAINT IF EXISTS "shelter_contacts_type_fkey";
      ALTER TABLE "shelter_contacts" DROP CONSTRAINT IF EXISTS "shelter_contacts_idShelter_fkey";
      ALTER TABLE "shelter_users" DROP CONSTRAINT IF EXISTS "shelter_users_idUser_fkey";
      ALTER TABLE "shelter_users" DROP CONSTRAINT IF EXISTS "shelter_users_idShelter_fkey";
      ALTER TABLE "shelter_addresses" DROP CONSTRAINT IF EXISTS "shelter_addresses_idAddress_fkey";
      ALTER TABLE "shelter_addresses" DROP CONSTRAINT IF EXISTS "shelter_addresses_idShelter_fkey";

      DROP TABLE IF EXISTS "sizes";
      DROP TABLE IF EXISTS "colors";
      DROP TABLE IF EXISTS "breeds";
      DROP TABLE IF EXISTS "specimens";
      DROP TABLE IF EXISTS "pet_colors";
      DROP TABLE IF EXISTS "pet_images";
      DROP TABLE IF EXISTS "pets";
      DROP TABLE IF EXISTS "user_pets";
      DROP TABLE IF EXISTS "user_contacts";
      DROP TABLE IF EXISTS "user_addresses";
      DROP TABLE IF EXISTS "user_favorite_shelters";
      DROP TABLE IF EXISTS "users";
      DROP TABLE IF EXISTS "addresses";
      DROP TABLE IF EXISTS "contact_types";
      DROP TABLE IF EXISTS "shelter_contacts";
      DROP TABLE IF EXISTS "shelter_users";
      DROP TABLE IF EXISTS "shelter_addresses";
      DROP TABLE IF EXISTS "shelters";

      DROP TYPE IF EXISTS "pet_colors_type";
      DROP TYPE IF EXISTS "pet_status";
      DROP TYPE IF EXISTS "user_role";
      DROP TYPE IF EXISTS "active_status";
    `)
  }
}
