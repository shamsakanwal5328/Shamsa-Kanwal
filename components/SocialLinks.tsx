import { ExternalIcon, MailIcon } from "@/components/Icons";
import { getContactEmail, getSocialLinks } from "@/lib/data";

interface SocialLinksProps {
  includeEmail?: boolean;
  className?: string;
}

/** Lists only the contact methods that are actually filled in within data.json. */
export default function SocialLinks({ includeEmail = true, className = "" }: SocialLinksProps) {
  const email = includeEmail ? getContactEmail() : "";
  const links = getSocialLinks();

  if (!email && links.length === 0) return null;

  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {email && (
        <li>
          <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-secondary underline-offset-4 hover:text-primary hover:underline">
            <MailIcon className="text-lg" />
            {email}
          </a>
        </li>
      )}
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer me"
            className="inline-flex items-center gap-2 text-secondary underline-offset-4 hover:text-primary hover:underline"
          >
            <ExternalIcon className="text-lg" />
            {link.label}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
