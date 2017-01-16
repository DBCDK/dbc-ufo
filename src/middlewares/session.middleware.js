/**
 * Refreshing session
 */
export async function refreshSession(){
  ctx.session.lastTouch = Date.now();
}
