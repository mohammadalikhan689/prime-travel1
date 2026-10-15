import { flagMarkup } from "@/components/site/flag-markup";

export function Flag({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: flagMarkup[slug] ?? "" }}
    />
  );
}
