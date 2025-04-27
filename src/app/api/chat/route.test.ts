import { NextRequest } from 'next/server';
import { POST } from './route';
import * as llmService from '@/services/llm';

// Mock the LLM service
jest.mock('@/services/llm', () => ({
  generateResponse: jest.fn(),
  getActiveProvider: jest.fn(),
}));

describe('Chat API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when message is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data.error).toBe('Missing message');
  });

  it('returns response from LLM service', async () => {
    // Mock the LLM service response
    (llmService.generateResponse as jest.Mock).mockResolvedValue({
      text: 'This is a test response',
      topic: 'default',
    });
    
    (llmService.getActiveProvider as jest.Mock).mockReturnValue('huggingface');

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.text).toBe('This is a test response');
    expect(data.topic).toBe('default');
    expect(data.provider).toBe('huggingface');
  });

  it('returns fallback response when no provider is available', async () => {
    // Mock the LLM service response
    (llmService.generateResponse as jest.Mock).mockResolvedValue({
      text: 'This is a fallback response',
      topic: 'default',
    });
    
    (llmService.getActiveProvider as jest.Mock).mockReturnValue(null);

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.text).toBe('This is a fallback response');
    expect(data.provider).toBe('fallback');
  });
});
