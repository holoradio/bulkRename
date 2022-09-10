import * as fs from "fs";
import minimist from "minimist";

async function rename() {
  let pathUL = minimist(process.argv).path;
  let replace = minimist(process.argv).replace;
  let replaceWith = minimist(process.argv).with;
  let regex = minimist(process.argv).regex;
  let removeB = minimist(process.argv).removeB;

  // ^[0-9]+_ for the starting numbers
  // \s for whitespace
  // [＂]

  if (replaceWith === "emptySlot") {
    replaceWith = "";
  }

  try {
    process.chdir(pathUL);
    let files = await fs.readdirSync(process.cwd());

    for (let file of files) {
      let newFileName = file;

      if (replace) {
        newFileName = file.replace(replace, replaceWith);
      } else if (regex) {
        newFileName = file.replace(new RegExp(regex, "g"), replaceWith);
      } else if (removeB) {
        newFileName = file.replace(/[(]/g, replaceWith);
        newFileName = newFileName.replace(/[)]/g, replaceWith);
        newFileName = newFileName.replace(/[[]/g, replaceWith);
        newFileName = newFileName.replace("]", replaceWith);
        newFileName = newFileName.replace("@", replaceWith);
        newFileName = newFileName.replace("＊", replaceWith);
        newFileName = newFileName.replace("【", replaceWith);
        newFileName = newFileName.replace("】", replaceWith);
        newFileName = newFileName.replace(/[\/]/g, replaceWith);
        newFileName = newFileName.replace(/(\/)/g, replaceWith);
        newFileName = newFileName.replace(/(_\/)/g, replaceWith);
        newFileName = newFileName.replace(/[＂]/g, replaceWith);
        newFileName = newFileName.replace(/(__)/g, "_");
      }

      await fs.renameSync(file, newFileName);

      //   console.log(`${file} renamed to => ${newFileName}`);
    }
  } catch (e) {
    console.log(e);
  }
}

rename();
