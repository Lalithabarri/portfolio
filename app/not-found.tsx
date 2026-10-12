import Link from "next/link";
import { DriedSprig } from "@/components/botanicals";

export default function NotFound() {
  return (
    <div className="site-container flex flex-col items-center py-24 text-center">
      <DriedSprig seed={8} className="h-44 w-auto" />
      <p className="eyebrow mt-6">Page not found</p>
      <h1 className="mt-3 font-serif text-4xl font-medium text-navy">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-muted">The link may be out of date. Everything on the site starts from the homepage.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
