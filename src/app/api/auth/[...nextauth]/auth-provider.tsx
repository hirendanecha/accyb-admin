'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  
  if (typeof window !== 'undefined') {
    if (session) {
      console.log(session, 'session');
      localStorage.setItem('adminToken', session?.jwt);
    } else {
      localStorage.removeItem('adminToken');
    }
  }
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
