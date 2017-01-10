/**
 * @file
 * Specifying the most simple routes
 */

import Router from 'koa-router'; // @see https://github.com/alexmingoia/koa-router

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'It\'s a bird...';
});

export default router;
