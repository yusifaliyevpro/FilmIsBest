// store.js
import { create } from "zustand";

const useStore = create((set) => ({
  search: "",
  page: 1,
  resultCount: null,
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
  setResultCount: (resultCount) => set({ resultCount }),
}));

export default useStore;
