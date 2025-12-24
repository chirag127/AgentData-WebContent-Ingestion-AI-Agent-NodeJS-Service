// tests/AIService.test.ts
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { AIService, ApiKeys, ChatMessage } from '../src/services/AIService';

// Mock API keys for testing
const mockApiKeys: ApiKeys = {
  cerebras: 'test-cerebras-key',
  gemini: 'test-gemini-key',
  groq: 'test-groq-key',
  mistral: 'test-mistral-key',
  nvidia: 'test-nvidia-key',
  cloudflare: 'test-cloudflare-account-id',
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
  http.post('https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-instruct:generateContent', async () => {
    return HttpResponse.json({
      candidates: [{ content: { parts: [{ text: 'Response from Gemini' }] } }],
    });
  }),

  // Groq - Mock Success
  http.post('https://api.groq.com/openai/v1/chat/completions', async () => {
    return HttpResponse.json({
      choices: [{ message: { content: 'Response from Groq' } }],
    });
  }),

  // Mistral - Mock Success
  http.post('https://api.mistral.ai/v1/chat/completions', async () => {
    return HttpResponse.json({
      choices: [{ message: { content: 'Response from Mistral' } }],
    });
  }),

  // NVIDIA - Mock Failure (e.g., rate limit) to test fallback
  http.post('https://integrate.api.nvidia.com/v1/chat/completions', async () => {
    return new HttpResponse(null, { status: 429 });
  }),

  // Cloudflare - Mock Success
  http.post('https://api.cloudflare.com/client/v4/accounts/:accountId/ai/run/@cf/meta/llama-3.1-405b-instruct', async () => {
    return HttpResponse.json({
      choices: [{ message: { content: 'Response from Cloudflare' } }],
    });
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
    const incompleteKeys: ApiKeys = { ...mockApiKeys, cerebras: '', gemini: '' };
    const aiService = new AIService(incompleteKeys);

    const result = await aiService.chat(messages);
    expect(result.provider).toBe('groq'); // Should skip Cerebras and Gemini, and go to Groq
  });

  it('should fall back through the entire chain until a successful response', async () => {
    // Override handlers to fail Cerebras, Gemini, and Groq
    server.use(
      http.post('https://api.cerebras.ai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-instruct:generateContent', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.groq.com/openai/v1/chat/completions', () => new HttpResponse(null, { status: 500 }))
    );

    const aiService = new AIService(mockApiKeys);
    const result = await aiService.chat(messages);
    expect(result.provider).toBe('mistral');
    expect(result.content).toBe('Response from Mistral');
  });

  it('should throw an error if all providers fail', async () => {
    // Override all handlers to simulate failures
    server.use(
      http.post('https://api.cerebras.ai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-instruct:generateContent', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.groq.com/openai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.mistral.ai/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://integrate.api.nvidia.com/v1/chat/completions', () => new HttpResponse(null, { status: 500 })),
      http.post('https://api.cloudflare.com/client/v4/accounts/:accountId/ai/run/@cf/meta/llama-3.1-405b-instruct', () => new HttpResponse(null, { status: 500 }))
    );

    const aiService = new AIService(mockApiKeys);
    await expect(aiService.chat(messages)).rejects.toThrow('All AI providers failed. Please check your API keys and network connection.');
  });
});
