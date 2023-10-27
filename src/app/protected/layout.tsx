import { getServerSession } from 'next-auth/next';
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface ProtectedLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {

    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email) {
        return (
            <div>
                Esto está protegido y no tienes acceso a él.
            </div>
        )
    }

  return (
    <>
        {children}
    </>
  );
}

export default ProtectedLayout