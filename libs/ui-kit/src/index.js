// UI Kit Barrel
// export * from './lib/components';
// export * from './lib/hooks';
// export * from './lib/utils';
// export * from './lib/styles';

// UI Kit Barrel - All Components Export

// Basic Components
export { Button } from './lib/components/ui/button';
export { Input } from './lib/components/ui/input';
export { Badge } from './lib/components/ui/badge';
export { Textarea } from './lib/components/ui/textarea';

// Layout Components
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './lib/components/ui/card';
export { Separator } from './lib/components/ui/separator';

// Form Components
export { Checkbox, CheckboxWithLabel } from './lib/components/ui/checkbox';
export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemWithLabel,
} from './lib/components/ui/radio-group';
export { Switch, SwitchWithLabel } from './lib/components/ui/switch';
export {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from './lib/components/ui/select';

// Navigation Components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './lib/components/ui/tabs';
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './lib/components/ui/dropdown-menu';

// Feedback Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertWithIcon,
} from './lib/components/ui/alert';
export { Progress } from './lib/components/ui/progress';
export { Tooltip } from './lib/components/ui/tooltip';

// Overlay Components
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './lib/components/ui/dialog';
export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  useModal,
} from './lib/components/ui/modal';

// Data Display Components
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './lib/components/ui/table';
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from './lib/components/ui/avatar';

// Utils
export { cn } from './lib/components/ui/utils';
