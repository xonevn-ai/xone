const { z } = require("zod");
const { userSchemaKeys, teamSchemaKeys } = require("./commonref");

const createWorkspaceKeys = z.object({
  title: z.string(),
  users: z
    .array(
      z
        .object({
          ...userSchemaKeys,
          roleCode: z.string(),
        })
        .optional()
    )
    .optional(),

  teams: z
    .array(
      z
        .object({
          ...teamSchemaKeys,
        })
        .optional()
    )
    .optional(),
});

const updateWorkspaceKeys = z.object({
  title: z.string(),
  id: z.string().regex(/^[0-9a-fA-F]{24}$/),
});

const addWorkSpaceUserKeys = z.object({
  workspaceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  companyId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  users: z
    .array(
      z
        .object({
          ...userSchemaKeys,
          roleCode: z.string(),
        })
    ),
});

const deleteWorkSpaceUserKeys = z.object({
  user_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
  sharedBrains: z
    .array(z.object({}).passthrough()),
});

module.exports = {
  createWorkspaceKeys,
  updateWorkspaceKeys,
  addWorkSpaceUserKeys,
  deleteWorkSpaceUserKeys,
};
