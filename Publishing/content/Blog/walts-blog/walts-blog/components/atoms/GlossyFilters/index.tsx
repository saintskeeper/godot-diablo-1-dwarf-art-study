'use client';

/**
 * GlossyFilters Component
 *
 * SVG filters that create subtle 3D lighting effects for navigation and UI elements.
 * Uses feSpecularLighting and feGaussianBlur to simulate glossy, reflective surfaces.
 *
 * Intensity: Subtle - Professional and understated
 */

export interface GlossyFiltersProps {
  /** Unique ID prefix for the filters (to avoid conflicts) */
  id?: string;
  /** Intensity preset: 'subtle' | 'moderate' | 'bold' */
  intensity?: 'subtle' | 'moderate' | 'bold';
}

interface FilterConfig {
  spotlight: {
    deviation: number;
    surfaceScale: number;
    specularConstant: number;
    specularExponent: number;
    lightColor: string;
    lightZ: number;
  };
  ambience: {
    deviation: number;
    surfaceScale: number;
    specularConstant: number;
    specularExponent: number;
    lightColor: string;
    lightX: number;
    lightY: number;
    lightZ: number;
  };
}

const intensityConfigs: Record<'subtle' | 'moderate' | 'bold', FilterConfig> = {
  subtle: {
    spotlight: {
      deviation: 0.5,
      surfaceScale: 0.3,
      specularConstant: 3,
      specularExponent: 45,
      lightColor: 'hsla(234, 14%, 72%, 0.15)',
      lightZ: 60,
    },
    ambience: {
      deviation: 0.5,
      surfaceScale: 0.3,
      specularConstant: 15,
      specularExponent: 45,
      lightColor: 'hsla(234, 14%, 72%, 0.15)',
      lightX: 100,
      lightY: -120,
      lightZ: 120,
    },
  },
  moderate: {
    spotlight: {
      deviation: 0.8,
      surfaceScale: 0.5,
      specularConstant: 6,
      specularExponent: 65,
      lightColor: 'hsla(234, 14%, 72%, 0.25)',
      lightZ: 82,
    },
    ambience: {
      deviation: 0.8,
      surfaceScale: 0.5,
      specularConstant: 25,
      specularExponent: 65,
      lightColor: 'hsla(234, 14%, 72%, 0.25)',
      lightX: 120,
      lightY: -154,
      lightZ: 160,
    },
  },
  bold: {
    spotlight: {
      deviation: 1.2,
      surfaceScale: 0.8,
      specularConstant: 10,
      specularExponent: 85,
      lightColor: 'hsla(234, 14%, 72%, 0.35)',
      lightZ: 100,
    },
    ambience: {
      deviation: 1.2,
      surfaceScale: 0.8,
      specularConstant: 35,
      specularExponent: 85,
      lightColor: 'hsla(234, 14%, 72%, 0.35)',
      lightX: 140,
      lightY: -180,
      lightZ: 200,
    },
  },
};

export const GlossyFilters = ({ id = 'glossy', intensity = 'subtle' }: GlossyFiltersProps) => {
  const config = intensityConfigs[intensity];
  const spotlightId = `${id}-spotlight`;
  const ambienceId = `${id}-ambience`;

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        {/* Spotlight Filter - Dynamic lighting that follows interaction */}
        <filter id={spotlightId}>
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation={config.spotlight.deviation}
            result="blur"
          />
          <feSpecularLighting
            result="lighting"
            in="blur"
            surfaceScale={config.spotlight.surfaceScale}
            specularConstant={config.spotlight.specularConstant}
            specularExponent={config.spotlight.specularExponent}
            lightingColor={config.spotlight.lightColor}
          >
            <fePointLight
              x="50"
              y="54"
              z={config.spotlight.lightZ}
            />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="spec"
          />
          <feComposite
            in="SourceGraphic"
            in2="spec"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>

        {/* Ambience Filter - Static background lighting for depth */}
        <filter id={ambienceId}>
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation={config.ambience.deviation}
            result="blur"
          />
          <feSpecularLighting
            result="lighting"
            in="blur"
            surfaceScale={config.ambience.surfaceScale}
            specularConstant={config.ambience.specularConstant}
            specularExponent={config.ambience.specularExponent}
            lightingColor={config.ambience.lightColor}
          >
            <fePointLight
              x={config.ambience.lightX}
              y={config.ambience.lightY}
              z={config.ambience.lightZ}
            />
          </feSpecularLighting>
          <feComposite
            in="lighting"
            in2="SourceAlpha"
            operator="in"
            result="spec"
          />
          <feComposite
            in="SourceGraphic"
            in2="spec"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </defs>
    </svg>
  );
};
