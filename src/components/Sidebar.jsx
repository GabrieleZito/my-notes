import { ArrowLeftFromLine, ArrowRightFromLine, CirclePlus, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function Sidebar(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [counter, setCounter] = useLocalStorage("counter", 0);
    const navigate = useNavigate();

    const showSidebar = () => {
        setIsOpen((x) => !x);
    };

    const createNote = async () => {
        console.log("cliccato");

        const index = counter + 1;
        const newNote = {
            id: index,
            title: `New Note ${index}`,
            text: "",
        };
        const newNotes = [...props.notes, newNote];
        await setCounter(index);
        await props.setNotes(newNotes);
        navigate("/note/" + index);
    };

    return (
        <>
            <div className="flex flex-row">
                <aside
                    className={`bg-secondary-dark fixed top-0 left-0 h-screen ${isOpen ? "w-64" : "w-[56px]"} transition-all duration-300`}
                >
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between p-3">
                            {isOpen ? <div className="truncate text-2xl text-white">My Notes</div> : ""}
                            <div className="rounded-sm p-1 shadow-sm hover:cursor-pointer" onClick={showSidebar}>
                                {isOpen ? <ArrowLeftFromLine color="white" /> : <ArrowRightFromLine color="white" />}
                            </div>
                        </div>
                        <div
                            className={`hover:bg-secondary-dark-hover flex items-center gap-2 p-3 hover:cursor-pointer hover:rounded-md ${isOpen ? "mx-2" : "p-0"}`}
                            onClick={createNote}
                        >
                            <CirclePlus color="white" />
                            {isOpen ? <div className="truncate text-white">New Note</div> : ""}
                        </div>
                        <div>
                            {props.notes.map((n) => (
                                <Link to={`/note/${n.id}`} key={n.id}>
                                    <div
                                        className={`hover:bg-secondary-dark-hover flex items-center gap-2 p-3 hover:cursor-pointer hover:rounded-md ${isOpen ? "mx-2" : "p-0"}`}
                                    >
                                        <div className="text-white">{n.title}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
                <main className={`${isOpen ? "ml-64" : "ml-[56px]"} bg-primary-dark w-full transition-all duration-300`}>
                    <div className="flex h-screen flex-col">
                        <div className="shadow-shadow-dark top-0 flex h-14 w-full items-center justify-between px-3 text-white shadow-sm">
                            <div></div>
                            <div className="hover:cursor-pointer">
                                <EllipsisVertical />
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}
