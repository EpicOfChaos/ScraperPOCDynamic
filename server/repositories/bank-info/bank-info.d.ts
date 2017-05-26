export interface BankInfo {
    username: string
    password: string
    cookies: Cookie[]
}

export interface Cookie {
    name: string
    value: string
    domain: string
    path: string
    expires: number
    size: number
    httpOnly: boolean,
    secure: boolean,
    session: boolean
}