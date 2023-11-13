import { getToken, setAuthToken, removeAuthToken } from "../lib/token";
import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const tokenAtom = atom({
  key: "token",
  default: "",
});

function useGetAuthToken() {
  const [token, setToken] = useRecoilState(tokenAtom);

  useEffect(() => {
    if (!token) setToken(getToken() || "");
  }, []);

  return { hasToken: !!token, token };
}

function useRemoveAuthToken(remove: boolean) {
  const [_, setToken] = useRecoilState(tokenAtom);
  useEffect(() => {
    if (!remove) return;
    removeAuthToken(true)
    setToken("");
  }, [remove]);

  return true;
}

function useSetAuthToken(token: string) {
  const [_, setToken] = useRecoilState(tokenAtom);
  useEffect(() => {
    if (token) {
      setToken(token);
      setAuthToken(token);
    }
  }, [token]);
}

export { useGetAuthToken, useRemoveAuthToken, useSetAuthToken };
