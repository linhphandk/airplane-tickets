import bcrypt from "bcrypt";
const saltRounds = 10;
export const hashPassword = (password: string): string => {
  const hash = bcrypt.hashSync(password, saltRounds);

  return hash;
};

export const comparePassword = (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
