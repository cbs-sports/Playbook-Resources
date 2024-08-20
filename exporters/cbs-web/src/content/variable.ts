import { NamingHelper, CSSHelper, ColorFormat, StringCase, ColorHelper } from "@supernovaio/export-helpers"
import { Token, TokenGroup, TokenType } from "@supernovaio/sdk-exporters"
import shortenCssHex = require("shorten-css-hex")


export function dive(tokens: Token[], mappedTokens: Map<string, Token>, tokenGroups: TokenGroup[], theme: string){
    const tokenOut = tokens
        .filter((t) => t.name != 'sort-token')
        .map((t) => renderToken(t, mappedTokens, theme, tokenGroups))
        .sort()

    return tokenOut
}

// This function checks the token for its type then handles it accordingly.
export function renderToken(t, mappedTokens: Map<string, Token>, theme: string, tokenGroups: TokenGroup[]){
    const tokenName = tokenVariableName(t, tokenGroups)
    const tokenCollection = t.properties.filter((p) => p.name === 'Collection')[0].options.filter((o) => o.id === t.propertyValues.Collection).map((c) => `${c.name}`)[0]
    if(t.tokenType === TokenType.gradient){

    }
    if(t.tokenType === TokenType.color){
        let value: string
        if(t.value.opacity.measure < 1) {
            const r = t.value.color.r
            const g = t.value.color.g
            const b = t.value.color.b
            const a = Math.round(t.value.opacity.measure * 100) / 100
            value = `rgba(${r}, ${g}, ${b}, ${a})`
          } else {
            // Shortens Hex value to shorthand if possible
            value = shortenCssHex(t.toHex6())
          }
        if(tokenCollection === 'UCP' || tokenCollection === 'Sports Colors'){
            return `$${tokenName}: ${value};`
        } else {
        return `$${theme.toLowerCase()}-${tokenName}: ${value};`
        }
    }
    if(t.tokenType === TokenType.dimension){
        const name = tokenVariableName(t, tokenGroups)
        const value = Math.round(t.value.measure * 100) / 100
        let unit;
        const tokenUnitOptions = t.properties.filter((p) => p.codeName === 'tokenUnit')[0].options
        unit = tokenUnitOptions.filter((o) => o.id === t.propertyValues.tokenUnit).map((o) => `${o.name}`)
        if (unit == "none") {
          return `$${name}: ${value};`
        } if (unit == "percent") {
          return `$${name}: ${value}%;`
        } else {
          return `$${name}: ${value}${unit};`
        }
    }
    if(t.tokenType === TokenType.fontFamily){
        const name = tokenVariableName(t, tokenGroups)
        const value = t.value.text
        return `$${name}: ${value};`
    }
    if(t.tokenType === TokenType.shadow){
        const name = tokenVariableName(t, tokenGroups)
        const shadowValue = t.value[0]
        const x = shadowValue.x
        const y = shadowValue.y
        const radius = shadowValue.radius
        const spread = shadowValue.spread
        const color = shadowValue.color.color
        const r = color.r
        const g = color.g
        const b = color.b
        const opacity = Math.round(shadowValue.opacity.measure * 100) / 100
        const value = `${x}px ${y}px ${radius}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`
        return `$${name}: ${value};`
    }
    if(t.tokenType === TokenType.gradient){
        const name = tokenVariableName(t, tokenGroups)
        const degree = `${calculateGradientAngle(t.value[0].from, t.value[0].to)}deg`
        let stops = t.value[0].stops
          .map((stop) => {
            return `${CSSHelper.colorTokenValueToCSS(stop.color, mappedTokens, {
              allowReferences: false,
              decimals: 2,
              colorFormat: ColorFormat.rgba,
              tokenToVariableRef: function (token: Token): string {
                throw new Error("Function not implemented.");
              }
            })} ${ColorHelper.roundToDecimals(
              stop.position * 100,
              2
            )}%`
          })
          .join(', ')
        const value = `linear-gradient(${degree}, ${stops})`
        return `$${name}: ${value};`
      } 
      else {
        return ''
      }
}

function calculateGradientAngle(from, to) {
    const deltaY = (to.y - from.y);
    const deltaX = (to.x - from.x);
    const radians = Math.atan2(deltaY, deltaX); 
    let result = radians * 180 / Math.PI; 
    result = result + 90; 
    return  ((result < 0) ? (360 + result) : result) % 360;
  }

function tokenVariableName(token: Token, tokenGroups: Array<TokenGroup>): string {
    const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!
    return NamingHelper.codeSafeVariableNameForToken(token, StringCase.paramCase, parent, "")
}