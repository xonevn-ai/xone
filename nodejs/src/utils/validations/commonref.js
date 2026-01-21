const { z } = require("zod");

// Reusable ObjectId schema
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

const userSchemaKeys = {
  email: z.string().email(),
  id: objectIdSchema,
  fname: z.string().optional(),
  lname: z.string().optional(),
};

const teamSchemaKeys = {
  teamUsers: z.array(z.object({}).passthrough()).optional(),
  teamName: z.string(),
  id: objectIdSchema,
};

const countrySchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const updateCountrySchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const stateSchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const updateStateSchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const profileSchemaKeys = {
  name: z.string(),
  uri: z.string(),
  mime_type: z.string(),
  file_size: z.string(),
};

const citySchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const updateCitySchemaKeys = {
  nm: z.string(),
  code: z.string(),
  id: objectIdSchema,
};

const companySchemaKeys = {
  name: z.string(),
  slug: z.string(),
  id: objectIdSchema,
};

const botSchemaKeys = {
  title: z.string(),
  code: z.string(),
  id: objectIdSchema,
  isShare: z.boolean().optional()
};

const brainSchemaKeys = {
  title: z.string(),
  slug: z.string(),
  id: objectIdSchema,
  isShare: z.boolean().optional()
};

module.exports = {
  userSchemaKeys,
  teamSchemaKeys,
  countrySchemaKeys,
  updateCountrySchemaKeys,
  stateSchemaKeys,
  updateStateSchemaKeys,
  profileSchemaKeys,
  citySchemaKeys,
  updateCitySchemaKeys,
  companySchemaKeys,
  botSchemaKeys,
  brainSchemaKeys,
  objectIdSchema, // Exporting this for reuse
};
