import {html} from '../utils.js';
import './widget.css';

/**
 * @abstract
 */
class Widget extends HTMLElement {
  /**
   * @param {string} type
   * @param {any} [detail]
   */
  fireEvent(type, detail) {
    const bubbles = true;
    const event = new CustomEvent(type, {detail, bubbles});

    this.dispatchEvent(event);
  }

  /**
   * @param {string} url
   * @return {Promise}
   */
  async loadJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(String(response.status));
    }

    return response.json();
  }

  /**
   * @param {Error} exception
   */
  renderException(exception) {
    this.innerHTML = html`
      <pre class="exception">${exception.stack}</pre>
    `;
  }
}

export default Widget;
