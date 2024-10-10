const responseSchema = {
  response: {
    200: {
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const controller = (fastify, options, done) => {
  fastify.get('/', { schema: responseSchema }, (req, reply) => {
    return {
      message: 'Hello, World',
    };
  });

  fastify.get('/:name', { schema: responseSchema }, (req, reply) => {
    return {
      message: `Hello, ${req.params.name}`,
    };
  });

  done();
};
