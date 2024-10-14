import { BASE_URL } from "@/contants/api-url";
import { REFS } from "@/contants/ref";
import tekdojoAxios from "@/requests/axios.config";
import { useUserStore } from "@/store/UserStore";
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

export const uploadAssets = async (refId: string, img: File): Promise<Media> => {
    const formData = new FormData();
    formData.append('ref', REFS["contest-submission"]);
    formData.append('refId', refId);
    formData.append('field', 'assets');
    formData.append('files', img);

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

export const getContestSubmissionPagination = async (page: number, limit: number, keyword: string) => {
    const response = await tekdojoAxios.get(`${BASE_URL}/contest-submissions?populate[contest_entry][populate]=user&populate=thumbnail&pagination[page]=${page}&pagination[pageSize]=${limit}&sort[0]=id:asc&filters[contest_entry][candidateNumber][$containsi]=${keyword}`); 
    return response.data;
};

export const getOneContestSubmission = async (id: string) => {
    const response = await tekdojoAxios.get(`${BASE_URL}/contest-submissions/${id}?populate[contest_entry][populate]=user&populate[thumbnail]=*&populate[assets]=*`);
    return response.data ;
}