"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const ITEMS = [
  {
    tempId: 0,
    testimonial: "Antes pasaba 3 horas diarias respondiendo el mismo tipo de preguntas por WhatsApp. Ahora el bot lo hace solo.",
    by: "Camila Restrepo — Gerente, Centro Médico del Norte",
    imgSrc: "https://i.pravatar.cc/150?img=47",
  },
  {
    tempId: 1,
    testimonial: "Implementaron el agendamiento en 2 días. Mis clientes confirman solos desde WhatsApp. No he vuelto a perder una cita.",
    by: "Andrés Morales — Propietario, Estudio Fit Barranquilla",
    imgSrc: "https://i.pravatar.cc/150?img=12",
  },
  {
    tempId: 2,
    testimonial: "El cierre contable que hacíamos en 2 días ahora se genera automáticamente. El ROI llegó antes del primer mes.",
    by: "Diana Torres — Dir. Financiera, Distribuidora LogiCol",
    imgSrc: "https://i.pravatar.cc/150?img=49",
  },
  {
    tempId: 3,
    testimonial: "Dudé mucho en automatizar la recepción. A dos semanas de arrancar, mi equipo ya no quería volver a hacerlo manual.",
    by: "Ricardo Ospina — Director, Clínica Dental Premium",
    imgSrc: "https://i.pravatar.cc/150?img=15",
  },
  {
    tempId: 4,
    testimonial: "Las reservas subieron 40% porque el bot responde a las 2am cuando el cliente tiene el antojo. Nosotros dormimos, el negocio no.",
    by: "Valeria Orozco — Admin., Restaurante La Mar",
    imgSrc: "https://i.pravatar.cc/150?img=44",
  },
  {
    tempId: 5,
    testimonial: "Llevábamos el inventario en Excel. Ahora todo va al sistema de ventas solo y sé exactamente qué tengo en bodega.",
    by: "Mauricio Barros — Gerente, Droguería Salud Total",
    imgSrc: "https://i.pravatar.cc/150?img=33",
  },
  {
    tempId: 6,
    testimonial: "Capturo el doble de leads que antes. El agente califica y agenda solo. Yo entro únicamente a cerrar.",
    by: "Sofía Mendoza — Dir. Comercial, Grupo Inmobiliario Costa",
    imgSrc: "https://i.pravatar.cc/150?img=45",
  },
  {
    tempId: 7,
    testimonial: "Lo que más me sorprendió fue la velocidad. En 72 horas teníamos el flujo corriendo en producción.",
    by: "Carlos Herrera — CEO, TransLogística SAS",
    imgSrc: "https://i.pravatar.cc/150?img=52",
  },
];

interface CardProps {
  position: number;
  testimonial: typeof ITEMS[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<CardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-surface3 border-accent"
          : "z-0 bg-surface border-border hover:border-accent/20"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px rgba(180,189,210,0.12)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      {/* Corner cut decoration */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? "rgba(180,189,210,0.35)" : "rgba(255,255,255,0.07)",
        }}
      />

      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split("—")[0].trim()}
        className="mb-4 h-14 w-12 bg-surface2 object-cover object-top"
        style={{ boxShadow: "3px 3px 0px var(--color-bg)" }}
      />

      <h3 className="font-[family-name:var(--font-syne)] font-semibold text-sm sm:text-base leading-relaxed text-text">
        "{testimonial.testimonial}"
      </h3>

      <p className="absolute bottom-8 left-8 right-8 text-xs font-[family-name:var(--font-dm)] italic text-muted">
        — {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(ITEMS);

  const handleMove = (steps: number) => {
    const next = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = next.shift();
        if (!item) return;
        next.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = next.pop();
        if (!item) return;
        next.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(next);
  };

  useEffect(() => {
    const update = () => {
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 365 : 290);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 600 }}>
      {list.map((item, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <TestimonialCard
            key={item.tempId}
            testimonial={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center transition-colors bg-surface border border-border text-muted hover:bg-surface2 hover:border-accent/40 hover:text-text"
          aria-label="Testimonio anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center transition-colors bg-surface border border-border text-muted hover:bg-surface2 hover:border-accent/40 hover:text-text"
          aria-label="Testimonio siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
