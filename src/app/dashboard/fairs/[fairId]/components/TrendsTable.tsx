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

export default async function TrendsTable({ fairId }: { fairId: string }) {
  const trends = await secureFetch<Trend[]>({
    url: `/fairs/${fairId}/tendencies`,
    method: "GET",
  });

  return (
    <ItemGroup>
      {trends.map((trend, index) => (
        <Fragment key={trend.id}>
          <Item size="sm">
            <ItemContent>
              <ItemTitle>{trend.title}</ItemTitle>
              {trend.details && (
                <ItemDescription className="text-wrap">
                  {trend.details}
                </ItemDescription>
              )}
            </ItemContent>
          </Item>
          {index !== trends.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
