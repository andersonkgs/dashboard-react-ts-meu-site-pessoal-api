import api from "./api";

export interface Informacoes {
    id?: number;
    foto: string;
    nome: string;
    cargo: string;
    sobre: string;
}

export const createInformacoes = async (informacoes: Informacoes): Promise<Informacoes> => {
    const response = await api.post<Informacoes>("/informacoes", informacoes);
    return response.data;
}

export const updateInformacoes = async (informacoes: Informacoes): Promise<Informacoes> => {
    const response = await api.put<Informacoes>("/informacoes/1", informacoes);
    return response.data;
}

export const getInformacoes = async (): Promise<Informacoes> => {
    const response = await api.get<Informacoes>("/informacoes/1");
    return response.data;
}

export const deleteInformacoes = async (id: number | undefined): Promise<Informacoes> => {
    const response = await api.delete<Informacoes>(`/informacoes/${id}`); // Ver se id está correto
    return response.data;
}

export const createOrUpdateInformacoes = async (informacoes: Informacoes): Promise<Informacoes> => {
    if (informacoes.id) {
        return await updateInformacoes(informacoes);
    } else {
        return await createInformacoes(informacoes);
    }    
}
