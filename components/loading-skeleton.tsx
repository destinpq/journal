import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white flex flex-col">
      {/* Header Skeleton */}
      <header className="py-4 md:py-6 px-4 md:px-8 border-b border-amber-500/50 sticky top-0 bg-gray-900/95 backdrop-blur-xl z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton className="w-6 h-6 md:w-10 md:h-10 mr-2 md:mr-3 bg-amber-500/20" />
            <Skeleton className="h-8 md:h-12 w-32 md:w-48 bg-amber-500/20" />
          </div>
          <Skeleton className="hidden md:block h-4 w-40 bg-slate-800" />
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {/* Forms Skeleton */}
        <div className="xl:col-span-1 space-y-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-slate-700" />
              <Skeleton className="h-4 w-48 bg-slate-700" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-10 bg-slate-700" />
                <Skeleton className="h-10 bg-slate-700" />
                <Skeleton className="h-10 bg-slate-700" />
              </div>
              <Skeleton className="h-10 w-full bg-slate-700" />
              <Skeleton className="h-10 w-full bg-slate-700" />
              <Skeleton className="h-10 w-full bg-slate-700" />
            </CardContent>
          </Card>
        </div>

        {/* Content Skeleton */}
        <div className="xl:col-span-2 space-y-8">
          {/* Chart Skeleton */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-40 bg-slate-700" />
              <Skeleton className="h-4 w-56 bg-slate-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full bg-slate-700" />
            </CardContent>
          </Card>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-slate-800 border-slate-700">
                <CardContent className="p-4 md:p-6">
                  <Skeleton className="h-4 w-24 bg-slate-700 mb-2" />
                  <Skeleton className="h-8 w-16 bg-slate-700 mb-1" />
                  <Skeleton className="h-3 w-32 bg-slate-700" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Entries Lists Skeleton */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton className="w-6 h-6 mr-3 bg-slate-700" />
                  <Skeleton className="h-6 w-32 bg-slate-700" />
                </div>
                <Skeleton className="h-4 w-48 bg-slate-700" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((j) => (
                  <div key={j} className="p-4 border border-slate-700 rounded-lg bg-slate-900/50">
                    <Skeleton className="h-5 w-3/4 bg-slate-700 mb-2" />
                    <Skeleton className="h-4 w-1/2 bg-slate-700 mb-1" />
                    <Skeleton className="h-3 w-1/3 bg-slate-700" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="text-center p-6 border-t border-slate-700/50">
        <Skeleton className="h-4 w-64 mx-auto bg-slate-800" />
      </footer>
    </div>
  );
} 