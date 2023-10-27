import React from 'react';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';//../api/auth/[...nextauth]/route
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
// import TestEmailButton from './TestEmailButton';

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className='w-full px-4 py-8 bg-gray-300 flex flex-row items-center gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/protected/dashboard'>Dashboard</Link>

            {session && session.user?.email ? (
                <>
                    <Link href='/auth/signout'>Sign out</Link>
                    <p>
                        <b>Signed in as {session.user?.email}</b>
                    </p>
                </>
            ) : (
                <>
                    <Link href='/auth/signin'>Sign in</Link>
                    <Link href='/auth/signup'>Sign up</Link>
                </>
            )}

            {/* <TestEmailButton /> */}
        </div>
    );
};

export default Navbar;


// "use client"

// import { signIn, signOut, useSession } from 'next-auth/react'
// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import Link from 'next/link';
// //donde muestro el usuario si tiene más de 2 estilos me da error
// function SigninButton() {
// //para usar la sesión
//   const {data: session}= useSession()
//   // console.log(session?.user);
//   //si lo coloco en otro componente no me toma bien la sesión para lo que quiero mostrar si 
//   //esta el usuario logueado
//   if(session && session.user){
//     return (
//       <>
//       <Link style={{color: 'white'}}href={"/api/recipes/recipe"}>Crear Receta</Link>
//       <Link style={{color: 'white'}}href={"/dashboard"}>Dashboard</Link>
//     <div className='flex gap-4 ml-auto'>
//     <p className='text-sky-600' style={{color: "white"}}>{session.user.name}</p>
//     <button onClick={()=>signOut({callbackUrl: "/"})} className='btn btn-danger'>
//         Cerrar Sesión
//     </button>
//     </div>
//     </>
//     )
//   }

//   return <button onClick={()=>signIn()} className='btn btn-primary'>
//     Iniciar Sesión
//   </button>
// }

// export default SigninButton