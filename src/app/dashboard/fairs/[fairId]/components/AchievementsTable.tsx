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
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          {achievements.map((achievement) => (
            <tr key={achievement.id}>
              <td>{achievement.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
