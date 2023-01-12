import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MyRouter } from "../routes";

export function Private({ children }) {
  const userState = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userState);
  }, [userState]);

  useEffect(() => {
    if (user === null) {
      // navigate(MyRouter.SIGN_IN);
    }
  }, [user]);

  return <div>{user ? children : <div />}</div>;
}

export function Public({ children }) {
  // const navigate = useNavigate();

  const userState = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userState);
  }, [userState]);

  useEffect(() => {
    if (user) {
      // navigate(MyRouter.HOME);
    }
  }, [user]);

  return <div>{user ? <div /> : children}</div>;
}
