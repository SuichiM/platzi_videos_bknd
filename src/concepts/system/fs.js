const fs = require("fs");

/**
 * LIST THE FOLDER AND FILES OF A DIRECTORY
 */
const listFolder = (dir = __dirname) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.log(err);
    }
    console.log(files.join(", "));
  });
};

/**
 * CREATES A FOLDER BY DEFAULT ON THE CURRENT DIR
 * AND WITH RECURSIVE OPTION (DON'T CREATE ANIDATE FOLDER) IN FALSE
 */
const createFolder = (dir = __dirname, recursive = false) => {
  fs.mkdir(dir, { recursive }, (err) => {
    if (err) {
      return console.log(err);
    }
  });
};

/**
 * CREATE A COPY OF A FILE FROM 
 * ORIGIN TO DESTINATION
 */
const copyFile = (origin, destination) => {
  fs.copyFile(origin, destination, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("naranja.txt fue copiado como limon.txt");
  });
};

/** 
 * SWITCHES TO THE CHOICED FUNCTION
 * **/
const main = (option, or, dest) => {
  console.log("****** MAIN MENU ******");
  console.log("");

  switch (option) {
    case "ls":
      listFolder(or);
      break;

    default:
      help();
      break;
  }
};

/**
 * PRINTS AVAILABLE OPTIONS
 */
const help = () => {
  console.log(`
HELP:
  ls [dir]: list files of a directory by default the current directory
  mkdir:    create directory
  cp:       copy a file
`);
};

/******* MAIN SECTION *********/

const [frst, second, option, origin, destination] = process.argv;
const available = ["ls", "mkdir", "cp"];


if (!option || !available.includes(option)) help();
else main(option, origin, destination);
