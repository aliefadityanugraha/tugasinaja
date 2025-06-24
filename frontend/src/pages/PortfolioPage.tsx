import PortfolioListPage from "../components/PortfolioListPage";
import AddPortfolioForm from "./AddPortfolioForm";
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PortfolioPage() {
    return (
      <>
        <Dialog>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Tambah Portfolio</DialogTitle>
                <DialogDescription>
                  <AddPortfolioForm />
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        

            <main className="w-full p-0 sm:px-10 flex flex-col gap-2">
                <div className="flex align-center justify-between">
                    <h1 className="text-xl ">All Portfolio</h1>
                    <Button asChild className="bg-green-700">
                        <DialogTrigger className="text-white">Tambah Portfolio</DialogTrigger>
                    </Button>
                </div>
                <PortfolioListPage />
            </main>
        </Dialog>
      </>
    )
}