import Header from "@/components/main/Header"

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
        </>
    )
}