import config from '../config';
import fs from 'fs';
import axios from 'axios';

export const getKeys = async () => {
  if (fs.existsSync(config.sheets.key_path)) {
    return;
  }
  try {
    const response = await axios({
      url: config.sheets.key_url,
      method: 'GET',
      responseType: 'stream',
    });

    const filePath = config.sheets.key_path;
    const fileStream = await fs.createWriteStream(filePath);
    response.data.pipe(fileStream);
  } catch (error) {
    throw new Error('Error downloading keys');
  }
};
