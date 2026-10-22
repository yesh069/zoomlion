// Shared button styles.
const btn =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 font-display text-[1.05rem] font-bold uppercase tracking-wide transition-colors duration-150 disabled:opacity-60";

export const btnPrimary = `${btn} bg-lime text-ink hover:bg-lime-bright`;
export const btnDark = `${btn} bg-graphite text-white hover:bg-ink`;
export const btnOutlineLight = `${btn} border-2 border-white/40 text-white hover:border-lime hover:text-lime`;
export const btnOutline = `${btn} border-2 border-graphite/25 text-graphite hover:border-graphite`;
