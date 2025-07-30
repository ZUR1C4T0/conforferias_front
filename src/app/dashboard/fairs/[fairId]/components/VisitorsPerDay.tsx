export default function VisitorsPerDay() {
  const dailyVisitors = {
    labels: ["Lun 21", "Mar 22", "Mié 23", "Jue 24"],
    data: [20, 48, 10, 3],
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 font-semibold text-xl">Visitantes por Día</h2>
      <div className="h-64">
        {/* Gráfico de barras - usar una librería como Chart.js en producción */}
        <div className="mt-4 flex h-48 items-end space-x-2">
          {dailyVisitors.data.map((value, idx) => (
            <div
              key={`${idx}-${value}`}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div
                className="w-full rounded-t bg-blue-500 transition hover:bg-blue-600"
                style={{
                  height: `${(value / Math.max(...dailyVisitors.data)) * 100}%`,
                }}
              ></div>
              <span className="mt-1 text-xs">{dailyVisitors.labels[idx]}</span>
              <span className="font-bold text-xs">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
