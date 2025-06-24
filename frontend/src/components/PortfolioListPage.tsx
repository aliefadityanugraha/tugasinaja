import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { getAllPortfolio, deletePortfolio } from '../api/portfolioApi'

export default function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPortfolio()
      setPortfolios(data)
    }

    fetchData()
  }, [])

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
    <>
      <div className="flex flex-wrap gap-4">
      {portfolios.map((portfolio: any) => (
        <Card className="w-full p-5 max-w-sm bg-stone-50 dark:bg-stone-900" key={portfolio.id}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {portfolio.title}
            </h5>
            <p className="font-normal text-black dark:text-stone-50">
              {portfolio.description}
            </p>
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
            <Button color="red" onClick={() => handleDeleteButton(portfolio.id)}>
              Delete
            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
                />
            </svg>
            </Button>
        </Card>
        ))}
      </div>
    </>
  )
}
