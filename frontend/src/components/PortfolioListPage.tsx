import { useEffect, useState, useCallback } from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { getAllPortfolio, deletePortfolio } from '../api/portfolioApi'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState([])

  const fetchData = useCallback(async () => {
    const data = await getAllPortfolio()
    setPortfolios(data)
  }, [])

  useEffect(() => {
    fetchData()
    const handleDeleteSuccess = () => {
      fetchData()
    }
    window.addEventListener("portfolio-delete-success", handleDeleteSuccess)
    return () => {
      window.removeEventListener("portfolio-delete-success", handleDeleteSuccess)
    }
  }, [fetchData])

  const handleDeleteButton = async (id : string) => {
    try{
      const response = await deletePortfolio(id)
      return response
    } catch(err) {
      console.log(err)
      throw err
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
    {portfolios.map((portfolio: any) => (
      <Card className="w-full p-5 max-w-sm flex justify-between" key={portfolio.id}>
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white pb-2">
              {portfolio.title}
            </h5>
            <p className="font-normal text-muted-foreground">
              {portfolio.description}
            </p>
          </div>
          <Button>
          Read more
          <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
              />
          </svg>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-red-700'>
                Delete
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menghapus portfolio ini?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Batal</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="bg-red-700"
                    onClick={async () => {
                      try {
                        await handleDeleteButton(portfolio.id);
                        window.dispatchEvent(new CustomEvent("portfolio-delete-success"));
                      } catch (err) {
                        // Optional: handle error
                      }
                    }}
                  >
                    Ya, Hapus
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
      </Card>
      ))}
    </div>
  )
}
