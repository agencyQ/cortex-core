import { Command } from 'commander'
import { createInitCommand } from './commands/init.js'

const program = new Command()

program
  .name('cortex-core')
  .description('AgencyQ Claude Code setup CLI')
  .version('0.1.0')

program.addCommand(createInitCommand())

program.parseAsync(process.argv).catch((err: unknown) => {
  console.error(err)
  process.exit(1)
})
