import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Field } from "./ui/field"
import { Input } from "./ui/input"
import { useState } from "preact/compat"

function HeaderTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "text-card-foreground text-lg font-medium",
        className
      )}
      {...props}
    />
  )
}

type HeaderSearchProps = React.ComponentProps<"div"> & {
  onSearch: (value: string) => void
}

function HeaderSearch({ className, onSearch, ...props }: HeaderSearchProps) {
  const [value] = useState("")

  const handleChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    console.log(input.value);
    fetch(`/api/v1/cities?keyword=${input.value}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        // setTemperature(`${json.current.temperature_2m}°C`);
        // setElevation(`${json.elevation}m`);
      })
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // const value = e.target.value;
  //   // console.log("Searching for:", value)
  //   // You can call your search function here
  // }

  return (
    <div
      data-slot="card"
      className={cn(
        "text-card-foreground",
        className
      )}
      {...props}
    >
      <Field orientation="horizontal">
        <Input
          className="w-[22rem]"
          type="search"
          placeholder="Search..."
          value={value}
          onInput={handleChange}
          // onInput={(e) => setValue((e.currentTarget as HTMLInputElement).value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch(value);
            }
          }}
        />
        <Button className="cursor-pointer" onClick={() => onSearch(value)}>Search</Button>
      </Field>
    </div>
  )
}

function Header({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex justify-between gap-6 border-b py-4 items-center px-4",
        className
      )}
      {...props}
    />
  )
}

export { Header, HeaderTitle, HeaderSearch }