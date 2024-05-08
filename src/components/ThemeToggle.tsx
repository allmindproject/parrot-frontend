import { Moon, Sun } from "lucide-react";
import { setTheme } from "@/services/state/theme/themeSlice";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui";
import { useAppDispatch } from "@/hooks";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => dispatch(setTheme({ theme: "light" }))}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch(setTheme({ theme: "dark" }))}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => dispatch(setTheme({ theme: "system" }))}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeToggle };
