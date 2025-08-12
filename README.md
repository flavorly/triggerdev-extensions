# Trigger.dev Extensions

A collection of high-quality extensions for the [Trigger.dev](https://trigger.dev) build system. These extensions enhance your trigger.dev development experience with additional functionality and utilities.

## 🚀 Extensions

### [@flavorly/triggerdev-extensions-import-raw](./extensions/import-raw)

Import any file as a raw string with alias support for your trigger.dev jobs.

```typescript
import template from './template.html?raw'
import config from '@/config.json?raw'
```

**Features:**
- Import files as raw strings using `?raw` suffix  
- Path alias support (e.g., `@/`, `@components/`)
- TypeScript support with proper types
- Hot reloading during development

[📖 Read the docs](./extensions/import-raw/README.md)

## 🛠️ Development

This project uses:
- 📦 **Bun** for package management and building
- 🏗️ **Turborepo** for monorepo management  
- 🎨 **Biome** for formatting and linting
- 📋 **Changesets** for version management

### Getting Started

```bash
# Install dependencies
bun install

# Build all extensions
bun run build

# Run linting
bun run lint

# Format code
bun run format

# Type check
bun run typecheck
```

### Creating a New Extension

1. Create a new directory in `extensions/`
2. Add a `package.json` with proper metadata
3. Implement your extension following the trigger.dev extension API
4. Add comprehensive documentation
5. Update this README to include your extension

### Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Add a changeset (describe your changes)
bun changeset

# Release (bump versions and publish)
bun run release
```

Version numbers follow semantic versioning with patch releases (0.0.1 → 0.0.2 → 0.0.3).

## 📖 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch from `develop`
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request to `develop`

### Code Standards

- Use **TypeScript** for all code
- Follow **Biome** formatting rules
- Write comprehensive **tests**
- Include **documentation** and examples
- Keep extensions **focused** and **lightweight**

### Branch Strategy

- `master` - Production releases
- `develop` - Development and integration
- Feature branches - Individual features/fixes

## 📄 License

MIT © flavorly

## 🔗 Links

- [Trigger.dev Documentation](https://trigger.dev/docs)
- [Trigger.dev Build Extensions](https://trigger.dev/docs/build-extensions)
- [Report Issues](https://github.com/flavorly/triggerdev-extensions/issues)

---

<p align="center">
  <strong>Made with ❤️ for the Trigger.dev community</strong>
</p>