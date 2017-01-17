/**
 * Refreshing session
 */
export async function RefreshSession(ctx, next){
  ctx.session.lastTouch = Date.now();
  await next();
}

export async function AuthenticationCheck(ctx, next) {
  if(!ctx.session.authenticated && ctx.req.url !== '/login'){
    // ctx.redirect('/login');
  }

  await next();
}
