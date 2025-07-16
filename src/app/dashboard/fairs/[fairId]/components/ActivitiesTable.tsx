import { secureFetch } from "@/lib/axios";

export default async function ActivitiesTable({ fairId }: { fairId: string }) {
  const activities = await secureFetch<Activity[]>({
    url: `/fairs/${fairId}/activities`,
    method: "GET",
  });

  return (
    <table className="table">
      <tbody>
        {activities.length === 0 && (
          <tr>
            <td colSpan={2} className="text-center">
              No hay actividades registradas
            </td>
          </tr>
        )}

        {activities.map((activity) => (
          <tr key={activity.id}>
            <td className="space-y-2">
              <div>
                <span className="badge badge-primary badge-sm rounded-full">
                  {activity.type}
                </span>
              </div>
              <p className="text-base">{activity.description}</p>
              {activity.attendees && (
                <p className="text-primary text-sm">
                  Personas que asistieron: {activity.attendees}
                </p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
