# BrizPickr UI Kit

A comprehensive, accessible, and customizable UI component library built with React and Tailwind CSS. This UI kit provides a complete set of components for building modern web applications.

## Features

- 🎨 **Modern Design**: Clean, modern components with beautiful styling
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation, screen reader support)
- 📱 **Responsive**: Mobile-first design that works on all screen sizes
- 🎯 **Customizable**: Easy to customize with Tailwind CSS classes
- 🚀 **TypeScript Ready**: Full TypeScript support (though written in JavaScript)
- 🔧 **Flexible**: Multiple variants and sizes for each component
- 📦 **Lightweight**: Only includes what you need

## Installation

The UI kit is part of the BrizPickr monorepo. To use it in your app:

```bash
# Import components directly
import { Button, Input, Card } from '@brizpickr/ui-kit';
```

## Quick Start

```jsx
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Modal,
  useModal,
} from '@brizpickr/ui-kit';

function App() {
  const { isOpen, open, close } = useModal();

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to BrizPickr</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a beautiful card component!</p>
          <Button className="mt-4" onClick={open}>
            Open Modal
          </Button>
        </CardContent>
      </Card>

      <Modal isOpen={isOpen} onClose={close} title="Welcome Modal">
        <p>This is a beautiful modal component!</p>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={close}>
            Close
          </Button>
          <Button onClick={close}>Get Started</Button>
        </div>
      </Modal>
    </div>
  );
}
```

## Available Components

### Basic Components

- **Button** - Multiple variants and sizes
- **Input** - Text input with validation states
- **Badge** - Status indicators and labels
- **Textarea** - Multi-line text input

### Layout Components

- **Card** - Content containers with header, content, and footer
- **Separator** - Visual dividers

### Form Components

- **Checkbox** - Single and multiple selection
- **RadioGroup** - Single selection from multiple options
- **Switch** - Toggle switches
- **Select** - Dropdown selection with groups and separators

### Navigation Components

- **Tabs** - Tabbed navigation
- **DropdownMenu** - Context menus and dropdowns

### Feedback Components

- **Alert** - Status messages with variants
- **Progress** - Progress indicators
- **Tooltip** - Hover information

### Overlay Components

- **Dialog** - Modal dialogs and overlays
- **Modal** - Full-featured modal with backdrop, animations, and state management

### Data Display Components

- **Table** - Data tables with headers and captions
- **Avatar** - User profile images with fallbacks

## Component Variants

Most components support multiple variants for different use cases:

### Button Variants

```jsx
<Button>Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>
```

### Alert Variants

```jsx
<Alert>Default</Alert>
<Alert variant="destructive">Error</Alert>
<Alert variant="warning">Warning</Alert>
<Alert variant="success">Success</Alert>
<Alert variant="info">Info</Alert>
```

## Styling

All components use Tailwind CSS and can be customized using className props:

```jsx
// Custom styling
<Button className="bg-blue-500 hover:bg-blue-600 text-white">
  Custom Button
</Button>

<Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
  <CardContent>
    <p>Custom styled card</p>
  </CardContent>
</Card>
```

## Form Components

The UI kit includes comprehensive form components that work together seamlessly:

```jsx
import {
  Input,
  Textarea,
  Select,
  SelectItem,
  CheckboxWithLabel,
  Button,
} from '@brizpickr/ui-kit';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false,
  });

  return (
    <form className="space-y-4">
      <Input
        placeholder="Your name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />

      <Select
        value={formData.subject}
        onValueChange={value => setFormData({ ...formData, subject: value })}
      >
        <SelectItem value="general">General Inquiry</SelectItem>
        <SelectItem value="support">Technical Support</SelectItem>
      </Select>

      <Textarea
        placeholder="Your message"
        value={formData.message}
        onChange={e => setFormData({ ...formData, message: e.target.value })}
      />

      <CheckboxWithLabel
        id="newsletter"
        label="Subscribe to newsletter"
        checked={formData.newsletter}
        onCheckedChange={checked =>
          setFormData({ ...formData, newsletter: checked })
        }
      />

      <Button type="submit">Send Message</Button>
    </form>
  );
}
```

## Accessibility

All components are built with accessibility in mind:

- **ARIA Labels**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive components
- **Focus Management**: Proper focus handling and visible focus indicators
- **Color Contrast**: Meets WCAG contrast requirements
- **Semantic HTML**: Uses appropriate HTML elements and roles

## Responsive Design

Components are responsive by default and work well on all screen sizes:

```jsx
// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</div>

// Responsive table
<div className="overflow-x-auto">
  <Table>
    {/* Table content */}
  </Table>
</div>
```

## Examples

See the [EXAMPLES.md](./EXAMPLES.md) file for comprehensive examples of all components.

## Contributing

To add new components or modify existing ones:

1. Create the component in `src/lib/components/ui/`
2. Add proper TypeScript types (if applicable)
3. Include accessibility features
4. Add to the exports in `src/index.js`
5. Update documentation and examples

## Dependencies

- React 18+
- Tailwind CSS 3+
- Lucide React (for icons)
- clsx (for class merging)
- tailwind-merge (for class conflict resolution)

## License

This UI kit is part of the BrizPickr project and follows the same licensing terms.
