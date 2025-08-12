import fs from 'node:fs/promises'
import path from 'node:path'

interface ImportRawOptions {
  alias?: Record<string, string>
}

interface BuildPlugin {
  name: string
  setup: (build: BuildInstance) => void
}

interface ResolveResult {
  path: string
  namespace: string
}

interface LoadResult {
  contents: string
  watchFiles: string[]
}

interface BuildInstance {
  onResolve: (
    options: { filter: RegExp },
    callback: (args: ResolveArgs) => ResolveResult | undefined,
  ) => void
  onLoad: (
    options: { filter: RegExp; namespace: string },
    callback: (args: LoadArgs) => Promise<LoadResult>,
  ) => void
}

interface BuildContext {
  workingDir: string
  registerPlugin: (plugin: BuildPlugin) => void
}

interface ResolveArgs {
  path: string
  resolveDir: string
}

interface LoadArgs {
  path: string
}

interface BuildExtension {
  name: string
  onBuildStart: (ctx: BuildContext) => Promise<void>
}

export function importRawExtension(options: ImportRawOptions = {}): BuildExtension {
  const aliases = options.alias ?? {
    '@': 'src', // Default alias if none provided
  }

  return {
    name: 'import-raw',
    onBuildStart: async (ctx: BuildContext) => {
      ctx.registerPlugin({
        name: 'import-raw',
        setup(build: BuildInstance) {
          build.onResolve({ filter: /\?raw$/ }, (args: ResolveArgs) => {
            if (args.resolveDir === '') {
              return
            }

            // Remove the ?raw suffix for path resolution
            let pathWithoutRaw = args.path.replace(/\?raw$/, '')

            // Check if path starts with any of our aliases
            for (const [aliasKey, aliasPath] of Object.entries(aliases)) {
              const aliasPrefix = `${aliasKey}/`
              if (pathWithoutRaw.startsWith(aliasPrefix)) {
                pathWithoutRaw = pathWithoutRaw.replace(aliasPrefix, `${aliasPath}/`)
                // Resolve from the working directory (project root)
                const resolvedPath = path.join(ctx.workingDir, pathWithoutRaw)
                return {
                  path: path.relative(ctx.workingDir, resolvedPath),
                  namespace: 'import-raw',
                }
              }
            }

            // For non-alias paths, resolve normally
            const resolvedPath = path.isAbsolute(pathWithoutRaw)
              ? pathWithoutRaw
              : path.join(args.resolveDir, pathWithoutRaw)

            return {
              path: path.relative(ctx.workingDir, resolvedPath),
              namespace: 'import-raw',
            }
          })

          build.onLoad({ filter: /.*/, namespace: 'import-raw' }, async (args: LoadArgs) => {
            const fullPath = path.isAbsolute(args.path)
              ? args.path
              : path.join(ctx.workingDir, args.path)

            const contents = await fs.readFile(fullPath)
            return {
              contents: `
const contents = ${JSON.stringify(contents.toString())};
export default contents
`,
              watchFiles: [fullPath],
            }
          })
        },
      })
    },
  }
}
