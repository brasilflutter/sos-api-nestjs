import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config(
  process.env.NODE_ENV === 'test' ? { path: '.env.test' } : { path: '.env' },
)

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
})
