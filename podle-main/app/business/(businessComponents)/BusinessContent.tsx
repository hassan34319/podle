"use client";
import CreateAccount from "@/app/(UIComponents)/CreateAccount";
import CreateAccountContent from "@/app/(UIComponents)/CreateAccountContent";
import Logo from "@/app/(UIComponents)/Logo";
import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import { client } from "@/app/utils/client";
import { inter } from "@/app/utils/inter";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { signUp } from "next-auth-sanity/client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ClaimBusinessManual from "../ClaimBusinessManual";
import ClaimBusinessAuto from "./ClaimBusinessAuto";
import SearchBusiness from "./SearchBusiness";
type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};
type Props = {
  autoBusiness: BusinessInfo[];
  createImage: Image[];
};

function BusinessContent({ autoBusiness, createImage }: Props) {
  const [claimAuto, setClaimAuto] = useState(false);
  const [claimManual, setClaimManual] = useState(false);
  const [signUpService, setSignUpService] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error,setError] = useState(false)

  const checkEmailExists = async (
    emailToCheck: string,
    documentType: string
  ) => {
    try {
      const result = await client.fetch(
        `*[_type == $documentType && email == $email][0]`,
        {
          documentType,
          email: emailToCheck,
        }
      );
      console.log(result)
      return result !== null; // If the result is defined, the email exists
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const signSubmit = async () => {
    const res = await signIn("sanity-login", {
      redirect: false,
      email,
      password,
    });

    console.log(res, "Sign In response");
  };

  const router = useRouter();

  const handleSubmit = async () => {
    

    if (email && password && username) {


      const emailExistsInClaimedBusiness = await checkEmailExists(
        email,
        "claimedBusiness"
      );
      const emailExistsInContentCreator = await checkEmailExists(
        email,
        "contentCreator"
      );

      if (emailExistsInClaimedBusiness || emailExistsInContentCreator) {
        console.error(
          "Email already exists in claimedBusiness or contentCreator"
        );
        setError(true)
        // Handle the error as needed, e.g., show a message to the user
        return;
      }

      try {
        const res = await signUp({
          email,
          password,
          name: "serviceProvider",
        });
        console.log(res, "Sign Up response");
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");
        setError(false)
        const res2 = await signSubmit();
        const serviceProviderData = {
          phoneNumber: phone,
          email: email,
          userName: username,
          // Add other fields as needed
        };

        // Upload an image and get the image URL
        // Replace with the URL to the image

        // Create a document
        const res3 = await client
          .create({
            _type: "claimedBusiness",
            ...serviceProviderData,
          })
          .then((response) => {
            console.log("Document created:", response);
          })
          .catch((error) => {
            console.error("Error creating document:", error);
          });

          console.log(res3)

          setSignUpService(false)
      } catch {
        console.log("error");
      }
    } else {
      console.log("Fields are empty or passwords do not match");
    }
  };

  return (
    <section className="z-30 opacity-100 relative text-white min-h-[100vh]">
      {signUpService ? (
        <CreateAccount
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}
          phone={phone}
          setPhone={setPhone}
          createImage={createImage}
          signUpService={signUpService}
          setSignUpService={setSignUpService}
          handleSubmitService={handleSubmit}
          error={error}
        />
      ) : (
        <>
          <div className="md:pl-14 pt-4 md:pt-8 z-30 opacity-100 relative">
            <Link href="/" className="hidden md:block">
              <Logo />
            </Link>
            <div className="lg:hidden flex items-start pt-[3vh] justify-center z-30 w-full md:hidden">
              <MobileLogo />
            </div>
          </div>
          <SearchBusiness
            claimAuto={claimAuto}
            setClaimAuto={setClaimAuto}
            claimManual={claimManual}
            setClaimManual={setClaimManual}
            autoBusiness={autoBusiness}
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
        </>
      )}
    </section>
  );
}

export default BusinessContent;
