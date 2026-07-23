import { meta } from "@/data/metadata";

/** Minimal footer: project title only. */
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 py-5">
        <p className="text-[13.5px] text-ink-faint">
          {meta.title}: {meta.subtitle}
        </p>
      </div>
    </footer>
  );
}
