import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { getAllTasks } from '../api/taskApi'
import { Link } from 'react-router-dom'

export default function TaskListPage() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTasks()
      setTasks(data)
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="flex flex-wrap gap-4">
      {tasks.map((task: any) => (
        <Card className="w-full p-5 bg-stone-50 dark:bg-stone-900" key={task.id}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {task.title}
              </h5>
              <p className="font-normal text-black dark:text-stone-50">
              {task.description}
              </p>
              <Button asChild>
                <Link to={`/tasks/detail/${task.id}`} className='flex items-center'>
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </Link>
              </Button>
        </Card>
        ))}
      </div>
    </>
  )
}
