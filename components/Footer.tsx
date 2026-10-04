import Link from "next/link";
import Container from "@/components/Container";
import SocialLinks from "@/components/SocialLinks";
import { data } from "@/lib/data";
import { NAV_LINKS } from "@/lib/navigation";

export default function Footer() {
  const { personal, site, education } = data;
  const degree = education[0];

  return (
    <footer className="print-hidden mt-auto border-t border-border bg-primary text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-xl font-semibold">{personal.name}</p>
          <p className="mt-2 max-w-sm text-white/85">
            {degree.degree}, {degree.institution}
          </p>
          <p className="mt-4 text-sm text-white/75">Last updated {site.lastUpdated}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-white">Pages</h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-white/85 underline-offset-4 hover:text-white hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="[&_a]:text-white/90 [&_a:hover]:text-white">
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-white">Contact</h2>
          <SocialLinks />
          <Link href="/contact" className="mt-3 inline-block text-white/90 underline underline-offset-4 hover:text-white">
            Contact page
          </Link>
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="py-5 text-sm text-white/75">
          © {new Date().getFullYear()} {personal.name}
        </Container>
      </div>
    </footer>
  );
}
