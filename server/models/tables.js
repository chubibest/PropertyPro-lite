import { hashPassword } from '../helpers/helper';

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const {
  NODE_ENV: env,
  DATABASE_URL,
  TEST_DATABASE_URL
} = process.env;

const connectionString = env === 'test' ? TEST_DATABASE_URL : DATABASE_URL;
const pool = new Pool(
  {
    connectionString
  }
);

const query = async (queryText) => {
  let client;
  try {
    client = await pool.connect();
    return await client.query(queryText);
  } finally {
    if (client) {
      client.release();
    }
  }
};

const createUsersTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id BIGINT PRIMARY KEY UNIQUE,
      email VARCHAR(128) UNIQUE,
      first_name VARCHAR(128) NOT NULL,
      last_name VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      phone_number BIGINT NOT NULL,
      address VARCHAR(128) NOT NULL,
      is_admin BOOLEAN DEFAULT false
    )`;
  await query(queryText);
};

const createPropertyTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  property(
    id BIGINT PRIMARY KEY UNIQUE,
    owner BIGINT NOT NULL,
    status VARCHAR(128) DEFAULT 'Available',
    price BIGINT NOT NULL,
    city VARCHAR(128) NOT NULL,
    state VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    type VARCHAR(128) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT now(),
    image_url VARCHAR(128) NOT NULL,
    FOREIGN KEY (owner) REFERENCES users (id) ON DELETE CASCADE
  )`;
  await query(queryText);
};

const createFlagsTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  flags(
    id BIGINT PRIMARY KEY UNIQUE,
    property_id BIGINT NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT now(),
    reason VARCHAR(128) NOT NULL,
    description VARCHAR(128) NOT NULL,
    FOREIGN KEY (property_id) REFERENCES property (id) ON DELETE CASCADE
  )`;
  await query(queryText);
};

const dropUsersTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS users;';
  await query(queryText);
};

const dropPropertyTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS property;';
  await query(queryText);
};

const dropFlagsTable = async () => {
  const queryText = 'DROP TABLE IF EXISTS flags;';
  await query(queryText);
};

const createTables = async () => {
  await createUsersTable();
  await createPropertyTable();
  await createFlagsTable();
  const password = await hashPassword('admin1');
  const adminUser = {
    text: `Insert into users (id, email, first_name, last_name,
       password, phone_number, address, is_admin)
       values($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [1, 'admin@admin.com', 'admin', 'admin',
      password, 12345678901, 'no 2 idumota lagos', true]
  };
  query(adminUser);
};

const dropTables = async () => {
  await dropFlagsTable();
  await dropPropertyTable();
  await dropUsersTable();
};

export {
  createTables,
  dropTables
};

require('make-runnable');
