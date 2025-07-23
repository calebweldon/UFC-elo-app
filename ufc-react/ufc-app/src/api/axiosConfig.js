import axios from 'axios';

export default axios.create({
    // baseURL: "https://ufc-springboot-297559815689.us-west1.run.app",
    baseURL: "http://localhost:8080",
    headers: {"ngrok-skip-browser-warning": "true"}
});