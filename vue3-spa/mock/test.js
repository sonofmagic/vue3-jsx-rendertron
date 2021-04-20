export default [
  {
    url: '/api/get',
    method: 'get',
    timeout: 100,
    response: ({ query }) => {
      return {
        code: 0,
        data: {
          name: 'icebreaker',
        },
      }
    },
  },
  {
    url: '/api/array',
    method: 'get',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        arr: ['A', 'B', 'C'],
      },
    },
  },
  {
    url: '/api/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'text/plain')
      res.statusCode = 200
      res.end(`hello, ${reqbody}`)
    },
  },
]
