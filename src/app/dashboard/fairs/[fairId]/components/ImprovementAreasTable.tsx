import { AlertTriangle } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { secureFetch } from "@/lib/axios";

export default async function ImprovementAreasTable({
  fairId,
}: {
  fairId: string;
}) {
  const improvementAreas = await secureFetch<ImprovementArea[]>({
    url: `/fairs/${fairId}/improvements`,
    method: "GET",
  });

  return (
    <ItemGroup>
      {improvementAreas.map((improvementArea, index) => (
        <Fragment key={improvementArea.id}>
          <Item size="sm">
            <ItemMedia>
              <AlertTriangle className="size-3" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{improvementArea.content}</ItemTitle>
              <ItemDescription></ItemDescription>
            </ItemContent>
          </Item>
          {index !== improvementAreas.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
