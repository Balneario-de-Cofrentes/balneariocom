import { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { CTA } from "@/components/sections/CTA";
import { MapPin, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Quienes Somos",
  description:
    "Somos la clinica de longevidad mas grande de Europa. Contamos con protocolos de tratamientos avanzados para el dolor musculo-esqueletico y longevidad saludable.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-navy pb-16 pt-32">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: "url('/images/about-equipo-medico.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-navy/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Quienes somos
          </span>
          <h1 className="max-w-4xl font-display text-5xl text-white lg:text-6xl xl:text-7xl">
            Quienes somos
          </h1>
        </div>
      </section>

      {/* Intro */}
      <Section bg="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl text-charcoal lg:text-4xl">
            Somos una empresa familiar valenciana con 100% capital familiar.
          </h2>
          <p className="mt-6 text-lg font-body font-light leading-relaxed text-warm-gray">
            Desde 1989 reinvertimos el 100% de los beneficios en mas edificios, instalaciones, maquinaria, y tecnologia para la longevidad.
          </p>
        </div>
      </Section>

      {/* Mission */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl grid gap-16 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Nuestra Mision
            </span>
            <p className="text-base font-body font-light leading-relaxed text-warm-gray">
              Que las personas puedan vivir hasta los 120 anos con toda su vitalidad. Esto es lo que deseamos para cada miembro de nuestra familia y es lo que deseamos tambien para nuestros pacientes.
            </p>
            <p className="mt-4 text-base font-body font-light leading-relaxed text-warm-gray">
              Al pertenecer el 100% del capital a la familia nos permite tomar decisiones de valor orientadas al paciente y a cumplir nuestra mision sin depender de terceros.
            </p>
          </div>
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Nuestra Investigacion en Longevidad
            </span>
            <p className="text-base font-body font-light leading-relaxed text-warm-gray">
              Nuestro equipo lleva anos participando en proyectos de investigacion orientados a la optimizacion de la longevidad de personas mayores y en particular los efectos de estancias intensivas-inmersivas de 10-30 dias para distintas patologias de cara a usar esos resultados para crear mejores servicios para nuestros clientes.
            </p>
            <p className="mt-4 text-base font-body font-light leading-relaxed text-warm-gray">
              Los primeros anos participamos como colaboradores de otros grupos investigadores, pero en los ultimos anos nuestra experiencia investigadora ya nos ha permitido liderar proyectos de investigacion con financiacion publica nacional y Europea, como nuestro proyecto Salud 6P financiado por Misiones CDTI 2024 con mas de 2 millones de euros, la punta de lanza de la investigacion publica en Espana y una de las mas competitivas.
            </p>
          </div>
        </div>
      </Section>

      {/* Family / Founders */}
      <Section bg="cream">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            La familia fundadora
          </span>
          <div className="space-y-6 text-base font-body font-light leading-relaxed text-warm-gray">
            <p>
              La empresa fue fundada por Miguel Angel Fernandez, medico especializado en medicina integrativa, que tras trabajar en diversas clinicas entendio que en ninguna se trataban las bases de la enfermedad sino solo sus sintomas, y que por ello necesitaba crear su propia practica. En 1989 consiguio la licitacion del Balneario de Cofrentes, que en aquella epoca estaba en ruinas, y decidio que para cumplir con su mision debia ser un balneario medicalizado como los de Francia y Alemania, y no solo un spa. Tras anos de reinversion podemos decir que hoy estamos por encima de cualquier balneario frances o aleman, no en instalaciones hoteleras de lujo pero si en tratamientos y medicalizacion.
            </p>
            <p>
              La segunda generacion de la familia aposto por llevar la medicalizacion a la longevidad para ayudar a las personas mayores a vivir mejor y mas anos con mas educacion y prevencion. Hoy Clara Fernandez es directora general mientras que Miguel Angel es presidente y director medico.
            </p>
            <p>
              Los de la tercera generacion tienen ahora menos de 6 anos, pero esperamos estar dando servicio mucho mucho tiempo para ver que ideas y proyectos aportan cuando sean mayores, y compartirlo con todos vosotros.
            </p>
            <p className="text-sm text-stone">
              La familia organiza su actividad filantropica a traves de la Fundacion MAFT para la Longevidad.
            </p>
          </div>
        </div>
      </Section>

      {/* Leadership */}
      <Section bg="white">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Clara */}
          <div className="flex flex-col rounded-2xl bg-cream overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/about-longevity-conference.jpg"
                alt="Clara Fernandez en la Longevity State Conference"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-charcoal">Clara Fernandez</h3>
              <p className="mt-1 text-sm font-body text-navy-light">Directora General</p>
              <p className="mt-3 text-sm font-body font-light text-warm-gray">
                MBA Chicago y Master Health Innovation Harvard y 10 anos liderando el Balneario.
              </p>
            </div>
          </div>
          {/* Miguel Angel */}
          <div className="flex flex-col rounded-2xl bg-cream overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/dr-miguel-angel-portrait.jpg"
                alt="Dr. Miguel Angel Fernandez"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8">
              <h3 className="font-display text-2xl text-charcoal">Miguel Angel Fernandez</h3>
              <p className="mt-1 text-sm font-body text-navy-light">Director Medico</p>
              <p className="mt-3 text-sm font-body font-light text-warm-gray">
                40 anos liderando la medicina de la longevidad en Espana. Autor de &quot;Las 10 claves para una Longevidad Saludable&quot;.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Stats bar */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 lg:grid-cols-4 lg:px-10">
          {[
            { value: "150.000", label: "pernoctaciones al ano" },
            { value: "15.000+", label: "pacientes al ano" },
            { value: "2M m\u00B2", label: "de terreno en bosque" },
            { value: "80+", label: "edificios" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <span className="block font-display text-4xl text-white lg:text-5xl">{s.value}</span>
              <span className="mt-2 block text-sm font-body text-white/50">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Clara quote */}
      <Section bg="cream">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-2xl leading-relaxed text-charcoal lg:text-3xl">
            &ldquo;Decidimos cambiar el modelo de un balneario tradicional y apostar por la longevidad desde antes de que la gente supiera lo que significaba. Cuando yo decia &lsquo;longevidad&rsquo; la gente pensaba que hablaba de Botox y cremas. Ahora la gente empieza a entenderlo, el concepto esta calando en la sociedad, y por suerte llevamos anos de ventaja a nuestros competidores en cuanto a metodologia, investigacion y protocolos.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm font-body text-stone">
            Clara Fernandez durante la Longevity State Conference de San Francisco 2025
          </p>
        </div>
      </Section>

      {/* Team */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Nuestro Equipo
          </span>
          <p className="text-base font-body font-light leading-relaxed text-warm-gray">
            En nuestra clinica trabajan mas de 300 personas, incluyendo 50 personas de personal sanitario, 12 medicos con distintas especialidades, asi como 3 ingenieros de telecomunicacion y biomedicos con especializacion de Inteligencia Artificial y analisis de datos para crear tecnologias que le lleguen al paciente en forma de mejores analisis, prediccion de respuesta y progreso a distintos tratamientos intensivos. Esta apuesta por la tecnologia es algo que no solo no existe en Espana, sino que no existe en ningun balneario del mundo.
          </p>
        </div>
      </Section>

      {/* Experience */}
      <Section bg="cream">
        <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Nuestra experiencia y servicios
            </span>
            <div className="space-y-4 text-base font-body font-light leading-relaxed text-warm-gray">
              <p>
                Llevamos mas de 35 anos operando y 15 anos en el campo de la longevidad (antes incluso de que la gente lo llamase longevidad). Eso nos ha ayudado a participar activamente y estar cerca de todos los circulos mas avanzados de la investigacion en la longevidad como LBF, Harvard, o el Buck Institute.
              </p>
              <p>
                Esto nos ha llevado a relacionarnos con las empresas de biotecnologia mas avanzadas del mundo con las que colaboramos para llevar sus diagnosticos o tratamientos a nuestros pacientes, o para investigar nuevos protocolos en nuestra especialidad y nuestro valor anadido que son las estancias intensivas inmersivas de larga duracion.
              </p>
              <p>
                Asi traemos a nuestra clinica todos los avances, tratamientos y diagnosticos demostrados cientificamente, y los llevamos al publico general a la mayor escala posible para ofrecer precios accesibles para servicios que a dia de hoy solo estan disponibles para los super ricos en clinicas de lujo.
              </p>
            </div>
          </div>
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Nuestra ventaja competitiva
            </span>
            <div className="space-y-4 text-base font-body font-light leading-relaxed text-warm-gray">
              <p>
                Nuestra ventaja competitiva radica en algo tan sencillo como las economias de escala. La mayoria de las clinicas de longevidad del mundo se dedican al lujo con ocupaciones muy bajas y mucha facturacion por cliente (como hacen las clinicas de Suiza en torno a 20.000 euros por semana). Nosotros podemos ofrecer servicios similares o mejores a una fraccion de ese precio, como la medicina regenerativa con celulas madre o la plasmaferesis, porque podemos dar servicio a miles de pacientes cada ano, en vez de a unos pocos.
              </p>
              <p>
                En lo que nosotros no competimos es en tener pomos de puertas dorados o premios al diseno arquitectonico, cuyo coste acaba pagando el cliente. Nosotros preferimos reinvertir en mejores protocolos y tecnologia de longevidad. Es nuestra apuesta y lo que vemos que nuestros clientes valoran. Por eso ya somos el hotel mas grande de la provincia de Valencia en volumen de pernoctaciones, duplicando al siguiente, y seguiremos creciendo.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* History */}
      <Section bg="white">
        <div className="mx-auto max-w-4xl">
          <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
            Historia corta del Balneario
          </span>
          <div className="space-y-4 text-base font-body font-light leading-relaxed text-warm-gray">
            <p>
              El Balneario de Cofrentes tuvo su apogeo en torno a 1920, cuando las familias de los empresarios valencianos lo usaron como lugar de veraneo, y se convirtio en el lugar en el que se debatia el precio de la naranja del siguiente ano.
            </p>
            <p>
              Durante la guerra civil, el Balneario opero como hospital, y despues fue abandonado. La familia Casanova lo cedio al Ayuntamiento quien mantiene hoy la propiedad. Miguel Angel Fernandez gano la licitacion de concesion en 1989 rehabilitando mas de 80 edificios.
            </p>
            <p>
              Hoy el Balneario de Cofrentes esta en un nuevo esplendor, haciendo record de ocupacion ano tras ano y dando trabajo a mas de 300 personas, siendo el mayor empleador de los municipios de Cofrentes, Zarra, Ayora, Teresa de Cofrentes, Jarafuel y Jalance, y convirtiendose asi en el tractor economico principal y caso de exito unico de una region de la Espana Vaciada en riesgo de despoblacion, particularmente ante el anticipado cierre programado de la Central Nuclear en 2030.
            </p>
          </div>
        </div>
      </Section>

      {/* Work with us */}
      <Section bg="cream">
        <div className="mx-auto max-w-4xl grid gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Trabaje con nosotros
            </span>
            <p className="text-base font-body font-light leading-relaxed text-warm-gray">
              Siempre estamos buscando medicos, fisioterapeutas, terapeutas, ingenieros de software asi como personal de mantenimiento de edificios como electricistas y frigoristas, pero tambien arquitectos tecnicos, jefes de obra, etc. Al final somos casi casi un pueblo entero, necesitamos todos los oficios.
            </p>
            <p className="mt-4 text-base font-body font-light leading-relaxed text-warm-gray">
              Ademas de un salario competitivo podemos ofrecer alojamiento en una casita en el propio balneario segun perfil.
            </p>
            <p className="mt-4 text-sm font-body text-warm-gray">
              Envie su curriculum y le respondemos rapidamente.
            </p>
            <a href="mailto:rrhh@balneario.com" className="mt-2 inline-flex items-center gap-2 text-sm font-body font-medium text-navy-light hover:text-navy-light-dark transition-colors">
              <Mail size={14} />
              rrhh@balneario.com
            </a>
          </div>
          <div>
            <span className="mb-4 inline-block text-[11px] font-body font-medium uppercase tracking-[0.2em] text-navy-light">
              Donde estamos
            </span>
            <p className="text-base font-body font-light leading-relaxed text-warm-gray">
              Balneario de Cofrentes, 46625 Cofrentes, Valencia, Spain
            </p>
            <div className="mt-4 space-y-3 text-sm font-body font-light text-warm-gray">
              <p>Desde Madrid en coche aproximadamente 3 horas por la A3 hasta Requena, o en tren hasta la estacion de Requena y pidiendo un taxi, o en tren hasta la estacion de Valencia y cogiendo alli nuestro autobus.</p>
              <p>Desde Valencia cogiendo nuestro autobus, o en coche en 75 minutos.</p>
              <p>Desde Barcelona en coche aproximadamente 5 horas, o llegando a Valencia en tren o autobus y cogiendo nuestro autobus.</p>
              <p className="text-stone italic">Llamenos para reservar nuestro autobus porque tenemos plazas limitadas y reservamos con mucha antelacion.</p>
            </div>
            <a
              href="https://maps.google.com/?q=Balneario+de+Cofrentes"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-body font-medium text-navy-light hover:text-navy-light-dark transition-colors"
            >
              <MapPin size={14} />
              Ver en Google Maps
            </a>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
