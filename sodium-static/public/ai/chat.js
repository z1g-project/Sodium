// Very EARLY BETA
// For you skids/people looking at my code rate my typescript when its out
var apiKeyInput = document.getElementById('apiKey');
var saveApiKeyButton = document.getElementById('savesettings');
var aiServiceUrlInput = document.getElementById('aiServiceUrl');
//const saveAiServiceUrlButton = document.getElementById('saveAiServiceUrl') as HTMLButtonElement;
var userInput = document.getElementById('userInput');
var sendMessageButton = document.getElementById('sendMessage');
var chatMessages = document.querySelector('.chat-messages');
var apiKey = localStorage.getItem('apiKey') || 'no lol';
var aiServiceUrl = localStorage.getItem('aiServiceUrl') || 'https://api.openai.com/v1/completions';
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
function addUserMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('user-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}
function addAIMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.classList.add('ai-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
}
function sendMessage() {
    var userMessage = userInput.value;
    addUserMessage(userMessage);
    fetch(aiServiceUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(apiKey),
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        var aiResponse = data.response;
        addAIMessage(aiResponse);
    })
        .catch(function (error) {
        console.error('Error sending message:', error);
    });
    userInput.value = '';
}
sendMessageButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
