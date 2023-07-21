"use client";
import { inter } from "@/app/utils/inter";
import React, { useState } from "react";
import ClaimBusinessManual from "../ClaimBusinessManual";
import ClaimBusinessAuto from "./ClaimBusinessAuto";
import SearchBusiness from "./SearchBusiness";

type Props = {};

function BusinessContent({}: Props) {
  const [claimAuto, setClaimAuto] = useState(false);
  const [claimManual, setClaimManual] = useState(false);
  return (
    <section className="z-30 opacity-100 relative text-white h-[85vh]">
      <SearchBusiness
        claimAuto={claimAuto}
        setClaimAuto={setClaimAuto}
        claimManual={claimManual}
        setClaimManual={setClaimManual}
      />
      <ClaimBusinessAuto
        claimAuto={claimAuto}
        setClaimAuto={setClaimAuto}
        claimManual={claimManual}
        setClaimManual={setClaimManual}
      />
      <ClaimBusinessManual
        claimAuto={claimAuto}
        setClaimManual={setClaimManual}
        claimManual={claimManual}
        setClaimAuto={setClaimAuto}
      />
    </section>
  );
}

export default BusinessContent;
