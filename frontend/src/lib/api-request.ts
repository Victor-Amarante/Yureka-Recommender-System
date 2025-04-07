import { ZodSchema, z } from 'zod';
import { api } from './api-client';

const ApiRequestParamsSchema = z
  .object({
    endpoint: z.string().refine((val) => !val.includes('//'), {
      message: 'Endpoint cannot contain double slashes',
    }),
    method: z.enum(['get', 'post', 'put', 'delete']),
    responseSchema: z.instanceof(ZodSchema).optional(),
    requestSchema: z.instanceof(ZodSchema).optional(),
    data: z.any().optional(),
  })
  .refine(
    (data) => {
      if (data.data !== undefined && data.requestSchema === undefined) {
        return false;
      }
      if (data.method === 'get' && data.data !== undefined) {
        return false;
      }
      return true;
    },
    {
      message:
        'Invalid combination: Either data requires requestSchema, or GET requests cannot have data',
    },
  );

type ApiRequestParams<TReq = any, TResp = any> = z.infer<
  typeof ApiRequestParamsSchema
> & {
  requestSchema?: ZodSchema<TReq>;
  responseSchema?: ZodSchema<TResp>;
  data?: TReq;
};

function validateSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Data validation failed: ${error.message}`);
    }
    throw error;
  }
}

class UserError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = 'UserError';
  }
}

export async function apiRequest<TResp = any, TReq = any>(
  params: ApiRequestParams<TReq, TResp>,
): Promise<TResp> {
  try {
    ApiRequestParamsSchema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid API request parameters: ${error.message}`);
    }
    throw error;
  }

  const { method, endpoint, data, requestSchema, responseSchema } = params;

  const validatedData =
    data && requestSchema ? validateSchema(requestSchema, data) : undefined;

  const methodMap = {
    post: () => api.post(endpoint, validatedData),
    get: () => api.get(endpoint, { params: validatedData }),
    put: () => api.put(endpoint, validatedData),
    delete: () => api.delete(endpoint, { data: validatedData }),
  };

  const requestFn = methodMap[method];

  try {
    const response = await requestFn();

    if (!response.status || response.status < 200 || response.status >= 400) {
      let exceptionMessage =
        'No message provided. statusCode: ' + response.status;
      let exceptionCode = response.statusText || 'ERROR';

      const ApiResponseErrorSchema = z.object({
        message: z.string(),
        code: z.string(),
        status: z.string(),
      });

      try {
        const errorData = validateSchema(ApiResponseErrorSchema, response.data);
        exceptionMessage = errorData.message;
        exceptionCode = errorData.code;
      } catch (e) {}

      throw new UserError(exceptionMessage, exceptionCode);
    }

    if (responseSchema) {
      return validateSchema(responseSchema, response.data);
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Network Error')) {
      throw new UserError(
        'Unable to connect to server. Please check your network connection.',
        'NETWORK_ERROR',
      );
    }
    if (error instanceof UserError) {
      throw error;
    }

    throw error;
  }
}
