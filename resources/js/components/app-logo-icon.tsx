import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="#FFFFFF" stroke="#0F3A83" strokeWidth="4" />
            <circle cx="32" cy="32" r="22" fill="#FBE05F" />
            <g fill="none" stroke="#0F3A83" strokeWidth="2">
                <path d="M14 34c4-8 9-12 18-12s14 4 18 12" />
                <path d="M13 38c4-2 10-3 14-3s10 1 14 3" />
            </g>
            <g stroke="#0F3A83" strokeWidth="3" fill="#E4C76F">
                <path d="M30 16c1.4-2 3.5-4 6-4 2.5 0 4.6 2 6 4v6H30v-6z" />
                <path d="M30 22h12v6H30z" />
            </g>
            <path d="M32 16c-1.5 2-3.4 3.9-5.5 5.4-1.7 1.2-3.1 2.9-3.7 4.9-.7 2.4.4 4.6 2.4 5.5 2.1 1 4.7-.1 5.8-2.1 1.1 2 3.7 3 5.8 2.1 2-1 3.2-3.1 2.4-5.5-.6-2-2-3.7-3.7-4.9C35.4 19.9 33.5 18 32 16z" fill="#FFFFFF" stroke="#0F3A83" strokeWidth="2" />
            <path d="M20 25c0-4 4-6 6-7 0 3-0.5 6-1.5 8.5-0.9 2.2-3.5 3.8-5.5 3.5-1.1-0.2-1-1.8 1-5z" fill="#0E7C3B" stroke="#06481C" strokeWidth="1" />
            <path d="M44 25c0-4-4-6-6-7 0 3 0.5 6 1.5 8.5 0.9 2.2 3.5 3.8 5.5 3.5 1.1-0.2 1-1.8-1-5z" fill="#0E7C3B" stroke="#06481C" strokeWidth="1" />
            <path d="M30 29c0 4 2 5 2 9s2 9 2 9 2-5 2-9-2-5-2-9-2 1-2 1z" fill="#FFFFFF" />
            <path d="M26 32c2-1 4-2 6-2s4 1 6 2" fill="#FFFFFF" stroke="#0F3A83" strokeWidth="2" />
            <path d="M22 48c2-4 7-6 10-8 3-1.7 8-1.7 11 0 3 1.8 8 4 10 8" fill="none" stroke="#0F3A83" strokeWidth="3" strokeLinecap="round" />
            <path d="M32 22v-6" stroke="#0F3A83" strokeWidth="3" strokeLinecap="round" />
            <path d="M27 14l5-6 5 6" fill="none" stroke="#0F3A83" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
