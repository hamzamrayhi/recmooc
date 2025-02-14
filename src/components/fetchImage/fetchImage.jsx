// src/utils/fetchImage.js
import axios from 'axios';

const PEXELS_API_KEY = 'Zh3lIN3Wiw4swSkQcX6leVzvh8TGdztxnhxmLectSXjhjc14264xzyMj';

export const fetchImage = async (query) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search', {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 1,
      },
    });
    if (response.status === 200) {
      const imageUrl = response.data.photos[0]?.src?.medium;
      return imageUrl;
    } else {
      console.error(`Error fetching image: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
