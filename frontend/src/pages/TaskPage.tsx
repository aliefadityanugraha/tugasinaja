import TaskListPage from "../components/TaskListPage";
import { Button } from "@/components/ui/button"
import AddTaskForm from "@/components/form/AddTaskForm"
import { useAuth } from "@/contexts/AuthContext";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function TaskPage() {
    const { permissions } = useAuth()

    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tambah Tugas</DialogTitle>
                <DialogDescription>
                    <AddTaskForm/>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        
            <main className="p-2 sm:px-5 flex flex-col gap-2 w-full">
                <div className="flex align-center justify-between py-2">
                    <h1 className="text-xl ">All Task</h1>
                    {permissions?.permissions?.canCreateTasks && (
                        <DialogTrigger asChild className="bg-green-700">
                            <Button>Tambah Tugas</Button>
                        </DialogTrigger>
                        )}
                </div>
                <TaskListPage />
            </main>
        </Dialog>
    )
}