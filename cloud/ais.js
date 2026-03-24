const WebSocket = require('ws');
const axios = require('axios');
const crypto = require('crypto');
const uuid = require('uuid');
const { v4: hehe } = uuid;

class Copilot {
  constructor() {
    this.conversationId = null;
    this.models = {
      default: 'chat',
      'think-deeper': 'reasoning',
      'gpt-5': 'smart'
    };
    this.headers = {
      origin: 'https://copilot.microsoft.com',
      'user-agent': 'Mozilla/5.0 (Linux; Android 15; SM-F958 Build/AP3A.240905.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.86 Mobile Safari/537.36'
    };
  }

  async createConversation() {
    const { data } = await axios.post('https://copilot.microsoft.com/c/api/conversations', null, {
      headers: this.headers
    });
    this.conversationId = data.id;
    return this.conversationId;
  }

  async chat(message, model = 'default') {
    if (!this.conversationId) await this.createConversation();
    if (!this.models[model]) throw new Error(`Model inválido. Opciones: ${Object.keys(this.models).join(', ')}`);

    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`wss://copilot.microsoft.com/c/api/chat?api-version=2&features=-,ncedge,edgepagecontext&setflight=-,ncedge,edgepagecontext&ncedge=1`, {
        headers: this.headers
      });

      const response = { text: '', citations: [] };

      ws.on('open', () => {
        ws.send(JSON.stringify({
          event: 'setOptions',
          supportedFeatures: ['partial-generated-images'],
          supportedCards: ['weather', 'local', 'image', 'sports', 'video', 'ads', 'safetyHelpline', 'quiz', 'finance', 'recipe'],
          ads: { supportedTypes: ['text', 'product', 'multimedia', 'tourActivity', 'propertyPromotion'] }
        }));

        ws.send(JSON.stringify({
          event: 'send',
          mode: this.models[model],
          conversationId: this.conversationId,
          content: [{ type: 'text', text: message }],
          context: {}
        }));
      });

      ws.on('message', (chunk) => {
        try {
          const parsed = JSON.parse(chunk.toString());
          switch (parsed.event) {
            case 'appendText':
              response.text += parsed.text || '';
              break;
            case 'citation':
              response.citations.push({
                title: parsed.title,
                icon: parsed.iconUrl,
                url: parsed.url
              });
              break;
            case 'done':
              resolve(response);
              ws.close();
              break;
            case 'error':
              reject(new Error(parsed.message));
              ws.close();
              break;
          }
        } catch (error) {
          reject(error.message);
        }
      });

      ws.on('error', reject);
    });
  }
}

const ai = {
  base: {
    api: 'https://toki-41b08d0904ce.herokuapp.com/api/conciseai/chat'
  },

  generateSignature: function (inputString, key) {
    try {
      const hmac = crypto.createHmac('sha256', 'CONSICESIGAIMOVIESkjkjs32120djwejk2372kjsajs3u293829323dkjd8238293938wweiuwe');
      hmac.update(key + inputString + 'normal');
      return hmac.digest('hex');
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  formatText: function (text) {
    return `USER: ${text}`;
  },

  chat: async function (text) {
    try {
      const user_id = hehe().toString().replace(/-/g, '');
      const formattedText = ai.formatText(text);
      const signature = ai.generateSignature(formattedText, user_id);

      const data = new URLSearchParams();
      data.append('question', formattedText);
      data.append('conciseaiUserId', user_id);
      data.append('signature', signature);
      data.append('previousChats', JSON.stringify([{ a: "", b: formattedText, c: false }]));
      data.append('model', 'normal');

      const response = await fetch(ai.base.api, {
        method: 'POST',
        headers: {
          'User-Agent': 'okhttp/4.10.0',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error de API: ${errorText}`);
      }

      const resp = await response.json();
      return {
        status: true,
        result: resp.answer || "No se encontró una respuesta."
      };
    } catch (error) {
      console.error("Error en chat():", error);
      return {
        status: false,
        message: "Hubo un problema al obtener la respuesta. Intenta nuevamente más tarde."
      };
    }
  }
};

module.exports = {
  Copilot,
  ai
};