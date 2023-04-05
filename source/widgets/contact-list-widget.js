import Widget from './widget.js';
import ContactCardWidget from './contact-card-widget.js';
import './contact-list-widget.css';

class ContactListWidget extends Widget {
  constructor() {
    super();

    this.classList.add('contact-list');
    this.setAttribute('role', 'list');
  }

  /**
   * @param {Contact[]} contacts
   */
  renderItems(contacts) {
    this.replaceChildren(...contacts.map(this.createItem, this));
  }

  /**
   * @param {Contact} contact
   * @return {ContactCardWidget}
   */
  createItem(contact) {
    const item = new ContactCardWidget(contact);

    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');

    item.addEventListener('click', () => {
      this.selectItem(item);
      this.fireEvent('contact-selected', contact);
    });

    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        item.click();
      }
    });

    return item;
  }

  /**
   * @return {ContactCardWidget[]}
   */
  getItems() {
    // @ts-ignore
    return [...this.children];
  }

  /**
   * @param {ContactCardWidget} item
   */
  selectItem(item) {
    this.getItems().forEach((each) => each.isSelected(false));
    item.isSelected(true);
    this.scrollToItem(item);
  }

  /**
   * @param {ContactCardWidget} item
   */
  scrollToItem(item) {
    const itemX = item.offsetLeft + (item.offsetWidth / 2);
    const itemY = item.offsetTop + (item.offsetHeight / 2);
    const x = itemX - (this.offsetWidth / 2);
    const y = itemY - (this.offsetHeight / 2);

    this.scroll(x, y);
  }

  /**
   * @param {number} index
   */
  selectItemByIndex(index) {
    const item = this.getItems().at(index);

    this.selectItem(item);
  }

  /**
   * @param {string|number} id
   */
  selectItemById(id) {
    const item = this.getItems().find((some) => some.getId() === id);

    this.selectItem(item);
  }
}

customElements.define('contact-list-widget', ContactListWidget);

export default ContactListWidget;
