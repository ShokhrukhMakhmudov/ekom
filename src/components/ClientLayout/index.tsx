"use client";
import { usePathname, useRouter } from "next/navigation";
import Header from "../Header";
import { useEffect } from "react";
import useNameStore from "../../../store/useNameStore";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { name, setName } = useNameStore();

  // Загрузка имени из localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName) {
      setName(savedName);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [setName]);

  const pathname = usePathname();

  const isHomePage = pathname === "/login";
  return (
    <>
      {!isHomePage && <Header />}
      <main>{children}</main>
    </>
  );
}
