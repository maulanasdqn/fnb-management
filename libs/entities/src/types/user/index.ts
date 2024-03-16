export type TUser = {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  role: {
    id: string;
    name: string;
    permissions: Array<string>;
  };
};
