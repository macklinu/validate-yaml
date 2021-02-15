// @ts-check

const { Toolkit } = require('actions-toolkit')
const tools = new Toolkit()

tools.github.pulls
  .listFiles(tools.context.issue())
  .then(response =>
    response.data.filter(
      item => item.status === 'added' || item.status === 'modified'
    )
  )
  .then(files => tools.log.debug(files))
  .catch(error => {
    tools.log.fatal(error)
    tools.exit.failure()
  })
