# GlossyFilters Component

SVG filters that create subtle 3D lighting effects for navigation and UI elements using feSpecularLighting and feGaussianBlur.

## Overview

The GlossyFilters component provides reusable SVG filter definitions that simulate glossy, reflective surfaces with dynamic lighting. These filters are applied via CSS `filter: url('#filter-id')` to create professional, polished UI effects.

## Usage

```tsx
import { GlossyFilters } from '@/components/atoms/GlossyFilters';

function MyComponent() {
  return (
    <>
      <GlossyFilters id="my-glossy" intensity="subtle" />
      <div className="glossy-nav">
        {/* Your content with glossy effects */}
      </div>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | `'glossy'` | Unique ID prefix for the filters (prevents conflicts) |
| `intensity` | `'subtle' \| 'moderate' \| 'bold'` | `'subtle'` | Intensity preset for the lighting effects |

## Intensity Presets

### Subtle (Recommended for Professional Sites)
- **Use Case**: Blogs, documentation, corporate sites
- **Characteristics**:
  - Minimal blur (0.5px)
  - Low specular constant (3-15)
  - Light opacity (0.15)
  - Professional and understated

### Moderate (Original Example)
- **Use Case**: Modern web apps, portfolios
- **Characteristics**:
  - Medium blur (0.8px)
  - Medium specular constant (6-25)
  - Medium opacity (0.25)
  - Noticeable but balanced

### Bold (Eye-catching)
- **Use Case**: Landing pages, hero sections
- **Characteristics**:
  - Strong blur (1.2px)
  - High specular constant (10-35)
  - Higher opacity (0.35)
  - Prominent and striking

## Filter Types

### Spotlight Filter
- **ID**: `{id}-spotlight`
- **Purpose**: Dynamic lighting that follows interaction
- **Usage**: Apply to elements that change based on user input (hover, click, active states)
- **CSS**: `filter: url('#glossy-spotlight')`

### Ambience Filter
- **ID**: `{id}-ambience`
- **Purpose**: Static background lighting for depth
- **Usage**: Apply to container elements for overall ambient glow
- **CSS**: `filter: url('#glossy-ambience')`

## CSS Utilities

The glossy effects come with pre-built CSS utilities (see `styles/effects/glossy.css`):

```css
/* Navigation bar with glossy effect */
.glossy-nav {
  /* Layered background with spotlight */
}

/* Search bar with focus glow */
.glossy-search {
  /* Animates ambience on focus */
}

/* Command palette glossy effect */
.glossy-command {
  /* Static ambience for depth */
}

/* Performance optimization */
.glossy-optimized {
  will-change: transform, opacity;
  transform: translateZ(0);
}
```

## Examples

### FloatingNav with Glossy Effects
```tsx
<GlossyFilters id="nav-glossy" intensity="subtle" />
<nav className="glossy-nav glass-heavy rounded-full glossy-optimized">
  {/* Navigation items */}
</nav>
```

### SearchBar with Focus Glow
```tsx
<GlossyFilters id="search-glossy" intensity="subtle" />
<div className="glossy-search glossy-optimized">
  <input type="search" />
</div>
```

### CommandPalette with Ambient Depth
```tsx
<GlossyFilters id="command-glossy" intensity="subtle" />
<div className="glossy-command glass-heavy rounded-3xl glossy-optimized">
  {/* Command palette content */}
</div>
```

## Performance Considerations

1. **Hardware Acceleration**: Use `.glossy-optimized` to enable GPU acceleration
2. **Filter Scope**: Apply filters to specific elements, not entire pages
3. **Unique IDs**: Use different `id` props for multiple filter instances
4. **Mobile**: Consider reducing intensity or disabling on mobile devices

## Accessibility

- All glossy effects are purely visual decorations
- They do not affect screen reader output
- Focus states are preserved with enhanced visibility
- Keyboard navigation works normally

## Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Older Browsers**: Gracefully degrades to glass effects without lighting
- **Mobile**: Supported but may impact performance on low-end devices

## Technical Details

### SVG Filter Pipeline

1. **feGaussianBlur**: Softens edges for realistic lighting
2. **feSpecularLighting**: Simulates 3D specular reflection
3. **fePointLight**: Light source with X, Y, Z coordinates
4. **feComposite**: Blends lighting with source graphics

### Customization

To create custom intensity presets, modify the `intensityConfigs` in the component:

```tsx
const customIntensity = {
  spotlight: {
    deviation: 0.6,
    surfaceScale: 0.4,
    specularConstant: 5,
    specularExponent: 55,
    lightColor: 'hsla(234, 14%, 72%, 0.20)',
    lightZ: 70,
  },
  // ... ambience config
};
```

## Integration with GSAP

For animated spotlight effects that follow user interaction:

```tsx
import gsap from 'gsap';

// Animate spotlight position
const spotlightElement = document.querySelector('#glossy-spotlight fePointLight');
gsap.to(spotlightElement, {
  duration: 0.25,
  attr: { x: newX, y: newY }
});
```

## Troubleshooting

### Filters Not Appearing
- Ensure GlossyFilters is rendered before elements that use it
- Check that filter IDs match in component and CSS
- Verify CSS utilities are imported in `globals.css`

### Performance Issues
- Reduce intensity or disable filters on mobile
- Limit the number of elements with filters
- Use `.glossy-optimized` for hardware acceleration

### Visual Artifacts
- Adjust `deviation` (blur amount) in intensity config
- Fine-tune `surfaceScale` for depth
- Modify light positioning (X, Y, Z coordinates)
