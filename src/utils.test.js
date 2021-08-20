/* eslint-disable no-console */
const { publishEdgeLambda, getClients } = require('./utils')
require('dotenv').config()
/*
 * Fetches AWS credentials from the current environment
 * either from env vars, or .env file in the /tests directory
 */
const getCredentials = () => {
  // eslint-disable-next-line no-console
  const credentials = {
    aws: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  }

  if (!credentials.aws.accessKeyId || !credentials.aws.secretAccessKey) {
    throw new Error('Unable to run tests. AWS credentials not found in the envionrment')
  }

  return credentials
}

beforeAll(() => {
  jest.setTimeout(300000)
})

it('publish cloudfront function and delete it.', async () => {
  const credentials = getCredentials()
  const clients = getClients(credentials.aws, 'us-east-1')
  const deployedFunction = await publishEdgeLambda(clients)
  console.log(deployedFunction)
})
