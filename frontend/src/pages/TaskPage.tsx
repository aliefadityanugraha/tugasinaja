import NavbarMain from "../components/NavbarMain";
import TaskListPage from "../components/TaskListPage";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function TaskPage() {
    return (
        <>
            <NavbarMain />  
            <main className="p-10 flex flex-col gap-4">
                <TaskListPage />
                <Button color="green">
                    <Link to="/add-task">
                        Tambah Tugas
                    </Link>
                </Button>
            </main>
        </>
    )
}