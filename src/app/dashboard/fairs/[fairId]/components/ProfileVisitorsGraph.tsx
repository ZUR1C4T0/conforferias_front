interface Props {
  profiles: {
    id: string;
    name: string;
    contacts: number;
  }[];
  total: number;
}

export function ProfileVisitorsGraph({ profiles, total }: Props) {
  return profiles.map(({ id, name, contacts }) => {
    return (
      <div key={id} className="flex items-center gap-x-2">
        <span className="w-28 truncate text-sm sm:w-40 xl:w-60">{name}</span>
        <div className="h-4 flex-1 rounded-full bg-gray-200">
          <div
            className="h-4 rounded-full bg-info"
            style={{ width: `${(contacts / total) * 100}%` }}
          ></div>
        </div>
        <span className="ml-2 w-10 font-medium text-sm">
          {((contacts / total) * 100).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
          %
        </span>
      </div>
    );
  });
}
