import React, { useState ,useEffect} from "react";
import api from "../api/api";


export default function Dashboard() {
    useEffect(() => {

    api.get("/ums/super/user-roles")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

  }, []);



  return (
    <div style={{ maxWidth: 760, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2>Auth Test UI (JWT + HttpOnly refresh cookie)</h2>

      <p>
        Backend expected at <code>http://localhost:8080</code>. This UI proxies <code>/auth</code> to it.
      </p>
      <p>
        After login, check DevTools → Application → Cookies for <code>refresh_token</code>.
      </p>
       <p>-------------------------Dashboard--------------</p>
    </div>
  );
}