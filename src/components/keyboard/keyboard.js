import './keyboard.scss';

let cursorPosition = 0;
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
    ru: false,
    upper: false,
    sound: false,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        const board = document.querySelector('.keyboard');
        board.style.bottom = '';
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
          getCursorStart();
        });
      });
    });
  },

  render() {
    this.elements.keysContainer.innerHTML = '';
    this.elements.keysContainer.appendChild(this._createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.open(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });
    });
  },

  renderKeys() {
    return [
      'sound', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', 'backspace',
      'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
      'arrowLeft', 'space', 'done', 'arrowRight'];
  },

  _createKeys() {
    document.addEventListener('keydown', (event) => {
      document.querySelectorAll('button').forEach((element) => {
        if (event.key === element.textContent && element.textContent !== 'Shift') {
          element.classList.add('click--active');
          this._triggerEvent('oninput');
          cursorPosition++;
          playSound(this.properties.sound);
          setTimeout(() => {
            element.classList.remove('click--active');
          }, 100);
        } else if (event.keyCode == 32 && element.textContent === 'space_bar') {
          element.classList.add('click--wide-active');
          cursorPosition++;
          playSoundSpecial(this.properties.sound);
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
        } else if (event.keyCode == 8 && element.textContent === 'backspace') {
          element.classList.add('click--wide-active');
          cursorPosition++;
          playSoundSpecial(this.properties.sound);
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
        } else if (event.keyCode == 13 && element.textContent === 'keyboard_return') {
          element.classList.add('click--wide-active');
          playSoundSpecial(this.properties.sound);
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
        } else if (element.textContent === 'Shift' && event.keyCode === 16) {
          playSoundSpecial(this.properties.sound);
          element.classList.add('click--wide-active');
          element.classList.toggle('keyboard__key--active');

          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
        } else if (element.textContent == 'keyboard_capslock' && event.keyCode == 20) {
          playSoundSpecial(this.properties.sound);
          element.classList.add('click--wide-active');
          element.classList.toggle('keyboard__key--active');
          this._toggleCapsLock();
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
        } else if (event.keyCode == 27 && element.textContent == 'check_circle') {
          element.classList.add('click--wide-active');
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
          playSoundSpecial(this.properties.sound);
          Keyboard.eventHandlers.oninput = oninput;
          Keyboard.eventHandlers.onclose = onclose;
          const board = document.querySelector('.keyboard');
          board.style.bottom = '-100%';
          setTimeout(() => {
            board.style.bottom = '';
          }, 1000);
        } else if (event.keyCode == 37 && element.textContent == 'arrow_back') {
          element.classList.add('click--wide-active');
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
          cursorPosition--;
          playSoundSpecial(this.properties.sound);
        } else if (event.keyCode == 39 && element.textContent == 'arrow_forward') {
          element.classList.add('click--wide-active');
          setTimeout(() => {
            element.classList.remove('click--wide-active');
          }, 100);
          cursorPosition++;
          playSoundSpecial(this.properties.sound);
        }

        this.open(event.key, (currentValue) => {
          element.value += currentValue;
          getCursorStart();
          blinkingСursor();
        });
      });
    });

    const fragment = document.createDocumentFragment();
    const keyLayout = Keyboard.renderKeys();

    const createIconHTML = (icon_name) => `<i class="material-icons">${icon_name}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', ']', '}', 'ъ', 'enter', '?', '/'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            if (cursorPosition === 0) {
              blinkingСursor();
              playSoundSpecial(this.properties.sound);
            } else {
              this._triggerEvent('oninput');
              this.properties.value = this.properties.value.slice(0, cursorPosition - 1) + this.properties.value.slice(cursorPosition);
              cursorPosition--;
              playSoundSpecial(this.properties.sound);
              this._triggerEvent('oninput');
              blinkingСursor();
            }
          });

          break;

        case 'sound':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          keyElement.innerHTML = createIconHTML('volume_up');
          keyElement.addEventListener('click', (e) => {
            keyElement.classList.toggle('keyboard__key--active');
            this._toggleSound();
          });
          break;

        case 'caps':

          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
          if (!this.properties.capsLock) {
            keyElement.classList.remove('keyboard__key--active');
          } else {
            keyElement.classList.add('keyboard__key--active');
          }
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            playSoundSpecial(this.properties.sound);
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active');
          });

          break;

        case 'arrowLeft':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('arrow_back');

          keyElement.addEventListener('click', () => {
            if (cursorPosition === 0) {
              playSoundSpecial(this.properties.sound);
              blinkingСursor();
            } else {
              cursorPosition--;
              playSoundSpecial(this.properties.sound);
              blinkingСursor();
            }
          });

          break;

        case 'arrowRight':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('arrow_forward');

          keyElement.addEventListener('click', () => {
            if (this.properties.value.length === cursorPosition) {
              playSoundSpecial(this.properties.sound);
              blinkingСursor();
            } else {
              cursorPosition++;
              playSoundSpecial(this.properties.sound);
              blinkingСursor();
            }
          });

          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            if (this.properties.value.length > 0) {
              this._triggerEvent('oninput');
              this.properties.value = `${this.properties.value.slice(0, cursorPosition)}\n${this.properties.value.slice(cursorPosition)}`;
              this._triggerEvent('oninput');
              playSoundSpecial(this.properties.sound);
              cursorPosition = this.properties.value.length;
              blinkingСursor();
            } else {
              this.properties.value += '\n';
              playSoundSpecial(this.properties.sound);
              this._triggerEvent('oninput');
              blinkingСursor();
            }
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');
          keyElement.addEventListener('click', () => {
            this._triggerEvent('oninput');
            this.properties.value = `${this.properties.value.slice(0, cursorPosition)} ${this.properties.value.slice(cursorPosition)}`;
            cursorPosition++;
            playSoundSpecial(this.properties.sound);
            this._triggerEvent('oninput');
            blinkingСursor();
          });

          break;

        case 'done':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.close();
            playSoundSpecial(this.properties.sound);
            this._triggerEvent('onclose');
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this._triggerEvent('oninput');
            this.properties.value = this.properties.value.slice(0, cursorPosition) + keyElement.textContent + this.properties.value.slice(cursorPosition);

            cursorPosition++;
            this._triggerEvent('oninput');
            playSound(this.properties.sound);
            blinkingСursor();
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] === 'function') {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.upper = !this.properties.upper;
    this.properties.capsLock = !this.properties.capsLock;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.upper ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  _toggleLang() {
    this.properties.ru = !this.properties.ru;
    this.render();
  },

  _toggleSound() {
    this.properties.sound = !this.properties.sound;
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

const blinkingСursor = () => {
  const cursor = document.querySelector('.use-keyboard-input');
  cursor.focus();
  cursor.selectionStart = cursor.selectionEnd = cursorPosition;
};

const getCursorStart = () => {
  const cursor = document.querySelector('.use-keyboard-input');
  cursor.addEventListener('click', () => {
    cursorPosition = cursor.selectionStart;
  });
};

function playSound(soundOnOff) {
  if (soundOnOff && (Keyboard.properties.ru === false)) {
    const audio = document.querySelector('audio[data-key="cl"]');
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  } else if (soundOnOff && (Keyboard.properties.ru === true)) {
    const audioRU = document.querySelector('audio[data-key="clru"]');
    if (!audioRU) return;
    audioRU.currentTime = 0;
    audioRU.play();
  }
}

function playSoundSpecial(soundOnOff) {
  if (soundOnOff) {
    const specialAudio = document.querySelector('audio[data-key="spcl"]');
    if (!specialAudio) return;
    specialAudio.currentTime = 0;
    specialAudio.play();
  }
}

export default Keyboard;
