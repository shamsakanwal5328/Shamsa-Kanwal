import Button from "@/components/Button";
import { DownloadIcon } from "@/components/Icons";

interface DownloadButtonProps {
  href: string;
  fileName: string;
  label?: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function DownloadButton({
  href,
  fileName,
  label = "Download CV",
  variant = "primary",
  className,
}: DownloadButtonProps) {
  return (
    <Button href={href} download={fileName} variant={variant} className={className}>
      <DownloadIcon className="text-lg" />
      {label}
      <span className="sr-only">(PDF)</span>
    </Button>
  );
}
