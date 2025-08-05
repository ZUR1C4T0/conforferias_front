import { Icon } from "@iconify/react";
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
    <ul className="divide-y divide-base-200">
      {achievements.map((achievement) => (
        <li
          key={achievement.id}
          className="flex items-start p-2 hover:bg-base-100"
        >
          <span className="mr-3 shrink-0 rounded-full bg-success p-1 text-success-content">
            <Icon icon="tabler:check" className="size-3" />
          </span>
          <p className="whitespace-pre-line text-sm">{achievement.content}</p>
        </li>
      ))}
    </ul>
  );
}
