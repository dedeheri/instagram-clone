import { NextResponse } from "next/server";
import { IssueData, RefinementCtx, z } from "zod";
import { prisma } from "@/lib/primsa-db";

import { compare } from "bcrypt";

interface IContex extends RefinementCtx {
  addIssue: (issue: IssueData) => void;
}

export const bodyRawSchema = z
  .object({
    email: z.string().min(5, "Email diperlukan").email("Email Tidak Valid"),
    password: z
      .string()
      .min(8, "Kata sandi harus mengandung minimal 8 karakter"),
  })
  .superRefine(async ({ email, password }, ctx: IContex) => {
    const account = await prisma.account.findUnique({
      where: { email },
    });

    if (!account) {
      ctx.addIssue({
        message: "Email belum terdafar",
        path: ["email"],
        code: "custom",
      });
    } else {
      // Check password
      const passwordCompare = await compare(password, account.password || "");

      if (!passwordCompare) {
        ctx.addIssue({
          message: "Kata sandi salah",
          path: ["password"],
          code: "custom",
        });
      }
    }
  });

export const POST = async (request: Request) => {
  try {
    const bodyRaw = await bodyRawSchema.parseAsync(await request.json());

    const account = await prisma.account.findUnique({
      where: { email: bodyRaw.email },
    });

    const user = await prisma.user.findFirst({
      where: { accountId: account?.id },
    });

    return NextResponse.json(
      {
        message: "Berhasil",
        results: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
};
