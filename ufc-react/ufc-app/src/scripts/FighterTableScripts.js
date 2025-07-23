import api from '../api/axiosConfig';

export const fetchFightersPage = async (page, eloView, setFighters, setTotalPages) => {
  try {
    const response = await api.get("/api/fighters/page", {
      params: {
        page,
        size: 20,
        sortBy: eloView,
      },
    });
    setFighters(response.data.content);
    setTotalPages(response.data.totalPages);
  } catch (err) {
    console.log(err);
  }
};