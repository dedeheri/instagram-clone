import { NextResponse } from "next/server";
import { IssueData, RefinementCtx, z } from "zod";
import { prisma } from "@/lib/primsa-db";

import { hash } from "bcrypt";

interface IContex extends RefinementCtx {
  addIssue: (issue: IssueData) => void;
}

export const bodyRawSchema = z.object({
  email: z
    .string()
    .email("Email Tidak Valid")
    .min(5, "Email diperlukan")
    .superRefine(async (email: string, ctx: IContex) => {
      const users = await prisma.user.findUnique({
        where: { email },
      });

      if (users) {
        ctx.addIssue({
          message: "Email sudah terdafar",
          path: ["email"],
          code: "custom",
        });
      }
    }),
  password: z.string().min(8, "Kata sandi harus mengandung minimal 8 karakter"),
  fullname: z
    .string()
    .min(3, "Nama Lengkap harus mengandung minimal 3 karakter"),
  username: z
    .string()
    .min(3, "Nama Pengguna harus mengandung minimal 3 karakter")
    .superRefine(async (username: string, ctx: IContex) => {
      const users = await prisma.user.findFirst({
        where: { username },
      });

      if (users) {
        ctx.addIssue({
          message: "Nama pengguna tidak dapat digunakan",
          path: ["username"],
          code: "custom",
        });
      }
    }),
});

export const POST = async (request: Request) => {
  try {
    const bodyRaw = await bodyRawSchema.parseAsync(await request.json());

    const hashedPassword = await hash(bodyRaw.password, 10);
    //   account
    const createAccount = await prisma.account.create({
      data: {
        email: bodyRaw.email,
        password: hashedPassword,
      },
    });

    //   user
    const createUser = await prisma.user.create({
      data: {
        accountId: createAccount?.id,
        email: bodyRaw.email,
        fullname: bodyRaw.fullname,
        username: bodyRaw.fullname,
      },
    });

    return NextResponse.json(
      {
        message: "Berhasil buat akun",
        results: createUser,
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
