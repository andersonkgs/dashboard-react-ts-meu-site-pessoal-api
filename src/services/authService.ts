import api from "./api";

export interface User {
    email: string;
    password: string;
}

export const login = async (user: User): Promise<User> => {
    const response = await api.post<User>("/auth/login", user);
    return response.data;
}
