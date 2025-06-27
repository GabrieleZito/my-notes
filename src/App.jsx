import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/Home";
import { Note } from "./components/Note";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Analytics } from "@vercel/analytics/react";

function App() {
    const [notes, setNotes] = useLocalStorage("notes", []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Sidebar notes={notes} setNotes={setNotes} />}>
                        <Route index element={<Home notes={notes} setNotes={setNotes} />} />
                        <Route path="/note/:id" element={<Note notes={notes} setNotes={setNotes} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Analytics />
        </>
    );
}

export default App;
