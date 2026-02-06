import Header from "@/components/main/Header"
import Footer from "@/components/main/Footer"
import BackToTop from "@/components/main/BackToTop"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="grow min-h-screen">
                {children}
            </main>
            <Footer />
            <BackToTop />
        </>
    )
}