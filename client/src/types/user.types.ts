export type UserData = {
    name: string;
    lastname: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export type FormErrors = {
    [key in keyof UserData]?: string;
}

export type RegisterData = Omit<UserData, 'repeatPassword'>;

export type ResponseUserData = {
    id: string;
    email: string;
}
export type ResponseData = {
    message: string;
    user: ResponseUserData;
    token: string;
}

export type UserState = {
    isAuthenticated: boolean;
    user: ResponseUserData | null;
    error?: string;
}

export type Balance = {
    amount: string;
    expenses: string,
    income: string,
}