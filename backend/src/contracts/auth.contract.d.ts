declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
  }
}

export type AuthContract = {
  user: any;
};
