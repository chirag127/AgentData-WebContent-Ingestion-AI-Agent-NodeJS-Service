// Compliant with AGENTS.md §3 Multi-Provider & §2 Frontend-Only Architecture
// Best Practices: REST-only, Exponential Backoff, Provider Cascade, No SDKs.

export interface ApiKeys {
  cerebras: string;
  gemini: string;
  groq: string;
  mistral: string;
  nvidia: string;
  cloudflare: string; // Expected format: "ACCOUNT_ID/API_TOKEN"
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type Provider = keyof ApiKeys;

const PROVIDER_CONFIG = {
  cerebras: {
    baseURL: 'https://api.cerebras.ai/v1',
    endpoint: '/chat/completions',
    model: 'qwen-3-235b-a22b-instruct-2507',
    type: 'openai-compatible',
  },
  gemini: {
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    endpoint: '/models/gemma-3-27b-instruct:generateContent',
    model: 'gemma-3-27b-instruct',
    type: 'gemini-native',
  },
  groq: {
    baseURL: 'https://api.groq.com/openai/v1',
    endpoint: '/chat/completions',
    model: 'llama-3.1-405b-instruct',
    type: 'openai-compatible',
  },
  mistral: {
    baseURL: 'https://api.mistral.ai/v1',
    endpoint: '/chat/completions',
    model: 'mistral-large',
    type: 'openai-compatible',
  },
  nvidia: {
    baseURL: 'https://api.nvidia.com/nim',
    endpoint: '/v1/chat/completions',
    model: 'meta-llama/llama-3.1-405b-instruct',
    type: 'openai-compatible',
  },
  cloudflare: {
    baseURL: 'https://api.cloudflare.com/client/v4/accounts/ID/ai/run',
    endpoint: '/@cf/meta/llama-3.1-405b-instruct',
    model: '@cf/meta/llama-3.1-405b-instruct',
    type: 'cloudflare-native',
  },
};

const PROVIDER_CASCADE_ORDER: Provider[] = [
  'cerebras',
  'gemini',
  'groq',
  'mistral',
  'nvidia',
  'cloudflare',
];

const MAX_RETRIES = 5;
const INITIAL_BACKOFF_MS = 1000;

export class AIService {
  private apiKeys: ApiKeys;

  constructor(apiKeys: ApiKeys) {
    this.apiKeys = apiKeys;
  }

  public async chat(messages: ChatMessage[]): Promise<{ content: string, provider: Provider }> {
    for (const provider of PROVIDER_CASCADE_ORDER) {
      const apiKey = this.apiKeys[provider];
      if (!apiKey) {
        console.warn(`Skipping provider ${provider} due to missing API key.`);
        continue;
      }

      try {
        const response = await this.tryProviderWithBackoff(provider, messages, apiKey);
        if (response) {
            const content = this.parseResponse(provider, response);
            return { content, provider };
        }
      } catch (error) {
        console.error(`Provider ${provider} failed after retries:`, error);
      }
    }

    throw new Error('All AI providers failed. Please check your API keys and network connection.');
  }

  private async tryProviderWithBackoff(
    provider: Provider,
    messages: ChatMessage[],
    apiKey: string
  ): Promise<any> {
    let lastError: any;
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        return await this.makeApiCall(provider, messages, apiKey);
      } catch (error: any) {
        lastError = error;
        if (error.status === 429 || error.status >= 500) {
          const delay = INITIAL_BACKOFF_MS * Math.pow(2, i) + Math.random() * 1000;
          console.warn(`Provider ${provider} returned status ${error.status}. Retrying in ${delay.toFixed(0)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw error;
        }
      }
    }
    throw lastError;
  }

  private async makeApiCall(
    provider: Provider,
    messages: ChatMessage[],
    apiKey: string
    ): Promise<any> {
    const config = PROVIDER_CONFIG[provider];
    let url = `${config.baseURL}${config.endpoint}`;
    let body: any;
    let headers: Record<string, string> = { 'Content-Type': 'application/json' };
    let effectiveApiKey = apiKey;

    if (config.type === 'openai-compatible') {
        headers['Authorization'] = `Bearer ${effectiveApiKey}`;
        body = {
            model: config.model,
            messages,
            max_tokens: 32768,
            temperature: 0.7,
        };
    } else if (config.type === 'cloudflare-native') {
        const parts = apiKey.split('/');
        if (parts.length !== 2) {
            throw new Error('Invalid Cloudflare API key format. Expected "ACCOUNT_ID/API_TOKEN".');
        }
        const [accountId, apiToken] = parts;
        url = config.baseURL.replace('ID', accountId) + config.endpoint;
        effectiveApiKey = apiToken;
        headers['Authorization'] = `Bearer ${effectiveApiKey}`;
        body = {
            messages
        };
    } else if (config.type === 'gemini-native') {
        url += `?key=${apiKey}`;
        const geminiMessages = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : m.role,
            parts: [{ text: m.content }],
        }));

        body = {
            contents: geminiMessages,
            generationConfig: {
                maxOutputTokens: 32768,
                temperature: 0.7,
            },
        };
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.text();
        const error: any = new Error(`API call failed with status ${response.status}: ${errorData}`);
        error.status = response.status;
        throw error;
    }

    return response.json();
  }

  private parseResponse(provider: Provider, response: any): string {
    const config = PROVIDER_CONFIG[provider];

    try {
      if (config.type === 'openai-compatible') {
        return response.choices[0]?.message?.content || '';
      } else if (config.type === 'cloudflare-native') {
        return response.result?.response || '';
      } else if (config.type === 'gemini-native') {
        return response.candidates[0]?.content?.parts[0]?.text || '';
      }
    } catch (e) {
        console.error(`Failed to parse response from ${provider}:`, response);
        throw new Error(`Could not parse response from ${provider}.`);
    }

    return '';
  }
}
