export interface AuthData {
    accessToken: string;
    user: {
        id: number;
        name: string;
        lastName: string;
        email: string;
    }
}
