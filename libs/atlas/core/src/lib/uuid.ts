import { randomInt, randomUUID } from "crypto";

export function generateLongLowercaseUuid(shouldRemoveHyphens: boolean = false): string {
  if (shouldRemoveHyphens) {
    return randomUUID().replace(/-/g, "");
  } else {
    return randomUUID();
  }
}
