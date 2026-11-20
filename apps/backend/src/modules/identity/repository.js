export async function insertUser(client, { id, email, passwordHash, role }) {
  await client.query('INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)', [id, email, passwordHash, role]);
}

export async function findCredentials(db, email) {
  const result = await db.query('SELECT id, password_hash FROM users WHERE email = $1', [email]);
  return result.rows[0] ?? null;
}
