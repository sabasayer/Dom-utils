interface OutPositions {
  left: boolean,
  right: boolean,
  bottom: boolean,
  top: boolean
}

export abstract class DomUtils {
  static offset(el: HTMLElement) {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  static isKeyAvailableOnNumberInput(evt: KeyboardEvent, isOnlyInteger: boolean,enableNegative?:boolean) {
    let value = (evt.target as HTMLInputElement).value;
    var charCode = evt.which ? evt.which : evt.keyCode;
    const dotKeyCode = 46;
    const minusKeyCode = 45;

    let cursorIndex = (evt.target as HTMLInputElement).selectionStart

    if(enableNegative && charCode == minusKeyCode)
    {
      let intValue = parseFloat(value);
      if (intValue != 0 && value.indexOf('-') == -1 && cursorIndex == 0)
        return true;
      else
        evt.preventDefault();
    }
    else if (!isOnlyInteger && charCode == dotKeyCode) {
      if (value.indexOf('.') == -1)
        return true;
      else
        evt.preventDefault();
    }
    else if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    } else {
      return true;
    }
  }

  static isOutOfScreen(el: HTMLElement): OutPositions {
    let offset = this.offset(el);
    let windowHeight = window.innerHeight + window.pageYOffset;
    let windowWidth = window.innerWidth + window.pageXOffset;
    const tollerence = 5;

    let outPositions: OutPositions = {
      left: false,
      top: false,
      right: false,
      bottom: false
    };

    if (offset.left - tollerence < window.pageXOffset) {
      outPositions.left = true;
    }

    if (offset.left + el.offsetWidth + tollerence > windowWidth) {
      outPositions.right = true;
    }
    if (offset.top - tollerence < window.pageYOffset) {
      outPositions.top = true;
    }
    if (offset.top + el.offsetHeight + tollerence > windowHeight) {
      outPositions.bottom = true;
    }

    return outPositions;
  }

  static findParentElement(el: HTMLElement, classValue?: string, id?: string): HTMLElement | null {
    if (!classValue && !id)
      return null;

    let parentEl = el.parentElement;
    while (parentEl) {
      if ((id && parentEl.getAttribute('id') == id) ||
        (classValue && parentEl.classList && parentEl.classList.contains(classValue))) {
        break;
      }
      else {
        parentEl = parentEl.parentElement;
      }
    }

    return parentEl;
  }

  static randomColor() {
		let r = Math.floor(Math.random() * 255);
		let g = Math.floor(Math.random() * 255);
		let b = Math.floor(Math.random() * 255);

		return `rgb(${r},${g},${b})`;
	}
};
