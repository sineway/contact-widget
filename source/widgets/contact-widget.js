import Widget from './widget.js';
import ContactListWidget from './contact-list-widget.js';
import ContactMapWidget from './contact-map-widget.js';
import './contact-widget.css';

class ContactWidget extends Widget {
  constructor() {
    super();

    this.list = new ContactListWidget();
    this.map = new ContactMapWidget();

    this.classList.add('contact');
    this.append(this.list, this.map);
    this.addEventListener('contact-selected', this.onContactSelected);
    this.addEventListener('feature-selected', this.onFeatureSelected);
  }

  async connectedCallback() {
    try {
      const url = this.getAttribute('data-url');
      const contacts = await this.loadContacts(url);
      const {longitude, latitude} = contacts.at(0);

      this.map.renderFeatures(contacts);
      this.map.setCenter([longitude, latitude]);

      this.list.renderItems(contacts);
      this.list.selectItemByIndex(0);
    } catch (exception) {
      this.renderException(exception);
    }
  }

  /**
   * @param {string} url
   * @return {Promise<Contact[]>}
   */
  async loadContacts(url) {
    return (await this.loadJson(url)).pickPoints;
  }

  /**
   * @param {CustomEvent<Contact>} event
   */
  onContactSelected(event) {
    const contact = event.detail;

    this.map.setCenter([contact.longitude, contact.latitude]);
  }

  /**
   * @param {CustomEvent<Feature>} event
   */
  onFeatureSelected(event) {
    const feature = event.detail;

    this.list.selectItemById(feature.getId());
  }
}

customElements.define('contact-widget', ContactWidget);

export default ContactWidget;
