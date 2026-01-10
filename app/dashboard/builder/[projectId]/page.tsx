import ProjectsSidebar from "@/components/dashboard/ProjectsSidebar";
import Builder from "@/components/dashboard/Builder";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function BuilderPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white">

      {/* Sidebar (fixed & responsive) */}
      <ProjectsSidebar />

      {/* Main content */}
      <main className="md:ml-64 min-h-screen overflow-hidden">
        <Builder projectId={projectId} />
      </main>

    </div>
  );
}
