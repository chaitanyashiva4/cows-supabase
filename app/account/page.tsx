'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';

import { useUser } from '@/utils/useUser';

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
    return (
        <div className="border border-zinc-700	max-w-3xl w-full p rounded-md m-auto my-8">
            <div className="px-5 py-4">
                <h3 className="text-2xl mb-1 font-medium">{title}</h3>
                <p className="text-zinc-300">{description}</p>
                {children}
            </div>
            <div className="border-t border-zinc-700 bg-zinc-900 p-4 text-zinc-500 rounded-b-md">
                {footer}
            </div>
        </div>
    );
}

export default function Account({ user }: any) {
    const [loading, setLoading] = useState(false);
    const { isLoading } = useUser();



    return (
        <section className="bg-black mb-32">
            <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
                        Account
                    </h1>
                    <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                        We partnered with Stripe for a simplified billing.
                    </p>
                </div>
            </div>
            <div className="p-4">
                <Card
                    title="Your Data"
                    
                >
                    <div className="text-xl mt-8 mb-4 font-semibold">
                        {isLoading ? (
                            <div className="h-12 mb-6">
                                Loading...
                            </div>
                        ) :(
                            <Link href="/">Choose your account data</Link>
                        )}
                    </div>
                </Card>
                <Card
                    title="Your Email"
                    description="Please enter the email address you want to use to login."
                    footer={<p>We will email you to verify the change.</p>}
                >
                    <p className="text-xl mt-8 mb-4 font-semibold">
                        {user ? user.email : undefined}
                    </p>
                </Card>
            </div>
        </section>
    );
}
