import { html, LitElement } from 'lit';
import { getBulmaBuildStyles } from '../utils.js';

export default class BulmaModal extends LitElement {
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