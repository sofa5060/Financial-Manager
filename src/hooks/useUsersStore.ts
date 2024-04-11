import { User } from "@/managers/UsersManager";
import { create } from "zustand";

type state = {
  users: User[];
  usersOptions: { value: number; label: string }[];
};

type actions = {
  setUsers: (subCostCenters: User[]) => void;
};

export const useUsersStore = create<state & actions>((set) => ({
  users: [],
  usersOptions: [],
  setUsers: (users) =>
    set({
      users,
      usersOptions: users.map((user) => ({
        value: user.user_id,
        label: user.name,
      })),
    }),
}));
