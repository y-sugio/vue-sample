<template>
  <div style="padding:16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
    <h1 style="margin:0 0 12px">保育園シフト管理</h1>
    <nav style="display:flex;gap:8px;margin-bottom:12px">
      <RouterLink to="/staffs">職員一覧</RouterLink>
      <RouterLink to="/staffs/new">職員登録</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>