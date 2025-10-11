import {ReactNode} from 'react';
import type {Metadata} from 'next';
// import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {AntdRegistry} from '@ant-design/nextjs-registry';

// const geistSans = Geist({
//     variable: '--font-geist-sans',
//     subsets: ['latin'],
// });
//
// const geistMono = Geist_Mono({
//     variable: '--font-geist-mono',
//     subsets: ['latin'],
// });

export const metadata: Metadata = {
    title: '股票分析',
    description: '股票分析',
};

interface Props {
    children: ReactNode;
}

export default function RootLayout({children}: Props) {
    return (
        <html lang="en">
            <body>
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    );
}
