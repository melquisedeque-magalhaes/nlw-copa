export const envSchema = {
  type: 'object',
  required: [ 'SECRET' ],
  properties: {
    SECRET: {
      type: 'string',
    }
  }
}