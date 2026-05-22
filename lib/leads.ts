import { prisma } from "./db";

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  type: string;
  status: string;
  equipmentId: string | null;
  equipmentName: string | null;
  createdAt: Date;
};

export async function getLeads(): Promise<LeadRecord[]> {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getLeadStats() {
  const [total, quotes, general] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { type: "quote" } }),
    prisma.lead.count({ where: { type: "general" } }),
  ]);
  return { total, quotes, general };
}
