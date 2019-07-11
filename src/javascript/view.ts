class View {
  element;

  createElement({ tagName, className = '', attributes = {} }) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }

  createImage(source, className, id = '') {
    const attributes = { src: source, id: id };
    const imgElement = this.createElement({
      tagName: 'img',
      className: className,
      attributes
    });

    return imgElement;
  }

  createButton(className, text) {
    const btnElement = this.createElement({
      tagName: 'button',
      className
    });
    btnElement.innerText = text;

    return btnElement;
  }

}

export default View;
