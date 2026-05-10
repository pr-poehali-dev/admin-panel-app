export type Section = "dashboard" | "orders" | "catalog" | "clients" | "content";

export const NAV_ITEMS = [
  { id: "dashboard" as Section, label: "Обзор", icon: "LayoutDashboard" },
  { id: "orders" as Section, label: "Заказы", icon: "ClipboardList" },
  { id: "catalog" as Section, label: "Каталог", icon: "Package" },
  { id: "clients" as Section, label: "Клиенты", icon: "Users" },
  { id: "content" as Section, label: "Контент", icon: "FileText" },
];

export const ORDERS = [
  { id: "ЗК-2841", client: "Морозова А.И.", product: "Гранитный крест №4", status: "В работе", date: "08.05.2026", sum: "47 000 ₽" },
  { id: "ЗК-2840", client: "Петров С.В.", product: "Надгробие «Классик»", status: "Готов", date: "07.05.2026", sum: "83 500 ₽" },
  { id: "ЗК-2839", client: "Иванова Т.Р.", product: "Памятник с портретом", status: "Ожидает", date: "06.05.2026", sum: "125 000 ₽" },
  { id: "ЗК-2838", client: "Козлов Д.М.", product: "Ограда металлическая", status: "Доставлен", date: "05.05.2026", sum: "28 000 ₽" },
  { id: "ЗК-2837", client: "Семёнова Е.П.", product: "Гранитная плита", status: "Готов", date: "03.05.2026", sum: "61 000 ₽" },
];

export const CATALOG = [
  { name: "Гранитный крест №4", category: "Кресты", price: "от 35 000 ₽", stock: 12, status: "Активен" },
  { name: "Надгробие «Классик»", category: "Надгробия", price: "от 70 000 ₽", stock: 8, status: "Активен" },
  { name: "Памятник с портретом", category: "С портретом", price: "от 95 000 ₽", stock: 5, status: "Активен" },
  { name: "Ограда металлическая", category: "Ограды", price: "от 22 000 ₽", stock: 20, status: "Активен" },
  { name: "Гранитная плита двойная", category: "Плиты", price: "от 55 000 ₽", stock: 3, status: "Мало" },
  { name: "Крест деревянный", category: "Кресты", price: "от 8 000 ₽", stock: 0, status: "Нет" },
];

export const CLIENTS = [
  { name: "Морозова Антонина Ивановна", phone: "+7 912 345-67-89", orders: 3, total: "156 000 ₽", last: "08.05.2026" },
  { name: "Петров Сергей Владимирович", phone: "+7 921 234-56-78", orders: 1, total: "83 500 ₽", last: "07.05.2026" },
  { name: "Иванова Тамара Романовна", phone: "+7 903 123-45-67", orders: 2, total: "198 000 ₽", last: "06.05.2026" },
  { name: "Козлов Дмитрий Михайлович", phone: "+7 916 987-65-43", orders: 1, total: "28 000 ₽", last: "05.05.2026" },
  { name: "Семёнова Елена Петровна", phone: "+7 926 876-54-32", orders: 4, total: "312 000 ₽", last: "03.05.2026" },
];

export const CONTENT_ITEMS = [
  { title: "Главная страница — Hero", type: "Страница", updated: "07.05.2026", status: "Опубликован" },
  { title: "О компании", type: "Страница", updated: "01.05.2026", status: "Опубликован" },
  { title: "Акция мая — скидка 10%", type: "Баннер", updated: "05.05.2026", status: "Активен" },
  { title: "FAQ по заказу памятника", type: "Страница", updated: "20.04.2026", status: "Черновик" },
  { title: "Контакты и адрес", type: "Блок", updated: "15.04.2026", status: "Опубликован" },
];

export const statusColor: Record<string, string> = {
  "В работе": "bg-amber-900/40 text-amber-400",
  "Готов": "bg-emerald-900/40 text-emerald-400",
  "Ожидает": "bg-slate-700/40 text-slate-400",
  "Доставлен": "bg-stone-700/40 text-stone-400",
  "Активен": "bg-emerald-900/40 text-emerald-400",
  "Мало": "bg-amber-900/40 text-amber-400",
  "Нет": "bg-red-900/40 text-red-400",
};
