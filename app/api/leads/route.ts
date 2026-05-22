import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema } from "@/lib/lead-schema";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const lead = await prisma.lead.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message?.trim() ? data.message.trim() : null,
      type: data.type,
      equipmentId: data.equipmentId ?? null,
      equipmentName: data.equipmentName ?? null,
    },
  });

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
