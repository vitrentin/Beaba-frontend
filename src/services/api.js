import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const searchUsers = async (searchCriteria) => {
  try {
    const token = localStorage.getItem("@beaba:token");
    const response = await api.post("/search/users", searchCriteria, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
export const searchProfiles = async (searchCriteria) => {
  try {
    const token = localStorage.getItem("@beaba:token");
    const response = await api.post("/search/profiles", searchCriteria, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching profiles:", error);
    throw error;
  }
};
export const searchModules = async (searchCriteria) => {
  try {
    const token = localStorage.getItem("@beaba:token");
    const response = await api.post("/search/modules", searchCriteria, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching modules:", error);
    throw error;
  }
};
export const searchTransactions = async (searchCriteria) => {
  try {
    const token = localStorage.getItem("@beaba:token");
    const response = await api.post("/search/transactions", searchCriteria, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching transactions:", error);
    throw error;
  }
};
export const searchFunctons = async (searchCriteria) => {
  try {
    const token = localStorage.getItem("@beaba:token");
    const response = await api.post("/search/functions", searchCriteria, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching functions:", error);
    throw error;
  }
};
