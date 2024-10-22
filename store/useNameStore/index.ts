import { create } from "zustand";
import { NameState } from "../../types";

// Состояния для имени
const useNameStore = create<NameState>((set) => ({
  name: "",
  setName: (name: string) => set({ name }),
}));

export default useNameStore;
