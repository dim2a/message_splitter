function init() {
  const textArea = document.getElementById('input-area');
  const splitBtn = document.getElementById('split-btn');
  const clearBtn = document.getElementById('clear-btn');
  const label = document.getElementById('input-text-label');

  splitBtn.onclick = () => renderMessages(textArea.value);
  
  clearBtn.onclick = () => {
    textArea.value='';
    splitBtn.disabled = true;
    clearBtn.disabled = true;
    clearMessagearea();
    textArea.classList.remove('error');
    label.innerText = 'Insert your text:';
    label.style.color = 'black';
  };

  textArea.oninput = () => {
    splitBtn.disabled = !Boolean(textArea.value);
    clearBtn.disabled = !Boolean(textArea.value);
    textArea.classList.remove('error');
    label.innerText = 'Insert your text:';
    label.style.color = 'black';
  };
}

function renderMessages (text) {
  try {
    const chunks = toSMSArray(text);
    clearMessagearea();
    for (let chunk of chunks) {
      createMessage(chunk);
    }
  } catch {
    const textArea = document.getElementById('input-area');
    const label = document.getElementById('input-text-label');
    
    textArea.classList.add('error');
    label.innerText = 'Invalid input text';
    label.style.color = 'red';
  }
  
}

function clearMessagearea () {
  const wrapper = document.getElementById('root__output-section');
  const nodeList = wrapper.querySelectorAll('div');
  
  for (let node of nodeList) {
    node.remove();
  }
}

function createMessage (text) {
  const message = document.createElement('div');
  message.innerText = text;
  message.className = 'output-section__message';

  const wrapper = document.getElementById('root__output-section');
  wrapper.append(message);
}

init();