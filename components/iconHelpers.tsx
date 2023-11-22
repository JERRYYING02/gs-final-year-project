import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps }  from "class-variance-authority";

 
const backgroundVariants = cva(
    "rounded-full flex items-center justify-center",
    {
      variants: {
        variant: {
          default: "bg-teal-100",
          success: "bg-emerald-200",
        },
        size: {
          default: "p-3",
          sm: "p-1",
        }
      },

      //default values for variant and size
      defaultVariants: {
        variant: "default",
        size: "default",
      }
    }
  );
  
  const iconVariants = cva(
    "",
    {
      variants: {
        variant: {
          default: "text-teal-500",
          success: "text-emerald-700",
        },
        size: {
          default: "h-5 w-9",
          sm: "h-3 w-5"
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      }
    }
  );
  
  type BackgroundStyleProps = VariantProps<typeof backgroundVariants>;
  type IconStyleProps = VariantProps<typeof iconVariants>;
  
  interface IconHelperProps extends BackgroundStyleProps, IconStyleProps {
    icon: LucideIcon;
  };
  
  export const IconHelper = ({
    icon: Icon,
    variant,
    size,
  }: IconHelperProps) => {
    return (
      <div className={cn(backgroundVariants({ variant, size }))}>
        <Icon className={cn(iconVariants({ variant, size }))} />
      </div>
    )
  };