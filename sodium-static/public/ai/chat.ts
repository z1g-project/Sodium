// Very EARLY BETA
// For you skids/people looking at my code rate my typescript when its out

const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
const saveApiKeyButton = document.getElementById('savesettings') as HTMLButtonElement;
const aiServiceUrlInput = document.getElementById('aiServiceUrl') as HTMLInputElement;
//const saveAiServiceUrlButton = document.getElementById('saveAiServiceUrl') as HTMLButtonElement;
const userInput = document.getElementById('userInput') as HTMLInputElement;
const sendMessageButton = document.getElementById('sendMessage') as HTMLButtonElement;
const chatMessages = document.querySelector('.chat-messages') as HTMLDivElement;

let apiKey = localStorage.getItem('apiKey') || 'YOUR_DEFAULT_API_KEY';
let aiServiceUrl = localStorage.getItem('aiServiceUrl') || 'YOUR_DEFAULT_AI_SERVICE_URL';

apiKeyInput.value = apiKey;

function saveApiKey() {
  apiKey = apiKeyInput.value;
  localStorage.setItem('apiKey', apiKey);
  console.log('Saved API Key');
  aiServiceUrl = aiServiceUrlInput.value;
  localStorage.setItem('aiServiceUrl', aiServiceUrl);
  console.log('Saved API URL');
}

saveApiKeyButton.addEventListener('click', saveApiKey);

function addUserMessage(message: string) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('user-message');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

function addAIMessage(message: string) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('ai-message');
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
}

function sendMessage() {
  const userMessage = userInput.value;
  
  addUserMessage(userMessage);
  
  fetch('YOUR_AI_SERVICE_URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ message: userMessage }),
  })
    .then(response => response.json())
    .then(data => {
      const aiResponse = data.response;
      addAIMessage(aiResponse);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
  
  userInput.value = '';
}

sendMessageButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
