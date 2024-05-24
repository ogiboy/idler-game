import './globals.css'

export const metadata = {
  title: 'İşletmecii',
  description: 'An Idler Game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
