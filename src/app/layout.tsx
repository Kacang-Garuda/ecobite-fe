import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/elements/Navbar'
import { AuthProvider } from '../modules/AuthenticationModule/context/Authentication'
import Footer from '../components/elements/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: "Ecobite",
  icons: {
    icon: '/images/EcoBite.ico'
  },
  description: "From Spare, to Share",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} ${poppins.className}`}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  )
}
