/* eslint-disable camelcase */

export default async ({ image }) => {
  const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxe6fnkgw/image/upload';
  const UPLOAD_PRESET = 'hrybdt7v';
  const formData = new FormData();
  formData.append('file', image.files[0]);
  formData.append('upload_preset', UPLOAD_PRESET);
  const options = {
    method: 'POST',
    mode: 'cors',
    body: formData
  };
  try {
    const data = await fetch(UPLOAD_URL, options);
    const { version, public_id, format } = await data.json();
    const imageUrl = `https://res.cloudinary.com/dxe6fnkgw/image/upload/w_300,h_300/v${version}/${public_id}.${format}`;
    return imageUrl;
  } catch (err) {
    throw err;
  }
};
