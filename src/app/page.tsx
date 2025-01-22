'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import UnstyledLink from '@/components/links/UnstyledLink';

import OrderForm from '@/app/components/OrderForm';

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Timthoi</title>
      </Head>
      <section className='bg-white'>
        <OrderForm></OrderForm>
        <div className='layout relative flex   items-center justify-center py-12 text-center'>
          <UnstyledLink
            href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
            className='mt-4'
          >
            <img
              width='92'
              height='32'
              src='https://vercel.com/button'
              alt='Deploy with Vercel'
            />
          </UnstyledLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By timthoi
          </footer>
        </div>
      </section>
    </main>
  );
}
