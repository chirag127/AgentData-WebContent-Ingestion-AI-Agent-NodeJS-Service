// Compliant with AGENTS.md §3 Multi-Provider & §2 Frontend-Only Architecture
// Best Practices: REST-only, Exponential Backoff, Provider Cascade, No SDKs.

export interface ApiKeys {
  cerebras: string;
  gemini: string;
  deepseek: string;
  openrouter: string;
  mistral: string;
  together: string;
  groq: string;
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
    model: 'llama-3.1-70b-chat',
    type: 'openai-compatible',
  },
  gemini: {
    baseURL: 'https://generativelanguage.googleapis.com/v1beta',
    endpoint: '/models/gemini-2.5-flash-lite:generateContent',
    model: 'gemini-2.5-flash-lite', // Add model for type consistency
    type: 'gemini-native',
  },
  deepseek: {
    baseURL: 'https://api.deepseek.com/v1',
    endpoint: '/chat/completions',
    model: 'deepseek-r1-0528',
    type: 'openai-compatible',
  },
  openrouter: {
    baseURL: 'https://openrouter.ai/api/v1',
    endpoint: '/chat/completions',
    model: 'deepseek/deepseek-r1',
    type: 'openai-compatible',
  },
  mistral: {
    baseURL: 'https://api.mistral.ai/v1',
    endpoint: '/chat/completions',
    model: 'mistral-large-3',
    type: 'openai-compatible',
  },
  together: {
    baseURL: 'https://api.together.xyz/v1',
    endpoint: '/chat/completions',
    model: 'meta-llama/Llama-3.1-70b-instruct',
    type: 'openai-compatible',
  },
  groq: {
    baseURL: 'https://api.groq.com/openai/v1',
    endpoint: '/chat/completions',
    model: 'llama-3.1-70b-versatile',
    type: 'openai-compatible',
  },
};

const PROVIDER_CASCADE_ORDER: Provider[] = [
  'cerebras',
  'gemini',
  'deepseek',
  'openrouter',
  'mistral',
  'together',
  'groq',
];

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 2000;

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
          // Don't retry for client-side errors like 400 or 401
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

    if (config.type === 'openai-compatible') {
        headers['Authorization'] = `Bearer ${apiKey}`;
        body = {
            model: config.model,
            messages,
            max_tokens: 32768,
            temperature: 0.7,
        };
    } else if (config.type === 'gemini-native') {
        url += `?key=${apiKey}`;
        // Gemini expects a different message format.
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
