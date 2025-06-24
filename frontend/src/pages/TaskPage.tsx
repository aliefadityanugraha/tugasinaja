import TaskListPage from "../components/TaskListPage";
import { Button } from "@/components/ui/button"
import AddTaskForm from "@/components/form/AddTaskForm"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

export default function TaskPage() {
    return (
        <>
            <Dialog>
                
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Tambah Tugas</DialogTitle>
                    <DialogDescription>
                        <AddTaskForm/>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            

                <main className="p-0 sm:px-10 flex flex-col gap-2 w-full">
                    <div className="flex align-center justify-between">
                        <h1 className="text-xl ">All Task</h1>
                        <Button asChild className="bg-green-700">
                            <DialogTrigger className="text-white">Tambah Tugas</DialogTrigger>
                        </Button>
                    </div>
                    <TaskListPage />
                </main>
            </Dialog>
        </>
    )
}