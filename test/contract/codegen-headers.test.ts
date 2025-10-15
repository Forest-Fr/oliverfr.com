import { installOpenAIMock } from './_mock-openai';
      
describe('codegen headers & continue rounds', () => {
  beforeAll(() => installOpenAIMock());

  it('POST /codegen returns required headers', async () => {
    const res = await fetch('http://localhost/codegen', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        mode: 'create',
        language: 'typescript',
        input: 'return a ts module',
        return: 'code',
        idempotency_key: 'k1'
      })
    });

    expect(res.status).toBe(200);
    expect(res.headers.get('x-route-used')).toBe('code.generate');
    expect(res.headers.get('x-code-only-enforced')).toBe('1');
    expect(['code','diff']).toContain(res.headers.get('x-return-form'));
    expect(res.headers.has('x-model-used')).toBeTruthy();
    expect(res.headers.get('x-code-continue-rounds')).toMatch(/^\d+$/);

    const j = await res.json();
    expect(j.ok).not.toBe(false);
    expect(typeof j.text).toBe('string');
    // fenced code is returned by mock
    expect(j.text.includes('```')).toBe(true);
  });
});
