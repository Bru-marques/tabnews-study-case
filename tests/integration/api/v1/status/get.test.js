test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  const responseDataBase = responseBody.dependencies.database;
  const responseUpdatedAt = responseBody.updated_at;
  const parsedUpdatedAt = new Date(responseUpdatedAt).toISOString();

  expect(responseUpdatedAt).toBeDefined();
  expect(responseUpdatedAt).toEqual(parsedUpdatedAt);
  expect(responseDataBase.postgres_version).toBeDefined();
  expect(responseDataBase.max_connections).toBeDefined();
  expect(responseDataBase.opened_connections).toBeDefined();

  console.log("responseBody:", responseBody);
});
