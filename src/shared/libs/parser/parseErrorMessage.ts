import { isError } from "@shared/libs/fp";

export const parseErrorMessage = (error?: unknown) => isError(error) ? error.message : ''