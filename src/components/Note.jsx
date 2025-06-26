import { useNavigate, useParams } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Note(props) {
    const [isPrevOpen, setIsPrevOpen] = useState(false);
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const note = props.notes.find((n) => n.id == id);
        if (!note) {
            navigate("/");
            return;
        }
        console.log("useEffect");

        console.log(note);

        setTitle(note.title);
        setText(note.text);
    }, [id]);

    useEffect(() => {
        const newNotes = props.notes.map((n) => (n.id == id ? { ...n, title: title, text: text } : n));
        console.log(newNotes);

        props.setNotes(newNotes);
    }, [title, text]);

    return (
        <>
            <div className="flex w-full flex-col justify-center p-4">
                <div className="flex justify-between align-middle">
                    <TextField
                        label="Title"
                        variant="standard"
                        color="success"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        sx={{
                            "& .MuiInput-underline:before": {
                                borderBottomColor: "white",
                            },
                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                borderBottomColor: "white",
                            },
                            "& .MuiInput-underline:after": {
                                borderBottomColor: "white",
                            },
                            "& .MuiInputLabel-root": {
                                color: "white",
                            },
                            "& .MuiInputBase-input": {
                                color: "white",
                            },
                        }}
                    />
                    <div className="bg-secondary-text-dark shadow-secondary-text-dark my-3 flex rounded-sm p-1 align-middle shadow-xs">
                        <button className="h-full align-middle" onClick={() => setIsPrevOpen((x) => !x)}>
                            Preview
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex w-full flex-col justify-center gap-2 md:flex-row">
                    <div className="w-xl">
                        <textarea
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                            className="border-secondary-text-dark h-96 w-full rounded-md border-1 p-2 text-white focus:outline-0"
                            spellCheck="false"
                        />
                    </div>
                    {isPrevOpen ? (
                        <div className="border-secondary-text-dark w-xl truncate rounded-md border-1 p-3 break-all text-white">
                            <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
