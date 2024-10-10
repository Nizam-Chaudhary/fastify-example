import Fastify from 'fastify';
import { controller } from './controller/controller.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(controller, { prefix: '/cont' });

fastify.route({
  method: 'GET',
  url: '/hello/:name',
  schema: {
    querystring: {
      properties: {
        lastName: { type: 'string' },
      },
      required: ['lastName'],
    },
    params: {
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    response: {
      200: {
        properties: {
          message: { type: 'string' },
        },
        required: ['message'],
      },
    },
  },
  handler: (req, reply) => {
    return {
      message: `Hello ${req.params.name} ${req.query.lastName}`,
    };
  },
});

try {
  fastify.listen({ port: 3002 });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
