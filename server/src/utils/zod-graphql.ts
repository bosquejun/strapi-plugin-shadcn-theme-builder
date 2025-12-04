import { z } from 'zod';

/**
 * Helper to convert Zod schema to Nexus field type
 */
export function zodToNexusType(schema: z.ZodTypeAny): string {
  // Unwrap optional, nullable, and default schemas
  let unwrapped: any = schema;
  while (
    unwrapped instanceof z.ZodOptional ||
    unwrapped instanceof z.ZodNullable ||
    unwrapped instanceof z.ZodDefault
  ) {
    unwrapped = unwrapped.def.innerType;
  }

  if (unwrapped instanceof z.ZodString) return 'String';
  if (unwrapped instanceof z.ZodNumber) {
    return unwrapped._def.checks.some((c: any) => c.kind === 'int') ? 'Int' : 'Float';
  }
  if (unwrapped instanceof z.ZodBoolean) return 'Boolean';
  if (unwrapped instanceof z.ZodDate) return 'DateTime';
  if (unwrapped instanceof z.ZodEnum) return 'String';
  if (unwrapped instanceof z.ZodArray) return 'JSON';
  if (unwrapped instanceof z.ZodObject) return 'JSON';
  if (unwrapped instanceof z.ZodRecord) return 'JSON';
  if (unwrapped instanceof z.ZodUnion) return 'String';
  if (unwrapped instanceof z.ZodLiteral) return 'String';

  return 'JSON';
}

/**
 * Check if Zod field is required
 */
export function isZodFieldRequired(schema: z.ZodTypeAny): boolean {
  return !(
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  );
}

/**
 * Generate Nexus object type from Zod schema
 */
export function zodToNexusObjectType(
  nexus: any,
  typeName: string,
  zodSchema: z.ZodObject<any>,
  options: {
    omitFields?: string[];
    addFields?: Record<string, { type: string; required?: boolean }>;
  } = {}
): any {
  return nexus.objectType({
    name: typeName,
    definition(t: any) {
      const shape = zodSchema.shape;

      for (const [fieldName, fieldSchema] of Object.entries(shape)) {
        if (options.omitFields?.includes(fieldName)) continue;

        const type = zodToNexusType(fieldSchema as z.ZodTypeAny);
        const required = isZodFieldRequired(fieldSchema as z.ZodTypeAny);

        if (required) {
          t.nonNull.field(fieldName, { type });
        } else {
          t.field(fieldName, { type });
        }
      }

      // Add custom fields
      if (options.addFields) {
        for (const [fieldName, config] of Object.entries(options.addFields)) {
          if (config.required) {
            t.nonNull.field(fieldName, { type: config.type });
          } else {
            t.field(fieldName, { type: config.type });
          }
        }
      }
    },
  });
}

/**
 * Generate Nexus input type from Zod schema
 */
export function zodToNexusInputType(
  nexus: any,
  typeName: string,
  zodSchema: z.ZodObject<any>,
  options: {
    omitFields?: string[];
    makeOptional?: boolean;
  } = {}
): any {
  return nexus.inputObjectType({
    name: typeName,
    definition(t: any) {
      const shape = zodSchema.shape;

      for (const [fieldName, fieldSchema] of Object.entries(shape)) {
        if (options.omitFields?.includes(fieldName)) continue;

        const type = zodToNexusType(fieldSchema as z.ZodTypeAny);
        const required = options.makeOptional
          ? false
          : isZodFieldRequired(fieldSchema as z.ZodTypeAny);

        if (required) {
          t.nonNull.field(fieldName, { type });
        } else {
          t.field(fieldName, { type });
        }
      }
    },
  });
}

/**
 * Validate and parse data with Zod, with better error messages
 */
export function validateWithZod<T>(schema: z.ZodSchema<T>, data: unknown, context?: string): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed${context ? ` for ${context}` : ''}: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Safe parse that returns null on error
 */
export function safeParseWithZod<T>(schema: z.ZodSchema<T>, data: unknown): T | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}
