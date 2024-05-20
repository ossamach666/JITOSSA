import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `التحدث مع openai يمكنك الأن بهاذا الأمر التحدث واكتب أي سؤال \n\n مثـال :ظ\n. ai اين يوجد المغرب.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    const prompt = encodeURIComponent(text);

    const jitossa1 = `${jitossabot}/chatgpt?text=${prompt}`;

    try {
      let response = await fetch(jitossa1);
      let data = await response.json();
      let result = data.result;

      if (!result) {
        throw new Error('No valid JSON response from the first API');
      }

      await conn.sendMessage(m.chat, { text: result }, { quoted: m });
    } catch (error) {
      console.error('Error from the first API:', error);

      const model = 'llama';
      const senderNumber = m.sender.replace(/[^0-9]/g, ''); 
      const session = `JITOSSA_BOT_${senderNumber}`;
      const jitossa2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

      let response = await fetch(jitossa2);
      let data = await response.json();
      let result = data.completion;

      await conn.sendMessage(m.chat, { text: result }, { quoted: m });
    }

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['AI'];
handler.command = ['bro', 'chatgpt', 'ai', 'gpt'];

export default handler;