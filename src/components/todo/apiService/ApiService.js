import axios from "axios";

// const authContext = useAuth();

// const username = authContext.username;

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)

export function retrieveTodos(username){
    return apiClient.get(`/users/${username}/todos`);
}

export function deleteTodo(username, id){
    return apiClient.delete(`/users/${username}/todos/${id}`)
}

export function retrieveTodo(username, id){
    return apiClient.get(`/users/${username}/todos/${id}`)
}

export function searchTodo(username, desc){
    return apiClient.get(`/users/${username}/todos?${desc}`)
}

export function updateTodo(username, id, todo){
    return apiClient.put(`/users/${username}/todos/${id}`, todo)
}

export function createTodo(username, todo){
    return apiClient.post(`/users/${username}/todos`, todo)
}