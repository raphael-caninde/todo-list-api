import jwt from 'jsonwebtoken';

const tokenGenerate = (id: number, email: string) => {
  const token = jwt.sign({ id , email }, process.env.JWT_SECRET as string , {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token
};

export {
  tokenGenerate,
};
