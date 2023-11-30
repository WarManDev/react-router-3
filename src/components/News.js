import { useParams } from "react-router-dom";
import NewsItem from "./NewsItem";
import useJsonFetch from "../hooks/useJsonFetch";
import { React, useContext } from "react";
import AuthContext from "../context/AuthContext";
import NotFound from "./NotFound";

export default function News() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [data] = useJsonFetch(`${process.env.REACT_APP_AUTH_URL}private/news`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token} ` },
  });
  let news;
  if (data) {
    news = data.find((item) => item.id === id);
  }
  return news ? <NewsItem news={news} /> : <NotFound />;
}
