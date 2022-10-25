// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";

import { useRoutes } from "@solidjs/router";
import routes from './pages/router'

export default function Root() {
  const Routes = useRoutes(routes);

  return (
    <Html lang="en">

      <Head>
        <Title>SolidStart - Bare</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Body>
        <Suspense>
          <ErrorBoundary >

            <Routes/>           
            
          </ErrorBoundary>
        </Suspense>

        <Scripts />
      </Body>

    </Html>
  );
}
