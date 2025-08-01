export enum ActivityType {
  CHARLA_TECNICA = "CHARLA_TECNICA",
  RUEDA_DE_NEGOCIOS = "RUEDA_DE_NEGOCIOS",
  OTRO = "OTRO",
}

export enum DafoType {
  DEBILIDAD = "DEBILIDAD",
  AMENAZA = "AMENAZA",
  FORTALEZA = "FORTALEZA",
  OPORTUNIDAD = "OPORTUNIDAD",
}

export enum ActionStatus {
  PENDIENTE = "PENDIENTE",
  EN_PROGRESO = "EN_PROGRESO",
  COMPLETADA = "COMPLETADA",
  CANCELADA = "CANCELADA",
}

export enum Potential {
  BAJO = "BAJO",
  MEDIO = "MEDIO",
  ALTO = "ALTO",
}

export enum Amount {
  BAJO = "BAJO",
  MEDIO = "MEDIO",
  ALTO = "ALTO",
  SUPERIOR = "SUPERIOR",
}

export const AmountLabels = {
  [Amount.BAJO]: "1-7 millones",
  [Amount.MEDIO]: "7-20 millones",
  [Amount.ALTO]: "20-50 millones",
  [Amount.SUPERIOR]: "+50 millones",
};
