import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ORDERS, CATALOG, CLIENTS, CONTENT_ITEMS, statusColor } from "./data";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const REVENUE_DATA = [
  { day: "1 мая", value: 98000 },
  { day: "2 мая", value: 134000 },
  { day: "3 мая", value: 61000 },
  { day: "4 мая", value: 210000 },
  { day: "5 мая", value: 28000 },
  { day: "6 мая", value: 175000 },
  { day: "7 мая", value: 83500 },
  { day: "8 мая", value: 47000 },
  { day: "9 мая", value: 0 },
  { day: "10 мая", value: 125000 },
];

const ORDERS_DATA = [
  { day: "1", count: 3 },
  { day: "2", count: 5 },
  { day: "3", count: 2 },
  { day: "4", count: 7 },
  { day: "5", count: 1 },
  { day: "6", count: 6 },
  { day: "7", count: 4 },
  { day: "8", count: 2 },
  { day: "9", count: 0 },
  { day: "10", count: 5 },
];

const CATEGORY_PIE = [
  { name: "С портретом", value: 38 },
  { name: "Надгробия", value: 27 },
  { name: "Кресты", value: 18 },
  { name: "Ограды", value: 10 },
  { name: "Прочее", value: 7 },
];
const PIE_COLORS = [
  "hsl(38 60% 65%)",
  "hsl(38 40% 50%)",
  "hsl(38 30% 40%)",
  "hsl(38 20% 30%)",
  "hsl(38 10% 22%)",
];

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "hsl(20 8% 9%)",
    border: "1px solid hsl(20 8% 18%)",
    borderRadius: 4,
    color: "hsl(40 15% 80%)",
    fontSize: 12,
  },
  cursor: { fill: "hsl(38 60% 65% / 0.05)" },
};

