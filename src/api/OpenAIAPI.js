import { Configuration, OpenAIApi } from 'openai';

export default class OpenAIAPI {
  // OpenAI Api
  static fetchOpenAI(params) {
    const { apiKey, prompt } = params;
    const configuration = new Configuration({ apiKey });

    return new OpenAIApi(configuration).createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0,
      max_tokens: 150,
    });
  }
}
