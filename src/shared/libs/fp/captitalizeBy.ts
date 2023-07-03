
import { capitalize } from "@shared/libs/fp/capitalize";
import { joinBy } from "@shared/libs/fp/joinBy";
import { splitBy } from "@shared/libs/fp/splitBy";
import { map, pipe } from "remeda";

export const capitalizeBy = (separator: string, joiner: string) => (string: string) =>
    pipe(string, splitBy(separator), map(capitalize), joinBy(joiner))