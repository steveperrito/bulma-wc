import { html, LitElement, nothing } from 'lit';
import { getBulmaBuildStyles } from '../utils.js';

/**
 * @typedef {Object} BreadCrumbsItem
 * @property {string} label - The label of the breadcrumb item.
 * @property {string} url - The URL of the breadcrumb item.
 * @property {string} icon - The icon classes to be added to the `<i>` element.
 * @property {Function} onClick - The function to be called when the item is clicked.
 */

export default class BulmaBreadcrumbs extends LitElement {
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
            let clickFn = item.onClick ? (e) => {e.preventDefault(); item.onClick(e)} : null;
            
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