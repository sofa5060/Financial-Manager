import { create } from "zustand";

type State = {
  token: string | null;
  name: string | null;
  id: string | null;
  type: string | null;
};

type Actions = {
  setToken: (token: string) => void;
  setName: (name: string) => void;
  setId: (id: string) => void;
  setType: (type: string) => void;
  clearUserData: () => void;
  setLoginData: (token: string, name: string, id: string, type: string) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  token: null,
  name: null,
  id: null,
  type: null,
  setToken: (token) => set({ token }),
  setName: (name) => set({ name }),
  setId: (id) => set({ id }),
  setType: (type) => set({ type }),
  clearUserData: () => set({ token: null, name: null, id: null, type: null}),
  setLoginData: (token, name, id, type) => set({ token, name, id, type }),
}));
