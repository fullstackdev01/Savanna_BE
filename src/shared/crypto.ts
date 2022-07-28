import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export const checkPassword = async (password: string, hashPassword: string) => {
    const compare = await bcrypt.compare(password, hashPassword);
    return compare;
};