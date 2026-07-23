import { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import ControlPane from "./ControlPane";

interface WardSearchProps {
  /** Returns true if a matching ward was found and focused. */
  onSearch: (query: string) => boolean;
}

/**
 * Search wards by name. Uses the ward layer's own data (no external geocoder),
 * so it works offline and matches the study's own boundaries.
 */
export default function WardSearch({ onSearch }: WardSearchProps) {
  const [q, setQ] = useState("");
  const [notFound, setNotFound] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    const ok = onSearch(q);
    setNotFound(!ok);
  };

  return (
    <ControlPane className="left-1/2 top-3 -translate-x-1/2">
      <form onSubmit={submit} className="glass flex items-center gap-2 rounded-xl px-3 py-2">
        <MdSearch size={18} className="text-ink-muted" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setNotFound(false);
          }}
          placeholder="Search ward"
          className="w-32 bg-transparent text-sm text-ink-primary placeholder:text-ink-faint focus:outline-none sm:w-44"
          aria-label="Search ward by name"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setNotFound(false);
            }}
            className="text-ink-faint hover:text-ink-primary"
            aria-label="Clear search"
          >
            <MdClose size={16} />
          </button>
        )}
        {notFound && <span className="font-mono text-[10px] text-stress-high">no match</span>}
      </form>
    </ControlPane>
  );
}
