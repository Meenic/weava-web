import { Footer } from "@/components/navigation/footer";
import { Header } from "@/components/navigation/header";

export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
