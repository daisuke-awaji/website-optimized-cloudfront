/* eslint-disable no-console */
const { sleep } = require('@serverless/platform-client/src/utils')
const { publishEdgeLambda, deleteEdgeLambda, getClients } = require('./utils')
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

it.skip('publish cloudfront function and delete it.', async () => {
  const credentials = getCredentials()
  const clients = getClients(credentials.aws, 'us-east-1')
  const deployedFunction = await publishEdgeLambda(clients)
  console.log(deployedFunction)
  await deleteEdgeLambda(clients, deployedFunction.FunctionArn)
})

it('get lambda status', async () => {
  const credentials = getCredentials()
  const clients = getClients(credentials.aws, 'us-east-1')
  const deployedFunction = await publishEdgeLambda(clients)

  let fn = undefined
  let retryCount = 0
  while (fn?.Configuration?.State !== 'Active' && retryCount < 3) {
    fn = await clients.lambda
      .getFunction({
        FunctionName: deployedFunction.FunctionName
      })
      .promise()
    console.log({ lambdaState: fn.Configuration.State })
    await sleep(3000)
    retryCount++
  }
})
