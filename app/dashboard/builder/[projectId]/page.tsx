import ProjectsSidebar from "@/components/dashboard/ProjectsSidebar";
import Builder from "@/components/dashboard/Builder";

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default async function BuilderPage({ params }: PageProps) {
  const { projectId } = await params;

  return (
    <div className="bg-[#0a0f1f] min-h-screen text-white">
      <ProjectsSidebar />

      <main className="ml-64 min-h-screen">
        <Builder projectId={projectId} />
      </main>
    </div>
  );
}
