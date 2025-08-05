interface Props {
  cities: {
    city: string;
    count: number;
  }[];
}

export function VisitorsCitiesGraph({ cities }: Props) {
  return cities.map(({ city, count }) => (
    <div key={city} className="flex h-full flex-col items-center justify-end">
      <div
        className="w-10 rounded-t bg-accent"
        style={{
          height: `${(count / Math.max(...cities.map(({ count }) => count))) * 100}%`,
        }}
      ></div>
      <span className="mt-1 text-xs">{city}</span>
      <span className="font-medium text-xs">{count}</span>
    </div>
  ));
}
