import { 
    Pagination, 
    PaginationContent, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from "@/components/ui/pagination";

interface PaginationTypes {
    page: number;
    pageNumbers: number[];
    currentPage: number;
    handlePageChange: (newPage: number) => void;
}
        
const PaginationComponent = ({ page, pageNumbers, currentPage, handlePageChange }: PaginationTypes) => {
    return (
        <Pagination className="mb-1 h-6 transition-colors">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious 
                        href={"#"} 
                        size={"pagination"} 
                        onClick={() => {
                            if (page === 1) return;
                            const previous = page - 1;
                            handlePageChange(previous);
                        }}
                        // Add any additional props you might need
                    />
                </PaginationItem>
                {pageNumbers.map((pageNumber: number) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            isActive={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)} 
                            href={"#"}
                            size={"pagination"}
                        >
                        {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext 
                        href="#" 
                        size={"pagination"}
                        onClick={() => {
                            if (page === pageNumbers.length) return;
                            const next = page + 1;
                            handlePageChange(next);
                        }}
                        // Add any additional props you might need
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
 
 
export default PaginationComponent;