import Link from "next/link";

export default function page() {
  return (
    <section>
      <div className="container">
        <h1 className="text-center text-3xl text-white fonr-semibold py-3 bg-primary rounded-xl mb-3">
          Нужен надежный пароль или быстрый расчет?
        </h1>
        <h2 className="text-center text-2xl py-2 bg-slate-300 rounded-xl mb-5">
          Наш сайт предлагает удобные онлайн-инструменты:
        </h2>
        <div className="flex gap-10">
          <div className="max-w-[600px] w-full bg-white rounded-lg border-[1px] border-[#DEE2E6] py-9 px-10 shadow-xl">
            <h3 className="text-xl font-semibold text-[#54595E] mb-5">
              Создавайте сложные и уникальные пароли за считанные секунды.
            </h3>
            <Link
              className="btn btn-primary inline-block"
              href="/password-generator">
              Генератор паролей
            </Link>
          </div>
          <div className="max-w-[600px] w-full bg-white rounded-lg border-[1px] border-[#DEE2E6] py-9 px-10 shadow-xl">
            <h3 className="text-xl font-semibold text-[#54595E] mb-5">
              Выполняйте различные расчеты быстро и точно.
            </h3>
            <Link className="btn btn-primary inline-block" href="/calculator">
              Калькулятор
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
