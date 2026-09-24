/**
 * fonction permettant de communiquer avec js server pour recuperer
 * les different questions a poser dans le quiz.
 *
 * @returns string - données json des questions à posé à l'eleve
 */
const getQuestion = async () => {
    try {
        const questions = await fetch("http://localhost:3000/questions");
        if (questions.ok) {
            return JSON.stringify(questions);
        } else {
            throw new Error("les questions n'ont pas pu etre recuperer");
        }
    } catch (error) {
        console.error("error", error);
    }
};

/**
 * fonction qui va recuper les matieres qui vont s'afficher sur
 * l'interface pour que l'eleve puisse les selectionner.
 *
 * @returns string
 */
const setMatiere = async () => {
    try {
        res = await fetch("http://localhost:3000/matieres");
        if (res.ok) {
            return JSON.stringify(res);
        } else {
            throw new Error("les matière n'ont pas pu etre recuperer");
        }
    } catch (error) {
        console.error("error", error);
    }
};
