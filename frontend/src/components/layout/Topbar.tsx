import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Topbar({ title }: { title: string }) {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:bg-muted rounded-md" />
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="text-sm text-muted-foreground">Admin</div>
    </header>
  );
}