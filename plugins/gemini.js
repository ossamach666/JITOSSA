import Gemini from "gemini-ai"

let handler = async (m, { conn, args }) => {
  const text = args.join` `;
  if (!text) return conn.reply(m.chat, '*معك Gemini الذكاء الاصطناعي من شركة غوغل* يمكنك استخدامي عبر كتابة مثلا هكذا :\n\n*.gemini* من هو ابن القيم', m);
const gemini = new Gemini("AIzaSyCDr8qgyPDmr47zKPT8oegKZPTGEki-Lyw") //GET APIKEY IN HERE https://makersuite.google.com/app/apikey
         const chat = gemini.createChat();
         let a = await chat.ask(text)
    console.log(a);
    conn.reply(m.chat, a, m)
} 
handler.help = ['gemini']
handler.tags = ['ai'];
handler.command = /^gemini?$/i;
export default handler;