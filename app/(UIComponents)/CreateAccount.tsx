import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import React from "react";
import { client } from "../utils/client";
import CreateAccountContent from "./CreateAccountContent";
import CreateImage from "./CreateImage";

type Image = {
    image: {
      asset: {
        url: string;
      };
    };
  };

type Props = {
    email : string
    password : string
    phone : string
    username : string
    setEmail : ((email : string) => void)
    setPassword : ((password : string) => void)
    setPhone : ((phone : string) => void)
    setUsername : ((username : string) => void)
    createImage : Image[]
    signUpService : boolean;
    setSignUpService : (signUp : boolean) => void
    handleSubmitLogin? : ()=> void
    handleSubmitService? : ()=> void
    error : boolean
};

function CreateAccount({error,email,password,setEmail,setPassword,username, setUsername, phone, setPhone,createImage, signUpService, setSignUpService, handleSubmitLogin, handleSubmitService}: Props) {

  return (
    <main className="min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]">
      <div className="grid grid-cols-1 md:grid-cols-10">
      <CreateAccountContent
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        phone={phone}
        setPhone={setPhone}
        signUpService={signUpService}
        setSignUpService={setSignUpService}
        handleSubmitLogin={handleSubmitLogin}
        handleSubmitService={handleSubmitService}
        error={error}
      />
        <CreateImage createImage={createImage} />
      </div>
    </main>
  );
}

export default CreateAccount;
