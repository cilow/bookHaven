import type { UserType } from "@/lib/types";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/users";

export const fetchUsers = async (): Promise<UserType[]> => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const fetchUserById = async (id: number): Promise<UserType> => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const insertUser = async (
  user: Omit<UserType, "id" | "createdAt" | "updatedAt">
): Promise<UserType> => {
  let avatarUrl = user.avatar;

  if (user.avatar instanceof File) {
    const formData = new FormData();
    formData.append("file", user.avatar);

    const uploadResponse = await axios.post(
      `http://localhost:8080/api/images/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    avatarUrl = uploadResponse.data.url;
  }

  const newUser = {
    ...user,
    avatar: avatarUrl,
  };

  const response = await axios.post(API_BASE, newUser);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<UserType>
): Promise<UserType> => {
  const response = await axios.put(`${API_BASE}/${id}`, user);
  return response.data;
};

export async function deleteUser(id: number) {
  const res = await axios.delete(`${API_BASE}/${id}`);

  return res.data;
}
