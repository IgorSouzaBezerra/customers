module.exports = {
  name: "default",
  type: "sqlite",
  database: process.env.DB_NAME,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  synchronize: true,
  // logging: true,
  cli: {
    migrationsDir: process.env.MIGRATIONS_DIR,
  },
  seeds: [process.env.SEEDS],
  factories: [process.env.FACTORIES],
};
