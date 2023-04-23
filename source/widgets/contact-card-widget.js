import Widget from './widget.js';
import {html} from '../utils.js';
import './contact-card-widget.css';

class ContactCardWidget extends Widget {
  #id;

  /**
   * @param {Contact} contact
   */
  constructor(contact) {
    super();

    this.classList.add('contact-card');
    this.#id = contact.id;
    this.innerHTML = String(this.createHtml(contact));
  }

  /**
   * @return {number}
   */
  getId() {
    return this.#id;
  }

  /**
   * @param {Contact} contact
   * @return {SafeHtml}
   */
  createHtml(contact) {
    return html`
      <h2 class="contact-card__title">${contact.address}</h2>
      <ul class="contact-card__tag-list">
        ${contact.budgets.map((it) => html`
          <li class="contact-card__tag">${it}</li>
        `)}
      </ul>
    `;
  }

  /**
   * @param {boolean} [flag]
   * @return {boolean}
   */
  isSelected(flag) {
    if (flag === undefined) {
      return this.classList.contains('contact-card--selected');
    }

    return this.classList.toggle('contact-card--selected', flag);
  }
};

customElements.define('contact-card-widget', ContactCardWidget);

export default ContactCardWidget;
