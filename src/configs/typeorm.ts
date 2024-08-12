import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'hannip-form-mysql',
  port: 3306,
  username: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/entities/*.ts'],
  logging: true,
  synchronize: true,
});
