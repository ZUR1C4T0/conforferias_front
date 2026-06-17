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
  BAJA = "BAJA",
  MEDIO = "MEDIO",
  ALTA = "ALTA",
  SUPERIOR = "SUPERIOR",
}

export const AmountLabels = {
  [Amount.BAJA]: "De 1 a 7 millones",
  [Amount.MEDIO]: "De 7 a 20 millones",
  [Amount.ALTA]: "De 20 a 50 millones",
  [Amount.SUPERIOR]: "Más de 50 millones",
};
