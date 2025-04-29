import { html, LitElement, nothing } from 'lit';

/**
 * @param components {Object.<string, CustomElementConstructor|HTMLElement>}
 * @returns undefined
 */
function registerWebComponents(components) {
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
function getBulmaBuildStyles() {
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

class BulmaModal extends LitElement {
  static properties = {
    isActive: {type: Boolean, reflect: true, attribute: 'is-active'},
  };

  constructor() {
    super();
    this.isActive = false;
  }

  render() {
    return html`
      ${getBulmaBuildStyles()}
        <div class="modal ${this.isActive ? 'is-active' : ''}">
          <div class="modal-background"></div>
          <div class="modal-content">
            <div class="box">
              <slot></slot>
            </div>
          </div>
          <button class="modal-close is-large"
                  aria-label="close"
                  @click="${this._closeModal}">
          </button>
        </div>
      </div>
    `;
  }

  _closeModal() {
    this.isActive = false;
  }
}

/**
 * @typedef {Object} BreadCrumbsItem
 * @property {string} label - The label of the breadcrumb item.
 * @property {string} url - The URL of the breadcrumb item.
 * @property {string} icon - The icon classes to be added to the `<i>` element.
 * @property {Function} onClick - The function to be called when the item is clicked.
 */

class BulmaBreadcrumbs extends LitElement {
  static properties = {
    items: { type: Array },
    alignment: { type: String, reflect: true },
    separator: { type: String, reflect: true },
    size: { type: String, reflect: true },
  }

  constructor() {
    super();
    /** @type {BreadCrumbsItem[]} */
    this.items = [];
    /** @type {null|'centered'|'right'} */
    this.alignment = null;
    /** @type {null|'arrow'|'bullet'|'dot'|'succeeds'} */
    this.separator = null;
    /** @type {null|'small'|'medium'|'large'} */
    this.size = null;
  }

  render() {
    return html`
      ${getBulmaBuildStyles()}
      <nav class="breadcrumb ${this.alignment ? `is-${this.alignment}` : ''} ${this.size ? `is-${this.size}` : ''}" aria-label="breadcrumbs">
        <ul>
          ${this.items.map(item => {
            let clickFn = item.onClick ? (e) => {e.preventDefault(); item.onClick(e);} : null;
            
            return html`
            <li>
              <a href="${item.url}" @click="${clickFn || nothing}">
                ${item.icon ? html`<span class="icon"><i class="${item.icon}"></i></span>` : ''}
                <span>${item.label}</span>
              </a>
            </li>
          `
          })}
        </ul>
      </nav>
    `;
  }

}

export { BulmaBreadcrumbs, BulmaModal, registerWebComponents };
