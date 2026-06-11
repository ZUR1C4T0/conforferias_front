import { Award } from "lucide-react";
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

export default async function AchievementsTable({
  fairId,
}: {
  fairId: string;
}) {
  const achievements = await secureFetch<Achievement[]>({
    url: `/fairs/${fairId}/achievements`,
    method: "GET",
  });

  return (
    <ItemGroup>
      {achievements.map((achievement, index) => (
        <Fragment key={achievement.id}>
          <Item size="sm">
            <ItemMedia>
              <Award className="size-3" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{achievement.content}</ItemTitle>
              <ItemDescription></ItemDescription>
            </ItemContent>
          </Item>
          {index !== achievements.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
