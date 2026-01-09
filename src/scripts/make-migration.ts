import fs from "node:fs";
import path from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("Informe o nome da migration");
  console.error("Ex: npm run make:migration create-tickets");
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:.TZ]/g, "")
  .slice(0, 14);

const fileName = `${timestamp}-${name}.ts`;
const migrationsDir = path.resolve("src/database/migrations");
const filePath = path.join(migrationsDir, fileName);

if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir, { recursive: true });
}

const template = `import { QueryInterface, DataTypes, Sequelize } from "sequelize";

export async function up(
  queryInterface: QueryInterface,
  sequelize: Sequelize
): Promise<void> {
  // TODO: create table
}

export async function down(
  queryInterface: QueryInterface
): Promise<void> {
  // TODO: drop table
}
`;

fs.writeFileSync(filePath, template);

console.log("Migration criada: ");
console.log(filePath);
