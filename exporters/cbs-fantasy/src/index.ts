import { FileHelper } from "@supernovaio/export-helpers"
import { Supernova, PulsarContext, RemoteVersionIdentifier, AnyOutputFile, TokenType, ColorToken, DimensionToken, ShadowToken, GradientToken, StringToken, ProductCopyToken, AnyStringToken, Token } from "@supernovaio/sdk-exporters"
import { ExporterConfiguration } from "../config"
import { colorTokenToCSS, copyTokenToSCSS, dimensionTokentoSCSS, gradientTokensToSCSS, shadowTokenToSCSS } from "./content/token"
import { dive, renderToken } from "./content/variable"

/**
 * Export entrypoint.
 * When running `export` through extensions or pipelines, this function will be called.
 * Context contains information about the design system and version that is currently being exported.
 */
Pulsar.export(async (sdk: Supernova, context: PulsarContext): Promise<Array<AnyOutputFile>> => {
  // Fetch data from design system that is currently being exported (context)
  const remoteVersionIdentifier: RemoteVersionIdentifier = {
    designSystemId: context.dsId,
    versionId: context.versionId,
  }

  // Fetch the necessary data
  let tokens = await sdk.tokens.getTokens(remoteVersionIdentifier)
  let tokenGroups = await sdk.tokens.getTokenGroups(remoteVersionIdentifier)

  // Filter by brand, if specified by the VSCode extension or pipeline configuration
  if (context.brandId) {
    tokens = tokens.filter((token) => token.brandId === context.brandId)
    tokenGroups = tokenGroups.filter((tokenGroup) => tokenGroup.brandId === context.brandId)
  }

  const themes = await sdk.tokens.getTokenThemes({
    designSystemId: context.dsId,
    versionId: context.versionId,
  })

  const indexedThemes = [{name: 'light', tokens: tokens}]
  themes.map((t) => indexedThemes.push({name: t.name, tokens: t.overriddenTokens}))

  const mappedTokens = new Map(tokens.map((token) => [token.id, token]))

  //Retrieve Supernova custom Token Props
  const collections: {} = {}
  tokens[0].properties.filter((p) => p.name === 'Collection')[0].options?.map((o) => collections[o.name] = o.id)
  console.log(collections['Typography'])

  const colors = indexedThemes
    .map((t) => dive(t.tokens.filter((t) => t.tokenType === TokenType.color), mappedTokens, tokenGroups, t.name))
    .flat()
    .sort()
    .join('\n')

  const breakpoints = tokens
    .filter((t) => t.propertyValues.Collection === collections['Breakpoint'])
    .map((t) => renderToken(t, mappedTokens, "", tokenGroups))
    .sort()
    .join('\n')

  const elevations = tokens
    .filter((t) => t.tokenType === TokenType.shadow)
    .map((t) => renderToken(t, mappedTokens, "", tokenGroups))
    .sort()
    .join('\n')

  const typography = tokens
    .filter((t) => t.propertyValues.Collection === collections['Typography'])
    .map((t) => renderToken(t, mappedTokens, "", tokenGroups))
    .sort()
    .join('\n')

  const spatialUnits = tokens
    .filter((t) => t.propertyValues.Collection === collections['Spacing'])
    .map((t) => renderToken(t, mappedTokens, "", tokenGroups))
    .sort()
    .join('\n')

  // Create output file and return it
  return [
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "colors.ts",
      content: `export class Colors {\n${colors}\n}`,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "breakpoints.ts",
      content: `export class Breakpoints {\n${breakpoints}\n}`,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "elevations.ts",
      content: `export class Elevations {\n${elevations}\n}`,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "typography.ts",
      content: `export class Typography {\n${typography}\n}`,
    }),
    FileHelper.createTextFile({
      relativePath: "./",
      fileName: "spatialUnits.ts",
      content: `export class SpatialUnits {\n${spatialUnits}\n}`,
    }),
  ]
})

/** Exporter configuration. Adheres to the `ExporterConfiguration` interface and its content comes from the resolved default configuration + user overrides of various configuration keys */
export const exportConfiguration = Pulsar.exportConfig<ExporterConfiguration>()
