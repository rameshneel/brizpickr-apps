# UI Kit Components Examples

This document shows how to use all the components in the BrizPickr UI Kit.

## Installation

```bash
# Import components in your React app
import {
  Button,
  Input,
  Card,
  Alert,
  Dialog,
  // ... and more
} from '@brizpickr/ui-kit';
```

## Basic Components

### Button

```jsx
import { Button } from '@brizpickr/ui-kit';

// Different variants
<Button>Default Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

### Input

```jsx
import { Input } from '@brizpickr/ui-kit';

<Input placeholder="Enter your name" />
<Input type="email" placeholder="Email address" />
<Input type="password" placeholder="Password" />
<Input disabled placeholder="Disabled input" />
```

### Badge

```jsx
import { Badge } from '@brizpickr/ui-kit';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

### Textarea

```jsx
import { Textarea } from '@brizpickr/ui-kit';

<Textarea placeholder="Enter your message" />
<Textarea rows={5} placeholder="Longer message" />
```

## Layout Components

### Card

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@brizpickr/ui-kit';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Separator

```jsx
import { Separator } from '@brizpickr/ui-kit';

<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>

<Separator orientation="vertical" className="h-6" />
```

## Form Components

### Checkbox

```jsx
import { Checkbox, CheckboxWithLabel } from '@brizpickr/ui-kit';

// Basic checkbox
<Checkbox checked={checked} onCheckedChange={setChecked} />

// With label
<CheckboxWithLabel
  id="terms"
  label="I agree to the terms"
  checked={checked}
  onCheckedChange={setChecked}
/>
```

### Radio Group

```jsx
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemWithLabel,
} from '@brizpickr/ui-kit';

<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroupItemWithLabel value="option1" label="Option 1" />
  <RadioGroupItemWithLabel value="option2" label="Option 2" />
  <RadioGroupItemWithLabel value="option3" label="Option 3" />
</RadioGroup>;
```

### Switch

```jsx
import { Switch, SwitchWithLabel } from '@brizpickr/ui-kit';

// Basic switch
<Switch checked={checked} onCheckedChange={setChecked} />

// With label
<SwitchWithLabel
  id="notifications"
  label="Enable notifications"
  checked={checked}
  onCheckedChange={setChecked}
/>
```

### Select

```jsx
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '@brizpickr/ui-kit';

<Select value={value} onValueChange={setValue} placeholder="Select an option">
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectGroup>
  <SelectSeparator />
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
    <SelectItem value="broccoli">Broccoli</SelectItem>
  </SelectGroup>
</Select>;
```

## Navigation Components

### Tabs

```jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@brizpickr/ui-kit';

<Tabs defaultValue="account" value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content</p>
  </TabsContent>
</Tabs>;
```

### Dropdown Menu

```jsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@brizpickr/ui-kit';

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuItem onClick={() => console.log('Edit')}>Edit</DropdownMenuItem>
  <DropdownMenuItem onClick={() => console.log('Copy')}>Copy</DropdownMenuItem>
  <DropdownMenuSeparator />
  <DropdownMenuLabel>Settings</DropdownMenuLabel>
  <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
    Show notifications
  </DropdownMenuCheckboxItem>
</DropdownMenu>;
```

## Feedback Components

### Alert

```jsx
import { Alert, AlertTitle, AlertDescription, AlertWithIcon } from '@brizpickr/ui-kit';

// Basic alert
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

// With variants
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong!</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed successfully!</AlertDescription>
</Alert>

// With icon and close button
<AlertWithIcon
  variant="warning"
  title="Warning"
  onClose={() => setShowAlert(false)}
>
  This is a warning message
</AlertWithIcon>
```

### Progress

```jsx
import { Progress } from '@brizpickr/ui-kit';

<Progress value={33} />
<Progress value={66} className="w-full" />
```

### Tooltip

```jsx
import { Tooltip } from '@brizpickr/ui-kit';

<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>;
```

## Overlay Components

### Dialog

```jsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@brizpickr/ui-kit';

<Dialog>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

### Modal

```jsx
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  useModal
} from '@brizpickr/ui-kit';

function ModalExample() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <Button onClick={open}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={close} title="Modal Title">
        <ModalContent>
          <p>This is the modal content.</p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={close}>Cancel</Button>
          <Button onClick={close}>Save</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

// Different sizes
<Modal isOpen={isOpen} onClose={close} size="sm" title="Small Modal">
  <p>Small modal content</p>
</Modal>

<Modal isOpen={isOpen} onClose={close} size="lg" title="Large Modal">
  <p>Large modal content</p>
</Modal>

<Modal isOpen={isOpen} onClose={close} size="xl" title="Extra Large Modal">
  <p>Extra large modal content</p>
</Modal>

// Without close button
<Modal
  isOpen={isOpen}
  onClose={close}
  title="Important Modal"
  showCloseButton={false}
>
  <p>This modal cannot be closed with the X button</p>
</Modal>

// Custom modal with components
<Modal isOpen={isOpen} onClose={close}>
  <ModalHeader>
    <ModalTitle>Create Account</ModalTitle>
    <ModalDescription>
      Enter your details to create a new account.
    </ModalDescription>
  </ModalHeader>
  <ModalContent>
    <div className="space-y-4">
      <Input placeholder="Full Name" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
    </div>
  </ModalContent>
  <ModalFooter>
    <Button variant="outline" onClick={close}>Cancel</Button>
    <Button onClick={close}>Create Account</Button>
  </ModalFooter>
</Modal>
```

## Data Display Components

### Table

```jsx
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@brizpickr/ui-kit';

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell>$150.00</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```

### Avatar

```jsx
import { Avatar, AvatarImage, AvatarFallback } from '@brizpickr/ui-kit';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

## Complete Form Example

```jsx
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  CheckboxWithLabel,
  Button,
  Alert,
} from '@brizpickr/ui-kit';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission
    setShowSuccess(true);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        {showSuccess && (
          <Alert variant="success" className="mb-4">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your message has been sent.</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Select
              value={formData.subject}
              onValueChange={value =>
                setFormData({ ...formData, subject: value })
              }
            >
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="billing">Billing Question</SelectItem>
            </Select>
          </div>

          <div>
            <Textarea
              placeholder="Your message"
              value={formData.message}
              onChange={e =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              required
            />
          </div>

          <CheckboxWithLabel
            id="newsletter"
            label="Subscribe to our newsletter"
            checked={formData.newsletter}
            onCheckedChange={checked =>
              setFormData({ ...formData, newsletter: checked })
            }
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          Send Message
        </Button>
      </CardFooter>
    </Card>
  );
}
```

## Styling with Tailwind CSS

All components use Tailwind CSS classes and are fully customizable. You can override styles by passing className props:

```jsx
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Button
</Button>

<Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  <CardContent>
    <p>Custom styled card</p>
  </CardContent>
</Card>
```

## Accessibility

All components are built with accessibility in mind:

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## Responsive Design

Components are responsive by default and work well on all screen sizes. Use Tailwind's responsive prefixes for custom responsive behavior:

```jsx
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent>
    <p>Responsive card</p>
  </CardContent>
</Card>
```
