import axios from "axios";
import useAuth from "./useAuth";

const QuestionApi = () => {
    const { isAuthenticated, token } = useAuth();

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8081/api/v1/quizzes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch questions:', error.message);
            return [];
        }
    };

    const addQuestion = async (newQuestion) => {
        try {
            const response = await axios.post('http://127.0.0.1:8081/api/v1/quizzes', newQuestion, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to add question:', error.message);
            return [];
        }
    };

    const editQuestion = async (id, updatedQuestion) => {
        try {
            const response = await axios.put(`http://127.0.0.1:8081/api/v1/quizzes/${id}`, updatedQuestion, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to edit question:', error.message);
            return [];
        }
    };

    const deleteQuestion = async (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        try {
            await axios.delete(`http://127.0.0.1:8081/api/v1/quizzes/${id}`, requestOptions);
        } catch (error) {
            console.error("Error in deleteQuestion: ", error);
        }
    };

    return {
        getQuestions,
        addQuestion,
        editQuestion,
        deleteQuestion,
    };
};

export default QuestionApi;