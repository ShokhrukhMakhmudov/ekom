"use client";
import useNameStore from "../../../store/useNameStore";
import Link from "next/link";

export default function Header() {
  const { name } = useNameStore();

  const handleLogOut = () => {
    localStorage.removeItem("name");
    window.location.reload();
  };

  return (
    <header className="py-4 mb-11">
      <div className="container flex items-center ">
        <nav className="me-auto">
          <ul className="flex gap-9 text-sm leading-[13.5px] font-semibold">
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href="/calculator">Калькулятор</Link>
            </li>
            <li>
              <Link href="/password-generator">Генератор паролей</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3 cursor-pointer me-3">
          <span className="text-[12px] leading-[13.5px] font-semibold">
            {name}
          </span>
          <span className="w-[38px] h-[38px] p-[10px] flex items-center justify-center bg-primary text-white rounded-full text-2xl leading-[13.5px] font-semibold">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <button
          className="flex items-center gap-1 text-primary"
          onClick={handleLogOut}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 10V8H7V6h5V4l3 3zm-1-1v4H6v3l-6-3V0h11v5h-1V1H2l4 2v9h4V9z"
              stroke="none"
            />
          </svg>
          <span>Выйти</span>
        </button>
      </div>
    </header>
  );
}
