test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const responseDataBase = responseBody.dependencies.database;
  const responseUpdatedAt = responseBody.updated_at;
  const parsedUpdatedAt = new Date(responseUpdatedAt).toISOString();

  expect(responseUpdatedAt).toEqual(parsedUpdatedAt);
  expect(responseDataBase.postgres_version).toEqual('16.0');
  expect(responseDataBase.max_connections).toEqual(100 );
  expect(responseDataBase.opened_connections).toEqual(1);

  console.log("responseBody:", responseBody);
});
