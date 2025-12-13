import { z } from "zod";

export const memberSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .regex(/^[A-Za-zÀ-ÿ ]+$/, "O nome deve conter apenas letras."),
  
  role: z
    .string()
    .min(3, "A função deve ter pelo menos 3 caracteres.")
    .regex(/^[A-Za-zÀ-ÿ ]+$/, "A função deve conter apenas letras."),
});
