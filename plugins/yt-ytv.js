import ytdl from 'ytdl-core';
import fs from 'fs';
import os from 'os';

let limit = 500;
let handler = async (m, { conn, args, isPrems, isOwner, usedPrefix, command }) => {
  if (!args || !args[0]) throw `التحميـل الفيديوهـات من يـوتوب \n\n مثـال :\n${usedPrefix + command} https://youtu.be/Xb1-Oh1_msQ`;
  if (!args[0].match(/youtu/gi)) throw `تأكد من أن الرابط موجود على YouTube`;

  let chat = global.db.data.chats[m.chat];
  m.react(rwait);
  try {
    const info = await ytdl.getInfo(args[0]);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
    if (!format) {
      throw new Error('لم يتم العثور على صيغ صالحة');
    }

    if (format.contentLength / (1024 * 1024) >= limit) {
      return m.reply(`≡ *ABHU YTDL*\n\n▢ *⚖️الحجم*: ${format.contentLength / (1024 * 1024).toFixed(2)}MB\n▢ *🎞️الجودة*: ${format.qualityLabel}\n\n▢ الملف يتجاوز الحد المسموح *+${limit} MB*`);
    }

    const tmpDir = os.tmpdir();
    const fileName = `${tmpDir}/${info.videoDetails.videoId}.mp4`;

    const writableStream = fs.createWriteStream(fileName);
    ytdl(args[0], {
      quality: format.itag,
    }).pipe(writableStream);

    writableStream.on('finish', () => {
      conn.sendFile(
        m.chat,
        fs.readFileSync(fileName),
        `${info.videoDetails.videoId}.mp4`,
        ` 
	  ⬡ العنوان: ${info.videoDetails.title}
	  ⬡ المدة: ${info.videoDetails.lengthSeconds} ثانية
	  ⬡ المشاهدات: ${info.videoDetails.viewCount}
	  ⬡ التحميل: ${info.videoDetails.publishDate}
	\n > inatagram.com/ovmar_1`,
        m,
        false,
        { asDocument: chat.useDocument }
      );

      fs.unlinkSync(fileName); // حذف الملف المؤقت
      m.react(done);
    });

    writableStream.on('error', (error) => {
      console.error(error);
      m.reply('*حدث خطأ أثناء محاولة تنزيل الفيديو. يرجى المحاولة مرة أخرى.*');
    });
  } catch (error) {
    console.error(er>ror);
    m.reply('*حدث خطأ أثناء معالجة الفيديو. يرجى المحاولة مرة أخرى.*');
  }
};

handler.help = ['ytmp4 <رابط-يوتيوب>'];
handler.tags = ['downloadet'];
handler.command = ['ytmp4', 'ytv'];
handler.diamond = false;

export default handler;