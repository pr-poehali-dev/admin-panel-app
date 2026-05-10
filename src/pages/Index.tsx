import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "dashboard" | "orders" | "catalog" | "clients" | "content";

const NAV_ITEMS = [
  { id: "dashboard" as Section, label: "Обзор", icon: "LayoutDashboard" },
  { id: "orders" as Section, label: "Заказы", icon: "ClipboardList" },
  { id: "catalog" as Section, label: "Каталог", icon: "Package" },
  { id: "clients" as Section, label: "Клиенты", icon: "Users" },
  { id: "content" as Section, label: "Контент", icon: "FileText" },
];

const ORDERS = [
  { id: "ЗК-2841", client: "Морозова А.И.", product: "Гранитный крест №4", status: "В работе", date: "08.05.2026", sum: "47 000 ₽" },
  { id: "ЗК-2840", client: "Петров С.В.", product: "Надгробие «Классик»", status: "Готов", date: "07.05.2026", sum: "83 500 ₽" },
  { id: "ЗК-2839", client: "Иванова Т.Р.", product: "Памятник с портретом", status: "Ожидает", date: "06.05.2026", sum: "125 000 ₽" },
  { id: "ЗК-2838", client: "Козлов Д.М.", product: "Ограда металлическая", status: "Доставлен", date: "05.05.2026", sum: "28 000 ₽" },
  { id: "ЗК-2837", client: "Семёнова Е.П.", product: "Гранитная плита", status: "Готов", date: "03.05.2026", sum: "61 000 ₽" },
];

const CATALOG = [
  { name: "Гранитный крест №4", category: "Кресты", price: "от 35 000 ₽", stock: 12, status: "Активен" },
  { name: "Надгробие «Классик»", category: "Надгробия", price: "от 70 000 ₽", stock: 8, status: "Активен" },
  { name: "Памятник с портретом", category: "С портретом", price: "от 95 000 ₽", stock: 5, status: "Активен" },
  { name: "Ограда металлическая", category: "Ограды", price: "от 22 000 ₽", stock: 20, status: "Активен" },
  { name: "Гранитная плита двойная", category: "Плиты", price: "от 55 000 ₽", stock: 3, status: "Мало" },
  { name: "Крест деревянный", category: "Кресты", price: "от 8 000 ₽", stock: 0, status: "Нет" },
];

const CLIENTS = [
  { name: "Морозова Антонина Ивановна", phone: "+7 912 345-67-89", orders: 3, total: "156 000 ₽", last: "08.05.2026" },
  { name: "Петров Сергей Владимирович", phone: "+7 921 234-56-78", orders: 1, total: "83 500 ₽", last: "07.05.2026" },
  { name: "Иванова Тамара Романовна", phone: "+7 903 123-45-67", orders: 2, total: "198 000 ₽", last: "06.05.2026" },
  { name: "Козлов Дмитрий Михайлович", phone: "+7 916 987-65-43", orders: 1, total: "28 000 ₽", last: "05.05.2026" },
  { name: "Семёнова Елена Петровна", phone: "+7 926 876-54-32", orders: 4, total: "312 000 ₽", last: "03.05.2026" },
];

const CONTENT_ITEMS = [
  { title: "Главная страница — Hero", type: "Страница", updated: "07.05.2026", status: "Опубликован" },
  { title: "О компании", type: "Страница", updated: "01.05.2026", status: "Опубликован" },
  { title: "Акция мая — скидка 10%", type: "Баннер", updated: "05.05.2026", status: "Активен" },
  { title: "FAQ по заказу памятника", type: "Страница", updated: "20.04.2026", status: "Черновик" },
  { title: "Контакты и адрес", type: "Блок", updated: "15.04.2026", status: "Опубликован" },
];

