import axios from "axios";

const QuestionApi = {
    getQuestions: async () => {
        const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiYTMyMzgxNjAtOTFjMi0xMWVlLWEzOTEtMmRmZjBkZDI4YTVmIiwidXNlcm5hbWUiOiJzdHJpbmciLCJkaXNwbGF5TmFtZSI6InN0cmluZyIsImVtYWlsIjoic3RyaW5nIiwicmFua2luZ1BvaW50IjowLCJiYWxhbmNlIjowfSwic3ViIjoic3RyaW5nIiwiaWF0IjoxNzAxNTk3NTc5LCJleHAiOjE3MDE2ODM5Nzl9.Y6pJDzZQLTzSHRPgITNbtEwMMBuJL3Bfs_71PI6bB60h0fAgD6UJrCb41Qdp4re7";

        try {
            const response = await axios.get('http://192.168.88.67:8081/api/v1/quizzes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${yourAccessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch questions:', error.message);
            return [];
        }
    },

    addQuestion: async (newQuestion) => {
        const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiMzBhZDhhY2UtOTE5OC0xMWVlLWE2NjUtYzUzZmI0NTY0YjE0IiwidXNlcm5hbWUiOiJhZG1pbiIsImRpc3BsYXlOYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJhbmtpbmdQb2ludCI6MCwiYmFsYW5jZSI6MH0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMTU3OTM3NCwiZXhwIjoxNzAxNjY1Nzc0fQ.8FC-xIixknbl7A0gDXepLlkh4Ys1Bp8GSqX6LKy7ZeksbNwDe0EVsVxSG98YMGuN";

        try {
            const response = await axios.post('http://192.168.88.67:8081/api/v1/quizzes', newQuestion, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${yourAccessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to add question:', error.message);
            return [];
        }
    },

    editQuestion: async (id, updatedQuestion) => {
        const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiMzBhZDhhY2UtOTE5OC0xMWVlLWE2NjUtYzUzZmI0NTY0YjE0IiwidXNlcm5hbWUiOiJhZG1pbiIsImRpc3BsYXlOYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJhbmtpbmdQb2ludCI6MCwiYmFsYW5jZSI6MH0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMTU3OTM3NCwiZXhwIjoxNzAxNjY1Nzc0fQ.8FC-xIixknbl7A0gDXepLlkh4Ys1Bp8GSqX6LKy7ZeksbNwDe0EVsVxSG98YMGuN";

        try {
            const response = await axios.put(`http://192.168.88.67:8081/api/v1/quizzes/${id}`, updatedQuestion, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${yourAccessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Failed to edit question:', error.message);
            return [];
        }
    },

    deleteQuestion: async (id) => {
        const yourAccessToken = "eyJhbGciOiJIUzM4NCJ9.eyJ1c2VyIjp7ImlkIjoiMzBhZDhhY2UtOTE5OC0xMWVlLWE2NjUtYzUzZmI0NTY0YjE0IiwidXNlcm5hbWUiOiJhZG1pbiIsImRpc3BsYXlOYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJhbmtpbmdQb2ludCI6MCwiYmFsYW5jZSI6MH0sInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwMTU3OTM3NCwiZXhwIjoxNzAxNjY1Nzc0fQ.8FC-xIixknbl7A0gDXepLlkh4Ys1Bp8GSqX6LKy7ZeksbNwDe0EVsVxSG98YMGuN";

        const requestOptions = {
            method: "DELETE",
            headers: {
                'Authorization': 'Beerer ' + yourAccessToken,
            }
        };

        try {
            await axios.delete(`http://192.168.88.67:8081/api/v1/quizzes/${id}`, requestOptions);
        } catch (error) {
            console.error("Error in deleteQuestion: ", error);
        }
    },
};

export default QuestionApi;