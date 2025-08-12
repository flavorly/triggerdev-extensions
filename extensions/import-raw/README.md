# @flavorly/triggerdev-extensions-import-raw

A trigger.dev build extension that allows importing files as raw strings with alias support.

## Installation

```bash
bun add @flavorly/triggerdev-extensions-import-raw
```

## Usage

### Basic Usage

```typescript
import { importRawExtension } from '@flavorly/triggerdev-extensions-import-raw'

export default defineConfig({
  // ... other config
  build: {
    extensions: [
      importRawExtension()
    ]
  }
})
```

### With Custom Aliases

```typescript
import { importRawExtension } from '@flavorly/triggerdev-extensions-import-raw'

export default defineConfig({
  // ... other config
  build: {
    extensions: [
      importRawExtension({
        alias: {
          '@': 'src',
          '@components': 'src/components',
          '@utils': 'src/utils'
        }
      })
    ]
  }
})
```

## Features

- Import any file as a raw string by appending `?raw` to the import
- Support for path aliases (e.g., `@/file.txt?raw`)
- Automatic file watching for hot reloading during development
- TypeScript support

## Examples

```typescript
// Import a text file as a raw string
import template from './template.html?raw'

// Using aliases
import config from '@/config.json?raw'
import styles from '@components/Button.css?raw'

// Use in your trigger job
export const myJob = job({
  id: 'process-template',
  trigger: eventTrigger({
    name: 'template.process'
  }),
  run: async (payload, io) => {
    // Process the raw template content
    const processedTemplate = template.replace('{{name}}', payload.name)
    
    await io.logger.info('Template processed', { 
      template: processedTemplate 
    })
  }
})
```

## Options

### `alias`

Type: `Record<string, string>`  
Default: `{ '@': 'src' }`

Define path aliases for cleaner imports. Keys should include the alias prefix (e.g., `@`, `@components`) and values should be the relative path from your project root.

## License

MIT