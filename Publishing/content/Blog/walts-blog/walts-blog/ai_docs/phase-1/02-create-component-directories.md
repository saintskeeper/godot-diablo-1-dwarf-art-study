CREATE: Atomic component directory structure

CONTEXT: Set up atomic design folder structure
Organize components following atomic design methodology: atoms → molecules → organisms → templates.

DEPENDENCIES (must exist first):
- walts-blog project root

REQUIREMENTS:
- Create components/ directory at project root
- Create atoms/ subdirectory for primitive components
- Create molecules/ subdirectory for component combinations
- Create organisms/ subdirectory for complex components
- Create templates/ subdirectory for page layouts
- Create index.ts files for clean exports

DIRECTORY STRUCTURE:
```
walts-blog/
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── index.tsx
│   │   │   └── Button.stories.tsx (optional)
│   │   ├── Text/
│   │   │   └── index.tsx
│   │   ├── Input/
│   │   │   └── index.tsx
│   │   ├── Icon/
│   │   │   └── index.tsx
│   │   ├── Badge/
│   │   │   └── index.tsx
│   │   └── KeyboardKey/
│   │       └── index.tsx
│   ├── molecules/
│   │   ├── SearchBar/
│   │   │   └── index.tsx
│   │   ├── BlogCard/
│   │   │   └── index.tsx
│   │   ├── MetaInfo/
│   │   │   └── index.tsx
│   │   └── TagList/
│   │       └── index.tsx
│   ├── organisms/
│   │   ├── FloatingNav/
│   │   │   └── index.tsx
│   │   ├── CommandPalette/
│   │   │   └── index.tsx
│   │   ├── BlogList/
│   │   │   └── index.tsx
│   │   └── BlogPost/
│   │       └── index.tsx
│   ├── templates/
│   │   ├── BlogLayout/
│   │   │   └── index.tsx
│   │   └── HomeLayout/
│   │       └── index.tsx
│   └── index.ts
```

BASH COMMANDS:
```bash
mkdir -p components/{atoms,molecules,organisms,templates}
mkdir -p components/atoms/{Button,Text,Input,Icon,Badge,KeyboardKey}
mkdir -p components/molecules/{SearchBar,BlogCard,MetaInfo,TagList}
mkdir -p components/organisms/{FloatingNav,CommandPalette,BlogList,BlogPost}
mkdir -p components/templates/{BlogLayout,HomeLayout}
```

VERIFICATION:
- All directories created successfully
- Project structure matches atomic design principles
- Ready for component implementation
