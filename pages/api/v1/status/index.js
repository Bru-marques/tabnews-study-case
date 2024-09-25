import database from "infra/database.js";

async function status(request, response) {

  const databaseName = process.env.POSTGRES_DB
  console.log('databaseName: ', databaseName)
  const updatedAt = new Date().toISOString();
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;
  const maxConnections = await database.query("SHOW max_connections;");
  const maxConnectionsValue = parseInt(maxConnections.rows[0].max_connections)
  const openedConnections = await database.query(
   `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}' ;`,
  );

  const openedConnectionsValue = openedConnections.rows[0].count

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: databaseVersionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue,
      },
    },
  });
}

export default status;