const statusColor: Record<string, string> = {
  "В работе": "bg-amber-900/40 text-amber-400",
  "Готов": "bg-emerald-900/40 text-emerald-400",
  "Ожидает": "bg-slate-700/40 text-slate-400",
  "Доставлен": "bg-stone-700/40 text-stone-400",
  "Активен": "bg-emerald-900/40 text-emerald-400",
  "Мало": "bg-amber-900/40 text-amber-400",
  "Нет": "bg-red-900/40 text-red-400",
};

export default function Index() {
  const [section, setSection] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "hsl(20 10% 5%)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col flex-shrink-0 transition-all duration-300"
        style={{
          width: sidebarOpen ? 220 : 64,
          background: "hsl(20 10% 5%)",
          borderRight: "1px solid hsl(20 8% 13%)",
          minHeight: "100vh",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid hsl(20 8% 13%)" }}>
          <div
            className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
            style={{ background: "hsl(38 60% 65% / 0.15)", border: "1px solid hsl(38 60% 65% / 0.3)" }}
          >
            <span className="font-display text-gold text-sm font-semibold">М</span>
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in overflow-hidden">
              <p className="font-display text-gold text-base leading-tight tracking-wide">Мемориал</p>
              <p className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>Управление</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`nav-item ${section === item.id ? "active" : ""}`}
              style={section === item.id ? { borderLeft: "2px solid hsl(38 60% 65%)", paddingLeft: "14px" } : {}}
            >
              <Icon name={item.icon} size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="animate-fade-in whitespace-nowrap">{item.label}</span>}
            </div>
          ))}
        </nav>

        {/* Toggle */}
        <div className="px-2 pb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="nav-item w-full justify-center"
          >
            <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto" style={{ background: "hsl(20 10% 6%)" }}>
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-4 sticky top-0 z-10"
          style={{ background: "hsl(20 10% 6%)", borderBottom: "1px solid hsl(20 8% 13%)" }}
        >
          <div>
            <h1 className="font-display text-2xl font-medium" style={{ color: "hsl(40 20% 88%)" }}>
              {NAV_ITEMS.find((n) => n.id === section)?.label}
            </h1>
            <p className="text-xs mt-0.5" style={{ color: "hsl(40 10% 45%)" }}>
              10 мая 2026 г.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors"
              style={{ background: "hsl(38 60% 65%)", color: "hsl(20 10% 6%)", fontWeight: 500 }}
            >
              <Icon name="Plus" size={14} />
              Добавить
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{ background: "hsl(20 8% 16%)", color: "hsl(38 60% 65%)", border: "1px solid hsl(20 8% 20%)" }}
            >
              АД
            </div>
          </div>
        </div>

        <div className="p-8 animate-fade-in">
          {section === "dashboard" && <DashboardSection />}
          {section === "orders" && <OrdersSection />}
          {section === "catalog" && <CatalogSection />}
          {section === "clients" && <ClientsSection />}
          {section === "content" && <ContentSection />}
        </div>
      </main>
    </div>
  );
}

