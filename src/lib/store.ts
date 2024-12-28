// store.js
import { create } from "zustand";

type State = {
  search: string;
  page: number;
  resultCount: number | null;
};

type Action = {
  setSearch: (search: State["search"]) => void;
  setPage: (page: State["page"]) => void;
  setResultCount: (resultCount: State["resultCount"]) => void;
};

const useStore = create<State & Action>((set) => ({
  search: "",
  page: 1,
  resultCount: null,
  setSearch: (search) => set({ search }),
  setPage: (page) => set({ page }),
  setResultCount: (resultCount) => set({ resultCount }),
}));

export default useStore;
