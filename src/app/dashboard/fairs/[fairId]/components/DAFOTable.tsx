import { AlertCircle, AlertTriangle, ThumbsUp, Zap } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemSeparator,
} from "@/components/ui/item";
import { secureFetch } from "@/lib/axios";
import { DafoType } from "@/lib/constants";

const typeConfig = {
  [DafoType.DEBILIDAD]: {
    title: "Debilidades",
    icon: AlertCircle,
    color: "text-rose-600",
    bg: "bg-rose-500/10",
  },
  [DafoType.AMENAZA]: {
    title: "Amenazas",
    icon: AlertTriangle,
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
  [DafoType.FORTALEZA]: {
    title: "Fortalezas",
    icon: ThumbsUp,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  [DafoType.OPORTUNIDAD]: {
    title: "Oportunidades",
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
};

export default async function DAFOTable({ fairId }: { fairId: string }) {
  const dafoData = await secureFetch<DAFO[]>({
    url: `/fairs/${fairId}/dafo`,
    method: "GET",
  });

  const groupedDafo = dafoData.reduce(
    (acc, item) => {
      acc[item.type].push(item);
      return acc;
    },
    {
      [DafoType.DEBILIDAD]: [],
      [DafoType.AMENAZA]: [],
      [DafoType.FORTALEZA]: [],
      [DafoType.OPORTUNIDAD]: [],
    } as Record<DafoType, DAFO[]>,
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {(Object.keys(typeConfig) as DafoType[]).map((type) => {
        const { title, icon: Icon, color, bg } = typeConfig[type];
        const items = groupedDafo[type];
        return (
          <Card key={type} className="gap-2 overflow-hidden p-0">
            <CardHeader className={`${bg} px-4 py-3`}>
              <CardTitle className={`flex items-center gap-2 ${color}`}>
                <Icon className="size-4" />
                {title}
              </CardTitle>
              <CardAction className="text-muted-foreground text-xs">
                {items.length} {items.length === 1 ? "entrada" : "entradas"}
              </CardAction>
            </CardHeader>
            <CardContent className="p-0">
              <ItemGroup>
                {items.map((item, index) => (
                  <Fragment key={item.id}>
                    <Item className="">
                      <ItemContent>
                        <p className="whitespace-pre-line">
                          {item.description}
                        </p>
                      </ItemContent>
                    </Item>
                    {index < items.length - 1 && <ItemSeparator />}
                  </Fragment>
                ))}
              </ItemGroup>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
