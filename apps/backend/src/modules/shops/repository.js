export async function insertShop(client, shop) {
  await client.query(`INSERT INTO shops (id, owner_user_id, name, representative, phone, address, sales_channel)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`, [shop.id, shop.ownerUserId, shop.name, shop.representative, shop.phone, shop.address, shop.salesChannel]);
}

export async function listShops(db, cursor, pageSize = 25) {
  const params = cursor ? [cursor.priority, cursor.createdAt, cursor.id, pageSize + 1] : [pageSize + 1];
  const after = cursor ? `WHERE (CASE WHEN status = 'pending' THEN 0 ELSE 1 END > $1
    OR (CASE WHEN status = 'pending' THEN 0 ELSE 1 END = $1 AND (created_at, id) < ($2, $3)))` : '';
  const result = await db.query(`SELECT id, name, representative, phone, address, sales_channel, status, review_note, created_at,
      CASE WHEN status = 'pending' THEN 0 ELSE 1 END AS priority
    FROM shops ${after}
    ORDER BY CASE WHEN status = 'pending' THEN 0 ELSE 1 END, created_at DESC, id DESC
    LIMIT $${params.length}`, params);
  return result.rows;
}

export async function decideShop(db, { id, decision, note, adminId }) {
  const result = await db.query(`UPDATE shops SET status = $1, review_note = $2, reviewed_by = $3, reviewed_at = now()
    WHERE id = $4 AND status = 'pending' RETURNING id, status`, [decision, note, adminId, id]);
  return result.rows[0] ?? null;
}
