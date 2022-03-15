import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AuthGuard = (props: any) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return <div></div>;
  }

  return <>{props.children}</>;
};

export default AuthGuard;
