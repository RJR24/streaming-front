import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const { replace } = useRouter();

  useEffect(() => {
    replace("/home");
  }, []);
  return <></>;
};

export default Home;
