import { useEffect, useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 12, maxVisible = 5){
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(items.length / pageSize)

    useEffect(() => {
        setCurrentPage(1)
    }, [items.length])

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return items.slice(start, start + pageSize)
    }, [items, currentPage])

    const visiblePages = useMemo(() => {
        if (totalPages <= 1) return [1]

        const half = Math.floor(maxVisible / 2)
        let start = Math.max(1, currentPage - half)
        let end = Math.min(totalPages, currentPage + half)

        if (currentPage <= half){
            start = 1
            end = Math.min(totalPages, maxVisible)
        }

        if (currentPage + half >= totalPages){
            start = Math.max(1, totalPages - maxVisible + 1)
            end = totalPages
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    }, [currentPage, totalPages])

    return {
        currentPage,
        totalPages,
        visiblePages,
        paginatedItems,
        nextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
        prevPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        setPage: setCurrentPage
    }
}