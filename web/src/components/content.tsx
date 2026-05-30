import { cn } from "../lib/utils"

function Content({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex justify-between gap-6 py-4 items-center px-4",
                className
            )}
            {...props}
        />
    )
}

export { Content }