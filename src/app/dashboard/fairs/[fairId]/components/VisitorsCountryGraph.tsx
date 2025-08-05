interface Props {
  countries: {
    country: string;
    count: number;
  }[];
}

export function VisitorsCountryGraph({ countries }: Props) {
  return countries.map(({ country, count }) => (
    <div
      key={country}
      className="flex h-full flex-col items-center justify-end"
    >
      <div
        className="w-10 rounded-t bg-primary"
        style={{
          height: `${(count / Math.max(...countries.map(({ count }) => count))) * 100}%`,
        }}
      ></div>
      <span className="mt-1 text-xs">{country}</span>
      <span className="font-medium text-xs">{count}</span>
    </div>
  ));
}
