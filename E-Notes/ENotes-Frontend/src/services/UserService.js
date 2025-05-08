import { data } from "react-router";
import { httpClient } from "../config/AxiosHelper";


export const saveUser = async (formData) => {
    console.log("2")
    const response = await httpClient.post(`/api/saveUser`,formData);
    console.log("6")
    console.log(response.data)
    return response.data;
}

export const userLogin = async (credentials) => {
    const response = await httpClient.post(`/api/auth/login`,credentials,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // If using cookies for authentication
      });
      console.log("1 :- " , response)
      console.log("Status Code:", response.status);
    return response;
}

export const userLogout = async () => {
    const response = await httpClient.post(`/api/auth/logout`,{
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // If using cookies for authentication
      });
      console.log(response)
      console.log("Status Code:", response.status);
    return response;
}

export const getUserData = async (email) => {
    try {
        const response = await httpClient.get(`/api/getUser/${email}`);
        console.log(response)
        console.log(response.data)
        return response.data; // Return only the data, not the full response object
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Handle errors properly
    }
} 

export const getUserProfile = async (token) => {
    const response = await httpClient.get('/api/profile', {
        headers: { "Authorization": `Bearer ${token}` },
        withCredentials: true   
    });

    console.log(response)
    console.log(response.data)
    return response;
}


export const getAllUser = async (token) => {
    const response = await httpClient.get("/api/admin/viewUserData", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    console.log("User Service")
    console.log(response)
    return response.data;
} 


export const getAllUserNotes = async (token) => {
    const response = await httpClient.get('/api/user/viewNotes', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}

export const getNoteById = async (id) => {
    const token = localStorage.getItem("token")
    console.log("2")
    const response = await httpClient.get(`/api/user/note/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("3")
    console.log("Get Note by Id")
    console.log(response)
    console.log(response.data)
    return response.data;
}


export const saveNotes = async (formData) => {
    try {
        console.log("3")
        const token = localStorage.getItem("token")

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("userEmail", formData.userEmail);
        if (formData.file) {
            data.append("file", formData.file);
        }

        const response = await httpClient.post(`/api/user/file/saveNotes`,data,{
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log("13")
        console.log(response)
        console.log(response.data)
        return response;
    } catch (error) {
        console.error("Error saving notes:", error);
        console.log("14")
        throw error;
    }
}

export const updateNotes = async (id, formData) => {
    const token = localStorage.getItem("token")

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("userEmail", formData.userEmail);

    if (formData.file) {
        data.append("file", formData.file);
    }

    const response = await httpClient.put(`/api/user/file/updateNotes/${id}`,data,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        },
    });
    console.log("Updated notes response : ",response)
    return response.data;
}

export const deleteNote = (id) => {
    const token = localStorage.getItem("token")
    console.log("2")
    const response = httpClient.get(`/api/user/deleteNotes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("3")
    return response;
};