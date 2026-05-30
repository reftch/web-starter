import { useState } from "preact/compat"
import { Button } from "./ui/button"
import { Field } from "./ui/field"
import { cn } from "../lib/utils"
import { Input } from "./ui/input"
import { InputGroup, InputGroupInput } from "./ui/input-group"

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
  const [value, setValue] = useState("")

  const handleChange = (e: Event) => {
    const input = e.currentTarget as HTMLInputElement;
    console.log(input.value);
    setValue(input.value)
    /*
    fetch(`/api/v1/cities?keyword=${input.value}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
      })
        */
  };

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
        <InputGroup className="rounded">
          <InputGroupInput
            className="w-[20rem]"
            type="search"
            placeholder="Search..."
            value={value}
            onInput={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch(value);
              }
            }}

          />

        </InputGroup>

        {/* <Input
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
        /> */}
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