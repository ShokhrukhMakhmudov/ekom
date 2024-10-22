"use client";
import { useState, useEffect } from "react";
import useNameStore from "../../../store/useNameStore";
import { useRouter } from "next/navigation";
const Home = () => {
  const [inputName, setInputName] = useState<string>("");
  const { name, setName } = useNameStore();
  const router = useRouter();

  const handleSubmit = (link: string) => {
    if (!inputName) {
      alert("Введите ваше имя");
      return;
    }

    localStorage.setItem("name", inputName);
    setName(inputName);

    router.push(link);
  };

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="max-w-[750px] w-full bg-white rounded-lg border-[1px] border-[#DEE2E6] py-9 px-10 shadow-xl">
        <h1 className="text-xl font-semibold text-[#54595E] mb-4">Начать</h1>
        <form>
          <label className="mb-1 text-[12px] leading-6 " htmlFor="name">
            Напишите ваше имя
          </label>
          <input
            id="name"
            className="w-full mb-6 border-[1px] border-[#DEE2E6] p-3 rounded-lg"
            type="text"
            placeholder="Ваше имя"
            value={inputName}
            required
            onChange={(e) => setInputName(e.target.value)}
          />
        </form>
        <div className="flex items-center justify-end gap-4">
          <button className="btn" onClick={() => handleSubmit("/calculator")}>
            Открыть калькулятор
          </button>
          <button
            className="btn"
            onClick={() => handleSubmit("/password-generator")}>
            Открыть генератор
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
