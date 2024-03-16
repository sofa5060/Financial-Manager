export type Account = {
  id: string;
  serial: string;
  name: string;
  type: string;
  children: Account[];
};
