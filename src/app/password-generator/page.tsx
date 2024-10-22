"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { PasswordOptions } from "../../../types";

export default function page() {
  const [formData, setFormData] = useState<PasswordOptions>({
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
    unrepeated: false,
  });
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    } else {
      // Предварительное обновление
      const updatedData = { ...formData, [e.target.name]: e.target.checked };

      // Проверка: если все флаги символов (uppercase, lowercase, numbers, symbols) становятся false
      const isAllFalse =
        !updatedData.uppercase &&
        !updatedData.lowercase &&
        !updatedData.numbers &&
        !updatedData.symbols;

      // Если все 4 флага false, то запрещаем изменение, а то пароль не будет генерироваться
      if (isAllFalse) {
        return;
      }

      // Если хотя бы один флаг true, обновляем состояние
      setFormData(updatedData);
    }
  };

  const generatePassword = (options: PasswordOptions) => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~";

    let newPassword = "";
    let availableChars = charset.split("");

    for (let i = 0; i < options.length; i++) {
      // Чтобы избегать повторений, удаляем использованные символы
      if (options.unrepeated && availableChars.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableChars.length);
        newPassword += availableChars[randomIndex];
        availableChars.splice(randomIndex, 1); // Убираем использованный символ
      } else {
        newPassword += charset.charAt(
          Math.floor(Math.random() * charset.length)
        );
      }
    }
    return newPassword;
  };

  const handleGeneratePassword = (e: FormEvent) => {
    e.preventDefault();
    const newPassword = generatePassword(formData);
    setPasswords((prev) => [...prev, newPassword]);
  };

  return (
    <>
      <section>
        <div className="container">
          <h1 className="text-[40px] leading-[48px] font-medium mb-2">
            Генератор паролей
          </h1>
          <div className="flex gap-7 flex-col lg:flex-row">
            <form className="w-full" onSubmit={handleGeneratePassword}>
              <label htmlFor="length" className="mb-1">
                Длина пароля
              </label>
              <input
                id="length"
                name="length"
                type="number"
                className="w-full border-[1px] border-[#DEE2E6] p-3 rounded-lg mb-3"
                placeholder="Укажите длину пароля"
                value={formData.length}
                max={48}
                onChange={handleChange}
                required
              />
              <div className="flex flex-col">
                <label className="cursor-pointer text-[#212529] select-none">
                  <input
                    className="me-2"
                    name="uppercase"
                    type="checkbox"
                    checked={formData.uppercase}
                    onChange={handleChange}
                  />
                  Использовать прописные буквы
                </label>
                <label className="cursor-pointer text-[#212529] select-none">
                  <input
                    className="me-2"
                    name="lowercase"
                    type="checkbox"
                    checked={formData.lowercase}
                    onChange={handleChange}
                  />
                  Использовать строчные буквы
                </label>
                <label className="cursor-pointer text-[#212529] select-none">
                  <input
                    className="me-2"
                    name="numbers"
                    type="checkbox"
                    checked={formData.numbers}
                    onChange={handleChange}
                  />
                  Использовать цифры
                </label>
                <label className="cursor-pointer text-[#212529] select-none">
                  <input
                    className="me-2"
                    name="symbols"
                    type="checkbox"
                    checked={formData.symbols}
                    onChange={handleChange}
                  />
                  Использовать символы: %, *, ), ?, @, #, $, ~
                </label>
                <label className="cursor-pointer text-[#212529] select-none">
                  <input
                    className="me-2"
                    name="unrepeated"
                    type="checkbox"
                    checked={formData.unrepeated}
                    onChange={handleChange}
                  />
                  Избегать повторения символов
                </label>
              </div>
              <button type="submit" className="btn mt-4 font-semibold text-lg">
                Сгенерировать пароль
              </button>
            </form>
            <div className="w-full">
              <ul className="flex flex-col gap-1">
                {passwords &&
                  passwords.map((pass, index) => (
                    <li
                      className="w-full border-[1px] border-[#DEE2E6] py-1 px-6 flex items-center justify-between"
                      key={index}>
                      <span>{pass}</span>
                      <button
                        title="Скопировать"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(pass)
                            .then(() => {
                              alert("Пароль скопирован!");
                            })
                            .catch(() => {
                              alert("Ошибка при копировании пароля");
                            });
                        }}>
                        <svg
                          width="25"
                          height="25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M21.922.39c1.219 0 2.25 1.031 2.25 2.25v13.5a2.25 2.25 0 01-2.25 2.25h-13.5a2.221 2.221 0 01-2.25-2.25V2.64A2.25 2.25 0 018.422.39h13.5zm-13.5 19.5h9.75v2.25a2.25 2.25 0 01-2.25 2.25h-13.5a2.221 2.221 0 01-2.25-2.25V8.64a2.25 2.25 0 012.25-2.25h2.25v9.75c0 2.11 1.64 3.75 3.75 3.75z"
                            fill="#3B75A2"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
