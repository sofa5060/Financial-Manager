import { User } from "@/components/users/users-table/columns";
import { create } from "zustand";

interface UsersState {
  data: User[];
  setData: (newData: User[]) => void;
  lastRefetched: Date;
  refetch: () => void;
}

const useUsersStore = create<UsersState>()((set) => ({
  data: [],
  setData: (newData) => set(() => ({ data: newData })),
  lastRefetched: new Date(),
  refetch: () => set(() => ({ lastRefetched: new Date() })),
}));

export default useUsersStore;
