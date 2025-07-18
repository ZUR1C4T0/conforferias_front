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
        <li key={achievement.id} className="p-4 hover:bg-base-100">
          <p className="whitespace-pre-line text-sm">{achievement.content}</p>
        </li>
      ))}
    </ul>
  );
}
