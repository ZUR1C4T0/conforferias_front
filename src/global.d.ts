import type { HSComboBox, HSOverlay, IStaticMethods } from "flyonui/flyonui";
import type { ActionStatus, ActivityType, DafoType } from "./lib/constants";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    HSOverlay: typeof HSOverlay;
    HSComboBox: typeof HSComboBox;
  }

  interface NextPageContext {
    params: Promise<{ [key: string]: string }>;
    searchParams: Promise<{ [key: string]: string | string[] }>;
  }

  type Role = "ADMIN" | "MERCADEO" | "REPRESENTANTE";

  interface JwtPayload {
    sub: string;
    role: Role;
  }

  interface Fair {
    id: string;
    name: string;
    logoUrl: string;

    startDate: string;
    endDate: string;
    country: string;
    city: string | null;
    standNumber: string;
    areaM2: number;
    totalInvestment: number | null;
    createdAt: string;
    updatedAt: string;
  }

  type Potential = "BAJO" | "MEDIO" | "ALTO";

  interface Contact {
    id: string;
    name: string;
    company: string;
    profile: { name: string };
    otherProfile: string;
    estimatedPotential: Potential;
  }

  interface Activity {
    id: string;
    fairId: string;
    representativeId: string;
    type: ActivityType;
    description: string;
    attendees: number | null;
    createdAt: string;
    updatedAt: string;
  }

  interface Competitor {
    id: string;
    fairId: string;
    company: string;
    country: string;
    city: string | null;
    createdAt: string;
    updatedAt: string;
    representativeId: string;
    featuredProducts: string;
    strengths: string;
    weaknesses: string;
  }

  interface Trend {
    id: string;
    fairId: string;
    title: string;
    details: string | null;
    createdAt: string;
    updatedAt: string;
  }

  interface DAFO {
    id: string;
    fairId: string;
    representativeId: string;
    type: DafoType;
    description: string;
  }

  interface PostFairAction {
    id: string;
    fairId: string;
    action: string;
    responsibleId: string;
    limitDate: string;
    status: ActionStatus;
    createdAt: string;
    updatedAt: string;
    responsible: {
      id: string;
      fullName: string;
    };
  }
}
