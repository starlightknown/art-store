import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id: string;
    email: string;
    name?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userRole?: string;
  }
}
