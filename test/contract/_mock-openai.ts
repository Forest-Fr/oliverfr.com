export function installOpenAIMock() {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (async (input: any, init?: any) => {
    const url = typeof input === 'string' ? input : (input?.url || '');
    if (String(url).includes('api.openai.com')) {
      const body = JSON.stringify({
        id: 'cmpl-mock',
        choices: [{ message: { content: '```ts\nexport const ok = true;\n```' } }],
        usage: { prompt_tokens: 12, completion_tokens: 20, total_tokens: 32 }
      });
      return new Response(body, { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return realFetch(input, init);
  }) as any;
}
