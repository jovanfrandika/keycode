export interface Repository {
  name: string;
  description: string;
  owner: string;
};

export interface File {
  path: string;
  url: string;
  type: string;
}