import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}
interface LinkProps extends BaseProps { to: string; href?: never; onClick?: never; }
interface AnchorProps extends BaseProps { href: string; download?: boolean; to?: never; onClick?: never; }
interface ButtonProps extends BaseProps { onClick: () => void; to?: never; href?: never; }
type Props = LinkProps | AnchorProps | ButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none";
const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-primary to-accent-deep text-abyss font-semibold hover:shadow-glow-primary hover:brightness-110",
  ghost: "border border-hairline text-ink-primary hover:border-primary/50 hover:bg-white/5",
};

/** Polymorphic button: renders as router Link, anchor, or button. */
export default function Button(props: Props) {
  const { children, variant = "primary", className = "", icon } = props;
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {icon}
      {children}
    </>
  );
  if ("to" in props && props.to) return <Link to={props.to} className={cls}>{inner}</Link>;
  if ("href" in props && props.href)
    return (
      <a
        href={props.href}
        className={cls}
        download={(props as AnchorProps).download}
        target="_blank"
        rel="noreferrer"
      >
        {inner}
      </a>
    );
  return <button onClick={(props as ButtonProps).onClick} className={cls}>{inner}</button>;
}
