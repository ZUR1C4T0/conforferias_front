import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { secureFetch } from "@/lib/axios";
import AchievementsTable from "./AchievementsTable";
import { CompetitorsTableMercadeo } from "./CompetitorsTable.mercadeo";
import DAFOTable from "./DAFOTable";
import ImprovementAreasTable from "./ImprovementAreasTable";
import { ProfileVisitorsGraph } from "./ProfileVisitorsGraph";
import { Valoration } from "./Valoration";
import { VisitorsCitiesGraph } from "./VisitorsCitiesGraph";
import { VisitorsCountryGraph } from "./VisitorsCountryGraph";

interface ApiResponse {
  visitors: {
    total: number;
    national: number;
    international: number;
    countries: {
      country: string;
      count: number;
    }[];
    cities: {
      city: string;
      count: number;
    }[];
    profiles: {
      id: string;
      name: string;
      contacts: number;
    }[];
  };
}

export default async function FairPageMercadeo({ fair }: { fair: Fair }) {
  const { visitors } = await secureFetch<ApiResponse>({
    url: `/fairs/${fair.id}/dashboard`,
    method: "GET",
  });

  return (
    <>
      <ItemGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Item variant="muted">
          <ItemContent className="text-center">
            <ItemDescription>Visitantes Nacionales</ItemDescription>
            <ItemTitle className="w-full justify-center text-4xl">
              {visitors.national}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemContent className="text-center">
            <ItemDescription>Visitantes Internacionales</ItemDescription>
            <ItemTitle className="w-full justify-center text-4xl">
              {visitors.international}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="muted">
          <ItemContent className="text-center">
            <ItemDescription>Total de Visitantes</ItemDescription>
            <ItemTitle className="w-full justify-center text-4xl">
              {visitors.total}
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>

      <ItemGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Países visitantes</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorsCountryGraph countries={visitors.countries} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ciudades visitantes</CardTitle>
          </CardHeader>
          <CardContent>
            <VisitorsCitiesGraph cities={visitors.cities} />
          </CardContent>
        </Card>
      </ItemGroup>

      <Card>
        <CardHeader>
          <CardTitle>Perfil de visitantes</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileVisitorsGraph
            profiles={visitors.profiles}
            total={visitors.total}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competidores</CardTitle>
        </CardHeader>
        <CardContent>
          <CompetitorsTableMercadeo fairId={fair.id} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis DAFO</CardTitle>
        </CardHeader>
        <CardContent>
          <DAFOTable fairId={fair.id} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Principales Logros</CardTitle>
          </CardHeader>
          <CardContent>
            <AchievementsTable fairId={fair.id} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Área de Mejoras</CardTitle>
          </CardHeader>
          <CardContent>
            <ImprovementAreasTable fairId={fair.id} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valoración General de la Participación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Valoration fairId={fair.id} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
