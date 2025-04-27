# Chat Assistant with Free LLM Integration

This chat assistant component is designed to work with various free LLM providers while gracefully falling back to predefined responses when no API keys are available.

## Features

- Supports multiple free LLM providers:
  - Hugging Face (free tier available)
  - OpenAI (requires payment)
  - Ollama (free, self-hosted)
- Graceful fallback to predefined responses when no API keys are available
- Responsive UI with drag and resize functionality
- Suggested questions based on conversation context
- Error handling and rate limiting

## Setup

1. Copy the `.env.local.example` file to `.env.local` in the root directory
2. Uncomment and add your API key(s) for at least one of the supported LLM providers
3. Restart the development server

## Usage

The chat assistant will automatically use the first available LLM provider based on the following priority:

1. Hugging Face
2. OpenAI
3. Ollama
4. Fallback to predefined responses

If no API keys are provided, the chat will use predefined responses defined in the `chatConfig` object.

## Obtaining API Keys

### Hugging Face

1. Create a free account at [Hugging Face](https://huggingface.co/)
2. Go to your profile settings and create a new API token
3. Add the token to your `.env.local` file as `NEXT_PUBLIC_HUGGINGFACE_API_KEY`

### OpenAI

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Go to the API section and create a new API key
3. Add the key to your `.env.local` file as `NEXT_PUBLIC_OPENAI_API_KEY`

### Ollama (Self-hosted)

1. Install [Ollama](https://ollama.ai/) on your local machine or server
2. Start the Ollama server
3. Add the endpoint URL to your `.env.local` file as `NEXT_PUBLIC_OLLAMA_ENDPOINT`

## Customization

You can customize the chat assistant by modifying the following files:

- `src/config/index.ts` - Chat configuration, predefined responses, and suggested questions
- `src/services/llm.ts` - LLM service implementation
- `src/components/chat.tsx` - Chat UI component

## Troubleshooting

If you encounter issues with the chat assistant:

1. Check your browser console for error messages
2. Verify that your API keys are correctly set in the `.env.local` file
3. Make sure the LLM provider you're using is available and responding
4. If using Ollama, ensure the Ollama server is running

If all else fails, the chat will automatically fall back to predefined responses.
