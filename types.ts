export type TMenuOption = {
    text: string;
    callback: () => void;
}
export type TMenu = {
    title: string;
    options: TMenuOption[];
}

export type TCurrencyObject = {
    name: 'USD' | 'EUR',
    buy: string,
    sale: string
}

export type TTelegramCommandMenu = {
    command: string, description: string
}

export type TUserModel = {
    name: string;
    gender: 'male' | 'female'|'other';
    age: number;

}