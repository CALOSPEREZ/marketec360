import { HttpStatus } from '@nestjs/common';
export const handleResponse = (
  res: any,
  statusCode: HttpStatus,
  message = 'ok',
  data = null,
) => {
  return res.status(statusCode).send({
    message,
    data,
  });
};
export const loginResponse = (data: any): any => {
  return {
    message: 'ok',
    data: {
      token: data.token,
      name: data.user.name,
      lastName: data.user.lastName,
      role: data.user.role_id.value,
    },
  };
};
