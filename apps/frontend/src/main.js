const $ = (id) => document.getElementById(id);
const notice = (message) => { $('notice').textContent = message; };

async function api(path, options = {}) {
  const response = await fetch(path, { credentials: 'same-origin', ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error ?? 'Yêu cầu không thành công.');
  return data;
}

function formData(form) { return Object.fromEntries(new FormData(form).entries()); }

async function load() {
  const response = await fetch('/api/me', { credentials: 'same-origin' });
  if (!response.ok) { $('auth').hidden = false; $('dashboard').hidden = true; $('logout').hidden = true; return; }
  const { user } = await response.json();
  $('auth').hidden = true; $('dashboard').hidden = false; $('logout').hidden = false;
  $('account-label').textContent = user.role === 'admin' ? 'Admin' : user.shop_name;
  $('dashboard-title').textContent = user.role === 'admin' ? 'Xét duyệt shop' : user.shop_name;
  if (user.role === 'admin') {
    $('dashboard-description').textContent = 'Kiểm tra hồ sơ trước khi shop được tham gia chợ.';
    $('admin-shops').hidden = false; $('shop-status').hidden = true;
    await loadShops();
  } else {
    $('admin-shops').hidden = true; $('shop-status').hidden = false;
    const labels = { pending: 'Đang chờ admin xét duyệt', approved: 'Đã được duyệt', rejected: 'Hồ sơ bị từ chối' };
    $('shop-status').replaceChildren();
    const p = document.createElement('p'); p.className = 'status-pill'; p.textContent = labels[user.shop_status] ?? user.shop_status;
    $('shop-status').append(p);
    $('dashboard-description').textContent = user.shop_status === 'approved' ? 'Shop đã được duyệt. Chức năng đăng hàng sẽ được mở ở bước tiếp theo.' : 'Bạn có thể theo dõi trạng thái hồ sơ tại đây.';
  }
}

async function loadShops(cursor = null) {
  const { shops, nextCursor } = await api(`/api/admin/shops${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`);
  const list = $('shop-list');
  if (!cursor) list.replaceChildren();
  else list.querySelector('.load-more')?.remove();
  if (!shops.length && !cursor) { list.textContent = 'Chưa có hồ sơ shop.'; return; }
  for (const shop of shops) {
    const row = document.createElement('article'); row.className = 'shop-row';
    const title = document.createElement('h4'); title.textContent = shop.name;
    const info = document.createElement('p'); info.textContent = `${shop.representative} · ${shop.phone} · ${shop.address}`;
    const channel = document.createElement('p'); channel.textContent = `Kênh bán: ${shop.sales_channel}`;
    const status = document.createElement('span'); status.className = 'status-pill'; status.textContent = shop.status;
    row.append(title, info, channel, status);
    if (shop.status === 'pending') {
      const form = document.createElement('form');
      const note = document.createElement('textarea'); note.name = 'note'; note.placeholder = 'Ghi chú hoặc lý do từ chối'; note.setAttribute('aria-label', `Ghi chú xét duyệt ${shop.name}`);
      const approve = document.createElement('button'); approve.type = 'button'; approve.textContent = 'Duyệt shop';
      const reject = document.createElement('button'); reject.type = 'button'; reject.textContent = 'Từ chối'; reject.className = 'reject';
      for (const [button, decision] of [[approve, 'approved'], [reject, 'rejected']]) button.addEventListener('click', async () => {
        try { await api(`/api/admin/shops/${shop.id}/decision`, { method: 'POST', body: JSON.stringify({ decision, note: note.value }) }); notice('Đã cập nhật hồ sơ shop.'); await loadShops(); }
        catch (error) { notice(error.message); }
      });
      form.append(note, approve, reject); row.append(form);
    }
    list.append(row);
  }
  if (nextCursor) {
    const more = document.createElement('button');
    more.type = 'button'; more.className = 'load-more'; more.textContent = 'Xem thêm shop';
    more.addEventListener('click', async () => {
      more.disabled = true;
      try { await loadShops(nextCursor); }
      catch (error) { more.disabled = false; notice(error.message); }
    });
    list.append(more);
  }
}

$('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try { await api('/api/register', { method: 'POST', body: JSON.stringify(formData(event.currentTarget)) }); notice('Đã gửi hồ sơ. Admin sẽ xét duyệt shop của bạn.'); await load(); }
  catch (error) { notice(error.message); }
});
$('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  try { await api('/api/login', { method: 'POST', body: JSON.stringify(formData(event.currentTarget)) }); notice('Đã đăng nhập.'); await load(); }
  catch (error) { notice(error.message); }
});
$('logout').addEventListener('click', async () => { await api('/api/logout', { method: 'POST', body: '{}' }); notice('Đã đăng xuất.'); await load(); });
load().catch((error) => notice(error.message));
