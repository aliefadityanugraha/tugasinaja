import * as React from "react"
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  BookOpen,
  Users,
  FileText,
  Plus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, permissions } = useAuth()

  // Dynamic navigation based on user role and permissions
  const getNavItems = () => {
    const items = []

    // Common items for all roles
    items.push({
      title: "Dashboard",
      url: "/",
      icon: Frame,
      isActive: false,
    })

    // Task management
    if (permissions?.permissions?.canViewTasks) {
      items.push({
        title: "Tugas",
        url: "/tasks",
        icon: FileText,
        isActive: false,
        items: [
          {
            title: "Daftar Tugas",
            url: "/tasks",
          },
          ...(permissions?.permissions?.canCreateTasks ? [{
            title: "Buat Tugas",
            url: "/tasks/create",
          }] : []),
        ],
      })
    }

    // Portfolio management
    if (permissions?.permissions?.canViewOwnPortfolio || permissions?.permissions?.canViewAllPortfolios) {
      items.push({
        title: "Portfolio",
        url: "/portfolios",
        icon: BookOpen,
        isActive: false,
        items: [
          {
            title: "Daftar Portfolio",
            url: "/portfolios",
          },
          ...(permissions?.permissions?.canCreatePortfolio ? [{
            title: "Buat Portfolio",
            url: "/portfolios/create",
          }] : []),
        ],
      })
    }

    // Admin/Teacher specific items
    if (user?.role === 'ADMIN' || user?.role === 'TEACHER') {
      if (permissions?.permissions?.canViewAllSubmissions) {
        items.push({
          title: "Pengumpulan",
          url: "/submissions",
          icon: SquareTerminal,
          isActive: false,
          items: [
            {
              title: "Semua Pengumpulan",
              url: "/submissions",
            },
            {
              title: "Nilai Tugas",
              url: "/submissions/grade",
            },
          ],
        })
      }

      if (permissions?.permissions?.canManageStudents) {
        items.push({
          title: "Manajemen",
          url: "/management",
          icon: Users,
          isActive: false,
          items: [
            {
              title: "Daftar Siswa",
              url: "/management/students",
            },
            ...(user?.role === 'ADMIN' ? [{
              title: "Daftar Guru",
              url: "/management/teachers",
            }] : []),
          ],
        })
      }
    }

    // Settings for all users
    items.push({
      title: "Pengaturan",
      url: "/settings",
      icon: Settings2,
      isActive: false,
      items: [
        {
          title: "Profil",
          url: "/settings/profile",
        },
        {
          title: "Akun",
          url: "/settings/account",
        },
        ...(user?.role === 'ADMIN' ? [{
          title: "Sistem",
          url: "/settings/system",
        }] : []),
      ],
    })

    return items
  }

  const getProjects = () => {
    const projects = [
      {
        name: "Dashboard",
        url: "/",
        icon: Frame,
      },
    ]

    if (permissions?.permissions?.canViewTasks) {
      projects.push({
        name: "Tugas",
        url: "/tasks",
        icon: FileText,
      })
    }

    if (permissions?.permissions?.canViewOwnPortfolio || permissions?.permissions?.canViewAllPortfolios) {
      projects.push({
        name: "Portfolio",
        url: "/portfolios",
        icon: BookOpen,
      })
    }

    return projects
  }

  const data = {
    user: {
      name: user?.name || "User",
      email: user?.email || "user@example.com",
      avatar: user?.avatarUrl || "/avatars/default.jpg",
      role: user?.roleDisplayName || "User",
    },
    teams: [
      {
        name: "TugasinAja",
        logo: GalleryVerticalEnd,
        plan: user?.roleDisplayName || "User",
      },
    ],
    navMain: getNavItems(),
    projects: getProjects(),
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
