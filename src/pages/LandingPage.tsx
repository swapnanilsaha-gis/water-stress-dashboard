import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineFileDownload, MdArrowForward } from "react-icons/md";
import { TbDropletFilled } from "react-icons/tb";
import { meta, abstractShort } from "@/data/metadata";
import { heroCtas } from "@/data/navigation";
import Button from "@/components/ui/Button";

/**
 * Public entry point. A water-themed hero carrying the project title, a short
 * abstract and the primary calls to action. Fully responsive.
 */
export default function LandingPage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* --- Ambient animated background (the page's signature) --- */}
      <div className="pointer-events-none absolute inset-0 bg-hero-radial" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:44px_44px] opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 animate-drift rounded-full bg-secondary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-96 w-96 animate-drift rounded-full bg-accent-deep/20 blur-3xl [animation-delay:-4s]" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-16">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent-deep text-abyss shadow-glow-primary">
            <TbDropletFilled size={24} />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-display-lg font-bold text-ink-primary"
        >
          Predictive Urban <span className="text-gradient">Water Stress</span> Mapping In Bengaluru
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-3 max-w-3xl font-display text-lg text-ink-muted"
        >
          &amp; Decentralized Infrastructure Siting, {meta.subtitle}
        </motion.p>

        {/* Abstract */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted"
        >
          {abstractShort}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {heroCtas.map((cta) =>
            cta.primary ? (
              <Button key={cta.path} to={cta.path} icon={<MdArrowForward size={18} />}>
                {cta.label}
              </Button>
            ) : (
              <Button key={cta.path} to={cta.path} variant="ghost">
                {cta.label}
              </Button>
            )
          )}
          <Button href={meta.dissertationPdf} download variant="ghost" icon={<MdOutlineFileDownload size={18} />}>
            Download Dissertation
          </Button>
        </motion.div>

        {/* Skip link to dashboard for keyboard users */}
        <Link to="/home" className="sr-only focus:not-sr-only focus:mt-6 focus:inline-block focus:text-primary">
          Skip to dashboard
        </Link>
      </div>
    </div>
  );
}
