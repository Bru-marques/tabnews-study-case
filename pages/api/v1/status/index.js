import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");
  const openedConnections = await database.query(
    "select count(*) from pg_stat_activity;",
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: postgresVersion.rows[0].server_version,
        max_connections: maxConnections.rows[0].max_connections,
        opened_connections: openedConnections.rows[0].count,
      },
    },
  });
}

export default status;
