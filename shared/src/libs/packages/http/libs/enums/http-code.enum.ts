const HttpCode = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  UNPROCESSED_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
} as const;

export { HttpCode };
