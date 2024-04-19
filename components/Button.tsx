import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";
import {cva} from "class-variance-authority";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}


const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
            "hover:bg-accent hover:text-accent-foreground",
        link:
            "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r bg-gradient-to-r from-blue-400 to-emerald-600 text-white hover:from-emerald-600 hover:to-blue-400 hover:text-black transition-colors duration-200",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
  className,children,disabled,type="button",...props
},ref) => {
  return (
    <button type={type} className={twMerge(`
    w-full rounded-full bg-green-500 border border-transparent px-3 py-3
    disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,className)}
    disabled={disabled} ref={ref} {...props}>
      {children}
    </button>
  )
})
 
Button.displayName = "Button"

export default Button;