# TcukawiWa - Open Source Whatsapp Bot

TcukawiWa is an open-source Whatsapp bot built using [@open-wa/wa-automate](https://github.com/open-wa/wa-automate) and [@discordjs/collection](https://github.com/discordjs/collection) for the command handler. It is designed to automate various tasks and help you interact with your contacts on Whatsapp in a convenient and efficient manner.

## Command List

A full list of available commands can be found at https://tcukawi.tech/Tcukawi-WebCommands/. This list is regularly updated to include new features and functionality. If you would like to suggest a new command or feature, feel free to open an issue or make a pull request.


## Ubuntu/Linux Installation Note

For a better experience running TcukawiWa on Ubuntu/Linux, it is recommended to install `./chrome/google-chrome-stable_current_amd64.deb` using `apt install`. This will ensure that all dependencies required by @open-wa/wa-automate are properly installed and the bot runs smoothly.

To install the package, run the following command in your terminal:

```
sudo apt install ./chrome/google-chrome-stable_current_amd64.deb
```

## Installation

Installing TcukawiWa is easy, simply follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/MoonLGH/TcukawiWa.git`
2. Navigate to the TcukawiWa directory using `cd TcukawiWa`
3. Run `npm i` to install the dependencies
4. Create a .env file and include the following environment variables:
   - Secret (optional) - for the #genshinclaim command, should be in the format `{"env":{"token":"token","account_id":"id","uid":"uid"}}`
   - Licenses - @open-wa licenses that you have bought/obtained
   - MongoURL - the MongoDB URL to connect to your database
   - OPENAI_API_KEY - the OpenAI API key obtained from https://openai.com/api/ to use the #ai command
   - Sauce_API - the SauceNao API key obtained from https://saucenao.com/user.php to use the #sauce command
   - HasteBinToken - The api token to Hastebin for uploading 1000 > letter #eval (optional)
5. Start the bot by running `npm run start`

## Technology Stack

TcukawiWa is built using [Node.js](https://nodejs.org/), a JavaScript runtime environment, and [@open-wa/wa-automate](https://github.com/open-wa/wa-automate), a library for automating Whatsapp chats.

# Creating New Commands

To create a new command in Raw MD, you need to follow these simple steps:

1. Go to the `src/commands/` directory and find or create an appropriate folder for the category of the command you want to add.

2. In the folder, create a new file named `command.ts`.

3. Export the following variables in the file:

```ts
export const name = ""; // name is what will be used on (PREFIX)name
export const description = ""; // description is what will be shown on the help command
export const alias = []; // Optional which can be used as an alternative name
```

4. Import the following:

```ts
import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
```

5. Export a function that will execute the command. The template for the function should look like this:

```ts
export async function run(client:Client, message:Message) {
// Your code here
}
```

6. Your function should ideally return `void`.

Once you have completed these steps, your command is ready to use. You can now use it in the chat by typing `PREFIX` followed by the name of the command. If you want to see a list of available commands, you can type `PREFIX help` in the chat.


## Contributions

TcukawiWa is an open-source project and contributions are welcome. If you would like to contribute, please follow these steps:

1. Fork this repository
2. Create your feature branch using `git checkout -b my-new-feature`
3. Commit your changes using `git commit -am 'Add some feature'`
4. Push to the branch using `git push origin my-new-feature`
5. Create a new Pull Request

## License

TcukawiWa is licensed under the [MIT License](LICENSE).
