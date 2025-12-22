// tests/AIService.test.ts
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { AIService, ApiKeys, ChatMessage } from '../src/services/AIService';

// Mock API keys for testing
const mockApiKeys: ApiKeys = {
  cerebras: 'test-cerebras-key',
  gemini: 'test-gemini-key',
  deepseek: 'test-deepseek-key',
  openrouter: 'test-openrouter-key',
  mistral: 'test-mistral-key',
  together: 'test-together-key',
  groq: 'test-groq-key',
};

// Mock server handlers
const handlers = [
  // Cerebras (OpenAI-compatible) - Mock Success
  http.post('https://api.cerebras.ai/v1/chat/completions', async () => {
    return HttpResponse.json({
      choices: [{ message: { content: 'Response from Cerebras' } }],
    });
  }),

  // Google Gemini - Mock Success
  http.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', async () => {
    return HttpResponse.json({
      candidates: [{ content: { parts: [{ text: 'Response from Gemini' }] } }],
    });
  }),

  // DeepSeek - Mock Failure (e.g., rate limit)
  http.post('https://api.deepseek.com/v1/chat/completions', async () => {
    return new HttpResponse(null, { status: 429 });
  }),
];

const server = setupServer(...handlers);

// Vitest setup
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('AIService', () => {
  const messages: ChatMessage[] = [{ role: 'user', content: 'Hello' }];

  it('should return a response from the primary provider (Cerebras) on success', async () => {
    const aiService = new AIService(mockApiKeys);
    const result = await aiService.chat(messages);
    expect(result.provider).toBe('cerebras');
    expect(result.content).toBe('Response from Cerebras');
  });

  it('should fall back to the secondary provider (Gemini) if the primary fails', async () => {
    // Override the handler for Cerebras to simulate a failure
    server.use(
      http.post('https://api.cerebras.ai/v1/chat/completions', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const aiService = new AIService(mockApiKeys);
    const result = await aiService.chat(messages);
    expect(result.provider).toBe('gemini');
    expect(result.content).toBe('Response from Gemini');
  });

  it('should skip providers with missing API keys', async () => {
    const incompleteKeys: ApiKeys = { ...mockApiKeys, cerebras: '' };
    const aiService = new AIService(incompleteKeys);

    const result = await aiService.chat(messages);
    expect(result.provider).toBe('gemini'); // Should skip Cerebras and go to Gemini
  });

  it('should throw an error if all providers fail', async () => {
    // Override all handlers to simulate failures
    server.use(
      http.post('https://api.cerebras.ai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.deepseek.com/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://openrouter.ai/api/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.mistral.ai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.together.xyz/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.groq.com/openai/v1/chat/completions', () => new HttpResponse(null, { status: 500 }))
    );

    const aiService = new AIService(mockApiKeys);
    await expect(aiService.chat(messages)).rejects.toThrow('All AI providers failed.');
  });
});
