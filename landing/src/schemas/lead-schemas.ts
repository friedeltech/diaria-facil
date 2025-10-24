import { z } from "zod";
import { DeviceType, ServiceFrequency, Urgency } from "../../generated/prisma";

export const customerLeadSchema = z.object({
  fullName: z.string().min(1, "Nome completo é obrigatório"),
  email: z.email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido").max(11, "Telefone inválido"),
  zipCode: z.string().length(8, "CEP inválido"),
  city: z.string().optional(),
  state: z.string().optional(),
  neighborhood: z.string().optional(),
  serviceTypes: z.array(z.string()).optional(),
  desiredFrequency: z.enum(ServiceFrequency).optional(),
  urgency: z.enum(Urgency).optional(),
  consentedToMarketing: z.boolean(),
  consentedAt: z.date().optional(),
  notes: z.string().optional(),
  deviceType: z.enum(DeviceType),
  browser: z.string(),
  operatingSystem: z.string(),
  userAgent: z.string(),
  ipAddress: z.string().optional(),
});

export type CustomerLeadType = z.infer<typeof customerLeadSchema>;
