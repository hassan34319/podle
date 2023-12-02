"use client";
import CreateAccount from "@/app/(UIComponents)/CreateAccount";
import { client } from "@/app/utils/client";
import { signUp } from "next-auth-sanity/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};
type Props = {
  createImage: Image[];
};

function CCSignUp({ createImage }: Props) {
  const [signUpService, setSignUpService] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [error,setError] = useState(false)

  // const handleSubmit = async () => {
  //   try {
  //     const res = await signSubmit();
  //     router.push("/");
  //     setEmail("");
  //     setPassword("");
  //   } catch {}
  // };

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
        setError(true);
        // Handle the error as needed, e.g., show a message to the user
        return;
      }
      try {
        const res = await signUp({
          email,
          password,
          name: "contentCreator",
        });
        console.log(res, "Sign Up response");
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");
        setError(false);
        const res2 = await signSubmit();
        const contentCreatorData = {
          phoneNumber: phone,
          email: email,
          userName: username,
          description: "No description",
          profileImage:
            "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg",
          // Add other fields as needed
        };

        // Upload an image and get the image URL
        // Replace with the URL to the image

        // Create a document
        const res3 = await  client
          .create({
            _type: "contentCreator",
            ...contentCreatorData,
          })
          .then((response) => {
            console.log("Document created:", response);
          })
          .catch((error) => {
            console.error("Error creating document:", error);
          });
          router.push("/contentCreator/dashboard");
      } catch {
        console.log("error");
      }
    } else {
      console.log("Fields are empty or passwords do not match");
    }
  };

  return (
    <section className="z-30 opacity-100 relative text-white min-h-[100vh]">
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
        handleSubmitLogin={handleSubmit}
        error={error}
      />
    </section>
  );
}

export default CCSignUp;
