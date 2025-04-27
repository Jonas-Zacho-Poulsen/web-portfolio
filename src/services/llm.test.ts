import { generateResponse, getActiveProvider } from './llm';

describe('LLM Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY;
    delete process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    delete process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('getActiveProvider returns null when no API keys are configured', () => {
    expect(getActiveProvider()).toBeNull();
  });

  test('getActiveProvider returns huggingface when Hugging Face API key is configured', () => {
    process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY = 'test-key';
    expect(getActiveProvider()).toBe('huggingface');
  });

  test('getActiveProvider returns openai when OpenAI API key is configured', () => {
    process.env.NEXT_PUBLIC_OPENAI_API_KEY = 'test-key';
    expect(getActiveProvider()).toBe('openai');
  });

  test('getActiveProvider returns ollama when Ollama endpoint is configured', () => {
    process.env.NEXT_PUBLIC_OLLAMA_ENDPOINT = 'http://localhost:11434';
    expect(getActiveProvider()).toBe('ollama');
  });

  test('generateResponse returns fallback response when no API keys are configured', async () => {
    const response = await generateResponse('What are your skills?');
    expect(response).toHaveProperty('text');
    expect(response).toHaveProperty('topic');
    expect(response.topic).toBe('skills');
  });

  test('generateResponse uses Hugging Face when API key is configured', async () => {
    process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY = 'your_actual_key';
    
    const response = await generateResponse('What are your skills?');
    expect(response).toHaveProperty('text');
    expect(response).toHaveProperty('topic');
    expect(response.text).not.toBe(chatConfig.predefinedResponses.skills);
  });
});

