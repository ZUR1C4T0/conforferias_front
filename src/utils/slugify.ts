export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // normalizar
    .replace(/[\u0300-\u036f]/g, "") // eliminar acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // reemplazar espacios por guiones
    .replace(/[^\w-]+/g, "") // eliminar caracteres no alfanuméricos
    .replace(/--+/g, "-"); // eliminar dobles guiones
}
