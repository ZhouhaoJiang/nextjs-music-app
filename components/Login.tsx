import { apiUrl } from "@/public/apiUrl.tsx";

export async function loginStatus() {
    const response = await fetch(`${apiUrl}/login/status`)
    if (!response.ok) {
        if (response.status === 404) {
            console.error('Data not found');
        } else {
            console.info('Network response was not ok');
        }
    }
    const responseBody = await response.json();
    if (responseBody.data.account == "null") {
        return
    }
}

export default function login() {

}