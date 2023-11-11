import axios from "axios";
// import { Report } from 'notiflix/build/notiflix-report-aio';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchBySearch = async (searchWord, page = 1) => {
    const API_KEY = '39708192-1d0c61ff60ff411770af0a0fc';
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: searchWord,
        image_type: "photo",
        orientation: "horizontale",
        safesearch: true,
        page: page,
        per_page: 12,
    });

    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
};