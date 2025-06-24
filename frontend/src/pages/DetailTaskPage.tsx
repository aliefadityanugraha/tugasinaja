import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import { getTaskById } from "../api/taskApi"
import { Button } from "@/components/ui/button"

interface Task {
  id: string,
  title: string;
  description: string;
  category: string;
  points: number;
  dueDate: string;
}

export default function DetailTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        setError("ID tugas tidak ditemukan");
        setLoading(false);
        return;
      }
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err: any) {
        setError("Gagal mengambil detail tugas");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (loading) {
    return <div>Memuat detail tugas...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!task) {
    return <div>Tugas tidak ditemukan.</div>;
  }

  return (
    <div className="w-full p-5">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="mb-2"><span className="font-semibold">Deskripsi:</span> {task.description}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="mb-2"><span className="font-semibold">Kategori:</span> {task.category}</p>
          <p className="mb-2"><span className="font-semibold">Poin:</span> {task.points}</p>
          <p className="mb-2"><span className="font-semibold">Tenggat Waktu:</span> {task.dueDate}</p>
        </div>

        <div className="pt-4">
            <label className="block font-semibold">Tulis jawaban anda</label>
            <textarea
            className={`w-full border px-3 py-2 rounded`} required />
            <Button>
              <Link to={`/tasks/task/${task.id}`} className='flex items-center'>
              Kumpulkan Jawaban
              <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  />
              </svg>
              </Link>
            </Button>   
        </div>
    </div>
  );
}