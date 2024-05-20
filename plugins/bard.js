import uploadImage from '../lib/uploadImage.js';
import BardAI from '../lib/bard.js';

const bardAi = new BardAI();

let handler = async (message, {
  conn: connection,
  args: arguments,
  usedPrefix: prefix,
  command: cmd
}) => {
  let inputText;
  if (arguments.length >= 1) {
    inputText = arguments.slice(0).join(" ");
  } else {
    if (message.quoted && message.quoted.text) {
      inputText = message.quoted.text;
    } else {
      return message.reply("يمكنك الأن الـتحدث مع موديل غوغل الجديد bard\n\nمثـال \n .bard حوار حول المغرب");
    }
  }
  let quotedMessage = message.quoted ? message.quoted : message;
  let mimeType = (quotedMessage.msg || quotedMessage).mimetype || '';
  await message.react('💬');
  if (!mimeType) {
    try {
      let response = await Bard(inputText);
      await message.reply(response.content);
    } catch (error) {
      throw "An error occured";
    }
  } else {
    let downloadedImage = await quotedMessage.download();
    let isImage = /image\/(png|jpe?g)/.test(mimeType);
    if (isImage) {
      let uploadedImage = await uploadImage(downloadedImage);
      let responseWithImage = await BardImg(inputText, uploadedImage);
      await message.reply(responseWithImage.content);
    } else {
      await message.reply("Only images are supported");
    }
  }
};

handler.help = ["bard"];
handler.tags = ['ai'];
handler.command = /^(bard)$/i;
export default handler;

async function Bard(question) {
  return await bardAi.question({
    'ask': question
  });
};

async function BardImg(question, image) {
  return await bardAi.questionWithImage({
    'ask': question,
    'image': image
  });
};