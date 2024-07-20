import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'hannip-form-mysql',
  port: 3306,
  username: 'root',
  password: '1111',
  database: 'hannip-form',
  entities: ['src/entities/*.ts'],
  logging: true,
  synchronize: true,
});
