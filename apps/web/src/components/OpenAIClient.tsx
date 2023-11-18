const { Configuration, OpenAIApi } = require("openai");

const supabaseUrl = 'https://api.openai.com/v1/engines/davinci/completions'
const openAiKey = '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'

const configuration = new Configuration({
    apiKey: openAiKey
  });

