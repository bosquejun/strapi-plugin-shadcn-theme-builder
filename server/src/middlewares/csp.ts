const middleware = async (ctx, next) => {
  const cspDirectives = [
    "default-src 'self'",
    "img-src 'self' data: blob: https://github.com https://avatars.githubusercontent.com *.githubusercontent.com",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
  ].join('; ');

  ctx.set('Content-Security-Policy', cspDirectives);

  await next();
};

export default middleware;
