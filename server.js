const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("IMS Node JS CLI", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const askIntro = () => {
  const questions = [
    {
      name: "FULLNAME",
      type: "input",
      message: "What is Your Fullname?",
    },
  ];
  return inquirer.prompt(questions);
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file without extension?",
    },
    {
      type: "list",
      name: "EXTENSION",
      message: "What is the file extension?",
      choices: [".jsx", ".js", ".php", ".css"],
      filter: function (val) {
        return val.split(".")[1];
      },
    },
  ];
  return inquirer.prompt(questions);
};

const sayHi = (name) => {
  console.log(chalk.white.bgRedBright.bold(`Hello ${name}!! Welcome at IMS, Its a file creation utility`));
};
const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`;
  shell.touch(filePath);
  return filePath;
};

const success = (filepath) => {
  console.log(chalk.white.bgGreen.bold(`Done! File created at ${filepath}`));
};

const run = async () => {
  // show script introduction
  init();
  const { FULLNAME } = await askIntro();
  sayHi(FULLNAME);
  // ask questions
  const answers = await askQuestions();
  const { FILENAME, EXTENSION } = answers;

  // create the file
  const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  success(filePath);
};

run();
