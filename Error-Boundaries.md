# Error Boundaries - from react docs

KEY CATCHES - Error Boundaries do not catch errors for:
- Event Handlers
- Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
- Server Side Rendering
- Errors thrown in the Error boundary itself

A class becomes an error boundary if it implements either of the following classes:
- static getDerivedStateFromError() - use this to render fallback UI
- componentDidCatch() - Use to log error information

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so that the next render will show
    // fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

For more info read the article again!

key notes:
- can use regular try catch for callbacks and event-listeners
- can add babel plugin for good jsx stack traces