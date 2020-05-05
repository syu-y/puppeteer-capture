import { args, defaultViewport, executablePath, headless, puppeteer } from 'chrome-aws-lambda';
import { writeFileSync } from 'fs';

const getCapture = async (url) => {
  // ブラウザの起動
  let browser = null;
  try {
    browser = await puppeteer.launch({
      args,
      defaultViewport,
      executablePath: await executablePath,
      headless,
    });

    // ページに移動
    const page = await browser.newPage();
    await page.goto(url);

    // キャプチャの取得（フルページ、jpegを指定）
    return await page.screenshot({ fullPage: true, type: 'jpeg' });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};

export const captureFunction = async event => {
  const url = event.url || 'https://google.com/';

  // キャプチャ取得
  const jpgBuf = await getCapture(url);
  if (!jpgBuf) {
    return { statusCode: 500, body: 'キャプチャの取得に失敗しました.' };
  }

  // ファイルに書き出し
  writeFileSync('/tmp/hoge.jpg', jpgBuf);

  return { statusCode: 200, body: 'キャプチャの取得に成功しました。'};

};
