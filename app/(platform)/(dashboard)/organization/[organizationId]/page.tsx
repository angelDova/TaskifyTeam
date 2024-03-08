import { auth } from "@clerk/nextjs";
import React from "react";

const OrganizationPage = () => {
  const { userId, orgId } = auth();

  return <div>OrganizationPage</div>;
};

export default OrganizationPage;
