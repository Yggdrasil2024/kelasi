const API_URL = "http://localhost:8000/";

const request = async (endpoint, opts = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...opts.headers,
            },
            ...opts,
        });

        if (!response.ok) {
            throw new Error(
                `Erreur HTTP : ${response.status} (${response.statusText})`,
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`[API Error] sur ${endpoint}:`, error);
        throw error;
    }
};

const getAllStudents = async () => {
    return await request("/eleves");
};

const getStudent = async (id) => {
    return await request(`/eleves/${id}`);
};

const addStudent = async (std) => {
    return await request(``);
};
