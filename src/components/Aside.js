import { React } from "react";
import NewsList from "./NewsList";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

export default function Aside() {
  return (
    <aside className="news-list">
      <Routes>
        <Route
          path="/"
          element={
            <div className="news-list-none">
              <h3>Neto Social</h3>
              <h6>Facebook and VK killer</h6>
            </div>
          }
        />
        <Route path="/news/*" element={<NewsList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </aside>
  );
}
