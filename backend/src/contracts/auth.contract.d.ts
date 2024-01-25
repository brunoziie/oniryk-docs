type AuthUser = {
  id: string;
  username: string;
  name: string;
  favorite_color?: string | null;
};

declare global {
  namespace Express {
    export interface Request {
      user?: AuthUser;
    }
  }
}

export type AuthContract = {
  user: AuthUser;
};
