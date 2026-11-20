CREATE INDEX IF NOT EXISTS shops_admin_queue_idx
  ON shops ((CASE WHEN status = 'pending' THEN 0 ELSE 1 END), created_at DESC, id DESC);