/* ── Shared: OrdersTable ────────────────────────────────── */
export function OrdersTable({ rows }: { rows: typeof ORDERS }) {
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

/* ── Dashboard ─────────────────────────────────────────── */
export function DashboardSection() {
  return (
    <div className="space-y-6">

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Заказов в месяц", value: "47", delta: "+12%", icon: "ClipboardList", up: true },
          { label: "Выручка (май)", value: "1 840 000 ₽", delta: "+8%", icon: "TrendingUp", up: true },
          { label: "Активных клиентов", value: "134", delta: "+5", icon: "Users", up: true },
          { label: "Позиций в каталоге", value: "68", delta: "2 нет в наличии", icon: "Package", up: false },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "hsl(38 60% 65% / 0.1)" }}>
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
            <p className="font-display text-2xl font-medium" style={{ color: "hsl(40 20% 88%)" }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: "hsl(40 10% 45%)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">

        {/* Выручка по дням — Area */}
        <div className="stat-card col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-base" style={{ color: "hsl(40 20% 80%)" }}>Выручка по дням, май</h3>
            <span className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>₽</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(38 60% 65%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(38 60% 65%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "hsl(40 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(40 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}к`} />
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                formatter={(v: number) => [`${v.toLocaleString("ru")} ₽`, "Выручка"]}
                labelStyle={{ color: "hsl(40 10% 55%)" }}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(38 60% 65%)" strokeWidth={1.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: "hsl(38 60% 65%)" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Категории — Pie */}
        <div className="stat-card">
          <h3 className="font-display text-base mb-4" style={{ color: "hsl(40 20% 80%)" }}>Категории</h3>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={CATEGORY_PIE} cx="50%" cy="50%" innerRadius={32} outerRadius={52} dataKey="value" strokeWidth={0}>
                {CATEGORY_PIE.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                formatter={(v: number) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-1.5">
            {CATEGORY_PIE.slice(0, 3).map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="text-xs flex-1" style={{ color: "hsl(40 10% 55%)" }}>{c.name}</span>
                <span className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Заказы по дням — Bar */}
      <div className="stat-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-base" style={{ color: "hsl(40 20% 80%)" }}>Заказы по дням, май</h3>
          <span className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>шт.</span>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={ORDERS_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={18}>
            <XAxis dataKey="day" tick={{ fill: "hsl(40 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(40 10% 40%)", fontSize: 10 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
              formatter={(v: number) => [`${v} шт.`, "Заказы"]}
              labelStyle={{ color: "hsl(40 10% 55%)" }}
              cursor={CHART_TOOLTIP_STYLE.cursor}
            />
            <Bar dataKey="count" fill="hsl(38 60% 65% / 0.6)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Последние заказы + статусы */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg" style={{ color: "hsl(40 20% 80%)" }}>Последние заказы</h2>
            <button className="text-xs text-gold hover:underline">Все заказы →</button>
          </div>
          <OrdersTable rows={ORDERS.slice(0, 4)} />
        </div>

        <div className="stat-card self-start">
          <h3 className="font-display text-base mb-4" style={{ color: "hsl(40 20% 80%)" }}>Статусы</h3>
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
      </div>

    </div>
  );
}

/* ── Orders ─────────────────────────────────────────────── */
const STATUS_OPTIONS = ["Все статусы", "В работе", "Готов", "Ожидает", "Доставлен"];

export function OrdersSection() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Все статусы");

  const filtered = ORDERS.filter((o) => {
    const matchesQuery =
      query === "" ||
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.client.toLowerCase().includes(query.toLowerCase()) ||
      o.product.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "Все статусы" || o.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Icon
            name="Search"
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "hsl(40 10% 40%)" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по номеру, клиенту, изделию..."
            className="w-full pl-8 pr-4 py-2 rounded text-sm outline-none"
            style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "hsl(40 10% 40%)" }}
            >
              <Icon name="X" size={13} />
            </button>
          )}
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 10% 55%)" }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <>
          <OrdersTable rows={filtered} />
          <p className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>
            Показано {filtered.length} из {ORDERS.length} заказов
          </p>
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 rounded"
          style={{ border: "1px solid hsl(20 8% 13%)" }}
        >
          <Icon name="SearchX" size={32} style={{ color: "hsl(40 10% 30%)" }} />
          <p className="mt-3 text-sm" style={{ color: "hsl(40 10% 45%)" }}>Заказов не найдено</p>
          <button
            onClick={() => { setQuery(""); setStatus("Все статусы"); }}
            className="mt-3 text-xs text-gold hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Catalog ─────────────────────────────────────────────── */
const CATEGORY_OPTIONS = ["Все категории", "Кресты", "Надгробия", "С портретом", "Ограды", "Плиты"];

export function CatalogSection() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Все категории");

  const filtered = CATALOG.filter((p) => {
    const matchesQuery =
      query === "" ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Все категории" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Icon
            name="Search"
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "hsl(40 10% 40%)" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию или категории..."
            className="w-full pl-8 pr-4 py-2 rounded text-sm outline-none"
            style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              style={{ color: "hsl(40 10% 40%)" }}
            >
              <Icon name="X" size={13} />
            </button>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 10% 55%)" }}
        >
          {CATEGORY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length > 0 ? (
        <>
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
                {filtered.map((p) => (
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
          <p className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>
            Показано {filtered.length} из {CATALOG.length} позиций
          </p>
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 rounded"
          style={{ border: "1px solid hsl(20 8% 13%)" }}
        >
          <Icon name="SearchX" size={32} style={{ color: "hsl(40 10% 30%)" }} />
          <p className="mt-3 text-sm" style={{ color: "hsl(40 10% 45%)" }}>Позиций не найдено</p>
          <button
            onClick={() => { setQuery(""); setCategory("Все категории"); }}
            className="mt-3 text-xs text-gold hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Clients ─────────────────────────────────────────────── */
export function ClientsSection() {
  const [query, setQuery] = useState("");

  const filtered = CLIENTS.filter((c) =>
    query === "" ||
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.phone.includes(query)
  );

  return (
    <div className="space-y-5">
      <div className="relative w-full max-w-md">
        <Icon
          name="Search"
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "hsl(40 10% 40%)" }}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по имени или телефону..."
          className="w-full pl-8 pr-4 py-2 rounded text-sm outline-none"
          style={{ background: "hsl(20 8% 9%)", border: "1px solid hsl(20 8% 16%)", color: "hsl(40 15% 80%)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "hsl(40 10% 40%)" }}
          >
            <Icon name="X" size={13} />
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
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
                {filtered.map((c) => (
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
          <p className="text-xs" style={{ color: "hsl(40 10% 40%)" }}>
            Показано {filtered.length} из {CLIENTS.length} клиентов
          </p>
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 rounded"
          style={{ border: "1px solid hsl(20 8% 13%)" }}
        >
          <Icon name="SearchX" size={32} style={{ color: "hsl(40 10% 30%)" }} />
          <p className="mt-3 text-sm" style={{ color: "hsl(40 10% 45%)" }}>Клиенты не найдены</p>
          <button
            onClick={() => setQuery("")}
            className="mt-3 text-xs text-gold hover:underline"
          >
            Сбросить поиск
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Content ─────────────────────────────────────────────── */
export function ContentSection() {
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