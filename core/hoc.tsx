import { ComponentType, ReactElement, Suspense } from "react";

const withSuspense =
  (Component: ComponentType<any>, fallback?: ReactElement | null) =>
  // eslint-disable-next-line react/display-name
  (props: any) =>
    (
      <Suspense fallback={fallback ?? null}>
        <Component {...props} />
      </Suspense>
    );

export { withSuspense };
