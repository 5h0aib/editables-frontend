import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"
import "./globals.css"
import { Montserrat } from "next/font/google" // Import Montserrat font

const montserrat = Montserrat({ subsets: ["latin"] }) // Use Montserrat font

export const metadata = {
  title: "Editable Studios", // Update the title
  description: "We edit your photos", // Update the description
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={montserrat.className}> {/* Apply Montserrat font */}
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
