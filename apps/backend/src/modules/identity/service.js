import { randomUUID } from 'node:crypto';
import { verifyPassword } from '../../core/password.js';
import { findCredentials, insertUser } from './repository.js';

export async function createShopOwner(client, email, passwordHash) {
  const id = randomUUID();
  await insertUser(client, { id, email, passwordHash, role: 'shop_owner' });
  return id;
}

export async function authenticate(db, email, password) {
  const user = await findCredentials(db, email);
  if (!user || !await verifyPassword(password, user.password_hash)) return null;
  return user.id;
}
