
interface CreateElement {
  tagName: string,
  className: string,
  attributes?: {
    [key:string]: string
  }
}

class View {
  public element!: HTMLElement;

  protected createElement({ tagName, className = '', attributes = {} }: CreateElement) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
  }

  protected createImage(source: string, className: string, id = '') {
    const attributes = { src: source, id: id };
    const imgElement = this.createElement({
      tagName: 'img',
      className: className,
      attributes
    });

    return imgElement;
  }

  protected createButton(className: string, text: string) {
    const btnElement = this.createElement({
      tagName: 'button',
      className
    });
    btnElement.innerText = text;

    return btnElement;
  }

}

export default View;
