import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StudySidebar } from "@/components/StudySidebar";

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-10 md:pt-16 pb-24">
        <div className="flex gap-12">
          <StudySidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
