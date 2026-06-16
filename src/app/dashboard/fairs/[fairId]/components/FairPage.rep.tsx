import {
  Building2,
  Grid2X2,
  Lightbulb,
  Plus,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AchievementsTable from "./AchievementsTable";
import CompetitorsTable from "./CompetitorsTable";
import ContactsTable from "./ContactsTable";
import DAFOTable from "./DAFOTable";
import EvaluateFair from "./EvaluateFair";
import ImprovementAreasTable from "./ImprovementAreasTable";
import TrendsTable from "./TrendsTable";

export default function FairPageRep({ fair }: { fair: Fair }) {
  return (
    <div className="flex flex-col gap-6">
      {/* --- Contactos --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Users className="inline" /> Contactos
          </CardTitle>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/contacts/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[60dvh] overflow-y-auto">
          <ContactsTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- Competidores --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Building2 /> Competidores
          </CardTitle>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/competitors/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[60dvh] overflow-y-auto">
          <CompetitorsTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- DAFO --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Grid2X2 /> DAFO
          </CardTitle>
          <CardDescription>
            DAFO de la marca Confortfresh en el evento
          </CardDescription>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/dafo/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <DAFOTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- Logros --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Trophy /> Principales logros
          </CardTitle>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/achievements/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[60dvh] overflow-y-auto">
          <AchievementsTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- Areas de mejora --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Lightbulb /> Areas de mejora
          </CardTitle>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/improvement-areas/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[60dvh] overflow-y-auto">
          <ImprovementAreasTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- Tendencias --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <TrendingUp /> Tendencias observadas
          </CardTitle>
          <CardAction>
            <Button size="sm" asChild>
              <Link href={`./${fair.id}/trends/create`}>
                <Plus data-icon="inline-start" /> Crear
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="no-scrollbar max-h-[60dvh] overflow-y-auto">
          <TrendsTable fairId={fair.id} />
        </CardContent>
      </Card>

      {/* --- Valoración --- */}
      <Card>
        <CardHeader>
          <CardTitle className="my-auto flex items-center gap-1 text-lg">
            <Star /> Valoración general de la feria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EvaluateFair fairId={fair.id} />
        </CardContent>
      </Card>
    </div>
  );
}
