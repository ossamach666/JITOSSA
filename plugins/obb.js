//didn't work

/*import fetch from 'node-fetch'

let handler = async (m, { conn, args, text , usedPrefix, command }) => {
    if (!args[0]) throw '*_قم بتنزيل اللعبة التي تريد عن طريق .APK بعدها قم بطلب ال obb الخاص بها بهاذا الأمر_*\n\n ${usedPrefix + command}  free fire
    let res = await apk(text)
    await m.reply('*_جاري إرسال الobb الخاص بك صديقي_* \n\n لاتنسى متابعتي هنا \n www.instagram.com/ovmar_1')
    conn.sendMessage(m.chat, { document: { url: res.download }, mimetype: res.mimetype, fileName: res.fileName }, { quoted: m })
}
handler.command = /^(obb)$/i;
handler.help = ['obb'];
handler.tags = ['applications'];
handler.premium = false;
export default handler;

async function apk(url) {
    let res = await fetch('http://ws75.aptoide.com/api/7/apps/search?query=' + encodeURIComponent(url)+'&limit=1')
    let $ = await res.json()
    let download = $.datalist.list[0].obb.main.path
    let fileName = download.replace(/https:\/\/pool.obb.aptoide.com\//,' ').match(/(\w*)\/(.*)/)[2].replace(/-/ig,'.')
    if (!download) throw 'Can\'t download the apk!'
    let icon = $.datalist.list[0].icon
    let response = await fetch(download)
    let contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 1073741824) // Check if the file size is more than 1 gigabyte
        throw 'File size exceeds 1.5 gigabyte.'
    let mimetype = response.headers.get('content-type')
    return { fileName, mimetype, download}
}*/