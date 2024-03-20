import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type RedirectProps = {
  to: string;
};
const Redirect = ({ to }: RedirectProps) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, [to, navigate]);

  return <>test</>;
};
export default Redirect;
