import { Button } from "@/components/ui/Button";
import type { PaginationComponentProps } from "../types/pokedex.types";

export function Pagination({visiblePages,currentPage,totalPages,nextPage, setPage,prevPage, animatedPageChange }: PaginationComponentProps){
    return (
        <div className="flex gap-1 justify-center text-white pt-1">
            <Button onClick={() => animatedPageChange(prevPage)} disabled={currentPage == 1} customStyle="bg-white/20 hover:bg-white/10">
                Prev
            </Button>
            {visiblePages[0] > 1 && <span className="pt-3">...</span>}
            {visiblePages.map(page => (
                <Button 
                    key={`page-${page}`} 
                    disabled={page === currentPage}
                    onClick={() => animatedPageChange(() => setPage(page))} 
                    customStyle={`${page ===currentPage ? 'bg-white/10': 'bg-white/20'} hover:bg-white/10`}>
                        {page}
                </Button>
            ))}
            {visiblePages.at(-1)! < totalPages && <span className="pt-3">...</span>}
            <Button onClick={() => animatedPageChange(nextPage)} disabled={currentPage == totalPages} customStyle="bg-white/20 hover:bg-white/10">
                Next
            </Button>
        </div>
    )
}