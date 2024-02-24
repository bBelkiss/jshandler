require('colors');
const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      testServer
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`[DELETED] Deleted command "${name}".`.red);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`[EDITED] Edited command "${name}".`.blue);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `[SKIPPED] Skipping registering command "${name}" as it's set to delete.`.blue
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`[REGISTERED] Registered command "${name}."`.green);
      }
    }
  } catch (error) {
    console.log(`[ERROR] There was an error: ${error}`.red);
  }
};