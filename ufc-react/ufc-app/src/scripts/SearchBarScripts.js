import api from '../api/axiosConfig';

export const getAllNames = async (setAllNames) => {
  try {
    const response = await api.get("/api/fighters/names");
    setAllNames(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const getFilteredNames = (allNames, query) => {
  return allNames.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getMatchedName = (allNames, query) => {
  return allNames.find(
    (name) => name.toLowerCase() === query.trim().toLowerCase()
  );
};
