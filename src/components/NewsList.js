import { React, useContext } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import NewsItem from "./NewsItem";
import useStorage from "../hooks/useStorage";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import News from "./News";

export default function NewsList() {
  const navigate = useNavigate();
  const Storage = (key, value) => useStorage(key, value);
  const { token } = useContext(AuthContext);

  const [data, error, loading] = useJsonFetch(
    `${process.env.REACT_APP_AUTH_URL}private/news`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token} ` },
    },
    token
  );
  if (error) {
    Storage("tokenNeto", "delete");
    Storage("prrofileNeto", "delete");
  }
  return token ? (
    <div className="news-block">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {loading && <p>Загрузка...</p>}
              {!loading &&
                data &&
                data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="news-item"
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      <NewsItem news={item} />
                    </div>
                  );
                })}
            </>
          }
        />
        <Route path="/:id" element={<News />} />
      </Routes>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
