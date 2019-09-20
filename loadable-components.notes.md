# Loadable Components

Best way to use loadable components is through the use of dynamic import() syntax.

Before:

```javascript
import { add } from './math'

console.log(add(16, 26))
```

After:

```javascript
import('./math').then(math => {
  console.log(math.add(16, 26))
})
```

When using babel need to add "babel/plugin-syntax-dynamic-import" plugin.

## Component Splitting

loadable lets you easily import components and reuse it in your code.

```javascript
import loadable from "@loadable/component"

const OtherComponent = loadable(() => import('./OtherComponent));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}

```

## Library Splitting

loadable.lib() allows you to defer the loading of a library. It takes a render props
argument when the library is loaded.

```javascript
import loadable from '@loadable/component'

const Moment = loadable.lib(() => import('moment'))

function FromNow({ date }) {
  return (
    <div>
      <Moment fallback={date.toLocaleDateString()}>
        {({ default: moment }) => moment(date).fromNow()}
      </Moment>
    </div>
  )
}
```

## Full Dynamic import

Webpack accepts full dynamic imports, you can use them to create a reusable Loadable Component.

```javascript
import loadable from '@loadable/component'

const AsyncPage = loadable(props => import(`./${props.page}`))

function MyComponent() {
  return (
    <div>
      <AsyncPage page="Home">
      <AsyncPage page="Contact">
    </div>
  )
}

```

## !! SUSPENSE is not supported on SSR

```javascript
const OtherComponent = loadable(() => import('./OtherComponent'), {
  fallback: <div>Loading...</div>
})

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

// You can also specify fall back in props

const FallbackInProps = loadable(() => import('./OtherComponent'))

function Component() {
  return (
    <div>
      <OtherComponent fallback={<div>Loading...</div>}>
    </div>
  )
}
```

## Error Boundaries

If other modules fail to load, it will trigger an error.

You can handle these errors to show a nicer user experience with [https://reactjs.org/docs/error-boundaries.html](ErrorBoundaries). Once created you can then use
anywhere in your application.

see notes on Error Boundaries

## Delay

You can use the [https://github.com/sindresorhus/p-min-delay](p-min-delay) to avoid a flashing loader icon by providing a loading icon for a predefined amount of
time so that UX is better.

```javascript
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
// Wait a minimum of 200ms before loading home.
export const OtherComponent = loadable(() =>
  pMinDelay(import('./OtherComponent'), 200)
)
```

## Timeout

Infinite loading is not good for user experience, to avoid it implementing a timeout is a good workaround, e.g.

```javascript
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'

// Wait a maximum of 2s before sending an error.
export const OtherComponent = loadable(() =>
  timeout(import('./OtherComponent'), 2000)
)
```

## Prefetching

Loadable Components is fully compatible with:
- [](webpack hints)
- [](webpackPrefetch)
- [](webpackPreload)

Most of the time you want to prefetch a component, it means it will be loaded
when the browser is idle. You can do it by adding /* webpackPrefetch: true */

```javascript
import loadable from '@loadable/component'

const OtherComponent = loadable(() =>
  import(/* webpackPrefetch: true */ './OtherComponent'),
)
```

## Manually preload a component

It is possible to force the preload of a component

You can trigger a preload on mouse over.

```javascript
const loadable = '@loadable/component'

const Infos = loadable(() => import('./Infos'))

function App() {
  const [show, setShow] = useState(false)
  return (
    <div>
      <a onMouseOver={() => Infos.preload()} onClick={() => setShow(true)}>
        Show Infos
      </a>
      {show && <Infos />}
    </div>
  );
}

const OtherComponent = loadable(() =>
  import(/* webpackPrefetch: true */ './OtherComponent'),
)
```

Prefetch is not available server-side, you should only call it client-side. If you want to use prefetching
server-side, use webpack-hints

preload is aggressive and doesn't take care of network condition and data saving preference of the user...
call it carefully.

## Server Side Rendering

