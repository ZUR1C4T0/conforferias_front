/** biome-ignore-all lint/nursery/useSortedClasses: TODO */
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: TODO */
import VisitorsPerDay from "./VisitorsPerDay";

const countriesData = {
  labels: ["México", "Colombia", "Perú", "Chile", "EE.UU.", "Otros"],
  data: [45, 30, 15, 5, 3, 2],
};

const visitorProfile = {
  labels: ["Ejecutivos", "Técnicos", "Compras", "Marketing", "Otros"],
  data: [40, 25, 20, 10, 5],
};

const activities = [
  "Compra de producto",
  "Demo en vivo",
  "Contacto con distribuidor",
];

export default function FairPageMercadeo({ fair }: { fair: Fair }) {
  console.log(fair);
  return (
    <>
      {/* Primera fila de métricas */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Visitantes por día */}
        <VisitorsPerDay />

        {/* Países visitantes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Países Visitantes</h2>
          <div className="h-64">
            <div className="flex items-end h-48 space-x-2 mt-4">
              {countriesData.data.map((value, idx) => (
                <div
                  key={`${idx}-${value}`}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className="w-full bg-green-500 rounded-t hover:bg-green-600 transition"
                    style={{
                      height: `${(value / Math.max(...countriesData.data)) * 100}%`,
                    }}
                  ></div>
                  <span className="text-xs mt-1">
                    {countriesData.labels[idx]}
                  </span>
                  <span className="text-xs font-medium">{value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Perfil de visitantes */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Perfil de Visitantes</h2>
          <div className="space-y-2 mt-4">
            {visitorProfile.data.map((value, idx) => (
              <div key={`${idx}-${value}`} className="flex items-center">
                <span className="w-24 text-sm">
                  {visitorProfile.labels[idx]}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium w-10">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Segunda fila de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Visitantes internacionales */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-2">
            Visitantes Internacionales
          </h2>
          <p className="text-4xl font-bold text-blue-600">78</p>
        </div>

        {/* Contactos comerciales */}
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-2">Contactos Comerciales</h2>
          <p className="text-4xl font-bold text-green-600">0</p>
        </div>

        {/* Valor estimado */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Valor Estimado (USD)</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Oportunidades Nacionales</p>
              <p className="text-2xl font-bold">$125,000</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Oportunidades Internacionales
              </p>
              <p className="text-2xl font-bold">$85,500</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tercera fila - tablas y listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Competidores */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Principales Competidores
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Empresa
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Stand
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Observaciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm">Competidor A</td>
                  <td className="px-4 py-2 text-sm">B23</td>
                  <td className="px-4 py-2 text-sm">Nuevo producto X</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Competidor B</td>
                  <td className="px-4 py-2 text-sm">A12</td>
                  <td className="px-4 py-2 text-sm">Gran afluencia</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm">Competidor C</td>
                  <td className="px-4 py-2 text-sm">C07</td>
                  <td className="px-4 py-2 text-sm">Pocos visitantes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tendencias */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Tendencias e Innovaciones
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-sm">Mayor enfoque en soluciones IoT</li>
            <li className="text-sm">Demanda creciente de integración cloud</li>
            <li className="text-sm">Nuevos materiales sustentables</li>
            <li className="text-sm">Automatización de procesos</li>
            <li className="text-sm">Realidad aumentada para demostraciones</li>
          </ul>
        </div>
      </div>

      {/* Cuarta fila - DAFO y actividades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DAFO */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Análisis DAFO</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-200 p-3 rounded bg-green-50">
              <h3 className="font-medium text-green-800 mb-2">Fortalezas</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Producto mejor evaluado</li>
                <li>Stand estratégico</li>
                <li>Equipo comercial experto</li>
              </ul>
            </div>
            <div className="border border-red-200 p-3 rounded bg-red-50">
              <h3 className="font-medium text-red-800 mb-2">Debilidades</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Material promocional limitado</li>
                <li>Falta de demos en vivo</li>
              </ul>
            </div>
            <div className="border border-blue-200 p-3 rounded bg-blue-50">
              <h3 className="font-medium text-blue-800 mb-2">Oportunidades</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Contactos con distribuidores nuevos</li>
                <li>Interés en línea de productos premium</li>
              </ul>
            </div>
            <div className="border border-yellow-200 p-3 rounded bg-yellow-50">
              <h3 className="font-medium text-yellow-800 mb-2">Amenazas</h3>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Competidor con precios agresivos</li>
                <li>Posible escasez de componentes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actividades */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Actividades Realizadas</h2>
          <ul className="mb-4 space-y-2">
            {activities.map((activity, idx) => (
              <li
                key={`${idx}-${activity}`}
                className="text-sm p-2 bg-gray-50 rounded"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quinta fila - Evaluación y conclusiones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Valoración general */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Valoración General de la Participación
          </h2>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4f46e5" // Color azul de Tailwind
                  strokeWidth="3"
                  strokeDasharray="80, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">8.2</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Excelente participación con alto tráfico en el stand, aunque se
              pudo mejorar en la captación de contactos internacionales. La
              ubicación fue estratégica y el material promocional bien recibido.
            </p>
          </div>
        </div>

        {/* Principales logros */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Principales Logros</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-green-100 text-green-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Superamos en 25% la meta de contactos comerciales establecida
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-green-100 text-green-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Presentación exitosa del nuevo producto X con 15 prospectos
                calificados
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-green-100 text-green-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Firmamos 3 cartas de intención con distribuidores potenciales
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-green-100 text-green-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Nuestro stand fue destacado como uno de los más innovadores por
                los organizadores
              </span>
            </li>
          </ul>
        </div>

        {/* Áreas de mejora */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Áreas de Mejora</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-yellow-100 text-yellow-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Falta de material promocional en otros idiomas para visitantes
                internacionales
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-yellow-100 text-yellow-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Horarios de atención poco claros que causaron confusión en
                algunos visitantes
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-yellow-100 text-yellow-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Demostraciones técnicas muy largas que generaron cuellos de
                botella
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 bg-yellow-100 text-yellow-800 p-1 rounded-full mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="text-sm">
                Falta de seguimiento inmediato a los contactos captados durante
                el evento
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
