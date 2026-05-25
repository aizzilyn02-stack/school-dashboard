import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div
                className="flex min-h-screen flex-col items-center p-6 lg:justify-center lg:p-8"
                style={{ backgroundColor: '#FDFDFC', color: '#1b1b18' }}
            >
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 lg:pr-8">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-12">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-semibold text-slate-900">Welcome to DILADILA ELEMENTARY SCHOOL Dashboard</h1>
                                        <p className="mt-2 text-sm text-slate-600">A lightweight analytics tool to monitor school data and make data-driven decisions.</p>

                                        <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                            <li>- Interactive KPIs and charts for enrollment and dropouts</li>
                                            <li>- Classroom, teacher and facilities insights</li>
                                            <li>- Data import/export and management</li>
                                            <li>- Secure authentication and role-based access</li>
                                        </ul>

                                        <div className="mt-6 flex items-center gap-3">
                                            {auth.user ? (
                                                <Link href={dashboard()} className="rounded-3xl border border-slate-900 bg-slate-900 px-4 py-2 text-sm text-white">Open Dashboard</Link>
                                            ) : (
                                                <>
                                                    <Link href={login()} className="rounded-3xl border border-slate-200 px-4 py-2 text-sm text-slate-900">Log in</Link>
                                                    <Link href={register()} className="rounded-3xl border border-slate-200 px-4 py-2 text-sm text-slate-900">Register</Link>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-blue-500 text-white shadow-lg">SD</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative -mb-px aspect-[335/364] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#fff2f2] lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg">
                            {/* System-branded logo and intro */}
                            <div className="flex h-full w-full items-center justify-center p-8">
                                <svg width="280" height="200" viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-full">
                                    <defs>
                                        <linearGradient id="g1" x1="0" x2="1">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="0" y="0" width="280" height="200" rx="16" fill="#fff2f2" />
                                    <g transform="translate(28,28)">
                                        <circle cx="52" cy="52" r="40" fill="url(#g1)" />
                                        <path d="M36 68 L52 44 L68 68 Z" fill="#fff" opacity="0.95" />
                                        <text x="120" y="62" fill="#1b1b18" fontSize="18" fontWeight="600">DILADILA ELEMENTARY</text>
                                        <text x="120" y="86" fill="#6b7280" fontSize="12">Santa Rita, Pampanga</text>
                                    </g>
                                </svg>
                            </div>
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-t-none lg:rounded-r-lg"></div>
                        </div>
                    </main>
                </div>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
                            {/* 13 */}
