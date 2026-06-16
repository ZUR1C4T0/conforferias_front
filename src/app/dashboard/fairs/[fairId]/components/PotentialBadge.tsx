import { Badge } from "@/components/ui/badge";

export function PotentialBadge({
  potential,
}: {
  potential: Potential | string;
}) {
  let classes: string;
  switch (potential) {
    case "BAJO":
      classes = "bg-red-500 text-white";
      break;
    case "MEDIO":
      classes = "bg-yellow-500 text-white";
      break;
    case "ALTO":
      classes = "bg-green-500 text-white";
      break;
    default:
      classes = "bg-gray-500 text-white";
      break;
  }

  return <Badge className={`text-xs ${classes}`}>{potential}</Badge>;
}
