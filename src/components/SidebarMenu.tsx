type Props = {
  current: string;
  onChange: (page: string) => void;
};

export default function SidebarMenu({
  current,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">MiniPOS</h2>
      <nav className="flex flex-col gap-2">
        <button
          className={`text-left p-2 rounded ${
            current === "customers"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onChange("customers")}
        >
          Customers
        </button>
        <button
          className={`text-left p-2 rounded ${
            current === "departments"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onChange("departments")}
        >
          Departments
        </button>
        <button
          className={`text-left p-2 rounded ${
            current === "students"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onChange("students")}
        >
          Students
        </button>

        <button
          className={`text-left p-2 rounded ${
            current === "dashboard"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onChange("dashboard")}
        >
          Dashboard
        </button>
      
        <button
          className={`text-left p-2 rounded ${
            current === "about"
              ? "bg-black text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onChange("about")}
        >
          Acerca de .....
        </button>
      </nav>
    </div>
  );
}
