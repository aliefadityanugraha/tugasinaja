import PortfolioListPage from "../components/PortfolioListPage";
import AddPortfolioForm from "../components/form/AddPortfolioForm";
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
      <Dialog>
          <DialogContent>
              <DialogHeader>
              <DialogTitle>Tambah Portfolio</DialogTitle>
              <DialogDescription>
                <AddPortfolioForm />
              </DialogDescription>
              </DialogHeader>
          </DialogContent>

          <main className="w-full p-2 sm:px-5 flex flex-col justify-center gap-2">
              <div className="flex align-center justify-between py-2">
                  <h1 className="text-xl ">All Portfolio</h1>
                    <DialogTrigger asChild>
                      <Button>Tambah Portfolio</Button>
                    </DialogTrigger>
              </div>
              <PortfolioListPage />
          </main>
      </Dialog>
    )
}