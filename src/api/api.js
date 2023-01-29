import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchSerchQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=29200569-eac0653170ef0949875a7ef10&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
