"use client";

import { useParams } from "next/navigation";
import Container from "../container";
import HeaderUser from "./header-user";
import {
  useGetUserDetailQuery,
  useGetUserPhotoCollectionQuery,
  useGetUserPhotoQuery,
} from "@/features/feature/user-photos-api";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const User = () => {
  const params = useParams<{ user: string }>();
  const { data: userData } = useGetUserDetailQuery(params.user);
  const { data: userDataPhoto } = useGetUserPhotoQuery(params.user);
  const { data: userCollectionPhoto } = useGetUserPhotoCollectionQuery(
    params.user
  );

  console.log(userCollectionPhoto);

  return (
    <Container>
      <div className="space-y-28 max-w-[935px] mx-auto mt-10">
        <HeaderUser data={userData} />

        <div className="flex space-x-5">
          {userCollectionPhoto?.map((result: any) => (
            <div className="text-center">
              <Avatar className="size-[77px] border rounded-full p-0.5 ">
                <AvatarImage
                  src={result?.cover_photo?.urls?.regular}
                  alt={result?.title}
                  className="rounded-full"
                />
                <AvatarFallback className="bg-white" />
              </Avatar>

              <p className="text-xs pb-2 pt-1">{result?.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {userDataPhoto?.map((photo: any, i: number) => (
            <img src={photo?.urls?.regular} className="size-[306px]" />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default User;
