"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import Input from "@/components/input";
import IgIcon from "@/components/svg/ig-icon";
import { Button } from "@/components/ui/button";
import SpinIcon from "@/components/svg/spin-icon";
import { useRegisterMutation } from "@/features/feature/account-api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IState {
  email: string;
  password: string;
  fullname: string;
  username: string;
}

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState<IState>({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const [register, { error, isError, isLoading, isSuccess, data }]: any =
    useRegisterMutation();

  const onChange = (events: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [events.target.name]: events.target.value });
  };

  const onSubmit = async (events: React.FormEvent) => {
    events.preventDefault();
    await register(state);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);

      const interval = setInterval(() => {
        router.push("/accounts/login");
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error?.data?.error?.code === "P1001") {
      toast.error(error?.data?.message || "");
    }
  }, [isError]);

  return (
    <main className="flex max-w-4xl h-screen justify-center space-x-7 items-center mx-auto">
      <article className="space-y-5 max-w-[350px] w-full">
        <section className="w-full border p-7 space-y-10 rounded">
          <div className="flex justify-center">
            <IgIcon />
          </div>

          <p className="font-bold text-center dark:text-gray-500 text-md">
            Buat akun untuk melihat foto dan video dari teman Anda.
          </p>

          <Button className="w-full h-9 bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white">
            Masuk dengan Facebook
          </Button>

          <div className="flex items-center justify-between space-x-4 w-full">
            <div className="border-b w-full" />
            <p className="font-medium text-sm">ATAU</p>
            <div className="border-b w-full" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              name="email"
              label="Email"
              labelShow={false}
              onChange={onChange}
              isError={isError}
              error={error?.data?.error?.issues}
            />
            <Input
              name="password"
              label="Kata Sandi"
              type="password"
              labelShow={false}
              onChange={onChange}
              isError={isError}
              error={error?.data?.error?.issues}
            />
            <Input
              name="fullname"
              label="Nama Lengkap"
              labelShow={false}
              onChange={onChange}
              isError={isError}
              error={error?.data?.error?.issues}
            />
            <Input
              name="username"
              label="Nama Pengguna"
              labelShow={false}
              onChange={onChange}
              isError={isError}
              error={error?.data?.error?.issues}
            />
            <Button
              disabled={isLoading}
              className="w-full h-9 bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white"
            >
              {isLoading ? <SpinIcon /> : <span>Daftar</span>}
            </Button>
          </form>
        </section>

        <section className="w-full border p-7 space-y-10 rounded">
          <p className="text-sm text-center">
            Punya akun?{" "}
            <Link href={"/accounts/login"} className="font-medium">
              Masuk
            </Link>
          </p>
        </section>
      </article>
    </main>
  );
};

export default Page;
