import { AppSidebar } from "@/components/app-sidebar";
import CreateBook from "@/components/modals/create-new-book";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/store/useAuth";
import { useState } from "react";

export interface BreadcrumbItemProps {
  label: string;
  href?: string;
}

export default function DashboardSidebar({
  breadcrumbs = [],
  children,
}: {
  breadcrumbs?: BreadcrumbItemProps[];
  children: React.ReactNode;
}) {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Dynamic Header with Breadcrumbs */}
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 px-4 border-b">
            <div className="flex shrink-0 items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              {breadcrumbs.length > 0 && (
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((item, index) => (
                      <BreadcrumbItem key={index}>
                        {item.href ? (
                          <BreadcrumbLink href={item.href}>
                            {item.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        )}
                        {index < breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator />
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              )}
            </div>

            {user?.role === "ADMIN" ? (
              <div>
                <Button onClick={() => setOpenCreateForm(true)}>
                  Create new Book
                </Button>
              </div>
            ) : null}
          </header>

          {/* Main Content Section */}
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>

      <CreateBook onOpen={openCreateForm} onOpenChange={setOpenCreateForm} />
    </>
  );
}
