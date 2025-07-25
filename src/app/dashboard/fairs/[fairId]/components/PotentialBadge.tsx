export function PotentialBadge({
  potential,
}: {
  potential: Potential | string;
}) {
  let classes: string;
  switch (potential) {
    case "BAJO":
      classes = "badge badge-error text-xs";
      break;
    case "MEDIO":
      classes = "badge badge-warning text-xs";
      break;
    case "ALTO":
      classes = "badge badge-success text-xs";
      break;
    default:
      classes = "badge badge-accent text-xs";
      break;
  }

  return <span className={classes}>{potential}</span>;
}
