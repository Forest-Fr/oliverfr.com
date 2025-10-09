export default {
  async fetch() {
    return new Response("Hello from oliverfr.com Worker!", {
      headers: { "content-type": "text/plain" },
    });
  },
};
