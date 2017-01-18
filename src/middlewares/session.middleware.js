/**
 * Refreshing session
 */
export async function RefreshSession(ctx, next) {
  ctx.session.lastTouch = Date.now();
  await next();
}

export async function AuthenticationCheck(ctx, next) {
  const exceptions = ['/login', '/isauthenticated'];
  if (!ctx.session.authenticated && !exceptions.includes(ctx.req.url)) {
    ctx.redirect('/login');
  }

  await next();
}
