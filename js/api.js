import fs from "fs/promises";

const API_URL = "http://localhost:8000";

/**
 * fonction pour faire des appel d'api dynamique
 *
 * @param {*} endpoint - endpoint demandé
 * @param {*} opts - le payload de l'appel d'API
 * @returns promise - donnée en format json
 */
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

/* ======================
 *  eleves
 * ====================== */

/**
 * fonction pour recupérer tous les élèves
 *
 * @returns promise - appel d'API
 */
export const getAllStudents = async () => {
    return await request("/eleves");
};

/**
 * fonction pour recupérer un élève par son id
 * @param {number} id - l'ID de l'élève
 * @returns promise - appel d'API
 */
export const getStudent = async (id) => {
    return await request(`/eleves/${id}`);
};

/* ======================
 *  progres
 * ====================== */

/**
 * fonction pour recupérer le progres d'un élève dans une matière
 *
 * @param {*} std - l'ID de l'élève
 * @param {*} mtr - l'ID de la matière
 * @returns promise - la promesse de la requête API
 */
export const getProgress = async (std = 1, mtr = "maths") => {
    const allProgress = await request("/progres");

    return allProgress.filter(
        (item) => item.eleve_id === String(std) && item.matiere_id === mtr,
    );
};

/**
 * fonction pour recupérer le progres d'un élève
 * toutes matieres confonduespar son id
 *
 * @param {number} id
 * @returns
 */
export const getProgresByStudent = (id) => {
    return request(`/progres?eleve_id=${id}`);
};

/**
 * fonction pour ajouter un nouveau progres
 *
 * @param {*} progresData - les données du progres à ajouter
 * @returns promise - requête API
 */
export const addProgress = (progresData) => {
    return request("/progres", {
        method: "POST",
        body: JSON.stringify(progresData),
    });
};

/**
 * fonction pour mettre a jour un progres existant
 *
 * @param {number} id - l'ID du progres à mettre à jour
 * @param {object} progresData - données du progres à modifier
 * @returns promise - requête API
 */
export const updateProgres = (id, progresData) => {
    return request(`/progres/${id}`, {
        method: "PATCH",
        body: JSON.stringify(progresData),
    });
};

/* ======================
 *  resultats
 *  ====================== */

/**
 * fonction pour recupérer tous les resultats
 *
 * @returns promise - appel d'api
 */
export const getResultats = async () => {
    return await request("/resultats");
};

/**
 * fonction pour recupérer les resultats d'un élève par son id
 *
 * @param {number} id
 * @returns promise - appel d'API
 */
export const getResultatByStudent = async (id) => {
    return await request(`/resultats?eleve_id=${id}`);
};

/**
 * fonction permettant d'ajouter un nouveau resultat
 *
 * @param {object} resData - les données du resultat à ajouter
 * @returns promise - appel d'API
 */
export const addResultat = async (resData) => {
    return await request("/resultats", {
        method: "POST",
        body: JSON.stringify(resData),
    });
};

/* ======================
 *  questions
 *  ====================== */

/**
 * fonction pour recupérer toutes les questions
 *
 * @returns promise - appel d'API
 */
export const getQuestions = async () => {
    return await request("/questions");
};

/**
 * fonction pour recupérer les question selon la matière
 *
 * @param {*} matiere - la matière
 */
export const getQuestionsByMatiere = async (matiere) => {
    return await request(`/questions?matiere_id=${matiere}`);
};
/* ======================
 *  matieres
 *  ====================== */

/**
 * fonction pour recupérer toutes les matières
 *
 * @returns promise - appel d'API
 */
export const getMatieres = async () => {
    return await request("/matieres");
};

/**
 * fonction pour recupérer une matière par son id
 *
 * @param {*} id - l'ID de la matière
 * @returns promise - apel d'API
 */
export const getMatiere = async (id) => {
    return await request(`/matieres/${id}`);
};

try {
    /*console.log(await getAllStudents());
    console.log(await getStudent(1));
    console.log(await getProgress(1, "maths"));
    console.log(
        await addProgress({
            id: "a61aKK",
            eleve_id: "1",
            matiere_id: "maths",
            question_repondus: 27,
            total_question: 67,
            best_score: 10,
            dernier_score: 7,
        }),
    );
    //console.log(await getMatieres());
    //console.log(await getMatiere("maths"));
    console.log(await getResultats());
    console.log(await getResultatByStudent(1));
    console.log(
        await addResultat({
            id: "a61aKK",
            eleve_id: "1",
            matiere_id: "maths",
            score: 10,
            date: "2023-09-15",
        }),
    );
    console.log(await getProgresByStudent(1));
    console.log(await updateProgres("p1", { best_score: 12 }));
    console.log(await getProgress(1, "maths"));*/
    console.log(await getQuestions());
} catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    fs.writeFile(
        "api_errors.log",
        `Erreur lors de l'appel à l'API : ${error.message}\n`,
        { flag: "a" },
    );
}
