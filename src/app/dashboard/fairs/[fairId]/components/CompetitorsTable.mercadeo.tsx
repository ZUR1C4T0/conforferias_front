import {
  MapPin,
  Package,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { secureFetch } from "@/lib/axios";

export async function CompetitorsTableMercadeo({ fairId }: { fairId: string }) {
  const competitors = await secureFetch<Competitor[]>({
    url: `/fairs/${fairId}/competitors`,
    method: "GET",
  });

  return (
    <ItemGroup>
      {competitors.map((competitor, index) => (
        <Fragment key={competitor.id}>
          <Item>
            <ItemContent>
              <p className="-mb-1 flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="inline-block size-3" />
                {competitor.city && `${competitor.city}, `}
                {competitor.country}
              </p>
              <ItemTitle className="text-lg">{competitor.company}</ItemTitle>
              <ItemDescription className="py-1">
                <strong className="inline-flex items-center gap-1">
                  <Package className="inline-block size-3" /> Productos
                  destacados:{" "}
                </strong>
                <br />
                {/*<Package className="inline-block size-4" />{" "}*/}
                {competitor.featuredProducts}
              </ItemDescription>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1 rounded-md bg-emerald-500/10 p-3">
                  <span className="flex items-center gap-1 font-semibold text-emerald-600 text-xs">
                    <TrendingUp className="size-3" />
                    Fortalezas
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {competitor.strengths}
                  </p>
                </div>

                <div className="flex flex-col gap-1 rounded-md bg-rose-500/10 p-3">
                  <span className="flex items-center gap-1 font-semibold text-rose-600 text-xs">
                    <TrendingDown className="size-3" />
                    Debilidades
                  </span>
                  <p className="text-muted-foreground text-sm">
                    {competitor.weaknesses}
                  </p>
                </div>
              </div>
            </ItemContent>
          </Item>

          {index < competitors.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
