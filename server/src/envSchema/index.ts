export const envSchema = {
  type: 'object',
  required: [ 'SECRET', 'PORT' ],
  properties: {
    SECRET: {
      type: 'string',
    },
    PORT: {
      type: 'number'
    }
  }
}