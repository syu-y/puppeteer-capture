import { args, defaultViewport, executablePath, headless, puppeteer } from 'chrome-aws-lambda';
import { config, S3, Endpoint } from 'aws-sdk';

// S3の設定
config.update({ region: process.env.AWS_REGION });
// S3のオプション（LOCALで実行した際の設定）
const s3Options = process.env.LOCAL
  ? {
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      endpoint: new Endpoint('http://localhost:8081'),
    }
  : {};
// s3のクライアント
const s3 = new S3(s3Options);
// バケット名
const bucket = process.env.CAPTURE_BUCKET;
// アップロード
const putObject = ({ key, body, contentType, acl }) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: acl,
  };
  console.log(params);
  return s3.putObject(params).promise();
};

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

  // S3へアップロード
  try {
    await putObject({
      key: 'hoge.jpg',
      body: jpgBuf,
      contentType: 'image/jpeg',
      acl: 'public-read',
    });
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.message };
  }

  return { statusCode: 200, body: 'キャプチャの取得に成功しました。'};

};
