import React from "react";

const HeaderUser = ({ data }: { data: any }) => {
  return (
    <header className="flex space-x-10  ">
      <div className="w-[283px] flex items-center justify-center">
        <img
          src={data?.profile_image?.large}
          className="size-[150px] rounded-full"
        />
      </div>

      <div className="space-y-6">
        {/* username */}
        <div>
          <h1 className="text-lg font-medium">{data?.username}</h1>
        </div>

        {/* count */}
        <div className="flex space-x-16">
          <p>
            <span className="font-medium">{data?.total_photos}</span> kiriman
          </p>
          <p>
            <span className="font-medium">{data?.followers_count}</span>{" "}
            pengikut
          </p>
          <p>
            <span className="font-medium">{data?.following_count}</span> diikuti
          </p>
        </div>

        {/* fullname */}
        <div className="space-y-1">
          <p className="text-md font-medium">
            {data?.first_name + " " + data?.last_name}
          </p>
          <p className="text-sm leading-4">{data?.bio}</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderUser;
