const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const resultDiv = document.getElementById('result');

downloadBtn.addEventListener('click', async () => {
  const url = videoUrlInput.value.trim();

  if (!url) {
    resultDiv.innerHTML = '<span class="error-text">يرجى وضع رابط فيديو صحيح.</span>';
    return;
  }

  resultDiv.innerHTML = '<span class="status-text">⏳ جاري فحص واستخراج الرابط...</span>';

  try {
    // الاتصال بـ API مباشر لمعالجة الفيديوهات بدون سيرفر
    const response = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    const data = await response.json();

    if (data.url) {
      resultDiv.innerHTML = `
        <p style="color: #3fb950; font-weight: bold;">✅ تم التجهيز بنجاح!</p>
        <a href="${data.url}" class="download-link" target="_blank" download>اضغط هنا لتنزيل الفيديو</a>
      `;
    } else {
      resultDiv.innerHTML = '<span class="error-text">❌ تعذر الحصول على رابط التحميل، تأكد من صحة الرابط.</span>';
    }
  } catch (err) {
    resultDiv.innerHTML = '<span class="error-text">⚠️ حدث خطأ أثناء الاتصال بالخدمة.</span>';
  }
});
