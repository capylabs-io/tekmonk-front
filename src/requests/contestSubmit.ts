import { BASE_URL } from "@/contants/api-url";
import { REFS } from "@/contants/ref";
import tekdojoAxios from "@/requests/axios.config";
import { Media } from "@/types/common-types";
import { ContestSubmission, DataContestSubmission } from "@/types/contestSubmit";



export const uploadSource = async (refId: string, source: File): Promise<Media> => {
    const formData = new FormData();
    formData.append('ref', REFS["contest-submission"]);
    formData.append('refId', refId);
    formData.append('field', 'source');
    formData.append('files', source);

    const response = await tekdojoAxios.post(`${BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const uploadThumbnail = async (refId: string, thumbnail: File): Promise<Media> => {
    const formData = new FormData();
    formData.append('ref', REFS["contest-submission"]);
    formData.append('refId', refId);
    formData.append('field', 'thumbnail');
    formData.append('files', thumbnail);

    const response = await tekdojoAxios.post(`${BASE_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const createContestSubmission = async (contestSubmission: DataContestSubmission) => {
    const response = await tekdojoAxios.post(`${BASE_URL}/contest-submissions`, {
        data: contestSubmission
    });
    return response.data.data as ContestSubmission;
};

export const getContestSubmissionPagination = async (page: number, limit: number): Promise<ContestSubmission[]> => {
    const response = await tekdojoAxios.get(`${BASE_URL}/contest-submissions?populate=thumbnail&page=${page}&limit=${limit}`); // fix later
    return response.data;
};

export const getOneContestSubmission = async (id: string) => {
    const response = await tekdojoAxios.get(`${BASE_URL}/contest-submissions/${id}?populate=thumbnail`);
    return response.data;
}