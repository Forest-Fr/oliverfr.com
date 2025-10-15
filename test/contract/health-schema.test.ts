import { installOpenAIMock } from './_mock-openai';
       
describe('health/schema headers', () => {
  beforeAll(() => installOpenAIMock());

  it('GET /__health ok & CORS', async () => {
    const res = await fetch('http://localhost/__health');
    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBe('*');
    const j = await res.json();
    expect(j.ok).toBe(true);
    expect(typeof j.ts).toBe('number');
  });

  it('POST /chat returns X-Schema-Version and NDJSON JSON line', async () => {
    const res = await fetch('http://localhost/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ raw: 'hi', sessionId: 't1', params: {} })
    });
    expect(res.status).toBe(200);
    expect(res.headers.get('x-schema-version')).toBe('2024-10-01');

    const text = await res.text();
    // 合同约定：单行 JSON（NDJSON 兼容）
    const lines = text.trim().split('\n').filter(Boolean);
    expect(lines.length).toBe(1);
    const obj = JSON.parse(lines[0]);
    expect(typeof obj.text).toBe('string');
  });
});