/* ── Dashboard ─────────────────────────────────────────── */
function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Заказов в месяц", value: "47", delta: "+12%", icon: "ClipboardList", up: true },
          { label: "Выручка (май)", value: "1 840 000 ₽", delta: "+8%", icon: "TrendingUp", up: true },
          { label: "Активных клиентов", value: "134", delta: "+5", icon: "Users", up: true },
          { label: "Позиций в каталоге", value: "68", delta: "2 нет в наличии", icon: "Package", up: false },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: "hsl(38 60% 65% / 0.1)" }}
              >
                <Icon name={s.icon} size={15} className="text-gold" />
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  background: s.up ? "hsl(150 60% 40% / 0.15)" : "hsl(40 60% 50% / 0.15)",
                  color: s.up ? "hsl(150 60% 60%)" : "hsl(40 60% 65%)",
                }}
              >
                {s.delta}
              </span>
            </div>
            <p className="font-display text-2xl font-medium" style={{ color: "hsl(40 20% 88%)" }}>
              {s.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "hsl(40 10% 45%)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg" style={{ color: "hsl(40 20% 80%)" }}>Последние заказы</h2>
          <button className="text-xs text-gold hover:underline">Все заказы →</button>
        </div>
        <OrdersTable rows={ORDERS.slice(0, 4)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="font-display text-base mb-4" style={{ color: "hsl(40 20% 80%)" }}>Статусы заказов</h3>
          <div className="space-y-3">
            {[
              { label: "В работе", count: 14, pct: 30 },
              { label: "Готов к выдаче", count: 8, pct: 17 },
              { label: "Ожидают", count: 19, pct: 40 },
              { label: "Доставлены", count: 6, pct: 13 },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1" style={{ color: "hsl(40 10% 55%)" }}>
                  <span>{s.label}</span>
                  <span>{s.count}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "hsl(20 8% 16%)" }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, background: "hsl(38 60% 65% / 0.7)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3 className="font-display text-base mb-4" style={{ color: "hsl(40 20% 80%)" }}>Топ категории</h3>
          <div className="space-y-2">
            {[
              { name: "Памятники с портретом", pct: 38, sum: "698 000 ₽" },
              { name: "Надгробия", pct: 27, sum: "497 000 ₽" },
              { name: "Кресты", pct: 18, sum: "331 000 ₽" },
              { name: "Ограды", pct: 10, sum: "184 000 ₽" },
              { name: "Прочее", pct: 7, sum: "130 000 ₽" },
            ].map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-xs w-4" style={{ color: "hsl(40 10% 40%)" }}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "hsl(40 15% 75%)" }}>{c.name}</span>
                    <span style={{ color: "hsl(40 10% 50%)" }}>{c.sum}</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: "hsl(20 8% 16%)" }}>
                    <div className="h-1 rounded-full" style={{ width: `${c.pct}%`, background: "hsl(38 60% 65% / 0.5)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Orders ─────────────────────────────────────────────── */
function OrdersSection() {
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input
          placeholder="Поиск заказа..."
          className="flex-1 px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
        />
        <select
          className="px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 10% 55%)" }}
        >
          <option>Все статусы</option>
          <option>В работе</option>
          <option>Готов</option>
          <option>Ожидает</option>
          <option>Доставлен</option>
        </select>
      </div>
      <OrdersTable rows={ORDERS} />
    </div>
  );
}

function OrdersTable({ rows }: { rows: typeof ORDERS }) {
  return (
    <div className="rounded overflow-hidden" style={{ border: "1px solid hsl(20 8% 13%)" }}>
      <table className="w-full data-table">
        <thead style={{ background: "hsl(20 8% 8%)" }}>
          <tr>
            <th>№ Заказа</th>
            <th>Клиент</th>
            <th>Изделие</th>
            <th>Статус</th>
            <th>Дата</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} style={{ cursor: "pointer" }}>
              <td className="font-mono text-xs" style={{ color: "hsl(38 60% 65%)" }}>{o.id}</td>
              <td>{o.client}</td>
              <td style={{ color: "hsl(40 10% 60%)" }}>{o.product}</td>
              <td>
                <span className={`badge-status ${statusColor[o.status]}`}>{o.status}</span>
              </td>
              <td style={{ color: "hsl(40 10% 50%)" }}>{o.date}</td>
              <td className="font-medium">{o.sum}</td>
              <td>
                <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-gold transition-colors">
                  <Icon name="ChevronRight" size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Catalog ─────────────────────────────────────────────── */
function CatalogSection() {
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input
          placeholder="Поиск в каталоге..."
          className="flex-1 px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
        />
        <select
          className="px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 10% 55%)" }}
        >
          <option>Все категории</option>
          <option>Кресты</option>
          <option>Надгробия</option>
          <option>С портретом</option>
          <option>Ограды</option>
          <option>Плиты</option>
        </select>
      </div>
      <div className="rounded overflow-hidden" style={{ border: "1px solid hsl(20 8% 13%)" }}>
        <table className="w-full data-table">
          <thead style={{ background: "hsl(20 8% 8%)" }}>
            <tr>
              <th>Наименование</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Остаток</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CATALOG.map((p) => (
              <tr key={p.name} style={{ cursor: "pointer" }}>
                <td className="font-medium">{p.name}</td>
                <td style={{ color: "hsl(40 10% 55%)" }}>{p.category}</td>
                <td style={{ color: "hsl(38 60% 65%)" }}>{p.price}</td>
                <td style={{ color: p.stock === 0 ? "hsl(0 62% 50%)" : p.stock < 5 ? "hsl(38 60% 65%)" : "hsl(40 15% 70%)" }}>
                  {p.stock === 0 ? "—" : `${p.stock} шт.`}
                </td>
                <td>
                  <span className={`badge-status ${statusColor[p.status]}`}>{p.status}</span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-gold transition-colors">
                      <Icon name="Pencil" size={13} />
                    </button>
                    <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Clients ─────────────────────────────────────────────── */
function ClientsSection() {
  return (
    <div className="space-y-5">
      <input
        placeholder="Поиск клиента..."
        className="w-full max-w-md px-4 py-2 rounded text-sm outline-none"
        style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
      />
      <div className="rounded overflow-hidden" style={{ border: "1px solid hsl(20 8% 13%)" }}>
        <table className="w-full data-table">
          <thead style={{ background: "hsl(20 8% 8%)" }}>
            <tr>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Заказов</th>
              <th>Сумма всего</th>
              <th>Последний заказ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map((c) => (
              <tr key={c.name} style={{ cursor: "pointer" }}>
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{ background: "hsl(38 60% 65% / 0.15)", color: "hsl(38 60% 65%)" }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td style={{ color: "hsl(40 10% 55%)" }} className="font-mono text-xs">{c.phone}</td>
                <td style={{ color: "hsl(40 15% 75%)" }}>{c.orders}</td>
                <td style={{ color: "hsl(38 60% 65%)" }} className="font-medium">{c.total}</td>
                <td style={{ color: "hsl(40 10% 50%)" }}>{c.last}</td>
                <td>
                  <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-gold transition-colors">
                    <Icon name="ChevronRight" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Content ─────────────────────────────────────────────── */
function ContentSection() {
  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <input
          placeholder="Поиск контента..."
          className="flex-1 px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
        />
        <select
          className="px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 10% 55%)" }}
        >
          <option>Все типы</option>
          <option>Страница</option>
          <option>Баннер</option>
          <option>Блок</option>
        </select>
      </div>
      <div className="rounded overflow-hidden" style={{ border: "1px solid hsl(20 8% 13%)" }}>
        <table className="w-full data-table">
          <thead style={{ background: "hsl(20 8% 8%)" }}>
            <tr>
              <th>Заголовок</th>
              <th>Тип</th>
              <th>Обновлён</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CONTENT_ITEMS.map((c) => (
              <tr key={c.title} style={{ cursor: "pointer" }}>
                <td className="font-medium">{c.title}</td>
                <td>
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: "hsl(20 8% 14%)", color: "hsl(40 10% 55%)" }}
                  >
                    {c.type}
                  </span>
                </td>
                <td style={{ color: "hsl(40 10% 50%)" }}>{c.updated}</td>
                <td>
                  <span
                    className={`badge-status ${
                      c.status === "Опубликован" || c.status === "Активен"
                        ? "bg-emerald-900/40 text-emerald-400"
                        : "bg-slate-700/40 text-slate-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-gold transition-colors">
                      <Icon name="Pencil" size={13} />
                    </button>
                    <button style={{ color: "hsl(40 10% 40%)" }} className="hover:text-red-400 transition-colors">
                      <Icon name="Trash2" size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}