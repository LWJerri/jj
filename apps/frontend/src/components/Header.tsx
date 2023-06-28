"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthorizaed, setIsAuthorizaed] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3005/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(async (response) => {
      const data = await response.json();

      setUsername(data?.user?.username);

      if (response.status === 200) {
        setIsAuthorizaed(true);
      }
    });
  }, []);

  return (
    <div className="navbar px-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-80% to-emerald-500 to-90% select-none">
      <div className="flex-1 space-x-2">
        <a className="normal-case text-2xl font-bold text-white" href="/">
          @jj
        </a>
      </div>

      <div className={isAuthorizaed ? "flex-none block" : "hidden"}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-auto space-y-2"
          >
            <li className="font-bold text-center mb-5">Ви увійшли як {username}</li>
            <li>
              <a className="justify-between" href="/orders">
                Замовлення
                <span className="badge text-white bg-[#ED4245]">Нове</span>
              </a>
            </li>
            <li className="divide-x-4"></li>
            <li>
              <a
                onClick={() => {
                  localStorage.clear();

                  window.location.href = "/auth";
                }}
              >
                Вийти
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
