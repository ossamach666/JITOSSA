import fs from 'fs'
import acrcloud from 'acrcloud'

// إنشاء كائن جديد من ACRCloud بواسطة المفاتيح الخاصة
let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
})

// تعريف دالة handler كدالة async
let handler = async m => {
  // التأكد مما إذا كانت الرسالة المترابطة معتمدة على الاقتباس (quoted) أم لا
  let q = m.quoted ? m.quoted : m
  // الحصول على نوع ملف الوسائط
  let mime = (q.msg || q).mimetype || ''
  // التحقق مما إذا كان نوع الملف هو صوتي أو فيديو
  if (/audio|video/.test(mime)) {
    // تحميل الملف من الرسالة
    let media = await q.download()
    // استخراج امتداد الملف
    let ext = mime.split('/')[1]
    // كتابة الملف المحمل إلى مجلد مؤقت
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
    // تحديد الموسيقى باستخدام ACRCloud
    let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
    // فحص نتيجة التعرف
    let { code, msg } = res.status
    if (code !== 0) throw msg
    // استخراج بعض المعلومات من نتيجة التعرف
    let { title, artists, album, genres, release_date } = res.metadata.music[0]
    // تنسيق النص للرد على الرسالة
    let txt = `
𝚁𝙴𝚂𝚄𝙻𝚃
• 📌 *العنوان*: ${title}
• 👨‍🎤 *الفنانون*: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'لم يتم العثور'}
• 💾 *الألبوم*: ${album.name || 'لم يتم العثور'}
• 🌐 *الأنواع*: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'لم يتم العثور'}
• 📆 *تاريخ الإصدار*: ${release_date || 'لم يتم العثور'}
`.trim()
    // حذف الملف المؤقت
    fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
    // إرسال النص المنسق كرد على الرسالة
    m.reply(txt)
  } else throw '*قم أولا بإرسال أوديو فيه الأغنية التي تريد البحث عنها بعدها أكتب \n\n .shazam*'
}

// تعيين بعض الخصائص للدالة handler
handler.help = ['shazam']
handler.tags = ['search']
handler.command = /^quemusica|shazam|whatmusic$/i

// تصدير الدالة handler كافتراضي
export default handler