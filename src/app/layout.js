import './globals.css'

import { Roboto_Mono } from 'next/font/google'

const roboto = Roboto_Mono({ subsets: ['latin'] })

export const metadata = {
  title: 'İşletmecii',
  description: 'An Idler Game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
