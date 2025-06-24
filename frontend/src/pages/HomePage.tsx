import { useAuth } from '@/contexts/AuthContext'
import { usePermissions } from '@/hooks/usePermissions'
import { RoleBasedElement, TeacherOrAdminOnly, StudentOnly } from '@/components/RoleBasedElement'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  FileText, 
  Users, 
  BarChart3, 
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { user } = useAuth()
  const { 
    isStudent, 
    isTeacher, 
    isAdmin, 
    canViewTasks, 
    canCreateTasks,
    canViewAllSubmissions,
    canManageStudents 
  } = usePermissions()
  const navigate = useNavigate()

  const getWelcomeMessage = () => {
    if (isStudent()) return "Selamat datang di Dashboard Siswa"
    if (isTeacher()) return "Selamat datang di Dashboard Guru"
    if (isAdmin()) return "Selamat datang di Dashboard Administrator"
    return "Selamat datang di Dashboard"
  }

  const getQuickActions = () => {
    const actions = []

    if (canViewTasks()) {
      actions.push({
        title: "Lihat Tugas",
        description: "Lihat daftar tugas yang tersedia",
        icon: FileText,
        action: () => navigate('/tasks'),
        color: "bg-blue-500"
      })
    }

    if (canCreateTasks()) {
      actions.push({
        title: "Buat Tugas",
        description: "Buat tugas baru untuk siswa",
        icon: Plus,
        action: () => navigate('/tasks/create'),
        color: "bg-green-500"
      })
    }

    if (canViewAllSubmissions()) {
      actions.push({
        title: "Pengumpulan",
        description: "Lihat pengumpulan tugas siswa",
        icon: CheckCircle,
        action: () => navigate('/submissions'),
        color: "bg-purple-500"
      })
    }

    if (canManageStudents()) {
      actions.push({
        title: "Manajemen Siswa",
        description: "Kelola data siswa",
        icon: Users,
        action: () => navigate('/management/students'),
        color: "bg-orange-500"
      })
    }

    return actions
  }

  const getStats = () => {
    const stats = []

    if (isStudent()) {
      stats.push(
        { title: "Tugas Aktif", value: "5", icon: Clock, color: "text-blue-600" },
        { title: "Tugas Selesai", value: "12", icon: CheckCircle, color: "text-green-600" },
        { title: "Portfolio", value: "3", icon: BookOpen, color: "text-purple-600" }
      )
    } else if (isTeacher()) {
      stats.push(
        { title: "Total Siswa", value: "25", icon: Users, color: "text-blue-600" },
        { title: "Tugas Aktif", value: "8", icon: FileText, color: "text-green-600" },
        { title: "Pengumpulan", value: "15", icon: CheckCircle, color: "text-purple-600" }
      )
    } else if (isAdmin()) {
      stats.push(
        { title: "Total Siswa", value: "150", icon: Users, color: "text-blue-600" },
        { title: "Total Guru", value: "12", icon: Users, color: "text-green-600" },
        { title: "Tugas Aktif", value: "45", icon: FileText, color: "text-purple-600" },
        { title: "Portfolio", value: "89", icon: BookOpen, color: "text-orange-600" }
      )
    }

    return stats
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{getWelcomeMessage()}</h1>
        <p className="text-muted-foreground">
          Halo, {user?.name}! Selamat datang kembali ke platform TugasinAja.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getStats().map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Aksi Cepat</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {getQuickActions().map((action, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={action.action}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Role-specific content */}
      <RoleBasedElement requiredRoles={['STUDENT']}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span>Tugas Terbaru</span>
            </CardTitle>
            <CardDescription>
              Tugas yang baru saja ditugaskan untuk Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tugas Matematika - Aljabar</h4>
                  <p className="text-sm text-muted-foreground">Deadline: 2 hari lagi</p>
                </div>
                <Button size="sm">Lihat Detail</Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Tugas Bahasa Indonesia - Esai</h4>
                  <p className="text-sm text-muted-foreground">Deadline: 5 hari lagi</p>
                </div>
                <Button size="sm">Lihat Detail</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </RoleBasedElement>

      <TeacherOrAdminOnly>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Statistik Pengumpulan</span>
            </CardTitle>
            <CardDescription>
              Ringkasan pengumpulan tugas siswa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-muted-foreground">Sudah Dikumpulkan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">10%</div>
                <div className="text-sm text-muted-foreground">Belum Dikumpulkan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">5%</div>
                <div className="text-sm text-muted-foreground">Terlambat</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TeacherOrAdminOnly>
    </div>
  )
}
