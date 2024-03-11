"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";
import Loader from "./loader";

type Props = {};

const Info = (props: Props) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <Loader />;

  return <div>Info</div>;
};

export default Info;
