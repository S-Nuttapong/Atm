import { isTruthy } from "remeda";

export const isFalsy = (data: unknown) => !isTruthy(data)