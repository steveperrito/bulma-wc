import { html } from 'lit';

/**
 * @param components {Object.<string, CustomElementConstructor|HTMLElement>}
 * @returns undefined
 */
export function registerWebComponents(components) {
  Object.keys(components).forEach(PascalCaseName => {
    let kebabCaseName = PascalCaseName.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

    try {
      registerWebComponent(kebabCaseName, components[PascalCaseName]);
    } catch (e) {
      console.error(`Failed to register ${PascalCaseName} as ${kebabCaseName} web component:`, e);
    }
  });
}

/**
 * @param name {string}
 * @param component {CustomElementConstructor|HTMLElement}
 * @returns undefined
 */
function registerWebComponent(name, component) {
  if (!customElements.get(name)) {
    customElements.define(name, component);
  }
}

/**
 * Get all link or style elements with class `--bulma-build`
 */
export function getBulmaBuildStyles() {
  return [
    ...document.querySelectorAll('link[rel=stylesheet].--bulma-build, style')
  ]
    .map(el => {
      if (el.tagName.toLowerCase() === 'link') {
        return html`<link rel="stylesheet" href="${el.href}">`;
      }

      if (el.tagName.toLowerCase() === 'style') {
        return html`<style>${el.innerHTML}</style>`;
      }

      return '';
    });
}

/**
 * Get `data-theme` attribute from the closest parent element
 */
export function getTheme(element) {
  let theme = element.getAttribute('data-theme');

  if (theme) {
    return theme;
  }

  let parent = element?.closest('[data-theme]');

  if (parent) {
    return parent.getAttribute('data-theme');
  }

  return '';
}

/**
 * Get `data-theme` attribute from html element
 */
export function getHtmlTheme() {
  return document.documentElement?.dataset?.theme || '';
}