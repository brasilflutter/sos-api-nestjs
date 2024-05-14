import { MigrationInterface, QueryRunner } from 'typeorm';

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
        "id" integer PRIMARY KEY,
        "name" varchar,
        "status" active_status,
        "created_at" timestamp DEFAULT (now()),
        "updated_at" timestamp DEFAULT (now()),
        "deleted_at" timestamp
      );
      
      CREATE TABLE "shelter_addresses" (
        "id" integer PRIMARY KEY,
        "id_shelter" integer,
        "id_address" integer
      );
      
      CREATE TABLE "shelter_users" (
        "id" integer PRIMARY KEY,
        "id_shelter" integer,
        "id_user" integer,
        "role" user_role,
        "index" integer
      );
      
      CREATE TABLE "shelter_contacts" (
        "id" integer PRIMARY KEY,
        "id_shelter" integer,
        "type" integer,
        "value" varchar
      );
      
      CREATE TABLE "contact_types" (
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
        "latitude" float,
        "longitude" float,
        "index" integer,
        "created_at" timestamp DEFAULT (now()),
        "updated_at" timestamp DEFAULT (now()),
        "deleted_at" timestamp
      );
      
      CREATE TABLE "users" (
        "id" integer PRIMARY KEY,
        "name" varchar,
        "photo" varchar,
        "created_at" timestamp DEFAULT (now()),
        "updated_at" timestamp DEFAULT (now()),
        "deleted_at" timestamp
      );
      
      CREATE TABLE "user_favorite_shelters" (
        "id" integer PRIMARY KEY,
        "id_user" integer,
        "id_shelter" integer
      );
      
      CREATE TABLE "user_addresses" (
        "id" integer PRIMARY KEY,
        "id_user" integer,
        "id_address" integer
      );
      
      CREATE TABLE "user_contacts" (
        "id" integer PRIMARY KEY,
        "id_user" integer,
        "type" integer,
        "value" varchar
      );
      
      CREATE TABLE "user_pets" (
        "id" integer PRIMARY KEY,
        "id_user" integer,
        "id_pet" integer
      );
      
      CREATE TABLE "pets" (
        "id" integer PRIMARY KEY,
        "id_specimen" integer,
        "id_breed" integer,
        "id_size" integer,
        "description" varchar,
        "last_seen_location" varchar,
        "status" pet_status,
        "created_at" timestamp DEFAULT (now()),
        "updated_at" timestamp DEFAULT (now()),
        "deleted_at" timestamp
      );
      
      CREATE TABLE "pet_images" (
        "id" integer PRIMARY KEY,
        "id_pet" integer,
        "url" varchar
      );
      
      CREATE TABLE "pet_colors" (
        "id" integer PRIMARY KEY,
        "id_pet" integer,
        "id_color" integer,
        "type" pet_colors_type
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
      
      ALTER TABLE "shelter_addresses" ADD FOREIGN KEY ("id_shelter") REFERENCES "shelters" ("id");
      
      ALTER TABLE "shelter_addresses" ADD FOREIGN KEY ("id_address") REFERENCES "addresses" ("id");
      
      ALTER TABLE "shelter_users" ADD FOREIGN KEY ("id_shelter") REFERENCES "shelters" ("id");
      
      ALTER TABLE "shelter_users" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
      
      ALTER TABLE "shelter_contacts" ADD FOREIGN KEY ("id_shelter") REFERENCES "shelters" ("id");
      
      ALTER TABLE "shelter_contacts" ADD FOREIGN KEY ("type") REFERENCES "contact_types" ("id");
      
      ALTER TABLE "user_favorite_shelters" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
      
      ALTER TABLE "user_favorite_shelters" ADD FOREIGN KEY ("id_shelter") REFERENCES "shelters" ("id");
      
      ALTER TABLE "user_addresses" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
      
      ALTER TABLE "user_addresses" ADD FOREIGN KEY ("id_address") REFERENCES "addresses" ("id");
      
      ALTER TABLE "user_contacts" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
      
      ALTER TABLE "user_contacts" ADD FOREIGN KEY ("type") REFERENCES "contact_types" ("id");
      
      ALTER TABLE "user_pets" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");
      
      ALTER TABLE "user_pets" ADD FOREIGN KEY ("id_pet") REFERENCES "pets" ("id");
      
      ALTER TABLE "pet_images" ADD FOREIGN KEY ("id_pet") REFERENCES "pets" ("id");
      
      ALTER TABLE "pet_colors" ADD FOREIGN KEY ("id_pet") REFERENCES "pets" ("id");
      
      ALTER TABLE "pet_colors" ADD FOREIGN KEY ("id_color") REFERENCES "colors" ("id");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pet_colors" DROP CONSTRAINT IF EXISTS "pet_colors_id_color_fkey";
      ALTER TABLE "pet_colors" DROP CONSTRAINT IF EXISTS "pet_colors_id_pet_fkey";
      ALTER TABLE "pet_images" DROP CONSTRAINT IF EXISTS "pet_images_id_pet_fkey";
      ALTER TABLE "user_pets" DROP CONSTRAINT IF EXISTS "user_pets_id_pet_fkey";
      ALTER TABLE "user_pets" DROP CONSTRAINT IF EXISTS "user_pets_id_user_fkey";
      ALTER TABLE "user_contacts" DROP CONSTRAINT IF EXISTS "user_contacts_type_fkey";
      ALTER TABLE "user_contacts" DROP CONSTRAINT IF EXISTS "user_contacts_id_user_fkey";
      ALTER TABLE "user_addresses" DROP CONSTRAINT IF EXISTS "user_addresses_id_address_fkey";
      ALTER TABLE "user_addresses" DROP CONSTRAINT IF EXISTS "user_addresses_id_user_fkey";
      ALTER TABLE "user_favorite_shelters" DROP CONSTRAINT IF EXISTS "user_favorite_shelters_id_shelter_fkey";
      ALTER TABLE "user_favorite_shelters" DROP CONSTRAINT IF EXISTS "user_favorite_shelters_id_user_fkey";
      ALTER TABLE "shelter_contacts" DROP CONSTRAINT IF EXISTS "shelter_contacts_type_fkey";
      ALTER TABLE "shelter_contacts" DROP CONSTRAINT IF EXISTS "shelter_contacts_id_shelter_fkey";
      ALTER TABLE "shelter_users" DROP CONSTRAINT IF EXISTS "shelter_users_id_user_fkey";
      ALTER TABLE "shelter_users" DROP CONSTRAINT IF EXISTS "shelter_users_id_shelter_fkey";
      ALTER TABLE "shelter_addresses" DROP CONSTRAINT IF EXISTS "shelter_addresses_id_address_fkey";
      ALTER TABLE "shelter_addresses" DROP CONSTRAINT IF EXISTS "shelter_addresses_id_shelter_fkey";

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
    `);
  }
}
